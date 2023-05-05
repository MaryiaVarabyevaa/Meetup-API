import passport from "passport";
import { Strategy } from "passport-google-oauth2";
import userService from "../user/user.service";
import authService from "./auth.service";
import { Provider } from "@prisma/client";

const GoogleStrategy = Strategy;


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.CALLBACK_URL!,
      passReqToCallback: true
    },
    async (req, accessToken, refreshToken, profile, done) => {
      let tokens;
      const candidate = await userService.findUser(profile.emails?.[0].value);
      if (!candidate) {
        const [firstName, lastName] =  profile.displayName.split(' ');
        const newUser = {
          firstName,
          lastName,
          email: profile.emails?.[0].value,
          provider: Provider.GMAIL
        }
        tokens = await authService.signupWithGoogle(newUser);
      } else {
        tokens = await authService.loginWithGoogle(profile.emails?.[0].value);
      }
      done(null, tokens);
    }
  )
);

export { passport };