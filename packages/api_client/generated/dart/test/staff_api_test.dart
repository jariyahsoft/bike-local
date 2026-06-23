import 'package:test/test.dart';
import 'package:bike_local_generated_api_client/bike_local_generated_api_client.dart';


/// tests for StaffApi
void main() {
  final instance = BikeLocalGeneratedApiClient().getStaffApi();

  group(StaffApi, () {
    // Invite staff to a store.
    //
    //Future<CreateStaffInvitation202Response> createStaffInvitation(String storeId, String idempotencyKey, CreateStaffInvitationRequest createStaffInvitationRequest, { String xCorrelationId }) async
    test('test createStaffInvitation', () async {
      // TODO
    });

    // Update store member role, branch access, or status.
    //
    //Future<UpdateStoreMember200Response> updateStoreMember(String id, UpdateStoreMemberRequest updateStoreMemberRequest, { String xCorrelationId }) async
    test('test updateStoreMember', () async {
      // TODO
    });

  });
}
