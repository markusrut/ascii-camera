import "dotenv/config";
import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import Jimp from "jimp";
import fs from "fs";

try {
  var server = express();

  server.use(fileUpload());
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(cors());
  server.use("/health", (req, res) => {
    res.send("OK");
  });

  server.post("/image", async (req, res) => {
    console.log("Received image", req.body);

    if (req.body.base64) {
      console.log("writing file");

      fs.writeFileSync("./image.jpg", req.body.base64, "base64");

      console.log("file written");

      const readFile = await Jimp.read("./image.jpg");

      console.log("read file", readFile);
    }

    res.json("Image received");
  });

  const port = process.env.APP_PORT || 5000;
  server.listen(port, () => {
    console.log(`Server started on port: ${port}`);
    console.log(`http://localhost:${port}`);
    console.log(`Press Ctrl+C to quit`);
  });
} catch (e) {
  console.log(e);
}
