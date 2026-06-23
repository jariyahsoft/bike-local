import 'package:test/test.dart';
import 'package:bike_local_generated_api_client/bike_local_generated_api_client.dart';


/// tests for ContentApi
void main() {
  final instance = BikeLocalGeneratedApiClient().getContentApi();

  group(ContentApi, () {
    // Approve route/place/review content.
    //
    //Future<ApproveContentSubmission200Response> approveContentSubmission(String id, String idempotencyKey, { String xCorrelationId }) async
    test('test approveContentSubmission', () async {
      // TODO
    });

    // Submit place content for approval.
    //
    //Future<CreatePlace201Response> createPlace(String idempotencyKey, Place place, { String xCorrelationId }) async
    test('test createPlace', () async {
      // TODO
    });

    // Submit route content for approval.
    //
    //Future<CreateRoute201Response> createRoute(String idempotencyKey, Route route, { String xCorrelationId }) async
    test('test createRoute', () async {
      // TODO
    });

  });
}
