const express = require("express");
const {app,server} = require("./socket/socket")
const cors = require("cors")
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv")
dotenv.config();
const port = process.env.PORT;
const connectDB = require("./config/db");
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const messageRouter = require("./routes/messageRouter");


app.use(cors({
    origin: "https://realtimechatapp-frontend-42ta.onrender.com",
    credentials: true
}
))

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter)
app.use("/api/user",userRouter)
app.use("/api/message",messageRouter)

server.listen(port, () => {
    connectDB();
    console.log("Server working on port " + port)
})