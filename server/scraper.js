import express from "express";
import cors from "cors";
import axios from "axios";
import * as cheerio from "cheerio";

const app = express();
const PORT = 3000;
app.use(cors());

async function getTopClasses(classType) {
  const gearList = {};
  const items = [];

  const slotTypes = ["Weapon", "Ability", "Armor", "Ring"];
  let totalCharacters = 0;
  const excludeList = ["Empty Slot", "Backpack", "Backpack Extender"];

  const pages = ["", "101", "201", "301", "401"];

  await Promise.all(
    pages.map(async (page) => {
      const url = `https://www.realmeye.com/top-${classType}/${page}`;
      const { data: html } = await axios.get(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
      });

      const $ = cheerio.load(html);

      const accounts = $(".table-responsive table tbody tr");
      accounts.each((i, el) => {
        const tds = $(el).find("td");

        // Skip private accounts
        if ($(tds[2]).text() === "Private") return;
        $(tds)
          .find("span.item")
          .each((j, item) => {
            const title = $(item).attr("title");
            const imgStyle = $(item).attr("style");

            if (imgStyle && !excludeList.includes(title)) {
              const itemSrc =
                "https://www.realmeye.com" + $(item).parent().attr("href");
              const parts = title.split("\n");
              const imgPos = imgStyle.split(":")[1];
              const itemName = parts[0];
              const slotType = slotTypes[j % 4];
              const allEnchantments = parts.slice(1);
              const rarityMatch = itemName.match(
                /^(Uncommon|Rare|Legendary|Divine)\s+(.*)$/
              );

              let rarity = "Common";
              let baseName = itemName;
              if (rarityMatch) {
                rarity = rarityMatch[1];
                baseName = rarityMatch[2];
              }
              items.push(baseName);

              if (!gearList[baseName]) {
                gearList[baseName] = {
                  count: 0,
                  rarities: {},
                  type: slotType,
                  enchantments: {},
                  src: itemSrc,
                  img: imgPos,
                };
              }
              gearList[baseName].count++;
              gearList[baseName].rarities[rarity] =
                (gearList[baseName].rarities[rarity] || 0) + 1;
              allEnchantments.map((enchant) => {
                gearList[baseName].enchantments[enchant] =
                  (gearList[baseName].enchantments[enchant] || 0) + 1;
              });
            }
          });
        if (items.length > 0) {
          totalCharacters++;
        }
      });
    })
  );

  const gearUsage = Object.entries(gearList).map(
    ([name, { count, rarities, type, enchantments, src, img }]) => {
      const sortedEnchantments = Object.entries(enchantments)
        .filter(([, count]) => count > 1)
        .sort(([, a], [, b]) => b - a);
      const sortedRarities = Object.entries(rarities).sort(
        (a, b) => b[1] - a[1]
      );

      return {
        name,
        count,
        rarities: sortedRarities,
        type,
        enchantments: sortedEnchantments,
        src,
        img,
        percentage: ((count / totalCharacters) * 100).toFixed(0),
      };
    }
  );
  return {
    totalCharacters,
    gearUsage: gearUsage.sort((a, b) => b.count - a.count),
  };
}

app.get("/top/:classType", async (req, res) => {
  try {
    const data = await getTopClasses(req.params.classType);
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
