import 'package:test/test.dart';
import 'package:bike_local_generated_api_client/bike_local_generated_api_client.dart';


/// tests for ReturnApi
void main() {
  final instance = BikeLocalGeneratedApiClient().getReturnApi();

  group(ReturnApi, () {
    // Accept return and record inspection.
    //
    //Future<InlineObject7> acceptReturnRequest(String id, String idempotencyKey, ReturnInspection returnInspection, { String xCorrelationId }) async
    test('test acceptReturnRequest', () async {
      // TODO
    });

    // Request bike return with evidence.
    //
    //Future<InlineObject7> createReturnRequest(String idempotencyKey, CreateReturnRequest createReturnRequest, { String xCorrelationId }) async
    test('test createReturnRequest', () async {
      // TODO
    });

  });
}
