import 'package:test/test.dart';
import 'package:bike_local_generated_api_client/bike_local_generated_api_client.dart';


/// tests for SOSApi
void main() {
  final instance = BikeLocalGeneratedApiClient().getSOSApi();

  group(SOSApi, () {
    // Acknowledge SOS case by authorized staff.
    //
    //Future<InlineObject8> acknowledgeSosCase(String id, String idempotencyKey, { String xCorrelationId }) async
    test('test acknowledgeSosCase', () async {
      // TODO
    });

    // Open SOS case during active ride.
    //
    //Future<InlineObject8> createSosCase(String idempotencyKey, CreateSosCaseRequest createSosCaseRequest, { String xCorrelationId }) async
    test('test createSosCase', () async {
      // TODO
    });

  });
}
