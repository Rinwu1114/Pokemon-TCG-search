const fs = require("fs");
const path = require("path");

// Path to your cards folder
const cardsFolder = path.join(
  __dirname,
  "src",
  "pokemon-tcg-data-master",
  "pokemon-tcg-data-master",
  "cards",
  "en"
);
const setsFolder = path.join(
  __dirname,
  "src",
  "pokemon-tcg-data-master",
  "pokemon-tcg-data-master",
  "sets",
  "en.json"
);

// Output file
const outputFile = path.join(__dirname, "public", "allCards.json");



async function mergeCards() {
  try {
    // Read sets file and create a map for fast lookup
    const setsData = JSON.parse(fs.readFileSync(setsFolder, "utf-8"));
    const setsMap = {};
    for (const set of setsData) {
      setsMap[set.id] = set;
    }

    // Read all card files
    const cardFiles = fs
      .readdirSync(cardsFolder)
      .filter((f) => f.endsWith(".json"));

    const allCards = [];

    for (const file of cardFiles) {
      const filePath = path.join(cardsFolder, file);
      const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

      let cardsArray = [];
      if (Array.isArray(data)) cardsArray = data;
      else if (data.data && Array.isArray(data.data)) cardsArray = data.data;

      for (const card of cardsArray) {
        // Determine the set ID
        let setId = card.set?.id;
        if (!setId && card.id) {
          setId = card.id.split("-")[0]; // e.g., 'base1' from 'base1-1'
        }

        // Assign setDetails
        if (setId && setsMap[setId]) {
          const s = setsMap[setId];
          card.setDetails = {
            name: s.name || "Unknown Set",
            series: s.series || "Unknown Series",
            releaseDate: s.releaseDate || "1900-01-01",
          };
        } else {
          card.setDetails = {
            name: "Unknown Set",
            series: "Unknown Series",
            releaseDate: "1900-01-01",
          };
          console.warn(`⚠️ Set ID not found for card ${card.id}:`, setId);
        }

        allCards.push(card);
      }
    }

    // Ensure public folder exists
    const publicFolder = path.join(process.cwd(), "public");
    if (!fs.existsSync(publicFolder)) fs.mkdirSync(publicFolder);

    // Write merged file
    fs.writeFileSync(outputFile, JSON.stringify(allCards, null, 2));
    console.log(`✅ Successfully merged ${allCards.length} cards into allCards.json`);
  } catch (err) {
    console.error("❌ Error merging cards:", err);
  }
}

mergeCards();