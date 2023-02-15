import express from "express";
import routes from "./src/routes/crmRoutes";

const PORT = 3000;
const app = express();
routes(app);

/* ENDPOINTS */
app.get("/", (req, res) => {
    res.send(`node & express server is running on ${PORT}`);
});

/* SERVER */
app.listen(PORT, () => console.info(`server running: ${PORT}`));
