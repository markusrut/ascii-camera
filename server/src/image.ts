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

type PixelData = {
  rgba: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
};

export async function process(imagePath: string): Promise<PixelData[][]> {
  const image = await Jimp.read(imagePath);
  image.resize(100, 100);
  image.rotate(90);

  const result: PixelData[][] = [];
  const width = image.getWidth();
  const height = image.getHeight();
  for (let x = 0; x < width; x++) {
    const row: PixelData[] = [];
    for (let y = 0; y < height; y++) {
      const color = image.getPixelColor(x, y);
      const rgba = Jimp.intToRGBA(color);
      row.push({ rgba });
    }
    result.push(row);
  }

  return result;
}
