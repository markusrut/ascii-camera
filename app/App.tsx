import React from "react";
import { Text } from "react-native";
import { useFonts, Roboto_400Regular } from "@expo-google-fonts/roboto";
import { RobotoMono_400Regular } from "@expo-google-fonts/roboto-mono";
import { AsciiCamera } from "./src/components/AsciiCamera";

export default function App() {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    RobotoMono_400Regular,
  });

  if (!fontsLoaded) {
    return <Text>Loading fonts...</Text>;
  }
  return <AsciiCamera />;
}
