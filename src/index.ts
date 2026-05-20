import { ask, closeInput } from "./combinatorics";
import { runLevel1 } from "./level1";
import { runLevel2 } from "./level2";
import { runLevel3 } from "./level3";

async function menu(): Promise<void> {
  while (true) {
    console.log("\n  Оберіть рівень:");
    console.log("    1 - Розміщення без повторень (варіанти розкладу)");
    console.log("    2 - Перестановки з повтореннями (дев'ятизначні числа)");
    console.log("    3 - Повний перелік розміщень(перетворення в файл)");
    console.log("    0 - Вихід\n");

    const choice = await ask("  Ваш вибір: ");
    switch (choice.trim()) {
      case "1":
        await runLevel1();
        break;
      case "2":
        await runLevel2();
        break;
      case "3":
        await runLevel3();
        break;
      case "0":
        console.log("\n  До побачення!\n");
        closeInput();
        return;
      default:
        console.log("Неправильний вибір.");
    }
  }
}

menu().catch(console.error);
