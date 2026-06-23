import "package:bike_local_common_widgets/common_widgets.dart";
import "package:bike_local_design_system/design_system.dart";
import "package:flutter/material.dart";
import "package:flutter_test/flutter_test.dart";

void main() {
  testWidgets("admin foundation renders approval and audit shell", (tester) async {
    await tester.pumpWidget(
      MaterialApp(
        theme: buildBikeLocalTheme(
          density: BikeLocalSurfaceDensity.operations,
        ),
        home: Scaffold(
          body: ListView(
            children: const [
              ListTile(title: Text("Store Approval")),
              ListTile(title: Text("Transactions")),
              ListTile(title: Text("Audit")),
              BikeLocalStatePanel(
                icon: Icons.admin_panel_settings_outlined,
                title: "Permission review required",
                message: "Sensitive actions remain disabled until backend permission context is loaded.",
              ),
            ],
          ),
        ),
      ),
    );

    expect(find.text("Store Approval"), findsOneWidget);
    expect(find.text("Audit"), findsOneWidget);
    expect(find.text("Permission review required"), findsOneWidget);
  });
}
