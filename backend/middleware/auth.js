const jwt = require('jsonwebtoken');
const Student = require("../models/student");
const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    console.log("Authorization:",authorization)
    if (!authorization) {
        console.log("got error:401");
        return res.status(401).json({ error: "you must be logged in" });
    }

    const token = authorization.replace("Bearer ", "");
    console.log("Token received:", token);

    jwt.verify(token, JWT_SECRET, (err, payload) => {
        console.log('Payload:',payload)
        if (err) {
            console.log("Token verification failed:", err.message);
            return res.status(401).json({ error: "you must be logged in" });
        }

        const { _id } = payload;
        Student.findById(_id).then(userdata => {
            req.user = userdata;
            next();
        }).catch(error => {
            console.log("error:500", error);
            res.status(500).json({ error: "Internal server error" });
        });
    });
};
