const { userArray } = require("./model")
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer")
const jwt = require('jsonwebtoken');

require('dotenv').config();

const config = {
    service: 'Yahoo',
    auth: {
        user: process.env.YAHOO_LOGIN,
        pass: process.env.YAHOO_APP_PASS
    }
}


console.log(config)
const transporter = nodemailer.createTransport(config)

// const pass = "moje tajne hasło"

const encryptPass = async (password) => {

    let encryptedPassword = await bcrypt.hash(password, 10);
    console.log({ encryptedPassword: encryptedPassword });
    return encryptedPassword
}

const sendMail = async (token) => {
    transporter.sendMail({
        from: "wiktor.orda@yahoo.com",
        to: "wiktor.orda@yahoo.com",
        subject: "subject",
        text: "text",
        html: `<b> Kliknij w poniższy link <br /> http://localhost:3000/api/user/confirm/${token} <br /> W celu potwierdzenia konta <br /> </b>`
    });
}

const createToken = async (userObj) => {
    const jwt = require('jsonwebtoken');
    let token = await jwt.sign(
        {
            name: userObj.name,
            email: userObj.email,
            anyData: "123"
        },
        process.env.SECRET_KEY, // powinno być w .env
        {
            expiresIn: "2m" // "1m", "1d", "24h"
        }
    );
    console.log({ token: token });
    return token
}


const verifyToken = async (token) => {

    try {
        let decoded = await jwt.verify(token, "verysecretkey")
        console.log({ decoded: decoded });
    }
    catch (ex) {
        console.log({ message: ex.message });
    }
}


const processToken = async (token) => {
    await verifyToken(token)
}

// processToken(token)



// encryptPass(pass)

module.exports = {
    getAll: (req) => {
        // delete require.cache[require.resolve("./fileController")];
        // let { imagesArray } = require("./fileController.js");
        // console.log(newImagesArray);
        console.log(imagesArray);
        return imagesArray;
    },
    registerUser: async (userData) => {
        let parsedUserData = JSON.parse(userData);
        let encryptedPass = await encryptPass(parsedUserData.password)
        let userObj = {
            id: userArray.length + 1,
            name: parsedUserData.name,
            lastName: parsedUserData.lastName,
            email: parsedUserData.email,
            confirmed: false,
            password: encryptedPass
        }
        console.log(userObj)
        userArray.push(userObj)
        let generatedToken = await createToken(userObj)
        try {
            await sendMail(generatedToken)
        }
        catch (e) {
            console.log(e)
        }

    },
    confirmAccount: async (token) => {
        console.log("token: " + token)
        await processToken(token)

    }
};