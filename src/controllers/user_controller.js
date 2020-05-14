import jwt from 'jwt-simple';
import dotenv from 'dotenv';
import User from '../models/user_model';

dotenv.config({ silent: true });

export const signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
};

// eslint-disable-next-line consistent-return
export const signup = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send('You must provide email and password');
  }

  // TODO:
  // here you should do a mongo query to find if a user already exists with this email.
  // if user exists then return an error. If not, use the User model to create a new user.
  // Save the new User object
  // this is similar to how you created a Post
  // and then return a token same as you did in in signin
  User.findOne({ email })
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (!user) {
        const u = new User();
        u.email = email;
        u.password = password;
        u.save()
          .then((result) => {
            console.log(result);
            res.send({ token: tokenForUser(u) });
            // return res.json(result);
          })
          .catch((error) => {
            console.log(error);
            return res.status(500).json({ error });
          });
      } else {
        return res.status(500).json({ message: 'user already exists' });
      }
    })
    .catch((err) => {
      return res.status(500).json({ err });
    });
};

// encodes a new token for a user object
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
}
