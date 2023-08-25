const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse");

const planets = require("./planets.mongo");

// const habitablePlanets = [];

const isHabitable = (potential_planet) => {
  return (
    potential_planet["koi_disposition"] === "CONFIRMED" &&
    potential_planet["koi_insol"] < 1.11 &&
    potential_planet["koi_insol"] > 0.36 &&
    potential_planet["koi_prad"] < 1.6
  );
};

/*
const promise = new Promise((resolve,reject)=>{
    resolve(42); this 42 will passed when we call result
});
promise.then((result)=>{})
*/

function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "Data", "kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", async (data) => {
        if (isHabitable(data)) {
          // habitablePlanets.push(data);

          //TODO: Replace below create with  insert + update = upsert ,
          await savePlanet(data);
        }
      })
      .on("error", (err) => {
        console.log(err);
        reject(err);
      })
      .on("end", async () => {
        const habitablePlanetCount = (await getAllPlanets()).length;
        console.log(`${habitablePlanetCount} habitable planets found`);
        resolve();
      });
  });
}
async function getAllPlanets() {
  //second arge is filter
  return await planets.find(
    {},
    {
      _id: 0,
      __v: 0,
    }
  );
}

async function savePlanet(planet) {
  try {
    await planets.updateOne(
      {
        keplerName: planet.kepler_name,
      },
      {
        keplerName: planet.kepler_name,
      },
      {
        upsert: true,
      }
    );
  } catch (error) {
    console.error(`Could not save planet ${error}`);
  }
}

module.exports = {
  loadPlanetsData,
  getAllPlanets,
};
