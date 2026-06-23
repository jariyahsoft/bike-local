import "package:bike_local_common_widgets/common_widgets.dart";
import "package:bike_local_design_system/design_system.dart";
import "package:flutter/material.dart";
import "package:flutter_test/flutter_test.dart";

void main() {
  testWidgets("merchant foundation renders dense operations shell", (tester) async {
    await tester.pumpWidget(
      MaterialApp(
        theme: buildBikeLocalTheme(
          density: BikeLocalSurfaceDensity.operations,
        ),
        home: Scaffold(
          body: ListView(
            children: const [
              ListTile(title: Text("Dashboard")),
              ListTile(title: Text("Bookings")),
              ListTile(title: Text("Operations")),
              BikeLocalStatePanel(
                icon: Icons.point_of_sale_rounded,
                title: "Cash confirmation queue",
                message: "Online-required operations stay blocked while offline.",
              ),
            ],
          ),
        ),
      ),
    );

    expect(find.text("Operations"), findsOneWidget);
    expect(find.text("Cash confirmation queue"), findsOneWidget);
  });
}
