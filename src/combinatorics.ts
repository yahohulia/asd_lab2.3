/**
 * Математичні функції комбінаторики та утиліта вводу
 */
import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export function ask(q: string): Promise<string> {
  return new Promise((resolve) => rl.question(q, resolve));
}

export async function askInt(q: string): Promise<number> {
  while (true) {
    const raw = await ask(q);
    const val = parseInt(raw.trim());
    if (!isNaN(val) && val >= 0) return val;
    console.log("  ⚠  Введіть ціле невід'ємне число!");
  }
}

export function closeInput(): void {
  rl.close();
}

// ─── Факторіал ───────────────────────────────────────────────────────────────

export function factorial(n: number): bigint {
  if (n < 0) throw new Error("Факторіал від'ємного числа");
  let result = 1n;
  for (let i = 2; i <= n; i++) result *= BigInt(i);
  return result;
}

// ─── Розміщення без повторень A(n, k) = n! / (n-k)! ─────────────────────────

export function arrangements(n: number, k: number): bigint {
  if (k > n) return 0n;
  return factorial(n) / factorial(n - k);
}

// ─── Перестановки без повторень P(n) = n! ────────────────────────────────────

export function permutations(n: number): bigint {
  return factorial(n);
}

// ─── Комбінації без повторень C(n, k) = n! / (k! * (n-k)!) ──────────────────

export function combinations(n: number, k: number): bigint {
  if (k > n) return 0n;
  return factorial(n) / (factorial(k) * factorial(n - k));
}

// ─── Перестановки З повтореннями P(n; k1,k2,...) = n! / (k1! * k2! * ...) ───

export function permutationsWithRep(n: number, counts: number[]): bigint {
  const sum = counts.reduce((a, b) => a + b, 0);
  if (sum !== n) throw new Error(`Сума k_i (${sum}) ≠ n (${n})`);
  let denom = 1n;
  for (const c of counts) denom *= factorial(c);
  return factorial(n) / denom;
}

// ─── Розміщення З повтореннями A*(n, k) = n^k ───────────────────────────────

export function arrangementsWithRep(n: number, k: number): bigint {
  return BigInt(n) ** BigInt(k);
}

// ─── Комбінації З повтореннями C*(n, k) = C(n+k-1, k) ───────────────────────

export function combinationsWithRep(n: number, k: number): bigint {
  return combinations(n + k - 1, k);
}
