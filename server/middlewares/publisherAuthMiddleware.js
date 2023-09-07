const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accessToken = req.header("publisherToken");

  if (!accessToken) return res.json({ error: "Publisher not logged in!" });

  try {
    const validToken = verify(accessToken, "importantsecret");

    req.publisher = validToken;

    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

module.exports = { validateToken };