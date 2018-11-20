const requireOption = require("../common").requireOption;
const crypto = require("crypto");
/**
 * Checks user credentials from model
 * if valid - redirects to '/'
 * else error message
 */

module.exports = function(objrepo) {
  const userModel = requireOption(objrepo, "userModel");
  return function(req, res, next) {
    if (
      typeof req.body === "undefined" ||
      typeof req.body.email === "undefined" ||
      typeof req.body.password === "undefined"
    ) {
      return next();
    }

    const user = userModel
      .findOne({
        email: req.body.email
      })
      .exec(function(err, result) {
        if (err || !result) {
          res.locals.error.push("Your email address is not registered!");
          return next();
        }

        if (
          crypto.createHmac("sha256", req.body.password).digest('hex') !== result.password
        ) {
          res.locals.error.push("Incorrect password!");
          return next();
        } else {
          req.session.userid = result._id;
          return res.redirect("/");
        }
      });
  };
};
