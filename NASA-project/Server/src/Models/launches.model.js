// const launches = [];

const launchesDatabase = require("./launches.mongo");

const planets = require("./planets.mongo");

// const launches = new Map();

const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
  flightNumber: 100,
  mission: "kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27,2030"),
  target: "Kepler-442 b",
  customers: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

saveLaunch(launch);

// launches.set(launch.flightNumber, launch);

async function existsLaunchWithId(launchId) {
  return await launchesDatabase.findOne({
    flightNumber: launchId,
  });
}

async function getLatestFlightNumber() {
  const latestFlight = await launchesDatabase.findOne().sort("-flightNumber");
  if (!latestFlight) {
    return DEFAULT_FLIGHT_NUMBER;
  }
  return latestFlight.flightNumber;
}

async function getAllLaunches() {
  return await launchesDatabase.find({}, { _id: 0, __v: 0 });
}

async function saveLaunch(launch) {
  const planet = await planets.findOne({
    keplerName: launch.target,
  });
  if (!planet) {
    throw new Error("No matching Planets");
  }

  await launchesDatabase.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
}

//for working with mongoo will do  same thing as addNewLaunch.
async function scheduleNewLaunch(launch) {
  const newFlightNumber = (await getLatestFlightNumber()) + 1;
  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ["ZTM", "NASA"],
    flightNumber: newFlightNumber,
  });

  await saveLaunch(newLaunch);
}

//Create New Launch
//this was for working with memory
// function addNewLaunch(launch) {
//   latestFlightNumber++;
// //set gives (key, values)
//   launches.set(
//     latestFlightNumber,
//     //setting additional payload data for minimal data that should be passed by the customer.
//     Object.assign(launch, {
//       upcoming: true,
//       success: true,
//       customer: ["ZTM", "NASA"],
//       flightNumber: latestFlightNumber,
//     })
//   );
//   //Object.assign() method will take launch object and assign additional flightNumber which is set by server to track flightNunber Properly.
//   //here we are setting new launch with flightNumber and lauch itself.
//   // and launches.set() method set the new object
// }

async function abortLaunchById(launchId) {
  // launches.delete(launchId); will delete completely

  // const aborted = launches.get(launchId);
  // aborted.upcoming = false;
  // aborted.success = false;
  // return aborted;

  const aborted = await launchesDatabase.updateOne(
    {
      flightNumber: launchId,
    },
    {
      upcoming: false,
      success: false,
    }
  );
  return aborted.modifiedCount === 1;
}

module.exports = {
  existsLaunchWithId,
  getAllLaunches,
  abortLaunchById,
  scheduleNewLaunch,
};
