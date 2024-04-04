const express = require("express");
const path = require("path");
const dotenv = require('dotenv');
const cors = require('cors');
const { Login, Register, FetchRides, GetUserData, AdminLogin, AdminDeleteUser, GetUserDataAsAdmin, fetchReviews, addReview, BuyTickets, getPackages } = require("./controllers/auth");

const publicDirectory = path.join(__dirname, "./public");
dotenv.config({ path: path.resolve(__dirname, '../.env') })
const app = express();

app.use(express.json());
app.set('view engine', 'hbs'); 
app.use(express.urlencoded({ extended: false })); 
app.use(express.json()); 
app.use(express.static(publicDirectory));
app.use(cors({
    origin: '*'
}))

app.post('/login', Login)
app.post('/signup', Register)
app.get('/rides', FetchRides)
app.post('/user', GetUserData)
app.post('/admin-login', AdminLogin)
app.post('/delete-user', AdminDeleteUser)
app.post('/get-user-as-admin', GetUserDataAsAdmin)
app.get('/fetch-review', fetchReviews)
app.post('/add-review', addReview)

//Start Server
app.listen(4000, () => {
    console.log("Server started on Port 4000");
})