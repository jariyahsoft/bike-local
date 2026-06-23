import "package:flutter/material.dart";

abstract final class BikeLocalColorTokens {
  static const Color canvas = Color(0xFFF4F1EA);
  static const Color surface = Color(0xFFFFFCF5);
  static const Color surfaceMuted = Color(0xFFE7E2D7);
  static const Color surfaceInverse = Color(0xFF1A2028);
  static const Color border = Color(0xFFC9C0B3);
  static const Color borderStrong = Color(0xFF8D8170);
  static const Color textPrimary = Color(0xFF18212B);
  static const Color textSecondary = Color(0xFF4D5866);
  static const Color textInverse = Color(0xFFF9F7F1);

  // Provisional non-brand palette optimized for legibility and state signaling.
  static const Color primary = Color(0xFF0E7C86);
  static const Color primaryPressed = Color(0xFF0A636B);
  static const Color accent = Color(0xFFD96C30);
  static const Color accentPressed = Color(0xFFB3531D);

  static const Color success = Color(0xFF1F8A4C);
  static const Color successSoft = Color(0xFFDDF3E4);
  static const Color warning = Color(0xFFC27B13);
  static const Color warningSoft = Color(0xFFF8E8C8);
  static const Color danger = Color(0xFFC6452D);
  static const Color dangerSoft = Color(0xFFF9DDD5);
  static const Color info = Color(0xFF2067B0);
  static const Color infoSoft = Color(0xFFD9E9F8);
  static const Color neutral = Color(0xFF66707B);
  static const Color neutralSoft = Color(0xFFE4E7EA);
  static const Color focus = Color(0xFF005FCC);
  static const Color offline = Color(0xFF6C757D);
  static const Color gps = Color(0xFF6F8C1F);
  static const Color sos = Color(0xFFD11F3A);
  static const Color sosSoft = Color(0xFFF9D6DD);
}

abstract final class BikeLocalSpacingTokens {
  static const double xxxs = 4;
  static const double xxs = 8;
  static const double xs = 12;
  static const double sm = 16;
  static const double md = 20;
  static const double lg = 24;
  static const double xl = 32;
  static const double xxl = 40;
  static const double xxxl = 48;
}

abstract final class BikeLocalRadiusTokens {
  static const Radius sm = Radius.circular(10);
  static const Radius md = Radius.circular(16);
  static const Radius lg = Radius.circular(22);
  static const Radius pill = Radius.circular(999);
}

abstract final class BikeLocalElevationTokens {
  static const double raisedCard = 2;
  static const double stickyPanel = 4;
  static const double modal = 12;
}

abstract final class BikeLocalMotionTokens {
  static const Duration micro = Duration(milliseconds: 120);
  static const Duration fast = Duration(milliseconds: 180);
  static const Duration standard = Duration(milliseconds: 240);
  static const Duration emphasis = Duration(milliseconds: 320);

  static const Curve entrance = Curves.easeOutCubic;
  static const Curve exit = Curves.easeInCubic;
  static const Curve emphasized = Curves.easeInOutCubic;
}

abstract final class BikeLocalTypographyTokens {
  static const String primaryFamily = "Noto Sans Thai";
  static const String accentFamily = "Barlow Semi Condensed";

  static const TextStyle display = TextStyle(
    fontFamily: accentFamily,
    fontSize: 34,
    height: 1.05,
    fontWeight: FontWeight.w700,
    letterSpacing: -0.6,
    color: BikeLocalColorTokens.textPrimary,
  );

  static const TextStyle title = TextStyle(
    fontFamily: primaryFamily,
    fontSize: 24,
    height: 1.2,
    fontWeight: FontWeight.w700,
    color: BikeLocalColorTokens.textPrimary,
  );

  static const TextStyle section = TextStyle(
    fontFamily: primaryFamily,
    fontSize: 18,
    height: 1.25,
    fontWeight: FontWeight.w700,
    color: BikeLocalColorTokens.textPrimary,
  );

  static const TextStyle body = TextStyle(
    fontFamily: primaryFamily,
    fontSize: 16,
    height: 1.45,
    fontWeight: FontWeight.w400,
    color: BikeLocalColorTokens.textPrimary,
  );

  static const TextStyle bodyStrong = TextStyle(
    fontFamily: primaryFamily,
    fontSize: 16,
    height: 1.45,
    fontWeight: FontWeight.w600,
    color: BikeLocalColorTokens.textPrimary,
  );

  static const TextStyle caption = TextStyle(
    fontFamily: primaryFamily,
    fontSize: 13,
    height: 1.35,
    fontWeight: FontWeight.w500,
    color: BikeLocalColorTokens.textSecondary,
  );

  static const TextStyle mono = TextStyle(
    fontFamily: "Roboto Mono",
    fontSize: 13,
    height: 1.3,
    fontWeight: FontWeight.w500,
    color: BikeLocalColorTokens.textPrimary,
  );
}

@immutable
class BikeLocalStatusColors extends ThemeExtension<BikeLocalStatusColors> {
  const BikeLocalStatusColors({
    required this.success,
    required this.warning,
    required this.danger,
    required this.info,
    required this.neutral,
    required this.focus,
    required this.offline,
    required this.gps,
    required this.sos,
  });

  final Color success;
  final Color warning;
  final Color danger;
  final Color info;
  final Color neutral;
  final Color focus;
  final Color offline;
  final Color gps;
  final Color sos;

  @override
  BikeLocalStatusColors copyWith({
    Color? success,
    Color? warning,
    Color? danger,
    Color? info,
    Color? neutral,
    Color? focus,
    Color? offline,
    Color? gps,
    Color? sos,
  }) {
    return BikeLocalStatusColors(
      success: success ?? this.success,
      warning: warning ?? this.warning,
      danger: danger ?? this.danger,
      info: info ?? this.info,
      neutral: neutral ?? this.neutral,
      focus: focus ?? this.focus,
      offline: offline ?? this.offline,
      gps: gps ?? this.gps,
      sos: sos ?? this.sos,
    );
  }

  @override
  BikeLocalStatusColors lerp(ThemeExtension<BikeLocalStatusColors>? other, double t) {
    if (other is! BikeLocalStatusColors) {
      return this;
    }

    return BikeLocalStatusColors(
      success: Color.lerp(success, other.success, t) ?? success,
      warning: Color.lerp(warning, other.warning, t) ?? warning,
      danger: Color.lerp(danger, other.danger, t) ?? danger,
      info: Color.lerp(info, other.info, t) ?? info,
      neutral: Color.lerp(neutral, other.neutral, t) ?? neutral,
      focus: Color.lerp(focus, other.focus, t) ?? focus,
      offline: Color.lerp(offline, other.offline, t) ?? offline,
      gps: Color.lerp(gps, other.gps, t) ?? gps,
      sos: Color.lerp(sos, other.sos, t) ?? sos,
    );
  }
}
