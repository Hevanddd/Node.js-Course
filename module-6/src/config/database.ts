import mongoose from "mongoose";

const uri: string = "mongodb://root:nodegmp@localhost:27017/mydatabase";

mongoose.set("toJSON", {
  virtuals: true,
  transform: (doc, converted) => {
    delete converted._id;
  },
});

export function connectToDb() {
  const { MONGO_URI } = process.env;
  if (!MONGO_URI) {
    console.log("Please provide DataBase URI to connect. exiting now...");
    process.exit(1);
  }

  mongoose
    .connect(uri)
    .then(() => {
      console.log("Succesfully connected to MongoDB");
    })
    .catch((error: Error) => {
      console.log(`Error connecting to MongoDB: ${error}`);
    });
}
