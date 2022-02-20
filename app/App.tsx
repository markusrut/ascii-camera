import React from "react";
import { Text } from "react-native";
import { useFonts, Roboto_400Regular } from "@expo-google-fonts/roboto";
import {
  RobotoMono_600SemiBold,
  RobotoMono_500Medium,
  RobotoMono_400Regular,
  RobotoMono_300Light,
  RobotoMono_200ExtraLight,
  RobotoMono_100Thin,
} from "@expo-google-fonts/roboto-mono";
import { AsciiCamera } from "./src/components/AsciiCamera";

export default function App() {
  let [fontsLoaded] = useFonts({
    RobotoMono_600SemiBold,
    RobotoMono_500Medium,
    RobotoMono_400Regular,
    RobotoMono_300Light,
    RobotoMono_200ExtraLight,
    RobotoMono_100Thin,
  });

  if (!fontsLoaded) {
    return <Text>Loading fonts...</Text>;
  }
  return <AsciiCamera />;
}
