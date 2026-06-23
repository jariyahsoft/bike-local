import "package:bike_local_common_widgets/common_widgets.dart";
import "package:bike_local_design_system/design_system.dart";
import "package:bike_local_localization/localization.dart";
import "package:flutter/material.dart";
import "package:flutter_test/flutter_test.dart";

void main() {
  testWidgets("renter foundation covers navigation, offline, and GPS-unavailable states", (tester) async {
    await tester.pumpWidget(
      MaterialApp(
        theme: buildBikeLocalTheme(
          density: BikeLocalSurfaceDensity.renter,
        ),
        home: Scaffold(
          body: const Column(
            children: [
              BikeLocalOperationGuardBanner(
                message: "Booking confirmation needs an internet connection.",
              ),
              BikeLocalStatePanel(
                icon: Icons.gps_off_rounded,
                title: BikeLocalLocalizationKeys.stateGpsUnavailableTitle,
                message: "Enable location permission and device GPS to continue ride tracking.",
              ),
            ],
          ),
          bottomNavigationBar: const NavigationBar(
            destinations: [
              NavigationDestination(icon: Icon(Icons.home_outlined), label: "Home"),
              NavigationDestination(icon: Icon(Icons.map_outlined), label: "Map"),
              NavigationDestination(icon: Icon(Icons.receipt_long_outlined), label: "Bookings"),
              NavigationDestination(icon: Icon(Icons.directions_bike_outlined), label: "Active Rental"),
              NavigationDestination(icon: Icon(Icons.person_outline), label: "Profile"),
            ],
          ),
        ),
      ),
    );

    expect(find.text("Home"), findsOneWidget);
    expect(find.text("Active Rental"), findsOneWidget);
    expect(find.text(BikeLocalLocalizationKeys.stateGpsUnavailableTitle), findsOneWidget);
  });
}
