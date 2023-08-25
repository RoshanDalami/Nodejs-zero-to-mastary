const {
  getAllLaunches,
  scheduleNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
} = require("../../Models/launches.model");

async function httpGetAllLaunches(req, res) {
  //Here launches values are obtained from lauches.values which is IterableIterator . We need to convet it into JSON or Array (which is also valid javascript object). Here we are using (Array.from() method that convert it into array.)
  return res.status(200).json(await getAllLaunches());
}

function httpAddNewLaunch(req, res) {
  const launch = req.body;

  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.target ||
    !launch.launchDate
  ) {
    return res.status(400).json({
      error: "Missing require launch property",
    });
  }
  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "Invalid Launch Date",
    });
  }

  scheduleNewLaunch(launch);
  return res.status(201).json(launch);
}

async function httpAbortLaunch(req, res) {
  const launchId = +req.params.id;

  const existLaunch = await existsLaunchWithId(launchId)
  //if launch not found
  if (!existLaunch) {
    console.log(existsLaunchWithId);
    return res.status(404).json({
      error: "Launch not found",
    });
  }
  //if launch found
  const aborted = await abortLaunchById(launchId);
  if(!aborted){
    res.status(400).json({
      error : 'Launch not aborted'
    })
  }
  return res.status(200).json({ok:true});
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};
