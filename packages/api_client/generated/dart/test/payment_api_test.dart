import 'package:test/test.dart';
import 'package:bike_local_generated_api_client/bike_local_generated_api_client.dart';


/// tests for PaymentApi
void main() {
  final instance = BikeLocalGeneratedApiClient().getPaymentApi();

  group(PaymentApi, () {
    // Confirm cash payment by authorized staff.
    //
    //Future<InlineObject5> confirmCashPayment(String id, String idempotencyKey, CashConfirmationRequest cashConfirmationRequest, { String xCorrelationId }) async
    test('test confirmCashPayment', () async {
      // TODO
    });

    // Create payment intent or cash payment record.
    //
    //Future<InlineObject5> createPayment(String idempotencyKey, CreatePaymentRequest createPaymentRequest, { String xCorrelationId }) async
    test('test createPayment', () async {
      // TODO
    });

    // Process provider webhook with server-side verification.
    //
    //Future<SuccessEnvelope> processPaymentWebhook(String provider, String idempotencyKey, BuiltMap<String, JsonObject> requestBody, { String xCorrelationId }) async
    test('test processPaymentWebhook', () async {
      // TODO
    });

  });
}
