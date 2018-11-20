const requireOption = require("../common").requireOption;
const crypto = require("crypto");
/**
 * Checks if e-mail address is already registered
 * if not, creates user
 * else sets error message
 */

module.exports = function(objrepo) {
  const userModel = requireOption(objrepo, "userModel");

  return function(req, res, next) {
    if (
      typeof req.body === "undefined" ||
      typeof req.body.name === "undefined" ||
      typeof req.body.email === "undefined" ||
      typeof req.body.password === "undefined"
    ) {
      return next();
    }
    userModel.findOne(
      {
        email: req.body.email
      },
      function(err, result) {
        if (err || result !== null) {
          res.locals.error.push(
            "You already registered with this email address!"
          );
          return next();
        }

        if (req.body.name.length < 5) {
          res.locals.error.push(
            "The username should be at least 5 characters!"
          );
          return next();
        }

        //create user
        const user = new userModel();
        user.name = req.body.name;
        user.email = req.body.email;

        const hash = crypto.createHmac("sha256", req.body.password).digest('hex');
        user.password = hash;
        user.save(function(err) {
          //redirect to /login
          return res.redirect("/login");
        });
      }
    );
  };
};
