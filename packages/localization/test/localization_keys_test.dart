import "package:bike_local_localization/localization.dart";
import "package:flutter_test/flutter_test.dart";

void main() {
  test("supported locales include Thai and English", () {
    final supportedLanguages = BikeLocalLocales.supported
        .map((locale) => locale.languageCode)
        .toList(growable: false);

    expect(supportedLanguages, containsAll(<String>["en", "th"]));
  });

  test("workflow rules require code-driven error mapping", () {
    expect(BikeLocalLocalizationWorkflow.rules, isNotEmpty);
    expect(
      BikeLocalLocalizationWorkflow.rules,
      contains("Map backend error.code values directly to UI behavior and localized copy."),
    );
  });
}
