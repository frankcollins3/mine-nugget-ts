const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const allUsers = prisma.miners.findMany

// Local Strategy for email-only authentication
passport.use(new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
        const allusers = await allUsers()        
        let me = allusers.find(us => us.email === email)     

      if (!me) {
        return done(null, false, { message: 'Gold To Be Mine. Mine To Be Gold' });
                                    //      'Dry Attempt. Try Dropping in Again'
      }

      const isPasswordValid = await bcrypt.compare(password, me.password);

      if (!isPasswordValid) {
        return done(null, false, { message: 'Dirt Login' });
      }

      return done(null, me);
    } catch (err) {
      return done(err);
    }
  }
));

// module.exports = passport;
export default passport
