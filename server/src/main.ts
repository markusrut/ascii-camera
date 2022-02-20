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
  server.use("/health", (req, res) => {
    res.send("OK");
  });
  server.use("/", (req, res) => {
    res.send("OK");
  });

  server.use("/test", async (req, res) => {
    const testImagePath = "./images/test.jpg";
    await processImage(testImagePath);
    res.json("Image processed");
  });

  server.post("/process", async (req, res) => {
    console.time("processImage");

    const image = req.files?.image as fileUpload.UploadedFile;
    if (!image) {
      res.status(400).send("No image provided");
      return;
    }
    const imageName = image.name;
    const imageType = image.mimetype;
    const imageData = image.data;

    const imagePath = save(imageName, imageData);
    const pixelGrid = await processImage(imagePath);
    remove(imagePath);

    console.timeEnd("processImage");
    res.status(200).json(pixelGrid);
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
