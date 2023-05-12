import dotenv from "dotenv";
import passport from 'passport';
import { Strategy } from "passport-google-oauth2";
import { Provider } from "../../db/index";
import userService from '../user/user.service';
import authService from './auth.service';


(process.env.NODE_ENV !== 'production') ?
  dotenv.config({ path: '.development.env' }) : dotenv.config({ path: '.production.env' });

const GoogleStrategy = Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.CALLBACK_URL!,
      passReqToCallback: true
    },
    async (_req: unknown, _accessToken: string, _refreshToken: string, profile: any, done: (error: any, user?: any, info?: any) => void) => {
      let tokens;
      const candidate = await userService.findUser(profile.emails?.[0].value);
      if (!candidate) {
        const [firstName, lastName] = profile.displayName.split(' ');
        const newUser = {
          firstName,
          lastName,
          email: profile.emails?.[0].value,
          provider: Provider.GMAIL
        };
        tokens = await authService.signupWithGoogle(newUser);
      } else {
        tokens = await authService.loginWithGoogle(profile.emails?.[0].value);
      }
      done(null, tokens);
    }
  )
);

export { passport };
