import { CameraCapturedPicture } from "expo-camera";
import { PixelGrid } from "../types/pixel";

export async function convertToPixelGrid(
  cameraCapture: CameraCapturedPicture
): Promise<PixelGrid> {
  const response = await fetch(
    // "https://jpqdaqxi62.eu-west-1.awsapprunner.com/process",
    "http://192.168.1.58:4000/process",
    {
      method: "POST",
      body: getFormData(cameraCapture),
    }
  );

  if (response.status !== 200) {
    throw new Error(
      `Error processing image: ${response.status} ${await response.text()}`
    );
  }

  return (await response.json()) as PixelGrid;
}

function getFormData(cameraCapture: CameraCapturedPicture) {
  let localUri = cameraCapture.uri;
  let filename = localUri.split("/").pop() as string;
  let filetypeMatch = /\.(\w+)$/.exec(filename);
  let type = filetypeMatch ? `image/${filetypeMatch[1]}` : `image`;

  const formData = new FormData();
  formData.append("image", { uri: localUri, name: filename, type });
  return formData;
}
