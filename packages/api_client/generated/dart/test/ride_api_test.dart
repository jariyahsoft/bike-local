import 'package:test/test.dart';
import 'package:bike_local_generated_api_client/bike_local_generated_api_client.dart';


/// tests for RideApi
void main() {
  final instance = BikeLocalGeneratedApiClient().getRideApi();

  group(RideApi, () {
    // Start ride session for an in-progress rental.
    //
    //Future<InlineObject6> createRideSession(String idempotencyKey, CreateRideSessionRequest createRideSessionRequest, { String xCorrelationId }) async
    test('test createRideSession', () async {
      // TODO
    });

    // End ride session without closing rental.
    //
    //Future<InlineObject6> endRideSession(String id, String idempotencyKey, EndRideSessionRequest endRideSessionRequest, { String xCorrelationId }) async
    test('test endRideSession', () async {
      // TODO
    });

    // Upload buffered GPS track chunk.
    //
    //Future<UploadRideTrackChunk202Response> uploadRideTrackChunk(String id, String idempotencyKey, RideTrackChunk rideTrackChunk, { String xCorrelationId }) async
    test('test uploadRideTrackChunk', () async {
      // TODO
    });

  });
}
