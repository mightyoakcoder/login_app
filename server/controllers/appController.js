import UserModel from "../model/User.model.js"
import bcrypt from 'bcrypt';

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
                  bcrypt.hash(password, 10)
                      .then(hashedPassword => {
                          const user = new UserModel({
                              username,
                              password: hashedPassword,
                              profile: profile || '',
                              email
                          });

                          user.save()
                              .then(result => res.status(201).send({ msg: "User registered successfully" }))
                              .catch(error => {
                                  console.error("Error saving user:", error);
                                  res.status(500).send({ error: "Failed to save user" });
                              });
                      })
                      .catch(error => {
                          console.error("Error hashing password:", error);
                          res.status(500).send({ error: "Failed to hash password" });
                      });
              }
          })
          .catch(error => {
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
export async function login(req, res){
  res.json('login route');
}

/** GET: http://localhost:8080/api/user/example123 */
export async function getUser(req, res){
  res.json('getUser route');
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
export async function updateUser(req, res){
  res.json('updateUser route');
}

/** GET: http://localhost:8080/api/generateOTP */
export async function generateOTP(req, res){
  res.json('generateOTP route');
}


/** GET: http://localhost:8080/api/verifyOTP */
export async function verifyOTP(req, res){
  res.json('verifyOTP route');
}


// successfully redirect user when OTP is valid
/** GET: http://localhost:8080/api/createResetSession */
export async function createResetSession(req, res){
  res.json('createResetSession route');
}

// update the password when we have valid session
/** GET: http://localhost:8080/api/createResetSession */
export async function resetPassword(req, res){
  res.json('resetPassword route');
}