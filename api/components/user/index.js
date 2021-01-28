const store = require("../../../store/mysql");
const controller = require("./user-controller");

module.exports = controller(store);
