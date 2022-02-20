import React, { FC, useMemo } from "react";
import { Text, View, StyleSheet } from "react-native";
import { PixelGrid, Rgba } from "../types/pixel";
import { AsciiPixel } from "./AsciiPixel";

type AsciiImageProps = {
  grid: PixelGrid;
  includeColor?: boolean;
} & View["props"];

const ascii =
  "@ØÆMåBNÊßÔR#8Q&mÃ0À$GXZA5ñk2S%±3Fz¢yÝCJf1t7ªLc¿+?(r/¤²!*;\"^:,'.` ";
const asciiReverse = ascii.split("").reverse().join("");

// TODO: Option to change fonts
// const runic = "ᛥᛤᛞᚥᚸᛰᛖᚻᚣᛄᚤᛒᚢᚱᛱᚷᚫᛪᚧᚬᚠᛏᚨᚰᚩᚮᚪᚳᚽᚿᛊᛁᛵᛍ᛬ᚲᛌ᛫";
// const lines = "╬╠╫╋║╉╩┣╦╂╳╇╈┠╚┃╃┻╅┳┡┢┹╀╧┱╙┗┞┇┸┋┯┰┖╲╱┎╘━┭┕┍┅╾│┬┉╰╭╸└┆╺┊─╌┄┈╴╶";
// const blocks = "█▉▇▓▊▆▅▌▚▞▀▒▐▍▃▖▂░▁▏▕";
// const shapes = "◙◘■▩●▦▣◚◛◕▨▧◉▤◐◒▮◍◑▼▪◤▬◗◭◖◈◎◮◊◫▰◄◯□▯▷▫▽◹△◁▸▭◅▵◌▱▹▿◠◃◦◟◞◜";
// const asian =
//   "ぽぼゑぜぬあおゆぎゐはせぢがきぱびほげばゟぁたかぞぷれひずどらさでけぉちごえすゎにづぇとょついこぐうぅぃくっしへゞゝ゚゙ゖ゜゛゚゙";

function getAsciiChar(rgba: Rgba, densityChars: string) {
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
        return acc + getAsciiChar(pixel.rgba, asciiReverse);
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
    fontFamily: "RobotoMono_200ExtraLight",
    color: "#fff",
    fontSize: 400 / 60,
    lineHeight: 400 / 60,
    letterSpacing: 2.4,
  },
});

// TODO: Change fonts to make it brighter
// RobotoMono_600SemiBold,
// RobotoMono_500Medium,
// RobotoMono_400Regular,
// RobotoMono_300Light,
// RobotoMono_200ExtraLight,
// RobotoMono_100Thin,
