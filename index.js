const { fetchMyIP, fetchCoordsByIP } = require('./iss');


// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

fetchCoordsByIP('50.93.50.22', (error, coordinates) => {
  if (error) {
    console.log("It didn't work!", error);
    return; 
  }
  console.log('It worked! Returned coordinates: ', coordinates)
})