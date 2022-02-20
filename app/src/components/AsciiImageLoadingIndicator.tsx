import { FC } from "react";
import { StyleSheet, View, Text } from "react-native";

type AsciiImageLoadingIndicatorProps = {
  width: number;
  height: number;
  charsInWidth: number;
  charsInHeight: number;
};

// TOOD: Take as prop
const ascii =
  "@ØÆMåBNÊßÔR#8Q&mÃ0À$GXZA5ñk2S%±3Fz¢yÝCJf1t7ªLc¿+?(r/¤²!*;\"^:,'.` ";
const asciiReverse = ascii.split("").reverse().join("");

export const AsciiImageLoadingIndicator: FC<
  AsciiImageLoadingIndicatorProps
> = ({ charsInWidth, charsInHeight }) => {
  const randomChar = () => {
    return asciiReverse[Math.floor(Math.random() * asciiReverse.length)];
  };

  const text = Array(charsInWidth)
    .fill(0)
    .map(() => {
      return Array(charsInHeight)
        .fill(0)
        .map(() => {
          return randomChar();
        })
        .join("");
    })
    .join("\n");

  return (
    <View style={styles.container}>
      <Text style={styles.loadingText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingText: {
    alignSelf: "center",
    fontFamily: "RobotoMono_200ExtraLight",
    color: "#fff",
    fontSize: 400 / 60,
    lineHeight: 400 / 60,
    letterSpacing: 2.4,
  },
});
