const request = require("request");

// url to retrieve IPv4 address in JSON format
const url = 'https://api.ipify.org?format=json'


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
    if (error || response.statusCode !== 200) {
      return callback(error, null);
    }

    callback(null, JSON.parse(body).ip)
  });
}

module.exports = { fetchMyIP };