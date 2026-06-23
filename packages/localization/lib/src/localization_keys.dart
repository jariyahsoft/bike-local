import "package:flutter/material.dart";

abstract final class BikeLocalLocales {
  static const Locale english = Locale("en");
  static const Locale thai = Locale("th");
  static const List<Locale> supported = <Locale>[
    english,
    thai,
  ];
}

abstract final class BikeLocalLocalizationKeys {
  static const String appName = "app.name";

  static const String commonRetry = "common.retry";
  static const String commonClose = "common.close";
  static const String commonTryAgain = "common.tryAgain";
  static const String commonContactSupport = "common.contactSupport";
  static const String commonOffline = "common.offline";

  static const String stateLoadingTitle = "state.loading.title";
  static const String stateEmptyTitle = "state.empty.title";
  static const String stateErrorTitle = "state.error.title";
  static const String stateSuccessTitle = "state.success.title";
  static const String statePermissionDeniedTitle = "state.permissionDenied.title";
  static const String stateOfflineTitle = "state.offline.title";
  static const String stateSyncFailedTitle = "state.syncFailed.title";
  static const String stateGpsUnavailableTitle = "state.gpsUnavailable.title";

  static const String errorAuthUnauthenticated = "error.AUTH_UNAUTHENTICATED";
  static const String errorAuthInvalidToken = "error.AUTH_INVALID_TOKEN";
  static const String errorPermissionDenied = "error.PERMISSION_DENIED";
  static const String errorBookingAssetNotAvailable = "error.BOOKING_ASSET_NOT_AVAILABLE";
  static const String errorPaymentVerificationRequired = "error.PAYMENT_VERIFICATION_REQUIRED";
  static const String errorReturnInspectionRequired = "error.RETURN_INSPECTION_REQUIRED";

  static const String bookingOnlineRequired = "booking.onlineRequired";
  static const String paymentOnlineRequired = "payment.onlineRequired";
  static const String cashConfirmOnlineRequired = "cash.onlineRequired";
  static const String handoverOnlineRequired = "handover.onlineRequired";
  static const String returnOnlineRequired = "return.onlineRequired";
  static const String permissionOnlineRequired = "permission.onlineRequired";
  static const String storeApprovalOnlineRequired = "storeApproval.onlineRequired";
  static const String refundOnlineRequired = "refund.onlineRequired";

  static const String sosLabel = "sos.label";
  static const String sosDisclaimer = "sos.disclaimer";
  static const String sosEscalation = "sos.escalation";
}
