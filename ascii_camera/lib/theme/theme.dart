import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

final baseThemeData = ThemeData(
  colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
  textTheme: GoogleFonts.robotoMonoTextTheme(),
  useMaterial3: true,
);

final lightThemeData = baseThemeData.copyWith(
  colorScheme: baseThemeData.colorScheme.copyWith(
    brightness: Brightness.light,
  ),
  brightness: Brightness.light,
);

final darkThemeData = baseThemeData.copyWith(
  colorScheme: baseThemeData.colorScheme.copyWith(
    brightness: Brightness.dark,
  ),
  brightness: Brightness.dark,
);
