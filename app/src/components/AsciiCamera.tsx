import { Camera, CameraCapturedPicture } from "expo-camera";
import React, { FC, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { convertToPixelGrid } from "../services/camera-service";
import { processImage } from "../services/image-process";
import { PixelGrid } from "../types/pixel";
import { DisplayPicture } from "./DisplayPicture";
import { TakePicture } from "./TakePicture";

type AsciiCameraProps = {};

export const AsciiCamera: FC<AsciiCameraProps> = ({}) => {
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [pixelGrid, setPixelGrid] = useState<PixelGrid | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const onPictureTaken = async (picture: CameraCapturedPicture) => {
    setError(null);
    setImageUri(picture.uri);
    try {
      const pixelGrid = await processImage(picture.uri);

      // const pixelGrid = await convertToPixelGrid(picture);
      setPixelGrid(pixelGrid);
    } catch (error) {
      if (error instanceof Error) setError(error);
    }
  };

  const clear = () => {
    setError(null);
    setPixelGrid(null);
    setImageUri(null);
  };

  return (
    <View style={styles.container}>
      {error && <Text style={styles.error}>{error.message}</Text>}
      {imageUri && (
        <DisplayPicture
          imageUri={imageUri}
          pixelGrid={pixelGrid}
          onClearPicture={clear}
        />
      )}
      {!imageUri && (
        <TakePicture
          onPictureTaken={onPictureTaken}
          cameraType={cameraType}
          setCameraType={setCameraType}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    paddingBottom: 50,
    backgroundColor: "#000",
  },
  error: {
    color: "red",
  },
});
