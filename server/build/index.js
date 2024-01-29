"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_1 = __importDefault(require("./routes/auth"));
var subs_1 = __importDefault(require("./routes/subs"));
var articles_1 = __importDefault(require("./routes/articles"));
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(function () {
    console.log("Connected to mongodb");
    var app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    app.use("/auth", auth_1.default);
    app.use("/subs", subs_1.default);
    app.use("/articles", articles_1.default);
    app.listen(8080, function () {
        console.log("Now listening to port 8080");
    });
})
    .catch(function (error) {
    console.log({ error: error });
    throw new Error(error);
});
