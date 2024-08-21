import mongoose from "mongoose";
import { config as configDotenv } from "dotenv";

configDotenv();

const dbConnect = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }
    return mongoose.connect(process.env.DB_NAME)
    .then(() => console.log("Base de donnée connectée"))
      .catch((error) => console.log("Échec de connexion à la base de données", error));
};

export default dbConnect;
