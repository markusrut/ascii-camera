import React, { FC, useMemo } from "react";
import { Text, View, StyleSheet } from "react-native";
import { PixelGrid, Rgba } from "../types/pixel";
import { AsciiPixel } from "./AsciiPixel";

type AsciiImageProps = {
  grid: PixelGrid;
  includeColor?: boolean;
} & View["props"];

const densityChars =
  " .'`^\",:;Il!i><~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";

function getAsciiChar(rgba: Rgba) {
  const brightness = (rgba.r + rgba.g + rgba.b) / 3;
  return densityChars[
    Math.floor((brightness / 255) * (densityChars.length - 1))
  ];
}

export const AsciiImage: FC<AsciiImageProps> = (props: AsciiImageProps) => {
  const { grid, includeColor, ...viewProps } = props;

  const text = grid.reduce<string>((acc, row) => {
    return (
      acc +
      row.reduce<string>((acc, pixel) => {
        return acc + getAsciiChar(pixel.rgba);
      }, "") +
      "\n"
    );
  }, "");

  return <Text style={styles.text}>{text}</Text>;
  // return (
  //   <View style={styles.pixelGrid} {...viewProps}>
  //     {grid.map((row, rowIndex) => (
  //       <View key={rowIndex} style={styles.pixelRow}>
  //         {row.map((pixel, pixelIndex) => (
  //           <AsciiPixel
  //             key={pixelIndex}
  //             rgba={pixel.rgba}
  //             includeColor={includeColor}
  //           >
  //             {getAsciiChar(pixel.rgba)}
  //           </AsciiPixel>
  //         ))}
  //       </View>
  //     ))}
  //   </View>
  // );
};

const styles = StyleSheet.create({
  pixelGrid: {
    alignSelf: "center",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  pixelRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    alignSelf: "center",
    fontFamily: "RobotoMono_400Regular",
    color: "#fff",
    fontSize: 4,
    letterSpacing: 1.5,
    lineHeight: 5,
  },
});
