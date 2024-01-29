import mongoose, { mongo } from "mongoose";
const { Schema } = mongoose;

const articleSchema = new Schema({
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

const Article= mongoose.model("Article", articleSchema);


const article1 = new Article({
  title: "Basic Card",
  imageUrl: "https://www.kasandbox.org/programming-images/avatars/mr-pants-purple.png",
  content: "Professional",
  access: "Basic",
});

const article2 = new Article({
  title: "Standard 1",
  imageUrl: "https://www.kasandbox.org/programming-images/avatars/mr-pants-purple.png",
  content: "Professional",
  access: "Standard",
});

const article3 = new Article({
  title: "Standard 2",
  imageUrl: "https://www.kasandbox.org/programming-images/avatars/mr-pants-purple.png",
  content: "Professional",
  access: "Standard",
});

const article4 = new Article({
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


export default Article