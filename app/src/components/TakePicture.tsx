import { Camera, CameraCapturedPicture } from "expo-camera";
import { CameraType } from "expo-camera/build/Camera.types";
import React, { FC, useEffect, useRef, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type TakePictureProps = {
  onPictureTaken: (picture: CameraCapturedPicture) => Promise<void>;
  cameraType: CameraType;
  setCameraType: (type: CameraType) => void;
};

export const TakePicture: FC<TakePictureProps> = ({
  onPictureTaken,
  cameraType,
  setCameraType,
}) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const cameraRef = useRef<Camera>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const toggleFlip = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const takePicture = async () => {
    const picture = await cameraRef.current?.takePictureAsync({
      quality: 0.2,
    });

    if (picture) {
      onPictureTaken(picture);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera ref={cameraRef} style={styles.camera} type={cameraType} />
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={toggleFlip}>
          <Text style={styles.buttonText}> Flip Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={takePicture}>
          <Text style={styles.buttonText}> Take Picture </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  camera: {
    alignSelf: "flex-start",
    width: 400,
    height: 400,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonRow: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignSelf: "flex-end",
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2196F3",
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
  },
});
