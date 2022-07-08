// const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned IP:' , ip);
// });

// fetchCoordsByIP('50.93.50.22', (error, coordinates) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log('It worked! Returned coordinates: ', coordinates);
// });

// const myCoords = { latitude: '52.83307', longitude: '-110.8504696' };

// fetchISSFlyOverTimes(myCoords, (error, flyOverTimes) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log('It worked! Returned fly over times ', flyOverTimes);
// });


const printFlyOverTimes = function(flyOverTimes) {
  for (const times of flyOverTimes) {
    const time = new Date(0);
    time.setUTCSeconds(times.risetime);
    const passingDuration = times.duration;
    console.log(`Next pass at ${time} for ${passingDuration} seconds`);
  }
};

nextISSTimesForMyLocation((error, nextTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  printFlyOverTimes(nextTimes);
});