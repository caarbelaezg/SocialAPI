const TABLA = "post";

module.exports = function (injectedStore) {
  let store = injectedStore;

  if (!store) {
    store = require("../../../store/dummy");
  }

  const list = () => {
      store.list(TABLA)
  };

  return {
    list,
  };
};
