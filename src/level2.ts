import { askInt, permutationsWithRep, factorial } from "./combinatorics";
import { ask } from "./combinatorics";

export async function runLevel2(): Promise<void> {
  console.log("Рівень 2 - Перестановки З повтореннями");

  console.log(`Формула: P(n; k₁,k₂,...,kₘ) = n! / (k₁! · k₂! · ... · kₘ!)`);

  console.log("  Введіть вхідні дані (або Enter для значень з варіанту):\n");

  const mRaw = await ask("  Кількість різних цифр m [3]: ");
  const m = parseInt(mRaw.trim()) || 3;

  const digits: number[] = [];
  const counts: number[] = [];

  console.log(`\n  Введіть ${m} цифри та їх кількості:`);
  console.log("  (за умовою варіанту: цифра d має кількість d+1)\n");

  for (let i = 0; i < m; i++) {
    const dRaw = await ask(`  Цифра ${i + 1} [${i + 1}]: `);
    const cRaw = await ask(
      `  Кількість цифри ${dRaw.trim() || i + 1} [${i + 1 + 1}]: `,
    );
    const d = parseInt(dRaw.trim()) || i + 1;
    const c = parseInt(cRaw.trim()) || d + 1;
    digits.push(d);
    counts.push(c);
  }

  const n = counts.reduce((a, b) => a + b, 0);

  console.log("\n  Вхідні дані:");
  console.log("  " + "─".repeat(40));
  console.log("  │ Цифра │ Кількість │ Позначення │");
  console.log("  " + "─".repeat(40));
  digits.forEach((d, i) => {
    console.log(
      `  │   ${d}   │     ${counts[i]}     │     k${i + 1} = ${counts[i]}    │`,
    );
  });
  console.log("  " + "─".repeat(40));
  console.log(`  Загальна кількість цифр: n = ${counts.join(" + ")} = ${n}`);

  console.log("\n  Розв'язання:");
  console.log(
    `  P(${n}; ${counts.join(",")}) = ${n}! / (${counts.map((c, i) => `k${i + 1}!`).join(" · ")})`,
  );
  console.log(
    `  P(${n}; ${counts.join(",")}) = ${n}! / (${counts.map((c) => `${c}!`).join(" · ")})`,
  );

  const numerator = factorial(n);
  const denomParts = counts.map((c) => factorial(c));
  const denominator = denomParts.reduce((a, b) => a * b, 1n);

  console.log(
    `  P(${n}; ${counts.join(",")}) = ${numerator} / (${denomParts.join(" · ")})`,
  );
  console.log(`  P(${n}; ${counts.join(",")}) = ${numerator} / ${denominator}`);

  const result = permutationsWithRep(n, counts);

  console.log(` Відповідь: ${result} дев'ятизначних чисел`);
}
