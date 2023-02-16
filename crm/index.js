import express from "express";
import mongoose, {mongo} from "mongoose";
import bodyParser from "body-parser";
import routes from "./src/routes/crmRoutes";

const PORT = 3000;
const app = express();

/* MONGOOSE */
mongoose.set("strictQuery", false);
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/CRMdb", {useNewUrlParser: true});

/* BODY PARSER */
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/* ENDPOINTS */
routes(app);

app.get("/", (req, res) => {
    res.send(`node & express server is running on ${PORT}`);
});

/* SERVER */
app.listen(PORT, () => console.info(`server running: ${PORT}`));
