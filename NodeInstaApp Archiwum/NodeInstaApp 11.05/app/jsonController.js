const mongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID;


dbConnect = async () => {
    return new Promise((resolve, reject) => {
        try {
            mongoClient.connect("mongodb://localhost/wiktor_orda", (err, db) => {
                if (err) resolve(err)
                else {
                    console.log("connected to mongodb!");
                    resolve(db);
                }
            })

        }
        catch (error) {
            reject(error)
        }
    })
}

module.exports = dbConnect