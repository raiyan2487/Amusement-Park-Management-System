const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../db");

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

exports.FetchRides = async (req, res) => {
    console.log("Reached request")

    db.query('SELECT * FROM RIDES', (err, results) => {
        if(err) return res.send("AN ERROR HAS OCCURED")

        return res.send(results)
    })
}

exports.GetUserDataAsAdmin = (req, res) => {
    try {
        const { userId, adminToken } = req.body;

        if (!userId || !adminToken) {
            return res.status(400).send("Please provide a valid user ID");
        }

        jwt.verify(adminToken, process.env.JWT_ADMIN_SECRET, (err, decoded) => {
            console.log("hi")
            if(err) return res.send("USER NOT ADMIN")

            db.query(
                'SELECT * FROM users WHERE UserID = ?',
                [userId],
                (error, results) => {
                    if (error) {
                        console.log(error);
                        return res.status(500).send("Internal Server Error");
                    } else {
                        if(results.length === 0) {
                            console.log('not found')
                            return res.status(404).send("not-found")
                        }

                        console.log('found')
                        return res.send(results)
                    }
                }
            );
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
}

exports.Register = (req, res) => {
        console.log(req.body);
    
        const {
            userid,
            name,
            email,
            Number,
            password,
            passwordConfirm,
        } = req.body;
    
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

exports.AdminLogin = async (req, res) => {
    try {
        const { userid, password } = req.body;

        if (!userid || !password) {
            return res.status(400).send("Please provide UserID and Password");
        }

        db.query(
            "SELECT * FROM admin WHERE UserID = ?",
            [userid],
            async (error, results) => {
                if(error) return res.send("AN ERROR HAS OCCURED")
                console.log(results);
    
                if(!results) {
                    return res.status(404).send("Not found")
                }

                else if (results.length <= 0) {
                    return res.status(404).send("NOT FOUND")
                }

                else {
                    if(!( await bcrypt.compare(password, results[0].Password))) return res.send("WRONG PASSWORD")

                    const id = results[0].UserID;
                    const token = jwt.sign({ id }, process.env.JWT_ADMIN_SECRET, {
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

exports.AdminDeleteUser = (req, res) => {
    try {
        const { userId, adminToken } = req.body;

        if (!userId || !adminToken) {
            return res.status(400).send("Please provide a valid user ID");
        }

        jwt.verify(adminToken, process.env.JWT_ADMIN_SECRET, (err, decoded) => {
            if(err) return res.send("USER NOT ADMIN")

            db.query(
                "DELETE FROM users WHERE UserID = ?",
                [userId],
                (error, results) => {
                    if (error) {
                        console.log(error);
                        return res.status(500).send("Internal Server Error");
                    } else {
                        if (results.affectedRows > 0) {
                            console.log(results);
                            return res.status(200).send("User deleted successfully");
                        } else {
                            return res.status(404).send("User not found");
                        }
                    }
                }
            );
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
};

exports.fetchReviews = async (req, res) => {
    db.query('SELECT * FROM REVIEWS', (err, results) => {
        if(err) return res.send("AN ERROR HAS OCCURED")
        
        return res.send(results)
    })
}

//Rohan
exports.addReview = (req, res) => {
    try {
        const {UserUserID, Review} = req.body;
        
        if (!UserUserID || !Review) {
            console.log(req.body)
            
            return res.status(400).send('Please enter all the information');
        }

        const currentDate = new Date();

        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');

        const ReviewDate = `${year}-${month}-${day}`;
        
        jwt.verify(UserUserID, process.env.JWT_SECRET, function(err, decoded) {
            if(err) return res.send({err: 'User not verified'});

            db.query("INSERT INTO reviews (UserUserID, ReviewDate, Review) VALUES (?, ?, ?)",
            [decoded.id, ReviewDate, Review],
            (updateError, updateResults) => {
                if (updateError) {
                    console.log(updateError);
                    return res.status(500).send('Internal Server Error');

                }

            })
        })
    }catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }

};

exports.BuyTickets = (req, res) => {
    try {
        const { userid, packageName, amountPaid, transactionId } = req.body;

        if (!userid || !packageName || !amountPaid || !transactionId) {
            console.log(req.body)

            return res.status(400).send("Please fill out all the required fields");
        }

        jwt.verify(userid, process.env.JWT_SECRET, function(err, decoded) {
            if(err) return res.send({ err: 'user not verified' });

            db.query(
                "UPDATE packages SET AvailableTickets = AvailableTickets - 1 WHERE PackageName = ?",
                [packageName],
                (updateError, updateResults) => {
                    if (updateError) {
                        console.log(updateError);
                        return res.status(500).send("Internal Server Error");
                    }

                db.query(
                    "INSERT INTO tickets (UserUserID, Type, Price, TicketID) VALUES (?, ?, ?, ?)",
                    [decoded.id, packageName, amountPaid, transactionId],
    
                    (error, results) => {
                        if (error) {
                            console.log(error);
                            return res.status(500).send("Internal Server Error");
                        } else {
                            console.log(results);
                            return res.status(200).send("Ticket purchased successfully");
                        }
                    }
                );
            })

        }
    );

    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
};
exports.getPackages = (req, res) => {
    db.query('SELECT * FROM packages', (err, result) => {
        if(err) return res.send("AN ERROR HAS OCCURED")

        return res.send(result)
    })
}

//Rohan

exports.AdminRemoveRides = (req, res) => {
    const { rideName, adminToken } = req.body;
        
    if (!rideName || !adminToken) {
        return res.status(400).json({ error: 'Write the name of the ride properly or admin is not verified' });
    }

    jwt.verify(adminToken, process.env.JWT_ADMIN_SECRET, (err, decoded) => {
        if(err) return res.send("USER NOT ADMIN")

        const sql = 'DELETE FROM rides WHERE Name = ?'
        
        db.query(sql, [rideName], (error, results) => {
            if (error) {
                console.error('Error deleting ride:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Ride not found' });
            }

            res.status(200).json({ message: 'Ride deleted successfully' });
        });
    })
};  

exports.AdminAddRides = (req, res) => {
    const { rideName, rideDescription, rideImageLink, adminToken } = req.body;
    let price = 200

    console.log(req.body)
  
    if (!rideName || !rideDescription || !price || !rideImageLink) {
      return res.status(400).json({ error: 'All parameters are required' });
    }

    jwt.verify(adminToken, process.env.JWT_ADMIN_SECRET, (err, decoded) => {
        if(err) return res.send("USER IS NOT ADMIN")

        const sql = 'INSERT INTO rides (Name, Description, Price, image) VALUES (?, ?, ?, ?)';
        const values = [rideName, rideDescription, price, rideImageLink];
  

        db.query(sql, values, (error, results) => {
            if (error) {
                console.error('Error adding ride:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        
            res.status(201).json({ message: 'Ride added successfully', rideId: results.insertId });
        });
    })
  };