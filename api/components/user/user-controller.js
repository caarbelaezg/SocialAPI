const TABLA = "user";
const auth = require("../auth");
const { nanoid } = require("nanoid");

module.exports = function (injectedStore) {
  let store = injectedStore;

  if (!store) {
    store = require("../../../store/dummy");
  }

  const list = () => {
    return store.list(TABLA);
  };

  const get = async (id) => {
    return store.get(TABLA, id);
  };

  const upsert = async (table, body) => {
    const user = {
      username: body.username,
      name: body.name,
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
        password: body.password,
      });
    }
    return store.upsert(table, user);
  };

  const follow = (from, to) => {
    return store.upsert(TABLA + "_follow", { user_from: from, user_to: to });
  };

  const following = async (user) => {
    const join = {};
    join[TABLA] = "user_to"; // {user: "user_to"}
    const query = { user_from: user };
    return await store.query(TABLA + "_follow", query, join);
  };

  return {
    list,
    get,
    upsert,
    follow,
    following,
  };
};
