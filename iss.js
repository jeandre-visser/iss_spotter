const request = require("request");

// url to retrieve IPv4 address in JSON format
const url = 'https://api.ipify.org?format=json';


/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
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
  request('http://ipwho.is/' + ip, (error, response, body) => {

  if (error) {
    return callback(error, null);
  };
  
  const parsed = JSON.parse(body);

  if(!parsed.success) {
    const msg = `Success status was ${parsed.success}. Server message says: ${parsed.message} when fetching for IP ${parsed.ip}`;
    return callback(Error(msg), null);
  }

  const { latitude, longitude } = parsed;

    callback(null, { latitude, longitude });
  })
};








module.exports = { fetchMyIP, fetchCoordsByIP };