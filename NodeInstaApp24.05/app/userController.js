const { userArray } = require("./model");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const config = {
  service: "Yahoo",
  auth: {
    user: process.env.YAHOO_LOGIN,
    pass: process.env.YAHOO_APP_PASS,
  },
};

console.log(config);
const transporter = nodemailer.createTransport(config);

// const pass = "moje tajne hasło"

const encryptPass = async (password) => {
  let encryptedPassword = await bcrypt.hash(password, 10);
  console.log({ encryptedPassword: encryptedPassword });
  return encryptedPassword;
};
const decryptPass = async (userpass, encrypted) => {
  let decrypted = await bcrypt.compare(userpass, encrypted);
  console.log(decrypted);
  return decrypted;
};

const sendMail = async (token) => {
  transporter.sendMail({
    from: "wiktor.orda@yahoo.com",
    to: "wiktor.orda@yahoo.com",
    subject: "subject",
    text: "text",
    html: `<b> Kliknij w poniższy link <br /> http://localhost:3000/api/user/confirm/${token} <br /> W celu potwierdzenia konta <br /> </b>`,
  });
};

const createToken = async (userObj) => {
  const jwt = require("jsonwebtoken");
  let token = await jwt.sign(
    {
      id: userArray.length,
      name: userObj.name,
      email: userObj.email,
      anyData: "123",
    },
    process.env.SECRET_KEY, // powinno być w .env
    {
      expiresIn: "5m", // "1m", "1d", "24h"
    }
  );
  console.log({ token: token });
  return token;
};

const verifyToken = async (token) => {
  try {
    let decoded = await jwt.verify(token, "verysecretkey");
    console.log({ decoded: decoded });
    return decoded;
  } catch (ex) {
    console.log({ message: ex.message });
  }
};

const processToken = async (token) => {
  return await verifyToken(token);
};

// processToken(token)

// encryptPass(pass)

module.exports = {
  getAll: (req) => {
    // delete require.cache[require.resolve("./fileController")];
    // let { imagesArray } = require("./fileController.js");
    // console.log(newImagesArray);
    console.log(userArray);
    return userArray;
  },
  registerUser: async (userData) => {
    let parsedUserData = JSON.parse(userData);
    let encryptedPass = await encryptPass(parsedUserData.password);
    let userObj = {
      id: userArray.length + 1,
      name: parsedUserData.name,
      lastName: parsedUserData.lastName,
      email: parsedUserData.email,
      confirmed: false,
      password: encryptedPass,
    };
    console.log(userObj);
    userArray.push(userObj);
    let generatedToken = await createToken(userObj);
    try {
      await sendMail(generatedToken);
    } catch (e) {
      console.log(e);
    }
  },
  confirmAccount: async (token) => {
    let decodedToken = await processToken(token);
    console.log("token: " + token);
    console.log(decodedToken);
    const found = userArray.find((user) => user.id == decodedToken.id);
    console.log(found);
    found.confirmed = true;
  },
  loginUser: async (userData) => {
    let parsedUserData = JSON.parse(userData);

    const foundUser = userArray.find(
      (user) => user.email == parsedUserData.email
    );
    console.log(foundUser);
    let passMatch = await decryptPass(
      parsedUserData.password,
      foundUser.password
    );
    if (passMatch) {
      console.log("hasło się zgadza");
    }
  },
};
