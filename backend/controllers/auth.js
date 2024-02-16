const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../db");

exports.FetchRides = async (req, res) => {
    console.log("Reached request")

    db.query('SELECT * FROM RIDES', (err, results) => {
        if(err) return res.send("AN ERROR HAS OCCURED")

        return res.send(results)
    })
}

exports.Register = (req, res) => {
    console.log(req.body);

    const {userid,name,email,Number,password,passwordConfirm,} = req.body;

    db.query(
        "SELECT UserID FROM users WHERE UserID = ?",
        [userid],
        async (error, results) => {
            console.log(results);

            if (error) {
                console.log(error);
            }

            if(!results) {
                return res.send("NOT FOUND")
            }

            if (results.length > 0) {
                return res.status(400).send("That Username is already taken :(");
            } else if (password !== passwordConfirm) {
                return res.status(400).send("Password does not match");
            }

            let hashedPassword = await bcrypt.hash(password, 8);
            console.log(hashedPassword);

            db.query(
                "INSERT INTO users SET ?",
                {
                    Number: Number,
                    UserID: userid,
                    Password: hashedPassword,
                    Email: email,
                    Name: name,
                },
                (error, results) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(results);
                        return res.status(400).send("User Registered");
                    }
                }
            );
        }
    );
};


exports.Login = async (req, res) => {
    try {
        const { userid, password } = req.body;

        if (!userid || !password) {
            return res.status(400).send("Please provide userid and password");
        }

        db.query(
            "SELECT * FROM users WHERE UserID = ?",
            [userid],
            async (error, results) => {
                console.log(results);

                if(!results) {
                    return res.status(404).send("Not found")
                }

                else if (results.length <= 0) {
                    return res.status(404).send("NOT FOUND")
                }

                else {
                    if(!( await bcrypt.compare(password, results[0].Password ))) return res.send("WRONG PASSWORD")

                    const id = results[0].UserID;
                    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                        expiresIn: "1h",
                    });

                    console.log("The token is: " + token);
                    res.status(200).send({
                        user: results[0],
                        success: true,
                        token: token,
                    });
                }
            }
        );
    } catch (error) {
        console.log(error);
    }
};


exports.GetUserData = (req, res) => {
    const { jwtToken } = req.body

    jwt.verify(jwtToken, process.env.JWT_SECRET, (err, decoded) => {
        if(err) return res.send('User not logged in')

        const { id } = decoded
        db.query('SELECT * FROM users WHERE UserID = ?', [id], (err, result) => {
            if(err) return res.send('User not found')

            return res.send(result)
        })
    })
}
