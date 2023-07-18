import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

final baseThemeData = ThemeData(
  textTheme: GoogleFonts.robotoMonoTextTheme(),
  useMaterial3: true,
);

final lightThemeData = baseThemeData.copyWith(
  colorScheme: ColorScheme.fromSeed(
    seedColor: Colors.deepPurple,
    brightness: Brightness.light,
  ),
  brightness: Brightness.light,
);

final darkThemeData = baseThemeData.copyWith(
  colorScheme: ColorScheme.fromSeed(
    seedColor: Colors.deepPurple,
    brightness: Brightness.dark,
  ),
  brightness: Brightness.dark,
);
