import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
import { User } from "../entity/User";

interface JWT_Payload {
  id: number;
  email: string;
  role: string;
}

const opts: Record<string, string> = {};
opts.secretOrKey = process.env.SECRET_JWT_TOKEN;

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

passport.use(
  new JwtStrategy(opts, async (jwt_payload: JWT_Payload, done: Function) => {
    try {
      const user = await User.findOneBy({ id: jwt_payload.id });
      delete user.password;
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);
