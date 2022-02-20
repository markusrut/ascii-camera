import "dotenv/config";
import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import { process as processImage, remove, save } from "./image";

try {
  var server = express();

  server.use(fileUpload());
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(cors());

  server.use((req, res, next) => {
    console.log(`${req.method} ${req.url} [${req.socket.remoteAddress}]`);
    next();
  });
  server.use("/process", async (req, res) => {
    const image = req.files?.image as fileUpload.UploadedFile;
    if (!image) {
      res.status(400).send("No image provided");
      return;
    }
    console.time("processImage");

    const imageName = image.name;
    const imageType = image.mimetype;
    const imageData = image.data;

    const imagePath = save(imageName, imageData);
    const pixelGrid = await processImage(imagePath);
    remove(imagePath);

    console.timeEnd("processImage");
    res.status(200).json(pixelGrid);
  });

  server.get("/health", (req, res) => {
    res.status(200).json({ uptime: process.uptime() });
  });

  server.get("/", (req, res) => {
    res.status(200).send("OK");
  });

  const port = process.env.APP_PORT || 4000;
  server.listen(port, () => {
    console.log(`Server started on port: ${port}`);
  });
} catch (e) {
  console.log("Error when starting server", e);
}
