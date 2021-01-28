module.exports = {
  api: {
    port: process.env.API_PORT || 3000,
  },
  jwt: {
    secret: process.env.JWT_SECRET || "notasecret",
  },
  mysql: {
    host: process.env.MYSQL_HOST || "remotemysql.com",
    user: process.env.MYSQL_USER || "78hj1RrOxH",
    password: process.env.MYSQL_PASSWORD || "Utio17UGKH",
    database: process.env.MYSQL_DB || "78hj1RrOxH",
  },
};
