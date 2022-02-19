import Jimp from "jimp";
import fs from "fs";

export function save(imageName: string, imageData: Buffer) {
  const imageFolder = "./images";
  const imagePath = `${imageFolder}/${imageName}`;

  if (!fs.existsSync(imageFolder)) {
    fs.mkdirSync(imageFolder);
  }

  fs.writeFileSync(imagePath, imageData);

  console.log("Image saved to", imagePath);
  return imagePath;
}

const densityChars = " .,:;i1tfLCG08@";

export async function process(imagePath: string) {
  const image = await Jimp.read(imagePath);

  image.resize(200, Jimp.AUTO);
  image.rotate(90);

  const width = image.getWidth();
  const height = image.getHeight();
  console.log(`Image size: ${width}x${height}`);

  let stringResult = "";
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const color = image.getPixelColor(x, y);
      const rgba = Jimp.intToRGBA(color);

      const r = rgba.r;
      const g = rgba.g;
      const b = rgba.b;

      const brightness = (r + g + b) / 3;

      const asciiChar =
        densityChars[
          Math.floor((brightness / 255) * (densityChars.length - 1))
        ];
      stringResult += asciiChar;

      const newColor = Jimp.rgbaToInt(brightness, brightness, brightness, 255);
      image.setPixelColor(newColor, x, y);
    }
    stringResult += "\n";
  }

  console.log(stringResult);

  const taretPath = `${imagePath}-processed.jpg`;
  image.write(taretPath);

  console.log("Image processed");
}
