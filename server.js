import postsApi from "./routes/postsApi.js";
import express from "express"

const PORT = process.env.PORT || 4444;

const app = express();

app.locals.username = '';


app.use(express.static("public"))


const PORT = process.env.PORT || 4444


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
}).on('error', (err) => {
    console.error('Failed to start server:', err);
});

app.use(express.static("public"))


app.get("/api/", (req, res) => {
    console.log("HELLO")
    res.send('hi')
})

app.get("/api/posts", (req,res) => {
    console.log(postsApi.data);
    res.json(postsApi);
})

app.get("/external/gmaps", (req,res) => {
    console.log(postsApi.data);
    res.redirect("http://google.com")
})
