import React from "react";
import { FC, useMemo, useRef, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { Rgba } from "../types/pixel";

type AsciiPixelProps = {
  rgba: Rgba;
  includeColor: boolean;
};

const densityChars =
  " .'`^\",:;Il!i><~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";

function getAsciiChar(rgba: Rgba) {
  const brightness = (rgba.r + rgba.g + rgba.b) / 3;
  return densityChars[
    Math.floor((brightness / 255) * (densityChars.length - 1))
  ];
}
function getColor(rgba: Rgba) {
  return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
}

export const AsciiPixel: FC<AsciiPixelProps> = ({
  rgba,
  includeColor,
  children,
}) => {
  const color = useMemo(
    () => (includeColor ? getColor(rgba) : "#fff"),
    [rgba, includeColor]
  );
  // const asciiChar = useMemo(() => getAsciiChar(rgba), [rgba]);
  return (
    <Text
      style={[
        styles.pixel,
        {
          color: color,
        },
      ]}
    >
      {children}
      {/* {asciiChar} */}
    </Text>
  );
};

const styles = StyleSheet.create({
  pixel: {
    flex: 1,
    fontSize: 5,
  },
});
