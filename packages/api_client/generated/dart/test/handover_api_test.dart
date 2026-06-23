import 'package:test/test.dart';
import 'package:bike_local_generated_api_client/bike_local_generated_api_client.dart';


/// tests for HandoverApi
void main() {
  final instance = BikeLocalGeneratedApiClient().getHandoverApi();

  group(HandoverApi, () {
    // Perform handover checklist and start rental.
    //
    //Future<InlineObject4> handoverBooking(String id, String idempotencyKey, HandoverRequest handoverRequest, { String xCorrelationId }) async
    test('test handoverBooking', () async {
      // TODO
    });

  });
}
