import "package:flutter/material.dart";

import "design_tokens.dart";

enum BikeLocalSurfaceDensity {
  renter,
  operations,
}

ThemeData buildBikeLocalTheme({
  required BikeLocalSurfaceDensity density,
  Brightness brightness = Brightness.light,
}) {
  final colorScheme = ColorScheme.fromSeed(
    seedColor: BikeLocalColorTokens.primary,
    brightness: brightness,
  ).copyWith(
    primary: BikeLocalColorTokens.primary,
    onPrimary: BikeLocalColorTokens.textInverse,
    secondary: BikeLocalColorTokens.accent,
    onSecondary: BikeLocalColorTokens.textInverse,
    error: BikeLocalColorTokens.danger,
    onError: BikeLocalColorTokens.textInverse,
    surface: BikeLocalColorTokens.surface,
    onSurface: BikeLocalColorTokens.textPrimary,
  );

  final base = ThemeData(
    useMaterial3: true,
    brightness: brightness,
    colorScheme: colorScheme,
    scaffoldBackgroundColor: BikeLocalColorTokens.canvas,
    fontFamily: BikeLocalTypographyTokens.primaryFamily,
    textTheme: const TextTheme(
      displaySmall: BikeLocalTypographyTokens.display,
      headlineSmall: BikeLocalTypographyTokens.title,
      titleMedium: BikeLocalTypographyTokens.section,
      bodyLarge: BikeLocalTypographyTokens.body,
      bodyMedium: BikeLocalTypographyTokens.body,
      labelSmall: BikeLocalTypographyTokens.caption,
    ),
    extensions: const <ThemeExtension<dynamic>>[
      BikeLocalStatusColors(
        success: BikeLocalColorTokens.success,
        warning: BikeLocalColorTokens.warning,
        danger: BikeLocalColorTokens.danger,
        info: BikeLocalColorTokens.info,
        neutral: BikeLocalColorTokens.neutral,
        focus: BikeLocalColorTokens.focus,
        offline: BikeLocalColorTokens.offline,
        gps: BikeLocalColorTokens.gps,
        sos: BikeLocalColorTokens.sos,
      ),
    ],
  );

  final visualDensity = density == BikeLocalSurfaceDensity.renter
      ? const VisualDensity(horizontal: 0, vertical: 0)
      : const VisualDensity(horizontal: -1, vertical: -1);

  return base.copyWith(
    visualDensity: visualDensity,
    appBarTheme: const AppBarTheme(
      backgroundColor: BikeLocalColorTokens.surface,
      foregroundColor: BikeLocalColorTokens.textPrimary,
      elevation: 0,
      surfaceTintColor: Colors.transparent,
      centerTitle: false,
      titleTextStyle: BikeLocalTypographyTokens.section,
    ),
    cardTheme: const CardTheme(
      color: BikeLocalColorTokens.surface,
      elevation: BikeLocalElevationTokens.raisedCard,
      margin: EdgeInsets.all(BikeLocalSpacingTokens.xxs),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.all(BikeLocalRadiusTokens.md),
        side: BorderSide(color: BikeLocalColorTokens.border),
      ),
    ),
    chipTheme: base.chipTheme.copyWith(
      backgroundColor: BikeLocalColorTokens.surfaceMuted,
      side: const BorderSide(color: BikeLocalColorTokens.border),
      shape: const StadiumBorder(),
      labelStyle: BikeLocalTypographyTokens.caption.copyWith(
        color: BikeLocalColorTokens.textPrimary,
      ),
    ),
    filledButtonTheme: FilledButtonThemeData(
      style: FilledButton.styleFrom(
        backgroundColor: BikeLocalColorTokens.primary,
        foregroundColor: BikeLocalColorTokens.textInverse,
        minimumSize: const Size.fromHeight(52),
        padding: const EdgeInsets.symmetric(
          horizontal: BikeLocalSpacingTokens.sm,
          vertical: BikeLocalSpacingTokens.xs,
        ),
        shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.all(BikeLocalRadiusTokens.pill),
        ),
        textStyle: BikeLocalTypographyTokens.bodyStrong,
      ),
    ),
    inputDecorationTheme: InputDecorationTheme(
      filled: true,
      fillColor: BikeLocalColorTokens.surface,
      contentPadding: const EdgeInsets.symmetric(
        horizontal: BikeLocalSpacingTokens.sm,
        vertical: BikeLocalSpacingTokens.xs,
      ),
      border: const OutlineInputBorder(
        borderRadius: BorderRadius.all(BikeLocalRadiusTokens.md),
        borderSide: BorderSide(color: BikeLocalColorTokens.border),
      ),
      enabledBorder: const OutlineInputBorder(
        borderRadius: BorderRadius.all(BikeLocalRadiusTokens.md),
        borderSide: BorderSide(color: BikeLocalColorTokens.border),
      ),
      focusedBorder: const OutlineInputBorder(
        borderRadius: BorderRadius.all(BikeLocalRadiusTokens.md),
        borderSide: BorderSide(color: BikeLocalColorTokens.focus, width: 2),
      ),
      errorBorder: const OutlineInputBorder(
        borderRadius: BorderRadius.all(BikeLocalRadiusTokens.md),
        borderSide: BorderSide(color: BikeLocalColorTokens.danger, width: 1.5),
      ),
    ),
  );
}
