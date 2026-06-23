import "package:flutter/material.dart";

import "package:bike_local_design_system/design_system.dart";

class BikeLocalOperationGuardBanner extends StatelessWidget {
  const BikeLocalOperationGuardBanner({
    super.key,
    required this.message,
  });

  final String message;

  @override
  Widget build(BuildContext context) {
    return DecoratedBox(
      decoration: const BoxDecoration(
        color: BikeLocalColorTokens.warningSoft,
        borderRadius: BorderRadius.all(BikeLocalRadiusTokens.md),
      ),
      child: Padding(
        padding: const EdgeInsets.all(BikeLocalSpacingTokens.sm),
        child: Row(
          children: [
            const Icon(
              Icons.wifi_off_rounded,
              color: BikeLocalColorTokens.warning,
            ),
            const SizedBox(width: BikeLocalSpacingTokens.xs),
            Expanded(
              child: Text(
                message,
                style: BikeLocalTypographyTokens.bodyStrong.copyWith(
                  color: BikeLocalColorTokens.textPrimary,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
