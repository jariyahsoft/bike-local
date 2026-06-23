import 'package:test/test.dart';
import 'package:bike_local_generated_api_client/bike_local_generated_api_client.dart';


/// tests for SearchApi
void main() {
  final instance = BikeLocalGeneratedApiClient().getSearchApi();

  group(SearchApi, () {
    // Search available assets by date/time and filters.
    //
    //Future<ListAssets200Response> searchAssets({ String q, String storeId, String branchId, DateTime startAt, DateTime endAt, int limit, String cursor, String xCorrelationId }) async
    test('test searchAssets', () async {
      // TODO
    });

    // Search stores by text, location, and filters.
    //
    //Future<ListStores200Response> searchStores({ String q, num latitude, num longitude, int limit, String cursor, String xCorrelationId }) async
    test('test searchStores', () async {
      // TODO
    });

  });
}
