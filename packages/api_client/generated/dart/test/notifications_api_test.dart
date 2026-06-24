import 'package:test/test.dart';
import 'package:bike_local_generated_api_client/bike_local_generated_api_client.dart';


/// tests for NotificationsApi
void main() {
  final instance = BikeLocalGeneratedApiClient().getNotificationsApi();

  group(NotificationsApi, () {
    // List inbox notifications for the signed-in user.
    //
    //Future<InlineObject11> listNotifications({ String xCorrelationId }) async
    test('test listNotifications', () async {
      // TODO
    });

    // Mark a notification as read by its recipient.
    //
    //Future<InlineObject10> markNotificationRead(String id, String idempotencyKey, { String xCorrelationId }) async
    test('test markNotificationRead', () async {
      // TODO
    });

    // Register or refresh an FCM device token reference for the signed-in user.
    //
    //Future<InlineObject9> registerNotificationDevice(String idempotencyKey, RegisterNotificationDeviceRequest registerNotificationDeviceRequest, { String xCorrelationId }) async
    test('test registerNotificationDevice', () async {
      // TODO
    });

  });
}
