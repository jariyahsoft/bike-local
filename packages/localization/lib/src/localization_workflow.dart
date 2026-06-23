class BikeLocalLocalizationWorkflow {
  static const List<String> rules = <String>[
    "Use stable localization keys instead of hard-coded UI text.",
    "Map backend error.code values directly to UI behavior and localized copy.",
    "Keep Thai and English translations in sync in the same change.",
    "Review safety, payment, and legal copy with product/compliance before release.",
    "Do not infer state behavior from human-readable backend messages.",
  ];
}
