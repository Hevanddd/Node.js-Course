import mongoose from "mongoose";

const uri: string = "mongodb://root:nodegmp@localhost:27017/mydatabase";

mongoose.set("toJSON", {
  virtuals: true,
  transform: (doc, converted) => {
    delete converted._id;
  },
});

export function connectToDb() {
  mongoose
    .connect(uri)
    .then(() => {
      console.log("Succesfully connected to MongoDB");
    })
    .catch((error: Error) => {
      console.log(`Error connecting to MongoDB: ${error}`);
    });
}
