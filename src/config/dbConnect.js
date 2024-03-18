import mongoose, {mongo} from "mongoose";

async function connectDatabase() {
  mongoose.connect(process.env.DB_URL);

  return mongoose.connection;
}

export default connectDatabase;