import 'package:test/test.dart';
import 'package:bike_local_generated_api_client/bike_local_generated_api_client.dart';


/// tests for PricingApi
void main() {
  final instance = BikeLocalGeneratedApiClient().getPricingApi();

  group(PricingApi, () {
    // Calculate price and deposit quote before booking.
    //
    //Future<CreatePricingQuote200Response> createPricingQuote(PricingQuoteRequest pricingQuoteRequest, { String xCorrelationId }) async
    test('test createPricingQuote', () async {
      // TODO
    });

  });
}
