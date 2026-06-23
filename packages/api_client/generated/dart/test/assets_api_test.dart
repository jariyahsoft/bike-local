import 'package:test/test.dart';
import 'package:bike_local_generated_api_client/bike_local_generated_api_client.dart';


/// tests for AssetsApi
void main() {
  final instance = BikeLocalGeneratedApiClient().getAssetsApi();

  group(AssetsApi, () {
    // Create rentable asset.
    //
    //Future<InlineObject3> createAsset(String idempotencyKey, CreateAssetRequest createAssetRequest, { String xCorrelationId }) async
    test('test createAsset', () async {
      // TODO
    });

    // List assets by allowed filters.
    //
    //Future<ListAssets200Response> listAssets({ String storeId, String branchId, int limit, String cursor, String xCorrelationId }) async
    test('test listAssets', () async {
      // TODO
    });

    // Update asset data or status.
    //
    //Future<InlineObject3> updateAsset(String id, UpdateAssetRequest updateAssetRequest, { String xCorrelationId }) async
    test('test updateAsset', () async {
      // TODO
    });

  });
}
