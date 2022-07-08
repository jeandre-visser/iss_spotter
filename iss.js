const request = require("request");

// url to retrieve IPv4 address in JSON format
const url = 'https://api.ipify.org?format=json';

const fetchMyIP = function(callback) {
  request(url, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    callback(null, JSON.parse(body).ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`http://ipwho.is/${ip}`, (error, response, body) => {

    if (error) {
      return callback(error, null);
    }
  
    const parsed = JSON.parse(body);

    if (!parsed.success) {
      const msg = `Success status was ${parsed.success}. Server message says: ${parsed.message} when fetching for IP ${parsed.ip}`;
      return callback(Error(msg), null);
    }

    const { latitude, longitude } = parsed;

    callback(null, { latitude, longitude });
  });
};


const fetchISSFlyOverTimes = function(coords, callback) {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }


    if (response.statusCode !== 200) {
      return callback(Error(`Status Code ${response.statusCode} when fetching ISS times. Response: ${body}`), null);
    }

    callback(null, JSON.parse(body).response);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(coords, (error, nextTimes) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextTimes);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };