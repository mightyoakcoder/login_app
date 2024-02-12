import UserModel from "../model/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ENV from "../config.js";

/** middleware for verify user */
export async function verifyUser(req, res, next) {
  try {
    const { username } = req.method == "GET" ? req.query : req.body;

    // check the user existance
    let exist = await UserModel.findOne({ username });
    if (!exist) return res.status(404).send({ error: "Can't find user!" });
    next();
  } catch (error) {
    return res.status(404).send({ error: "Authentication Errore" });
  }
}
/** POST: http://localhost:8080/api/register 
 * @param : {
  "username" : "example123",
  "password" : "admin123",
  "email": "example@gmail.com",
  "firstName" : "bill",
  "lastName": "william",
  "mobile": 8009860560,
  "address" : "Apt. 556, Kulas Light, Gwenborough",
  "profile": ""
}
*/
export async function register(req, res) {
  try {
    const { username, password, profile, email } = req.body;

    const existUsername = UserModel.findOne({ username });
    const existEmail = UserModel.findOne({ email });

    Promise.all([existUsername, existEmail])
      .then(([existingUsername, existingEmail]) => {
        if (existingUsername) {
          throw new Error("Username already exists");
        }
        if (existingEmail) {
          throw new Error("Email already exists");
        }

        if (password) {
          bcrypt
            .hash(password, 10)
            .then((hashedPassword) => {
              const user = new UserModel({
                username,
                password: hashedPassword,
                profile: profile || "",
                email,
              });

              user
                .save()
                .then((result) =>
                  res.status(201).send({ msg: "User registered successfully" })
                )
                .catch((error) => {
                  console.error("Error saving user:", error);
                  res.status(500).send({ error: "Failed to save user" });
                });
            })
            .catch((error) => {
              console.error("Error hashing password:", error);
              res.status(500).send({ error: "Failed to hash password" });
            });
        }
      })
      .catch((error) => {
        console.error("Registration error:", error);
        res.status(500).send({ error: error.message });
      });
  } catch (error) {
    console.error("Catch block error:", error);
    res.status(500).send({ error: error.message });
  }
}

/** POST: http://localhost:8080/api/login
* @param : {
 "username" : "example123",
 "password" : "admin123"
}
*/
export async function login(req, res) {
  const { username, password } = req.body;

  try {
    UserModel.findOne({ username })
      .then((user) => {
        bcrypt
          .compare(password, user.password)
          .then((passwordCheck) => {
            if (!passwordCheck)
              return res.status(400).send({ error: "Don't have password" });

            // create jwt token
            const token = jwt.sign(
              {
                userId: user._id,
                username: user.username,
              },
              ENV.JWT_SECRET,
              { expiresIn: "24h" }
            );

            return res.status(200).send({
              msg: "Login Successfull...!",
              username: user.username,
              token,
            });
          })
          .catch((error) => {
            return res.status(400).send({ error: "Password does not match" });
          });
      })
      .catch((error) => {
        return res.status(404).send({ error: "Username not Found" });
      });
  } catch (error) {
    return res.status(500).send({ error });
  }
}

/** GET: http://localhost:8080/api/user/example123 */
export async function getUser(req, res) {
  const { username } = req.params;

  try {
    if (!username) return res.status(501).send({ error: "Invalid Username" });

    UserModel.findOne({ username })
      .then((user) => {
        if (!user) {
          return res.status(501).send({ error: "Couldn't Find the User" });
        }

        /** remove password from user */
        // mongoose returns unnecessary data with object so convert it into JSON
        const { password, ...rest } = Object.assign({}, user.toJSON());

        return res.status(201).send(rest);
      })
      .catch((err) => {
        return res.status(500).send({ err });
      });
  } catch (error) {
    return res.status(404).send({ error: "Cannot Find User Data" });
  }
}

/** PUT: http://localhost:8080/api/updateuser 
 * @param: {
  "id" : "<userid>"
}
body: {
    firstName: '',
    address : '',
    profile : ''
}
*/
export async function updateUser(req, res) {
  res.json("updateUser route");
}

/** GET: http://localhost:8080/api/generateOTP */
export async function generateOTP(req, res) {
  res.json("generateOTP route");
}

/** GET: http://localhost:8080/api/verifyOTP */
export async function verifyOTP(req, res) {
  res.json("verifyOTP route");
}

// successfully redirect user when OTP is valid
/** GET: http://localhost:8080/api/createResetSession */
export async function createResetSession(req, res) {
  res.json("createResetSession route");
}

// update the password when we have valid session
/** GET: http://localhost:8080/api/createResetSession */
export async function resetPassword(req, res) {
  res.json("resetPassword route");
}
