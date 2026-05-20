import * as fs from "fs";
import { ask } from "./combinatorics";
import { arrangements } from "./combinatorics";

function* generateArrangements<T>(items: T[], k: number): Generator<T[]> {
  const n = items.length;
  const used = new Array(n).fill(false);
  const current: T[] = [];

  function* backtrack(): Generator<T[]> {
    if (current.length === k) {
      yield [...current];
      return;
    }
    for (let i = 0; i < n; i++) {
      if (!used[i]) {
        used[i] = true;
        current.push(items[i]);
        yield* backtrack();
        current.pop();
        used[i] = false;
      }
    }
  }

  yield* backtrack();
}

export async function runLevel3(): Promise<void> {
  console.log("Рівень 3 - Повний перелік розміщень -> запис у файл");

  const useDefault = await ask(
    "\n  Використати типові назви дисциплін? [т/н]: ",
  );

  let disciplines: string[];

  if (useDefault.trim().toLowerCase() !== "н") {
    disciplines = [
      "Математика",
      "Фізика",
      "Програмування",
      "БД",
      "ОС",
      "Алгоритми",
      "Мережі",
      "Математ.аналіз",
      "Англійська",
    ];
    console.log(`  Використовуємо типові: ${disciplines.join(", ")}`);
  } else {
    const nRaw = await ask("  Кількість дисциплін [9]: ");
    const n = parseInt(nRaw.trim()) || 9;
    disciplines = [];
    for (let i = 0; i < n; i++) {
      const d = await ask(`  Дисципліна ${i + 1}: `);
      disciplines.push(d.trim() || `Дисципліна${i + 1}`);
    }
  }

  const kRaw = await ask("  Кількість дисциплін у день [3]: ");
  const k = parseInt(kRaw.trim()) || 3;
  const n = disciplines.length;

  const total = arrangements(n, k);
  console.log(`\n  A(${n}, ${k}) = ${total} розміщень`);
  console.log("  Генерація та запис у файл...");

  const filename = "arrangements.txt";
  const lines: string[] = [];

  lines.push(`Повний перелік розміщень A(${n}, ${k}) = ${total}`);
  lines.push(`Дисципліни: ${disciplines.join(", ")}`);
  lines.push(`Кількість у день: k = ${k}`);
  lines.push("═".repeat(60));
  lines.push(
    `${"№".padStart(5)} │ ${"Розклад на день (1-а → 2-а → 3-я пара)"}`,
  );
  lines.push("─".repeat(60));

  let count = 0;
  for (const arr of generateArrangements(disciplines, k)) {
    count++;
    lines.push(`${String(count).padStart(5)} │ ${arr.join("  →  ")}`);
  }

  lines.push("═".repeat(60));
  lines.push(`Всього: ${count} варіантів розкладу`);

  fs.writeFileSync(filename, lines.join("\n"), "utf8");

  console.log(`  Записано ${count} розміщень у файл "${filename}"`);

  console.log(`\n  Перші 10 варіантів розкладу:`);
  console.log("  " + "─".repeat(55));
  let shown = 0;
  for (const arr of generateArrangements(disciplines, k)) {
    shown++;
    console.log(`  ${String(shown).padStart(3)}. ${arr.join("  →  ")}`);
    if (shown >= 10) break;
  }
  console.log(`  ... (ще ${count - 10} варіантів у файлі "${filename}")`);
  console.log();
}
