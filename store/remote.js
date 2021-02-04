const request = require("request");

function createRemoteDB(host, port) {
  const URL = "http://" + host + ":" + port;

  function list(table) {
    return req("GET", table);
  }
    const get = (table, id) =>{
        return req("GET", table, id)
    }
    const upsert = (table,id) =>{
        return req("GET", table, id)
    }
    const query = (table,id,join) =>{}

  function req(method, table, data) {
    let url = URL + "/" + table;
    body = "";
    return new Promise((resolve, reject) => {
      request(
        {
          method,
          headers: {
            "content-type": "application/json",
          },
          url,
          body,
        },
        (err, req, body) => {
          if (err) {
            console.error("error con la base de datos remota: ", err);
            return reject(err.message);
          }
          const resp = JSON.parse(body);
          return resolve(resp.body);
        }
      );
    });
  }

  return {
    list,
    get,
    query,
    upsert
  };
}

module.exports = createRemoteDB;
