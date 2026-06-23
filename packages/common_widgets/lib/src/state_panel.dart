import "package:flutter/material.dart";

import "package:bike_local_design_system/design_system.dart";

class BikeLocalStatePanel extends StatelessWidget {
  const BikeLocalStatePanel({
    super.key,
    required this.icon,
    required this.title,
    this.message,
    this.action,
  });

  final IconData icon;
  final String title;
  final String? message;
  final Widget? action;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(BikeLocalSpacingTokens.sm),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Padding(
              padding: const EdgeInsets.only(top: BikeLocalSpacingTokens.xxxs),
              child: Icon(
                icon,
                color: BikeLocalColorTokens.info,
              ),
            ),
            const SizedBox(width: BikeLocalSpacingTokens.sm),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: BikeLocalTypographyTokens.section,
                  ),
                  if (message != null) ...[
                    const SizedBox(height: BikeLocalSpacingTokens.xxs),
                    Text(
                      message!,
                      style: BikeLocalTypographyTokens.body,
                    ),
                  ],
                  if (action != null) ...[
                    const SizedBox(height: BikeLocalSpacingTokens.sm),
                    action!,
                  ],
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
