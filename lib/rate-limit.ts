type Record = { count: number; windowStart: number; lockedUntil: number };

const attempts = new Map<string, Record>();

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes lockout

export function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const record = attempts.get(ip);

  if (!record) {
    attempts.set(ip, { count: 1, windowStart: now, lockedUntil: 0 });
    return { allowed: true };
  }

  if (record.lockedUntil && now < record.lockedUntil) {
    const retryAfter = Math.ceil((record.lockedUntil - now) / 1000);
    return { allowed: false, retryAfter };
  }

  if (now - record.windowStart > WINDOW_MS) {
    record.count = 1;
    record.windowStart = now;
    record.lockedUntil = 0;
    return { allowed: true };
  }

  if (record.count >= MAX_ATTEMPTS) {
    record.lockedUntil = now + LOCKOUT_MS;
    const retryAfter = Math.ceil(LOCKOUT_MS / 1000);
    return { allowed: false, retryAfter };
  }

  record.count++;
  return { allowed: true };
}

export function resetRateLimit(ip: string) {
  attempts.delete(ip);
}
