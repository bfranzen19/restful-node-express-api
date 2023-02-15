import express from "express";

const app = express();
const PORT = 3000;

/* ENDPOINTS */
app.get("/", (req, res) => {
    res.send(`node & express server is running on ${PORT}`);
});

/* SERVER */
app.listen(PORT, () => console.info(`server running: ${PORT}`));
