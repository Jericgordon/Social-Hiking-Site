import postsApi from "./routes/postsApi.js";
import express from "express"
const app = express();

app.listen(3000)

app.use(express.static("public"))

app.get("/api/users", (req,res) => {
    console.log(postsApi.data);
    res.json(postsApi);
})