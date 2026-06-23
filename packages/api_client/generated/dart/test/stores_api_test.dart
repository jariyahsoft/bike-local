import 'package:test/test.dart';
import 'package:bike_local_generated_api_client/bike_local_generated_api_client.dart';


/// tests for StoresApi
void main() {
  final instance = BikeLocalGeneratedApiClient().getStoresApi();

  group(StoresApi, () {
    // Create store draft for approval.
    //
    //Future<InlineObject1> createStore(String idempotencyKey, CreateStoreRequest createStoreRequest, { String xCorrelationId }) async
    test('test createStore', () async {
      // TODO
    });

    // List stores visible to the current user.
    //
    //Future<ListStores200Response> listStores({ int limit, String cursor, String xCorrelationId }) async
    test('test listStores', () async {
      // TODO
    });

    // Update store details with optimistic concurrency.
    //
    //Future<InlineObject1> updateStore(String id, UpdateStoreRequest updateStoreRequest, { String xCorrelationId }) async
    test('test updateStore', () async {
      // TODO
    });

  });
}
