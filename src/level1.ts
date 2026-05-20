import { askInt, arrangements, factorial } from "./combinatorics";

export async function runLevel1(): Promise<void> {
  console.log("Рівень 1 - Розміщення БЕЗ повторень");

  console.log(`Формула: A(n, k) = n! / (n − k)!`);

  console.log(
    "  Введіть вхідні дані (або Enter для значень з варіанту: n=9, k=3):\n",
  );

  const nRaw = await askRaw("  Кількість дисциплін у семестрі n: ", "9");
  const kRaw = await askRaw("  Кількість дисциплін у день k: ", "3");

  const n = parseInt(nRaw) || 9;
  const k = parseInt(kRaw) || 3;

  console.log(`\n  Вхідні дані: n = ${n}, k = ${k}`);

  if (k > n) {
    console.log("  k не може бути більше n!");
    return;
  }

  console.log("\n  Розв'язання:");
  console.log(`  A(${n}, ${k}) = ${n}! / (${n} − ${k})! = ${n}! / ${n - k}!`);

  const factors: number[] = [];
  for (let i = n; i > n - k; i--) factors.push(i);
  console.log(`  A(${n}, ${k}) = ${factors.join(" × ")}`);

  const result = arrangements(n, k);
  console.log(`  A(${n}, ${k}) = ${result}`);

  console.log(`Відповідь: ${result} варіантів розкладу на день`);
}

async function askRaw(q: string, def: string): Promise<string> {
  const { ask } = await import("./combinatorics");
  const raw = await ask(`${q}[${def}]: `);
  return raw.trim() === "" ? def : raw.trim();
}
