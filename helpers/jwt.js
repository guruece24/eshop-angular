var { expressjwt: jwt } = require("express-jwt");

function authJwt(){
  const secret = process.env.secret;

  return jwt({
    secret,
    algorithms: ["HS256"]
  });
}

module.exports = authJwt;



// var { expressjwt: jwt } = require("express-jwt");
// // or ES6
// // import { expressjwt, ExpressJwtRequest } from "express-jwt";

// app.get(
//   "/protected",
//   jwt({ secret: "shhhhhhared-secret", algorithms: ["HS256"] }),
//   function (req, res) {
//     if (!req.auth.admin) return res.sendStatus(401);
//     res.sendStatus(200);
//   }
// );