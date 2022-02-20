import { CameraCapturedPicture } from "expo-camera";
import React, { FC, useState } from "react";
import { StyleSheet, View } from "react-native";
import { convertToPixelGrid } from "../services/camera-service";
import { PixelGrid } from "../types/pixel";
import { DisplayPicture } from "./DisplayPicture";
import { TakePicture } from "./TakePicture";

type AsciiCameraProps = {};

export const AsciiCamera: FC<AsciiCameraProps> = ({}) => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [pixelGrid, setPixelGrid] = useState<PixelGrid | null>(null);

  const onPictureTaken = async (picture: CameraCapturedPicture) => {
    setImageUri(picture.uri);
    const pixelGrid = await convertToPixelGrid(picture);
    setPixelGrid(pixelGrid);
  };

  const clear = () => {
    setPixelGrid(null);
    setImageUri(null);
  };
  return (
    <View style={styles.container}>
      {imageUri && (
        <DisplayPicture
          imageUri={imageUri}
          pixelGrid={pixelGrid}
          onClearPicture={clear}
        />
      )}
      {!imageUri && <TakePicture onPictureTaken={onPictureTaken} />}
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
});
