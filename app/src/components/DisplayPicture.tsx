import React, { FC, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image } from "react-native";
import { PixelGrid } from "../types/pixel";
import { AsciiImage } from "./AsciiImage";

type DisplayPictureProps = {
  pixelGrid: PixelGrid | null;
  imageUri: string;
  onClearPicture: () => void;
};

export const DisplayPicture: FC<DisplayPictureProps> = ({
  pixelGrid,
  imageUri,
  onClearPicture: onClear,
}) => {
  // const [displayColor, setDisplayColor] = useState(false);
  // const toggleColor = () => {
  //   setDisplayColor(!displayColor);
  // };
  const [displayAscii, setDisplayAscii] = useState(false);

  const toggleAscii = () => {
    if (!pixelGrid) return;
    setDisplayAscii(!displayAscii);
  };

  return (
    <View style={styles.container}>
      {displayAscii && pixelGrid && (
        <AsciiImage
          grid={pixelGrid}
          // includeColor={displayColor}
          style={styles.image}
        />
      )}
      {!displayAscii && (
        <Image source={{ uri: imageUri }} style={styles.image} />
      )}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={onClear}>
          <Text style={styles.buttonText}> New Picture </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={toggleAscii}>
          <Text style={styles.buttonText}>
            {pixelGrid === null
              ? "Loading..."
              : displayAscii
              ? "Hide Ascii"
              : "Show Ascii"}
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.button} onPress={toggleColor}>
            <Text style={styles.buttonText}> Toggle Color </Text>
          </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  image: {
    width: 400,
    height: 400,
  },
  buttonRow: {
    backgroundColor: "transparent",
    flexDirection: "row",
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
