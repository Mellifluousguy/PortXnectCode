import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import axios from "axios";
import * as cheerio from "cheerio"
import notificationRoutes from "./routes/notificationRoutes.js";
import http from 'http';
import { Server as SocketServer } from 'socket.io'
import chatRoutes from './routes/chatRoutes.js'

import projectRouter from "./routes/projectRoutes.js";
import connectDB from "./config/mongodb.js";
import authRouter from './routes/authRoutes.js';
import userRouter from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import feedRouter from './routes/feedRouter.js';

const app = express();
const port = process.env.PORT || 4000;
connectDB();

const allowedOrigins = ['http://localhost:5173', 'https://portxnect.onrender.com'];

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true
}));


// API Endpoints
app.get('/', (req, res) => res.send("API working dude!!"));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/projects', projectRouter);
app.use("/api/admin", adminRoutes);
app.use("/api/notifications", notificationRoutes);
app.use('/api/feed', feedRouter);


// Image Endpoint
app.get("/api/screenshot", async (req, res) => {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: "URL is required" });

    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        let ogImage = $('meta[property="og:image"]').attr("content");

        if (!ogImage) {
            const images = $("img").map((i, el) => {
                let imgSrc = $(el).attr("src");
                if (imgSrc && !imgSrc.startsWith("http")) {
                    imgSrc = new URL(imgSrc, url).href;
                }
                return imgSrc;
            }).get();

            if (images.length > 0) {
                const randomIndex = Math.floor(Math.random() * images.length);
                ogImage = images[randomIndex];
            }
        }

        if (!ogImage) {
            const thumUrl = `https://image.thum.io/get/width/300/https://${new URL(url).hostname}`;
            try {
                await axios.head(thumUrl);
                ogImage = thumUrl;
            } catch (err) {
                if (err.response && err.response.status === 403) {
                    const fallbackUrl = `https://api.apiflash.com/v1/urltoimage?access_key=807608c92d1245a79062e61358470669&url=${encodeURIComponent(url)}&width=300`;
                    ogImage = fallbackUrl;
                } else {
                    throw err;
                }
            }
        }

        res.json({ ogImage });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch image", details: error.message });
    }
});



const server = http.createServer(app);

const io = new SocketServer(server, {
    cors: {
        origin: allowedOrigins,
        credentials: true
    }
});

const onlineUsers = new Map();

io.on("connection", (socket) => {
    
    socket.on("userConnected", (userId) => {
        onlineUsers.set(userId, socket.id);
        io.emit('onlineUsers', Array.from(onlineUsers.keys()));
    })
    
    socket.on("joinRoom", (roomId) => {
        socket.join(roomId);
    });

    socket.on("sendMessage", ({ roomId, message }) => {
        io.to(roomId).emit("receiveMessage", message);
    });

    socket.on("seenMessage", ({ roomId }) => {
        io.to(roomId).emit("messageSeen");
    });

    socket.on("disconnect", () => {
        onlineUsers.forEach((value, key) => {
            if (value === socket.id) {
                onlineUsers.delete(key);
                io.emit('onlineUsers', Array.from(onlineUsers.keys()));
            }
        });
    });
});



app.use("/api/chat", chatRoutes);


server.listen(port, () => console.log(`Server started on PORT: ${port}`));
