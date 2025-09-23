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
  const gearList = {
    characters: [],
  };

  $(".table-responsive table tbody tr").each((i, el) => {
    const tds = $(el).find("td");

    // if account is private, skip
    if ($(tds[2]).text() === "Private") return;

    const character = [];
    $(tds)
      .find("span.item")
      .each((j, item) => {
        const title = $(item).attr("title");
        if (title && title !== "Empty slot") {
          const parts = title.split("\n");
          const itemName = parts[0];
          const enchantments = parts.slice(1);
          character.push({
            name: itemName,
            enchantments,
          });
        }
      });
    if (character.length !== 0) {
      gearList.characters.push(character);
    }
  });

  return gearList;
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
