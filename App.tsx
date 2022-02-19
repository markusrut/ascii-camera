import { Camera } from "expo-camera";
import {
  CameraCapturedPicture,
  ImageType,
} from "expo-camera/build/Camera.types";
import { Buffer } from "buffer";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Pica from "pica";

export default function App() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef<Camera>(null);
  const imageRef = useRef<Image>(null);

  const [imageUri, setImageUri] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const toggleFlip = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };
  const takePicture = async () => {
    const picture = await cameraRef.current?.takePictureAsync({
      quality: 1,
      base64: true,
    });
    // if (picture?.base64) {
    //   setImageUri(picture.uri);
    //   console.log(picture.height);
    //   console.log(picture.width);
    // }

    if (picture?.base64) {
      setImageUri(picture.uri);
      console.log("got picture", picture);
      await postCameraCapture(picture);
    }
  };

  const postCameraCapture = async (cameraCapture: CameraCapturedPicture) => {
    const formData = new FormData();
    formData.append("height", cameraCapture.height.toString());
    formData.append("width", cameraCapture.width.toString());
    formData.append("base64", cameraCapture.base64!);
    const response = await fetch("http://192.168.1.58:4000/image", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    console.log("Data from api", data);
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      {imageUri && (
        <View>
          <Image
            ref={imageRef}
            source={{ uri: imageUri }}
            style={styles.image}
          />
          <TouchableOpacity
            style={styles.clear}
            onPress={() => setImageUri(null)}
          >
            <Text style={styles.text}> Close </Text>
          </TouchableOpacity>
        </View>
      )}
      {!imageUri && (
        <Camera ref={cameraRef} style={styles.camera} type={type}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.flip} onPress={toggleFlip}>
              <Text style={styles.text}> Flip </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.picture} onPress={takePicture}>
              <Text style={styles.text}> Take </Text>
            </TouchableOpacity>
          </View>
        </Camera>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "column",
    margin: 50,
    marginTop: 100,
    justifyContent: "space-between",
    alignItems: "center",
  },
  flip: {
    flex: 0.1,
    alignSelf: "flex-start",
    alignItems: "center",
  },
  picture: {
    width: 75,
    height: 75,
    backgroundColor: "orange",
    borderColor: "white",
    borderWidth: 5,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  clear: {
    top: 100,
    right: 50,
    width: 75,
    height: 75,
    backgroundColor: "orange",
    borderColor: "white",
    borderWidth: 5,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});
