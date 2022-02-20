import Jimp from "jimp/browser/lib/jimp.js";

type PixelData = {
  rgba: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
};

export async function processImage(imagePath: string): Promise<PixelData[][]> {
  const processStart = performance.now();
  const image = await Jimp.read(imagePath);
  image.resize(60, 60);
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

  console.log(`Image processed in ${performance.now() - processStart} ms`);

  return result;
}
