import "package:bike_local_design_system/design_system.dart";
import "package:flutter/material.dart";
import "package:flutter_test/flutter_test.dart";

void main() {
  test("renter theme keeps standard visual density and exposes status colors", () {
    final theme = buildBikeLocalTheme(
      density: BikeLocalSurfaceDensity.renter,
    );

    final statusColors = theme.extension<BikeLocalStatusColors>();

    expect(theme.visualDensity.horizontal, 0);
    expect(theme.visualDensity.vertical, 0);
    expect(statusColors?.sos, BikeLocalColorTokens.sos);
  });

  test("operations theme is denser than renter theme", () {
    final theme = buildBikeLocalTheme(
      density: BikeLocalSurfaceDensity.operations,
    );

    expect(theme.visualDensity.horizontal, -1);
    expect(theme.visualDensity.vertical, -1);
  });
}
