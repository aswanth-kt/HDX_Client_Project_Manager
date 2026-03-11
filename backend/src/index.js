import app from "./app.js";
import connectDB from "./db/db.js";

const port = process.env.PORT;

connectDB()
.then(() => {
  app.on("error", (err) => {
    throw err;
  });

  app.listen(port, () => {
    console.log(`Server running port ${port}`);
  });
})
.catch((err) => console.error("DB connection error:", err));