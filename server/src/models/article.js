"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var articleSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    access: {
        type: String,
        enum: ["Basic", "Standard", "Premium"],
        required: true,
    },
});
var Article = mongoose_1.default.model("Article", articleSchema);
var article1 = new Article({
    title: "Basic Card",
    imageUrl: "https://www.kasandbox.org/programming-images/avatars/mr-pants-purple.png",
    content: "Professional",
    access: "Basic",
});
var article2 = new Article({
    title: "Standard 1",
    imageUrl: "https://www.kasandbox.org/programming-images/avatars/mr-pants-purple.png",
    content: "Professional",
    access: "Standard",
});
var article3 = new Article({
    title: "Standard 2",
    imageUrl: "https://www.kasandbox.org/programming-images/avatars/mr-pants-purple.png",
    content: "Professional",
    access: "Standard",
});
var article4 = new Article({
    title: "Premium",
    imageUrl: "https://www.kasandbox.org/programming-images/avatars/mr-pants-purple.png",
    content: "Professional",
    access: "Premium",
});
// Save articles to the database
article1.save();
article2.save();
article3.save();
article4.save();
exports.default = Article;
