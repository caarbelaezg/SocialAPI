const TABLA = "user";
const auth = require("../auth");
const { nanoid } = require("nanoid");

module.exports = function (injectedStore) {
  let store = injectedStore;

  if (!store) {
    store = require("../../../store/dummy");
  }

  const list = (id) => {
    return store.list(TABLA, id);
  };

  const get = async (body) => {
    const user = {
      name: body.name,
      username: body.username,
    };

    if (body.id) {
      user.id = body.id;
    } else {
      user.id = nanoid();
    }

    if (body.password || body.username) {
      await auth.upsert({
        id: user.id,
        username: user.username,
        password: user.password,
      });
    }
    return store.upsert(TABLA, user);
  };

  const upsert = async (body) => {
    const user = {
      username: body.username,
      name: body.name,
    };
    if (body.id) {
      user.id = body.id;
    } else {
      user.id = nanoid();
    }

    if(body.password || body.username){
      await auth.upsert({
        id: user.id,
        username: user.username,
        password : body.password
      })
    }
    return store.upsert(TABLA, user);
  };

  return {
    list,
    get,
    upsert,
  };
};
