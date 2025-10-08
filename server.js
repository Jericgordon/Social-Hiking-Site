import postsApi from "./routes/postsApi.js";
import express from "express"
const app = express();

app.listen(3000)

app.use(express.static("public"))

app.get("/api/posts", (req,res) => {
    console.log(postsApi.data);
    res.json(postsApi);
})

app.get("/external/gmaps", (req,res) => {
    console.log(postsApi.data);
    res.redirect("http://google.com")
})