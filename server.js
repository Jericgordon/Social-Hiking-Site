import express from "express"

const PORT = process.env.PORT || 4444;

const app = express();

app.use(express.static("public"))

app.get("/api/", (req, res) => {
    console.log("HELLO")
    res.send('hi')
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
}).on('error', (err) => {
    console.error('Failed to start server:', err);
});
