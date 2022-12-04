const passport = require("passport");
const passportJwt = require("passport-jwt");
const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;
const Customer = require("../models/customer");

passport.use(
  new StrategyJwt(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    function (jwtPayload, done) {
      return Customer.findOne({ where: { id: jwtPayload.id } })
        .then((customer) => {
          return done(null, customer);
        })
        .catch((err) => {
          return done(err);
        });
    }
  )
);
