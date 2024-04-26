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

// Nafees
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

// Nafees
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


// Nafees
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

// Nafees
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

exports.getPackages = async (req, res) => {
    db.query('SELECT * FROM packages', (err, results) => {
        if(err) return res.send("AN ERROR HAS OCCURED")
        
        return res.send(results)
    })
}

// Nafees
exports.AdminAddPackage = (req, res) => {
    try {
        const { packageId, packageName, packageDetails, availableTickets, adminToken, price } = req.body;

        if (!packageId || !packageName || !packageDetails || !availableTickets || !adminToken || !price) {
            return res.status(400).send("Please provide all the required information");
        }

        jwt.verify(adminToken, process.env.JWT_ADMIN_SECRET, (err, decoded) => {
            if(err) return res.send("USER NOT ADMIN")

            db.query(
                "INSERT INTO packages (PackageID, PackageName, PackageDetails, AvailableTickets, Price) VALUES (?, ?, ?, ?, ?)",
                [packageId, packageName, packageDetails, availableTickets, price],
                (error, results) => {
                    if (error) {
                        console.log(error);
                        return res.status(500).send("Internal Server Error");
                    } else {
                        console.log(results);
                        return res.status(200).send("Package added successfully");
                    }
                }
            );
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
};

//Nafees
exports.AdminRemovePackage = (req, res) => {
    try {
        const { packageId, adminToken } = req.body;

        if (!packageId || !adminToken) {
            return res.status(400).send("Please provide a valid package ID");
        }

        jwt.verify(adminToken, process.env.JWT_ADMIN_SECRET, (err, decoded) => {
            if(err) return res.send("USER NOT ADMIN")

            db.query(
                "DELETE FROM packages WHERE PackageID = ?",
                [packageId],
                (error, results) => {
                    if (error) {
                        console.log(error);
                        return res.status(500).send("Internal Server Error");
                    } else {
                        if (results.affectedRows > 0) {
                            console.log(results);
                            return res.status(200).send("Package deleted successfully");
                        } else {
                            return res.status(404).send("Package not found");
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

// Nafees
exports.AdminUpdatePackage = (req, res) => {
    console.log('Got request')

    try {
        const { packageId, packageName, packageDetails, availableTickets, adminToken, price } = req.body;

        if (!packageId || !adminToken || !packageDetails || !availableTickets || !adminToken || !price) {
            console.log('NO data')
            return res.status(400).send("Please provide a valid package ID and admin token");
        }

        jwt.verify(adminToken, process.env.JWT_ADMIN_SECRET, (err, decoded) => {
            if(err) console.log("admin-no-error")
            if (err) return res.send("USER NOT ADMIN");

            db.query(
                "SELECT * FROM packages WHERE PackageID = ?",
                [packageId],
                (selectError, selectResults) => {
                    if (selectError) {
                        console.log(selectError);
                        return res.status(500).send("Internal Server Error");
                    } else {
                        if (selectResults.length === 0) {
                            return res.status(404).send("Package not found");
                        }

                        
                        db.query(
                            "UPDATE packages SET PackageName = ?, PackageDetails = ?, AvailableTickets = ?, Price = ? WHERE PackageID = ?",
                            [packageName, packageDetails, availableTickets, price, packageId],
                            (updateError, updateResults) => {
                                if (updateError) {
                                    console.log(updateError);
                                    return res.status(500).send("Internal Server Error");
                                } else {
                                    console.log(updateResults);
                                    return res.status(200).send("Package updated successfully");
                                }
                            }
                        );
                    }
                }
            );
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
};



// Nafees
exports.BuyTickets = (req, res) => {
    try {
        const { userid, packageName, amountPaid, transactionId } = req.body;

        if (!userid || !packageName || !amountPaid || !transactionId) {
            console.log(req.body)

            return res.status(400).send("Please fill out all the required fields");
        }

        console.log(userid + "    Here");

        jwt.verify(userid, process.env.JWT_SECRET, function(err, decoded) {
            if(err) console.log("error here")
            if(err) return res.send({ err: 'user not verified' });

            db.query(
                "UPDATE packages SET AvailableTickets = AvailableTickets - 1 WHERE PackageName = ?",
                [packageName],
                (updateError, updateResults) => {
                    if (updateError) {
                        console.log(updateError);
                        console.log("error here  111")
                        return res.status(500).send("Internal Server Error");
                    }

                    console.log("Reached code here")

                db.query("SELECT PackageDetails FROM packages WHERE PackageName = ?", [packageName], (err, result) => {
                    if(err) res.status(500).send("INTERNAL SERVER ERROR")

                    let packageDetails = result[0].PackageDetails;

                    db.query(
                        "INSERT INTO tickets (UserUserID, Type, Price, TicketID, PackageDetails) VALUES (?, ?, ?, ?, ?)",
                        [decoded.id, packageName, amountPaid, transactionId, packageDetails],
        
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
            })

        }
    );

    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
};


// Nafees
exports.createCustomPackage = (req, res) => {
    const { price, rides, ticketCount, transactionId } = req.body;

    if(!price || !rides || !ticketCount || !transactionId) return res.status(400).send("Please provide data!")
    
    jwt.verify(req.body.token, process.env.JWT_SECRET, async (err, decoded) => {
        if(err) return res.json('NOT LOGGED IN')
        let doneCount = 0;
        let total = 0;

        await rides.map((ride, i) => {
            db.query('SELECT Price FROM RIDES WHERE Name = ?', [ride], (err, result) => {
                if(err) return res.status(500).send("SERVER ERROR")
                if(result.length <= 0) return res.status(400).send("Incorrect Data")

                total += result[0].Price * ticketCount[i]
                doneCount ++;

                if(doneCount >= ticketCount.length) {
                    if(price == total) {
                        const ticketId = transactionId;

                        db.query(
                            "SELECT MAX(Type) AS MaxPackageID FROM tickets WHERE Type LIKE 'Custom%'",
                            (packageError, packageResults) => {
                                if (packageError) {
                                    console.log(packageError);
                                    return res.status(500).send("Internal Server Error");
                                }
            
                                let packageId = 1;
                                if (packageResults.length > 0 && packageResults[0].MaxPackageID) {
                                    const maxPackageId = parseInt(packageResults[0].MaxPackageID.replace('Custom', ''));
                                    packageId = maxPackageId + 1;
                                }

                                console.log(rides)
                                let details = ""

                                for(let i = 0; i < rides.length; i++) {
                                    details += rides[i] + ` (${ticketCount[i]}), `
                                }

                                details = details.slice(0, details.length - 2)
                                console.log(details)
            
                                db.query(
                                    "INSERT INTO tickets (UserUserID, Type, Price, TicketID, PackageDetails) VALUES (?, ?, ?, ?, ?)",
                                    [decoded.id, `Custom ${packageId}`, total, ticketId, details],
                                    (ticketError) => {
                                        if (ticketError) {
                                            console.log(ticketError);
                                            return res.status(500).send("Internal Server Error");
                                        }
            
                                        return res.status(200).json({ success: true })
                                    }
                                );
                            }
                        );
                    }
                }
            });
        });
    })
}
