import 'package:test/test.dart';
import 'package:bike_local_generated_api_client/bike_local_generated_api_client.dart';


/// tests for BookingApi
void main() {
  final instance = BikeLocalGeneratedApiClient().getBookingApi();

  group(BookingApi, () {
    // Cancel booking and calculate refund eligibility.
    //
    //Future<InlineObject4> cancelBooking(String id, String idempotencyKey, CancelBookingRequest cancelBookingRequest, { String xCorrelationId }) async
    test('test cancelBooking', () async {
      // TODO
    });

    // Create booking with asset hold.
    //
    //Future<InlineObject4> createBooking(String idempotencyKey, CreateBookingRequest createBookingRequest, { String xCorrelationId }) async
    test('test createBooking', () async {
      // TODO
    });

    // Get booking by ID.
    //
    //Future<InlineObject4> getBooking(String id, { String xCorrelationId }) async
    test('test getBooking', () async {
      // TODO
    });

  });
}
