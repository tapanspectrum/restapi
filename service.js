const request = require("request");
const lodash = require("lodash");
const moment = require("moment");

class fetchFBLeadsService {
  async fetchFBLeads(query) {
    try {
      if (query.entry) {
        let leadgen_id_data = query.entry[0].changes[0].value.leadgen_id;
        let options = {
          uri: `${config.FB_URL}${leadgen_id_data}?access_token=${config.ACCESS_TOKEN}`,
          method: "GET",
        };
        // console.log("options", options);
        return new Promise(function (resolve, reject) {
          request(options, function (error, res, body) {
            // console.log(JSON.parse(body).error.msg)
            if (!error && res.statusCode == 200) {
              // console.log(body);
              resolve(body);
            } else {
              console.log("reject error", error);
              reject(error);
            }
          });
        });
      }
    } catch (err) {
      console.log("catch error", err);
      throw err;
    }
  }

}

module.exports = fetchFBLeadsService;
