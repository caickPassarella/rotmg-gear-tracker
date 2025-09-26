import express from "express";
import cors from "cors";
import axios from "axios";
import * as cheerio from "cheerio";

const app = express();
const PORT = 3000;
app.use(cors());

async function getTopClasses(classType) {
  const url = `https://www.realmeye.com/top-${classType}`;
  const { data: html } = await axios.get(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    },
  });

  const $ = cheerio.load(html);

  const gearList = {};
  let totalCharacters = 0;

  const accounts = $(".table-responsive table tbody tr");
  accounts.each((i, el) => {
    const tds = $(el).find("td");

    // Skip private accounts
    if ($(tds[2]).text() === "Private") return;
    const items = [];
    $(tds)
      .find("span.item")
      .each((j, item) => {
        const title = $(item).attr("title");
        const itemSrc =
          "https://www.realmeye.com" + $(item).parent().attr("href");
        const imgStyle = $(item).attr("style");
        if (title && title !== "Empty slot") {
          const parts = title.split("\n");
          const imgPos = imgStyle.split(":")[1];
          const itemName = parts[0];
          //const enchantments = parts.slice(1);
          items.push(itemName);

          if (!gearList[itemName]) {
            gearList[itemName] = { count: 0, src: itemSrc, img: imgPos };
          }
          gearList[itemName].count++;
        }
      });
    if (items.length > 0) {
      totalCharacters++;
    }
  });

  const gearUsage = Object.entries(gearList).map(
    ([name, { count, src, img }]) => ({
      name,
      count,
      src,
      img,
      percentage: ((count / totalCharacters) * 100).toFixed(0),
    })
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
