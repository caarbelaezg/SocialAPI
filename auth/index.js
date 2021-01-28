const jwt = require("jsonwebtoken");
const config = require("../config");
const error = require("../utils/error");
const secret = config.jwt.secret;

const sign = (data) => {
  try {
    const token = jwt.sign(
      { id: data.id, password: data.password, username: data.username },
      secret
    );
    return token;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const getToken = (auth) => {
  if (!auth) {
    throw new Error("no viene token");
  }
  if (auth.indexOf("Bearer ") === -1) {
    throw new Error("Formato inválido");
  }
  let token = auth.replace("Bearer ", "");
  return token;
};

const verify = (token) => {
  return jwt.verify(token, secret);
};

const decodeHeader = (req) => {
  const authorization = req.headers.authorization || "";
  const token = getToken(authorization);
  const decoded = verify(token);
  req.user = decoded;
  return decoded;
};

const check = {
  own: (req, owner) => {
    const decoded = decodeHeader(req);

    if (decoded.id !== owner) {
      throw error("You can not do this", 401);
    }
  },
};

module.exports = {
  sign,
  check,
};
