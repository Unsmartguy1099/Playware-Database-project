const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors()); //cors allow us to make request from our own front end to our api on same local machine
app.use(express.json());



// Routers 
const userRouter = require("./routes/User");
app.use("/users", userRouter);

const publisherRouter = require("./routes/Publisher");
app.use("/publishers", publisherRouter);

const developerRouter = require("./routes/Developer");
app.use("/developers", developerRouter);

const adminRouter = require("./routes/Admin");
app.use("/admin", adminRouter);

const gameRouter = require("./routes/Game");
app.use("/games", gameRouter);

const dlcRouter = require("./routes/Dlc");
app.use("/dlc", dlcRouter);

const subscriptionRouter = require("./routes/Subscription");
app.use("/subscriptions", subscriptionRouter);

const dealsRouter = require("./routes/Deals");
app.use("/deals", dealsRouter);

const redeemRouter = require("./routes/Redeem");
app.use("/redeems", redeemRouter);





app.listen(3001, () => {
    console.log("Your server is running on port 3001");
});