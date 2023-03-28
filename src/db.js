import mongoose from "mongoose";
import config from "./config.js";

const optionsDB = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useFindAndModify: false,
  // useCreateIndex: true,
};

(async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(config.MONGODB_URI, optionsDB);
    console.log(`DB is connected`);
  } catch (err) {
    console.error(err);
  }
})();
