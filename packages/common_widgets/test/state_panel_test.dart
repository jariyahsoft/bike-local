import "package:bike_local_common_widgets/common_widgets.dart";
import "package:flutter/material.dart";
import "package:flutter_test/flutter_test.dart";

void main() {
  testWidgets("state panel renders title, message, and action", (tester) async {
    await tester.pumpWidget(
      const MaterialApp(
        home: Scaffold(
          body: BikeLocalStatePanel(
            icon: Icons.sync_problem_rounded,
            title: "Sync failed",
            message: "Queued ride data still needs upload.",
            action: FilledButton(
              onPressed: null,
              child: Text("Retry"),
            ),
          ),
        ),
      ),
    );

    expect(find.text("Sync failed"), findsOneWidget);
    expect(find.text("Queued ride data still needs upload."), findsOneWidget);
    expect(find.text("Retry"), findsOneWidget);
  });
}
