import 'package:test/test.dart';
import 'package:bike_local_generated_api_client/bike_local_generated_api_client.dart';


/// tests for BranchesApi
void main() {
  final instance = BikeLocalGeneratedApiClient().getBranchesApi();

  group(BranchesApi, () {
    // Create branch under a store.
    //
    //Future<InlineObject2> createBranch(String storeId, String idempotencyKey, CreateBranchRequest createBranchRequest, { String xCorrelationId }) async
    test('test createBranch', () async {
      // TODO
    });

    // Get branch by ID.
    //
    //Future<InlineObject2> getBranch(String id, { String xCorrelationId }) async
    test('test getBranch', () async {
      // TODO
    });

  });
}
