const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accessToken = req.header("developerToken");

  if (!accessToken) return res.json({ error: "Developer not logged in!" });

  try {
    const validToken = verify(accessToken, "importantsecret");

    req.developer = validToken;

    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

module.exports = { validateToken };