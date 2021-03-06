const mysql = require("mysql");

const config = require("../config");

const dbConf = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
};

let connection;

const handleCon = () => {
  connection = mysql.createConnection(dbConf);

  connection.connect((err) => {
    if (err) {
      console.error("[db err]", err);
      setTimeout(handleCon, 2000);
    } else {
      console.log("Db Connected");
    }
  });

  connection.on("error", (err) => {
    console.error("[db err]", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleCon();
    } else {
      throw err;
    }
  });
};

handleCon();

const list = (table) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table}`, (err, data) => {
      if (err) return reject;
      resolve(data);
    });
  });
};

const get = (table, id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM ${table} WHERE id = '${id}'`,
      (err, data) => {
        if (err) return reject;
        resolve(data);
      }
    );
  });
};

const insert = (table, data) => {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
      if (err) return reject;
      resolve(result);
    });
  });
};

const update = (table, data) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE ${table} SET ? WHERE id=?`,
      [data, data.id],
      (err, result) => {
        if (err) return reject;
        resolve(result);
      }
    );
  });
};

const upsert = async (table, data) => {
  let row = [];
  if (data.id) {
    row = await get(table, data.id);
  }

  if (row.length === 0) {
    return insert(table, data);
  } else {
    return update(table, data);
  }
};

const query = (table, query, join) => {
  let joinQuery = "";
  if (join) {
    const key = Object.keys(join)[0];
    const val = join[key];
    joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
  }
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM ${table} ${joinQuery} WHERE ?`,
      query,
      (err, res) => {
        if (err) return reject(err);
        resolve(res[0] || null);
      }
    );
  });
};

module.exports = { list, get, upsert, query };
