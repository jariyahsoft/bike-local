import 'package:test/test.dart';
import 'package:bike_local_generated_api_client/bike_local_generated_api_client.dart';


/// tests for IdentityApi
void main() {
  final instance = BikeLocalGeneratedApiClient().getIdentityApi();

  group(IdentityApi, () {
    // Create domain user profile after authentication.
    //
    //Future<InlineObject> createUser(String idempotencyKey, CreateUserRequest createUserRequest, { String xCorrelationId }) async
    test('test createUser', () async {
      // TODO
    });

    // Get current user profile and auth identities.
    //
    //Future<InlineObject> getMe({ String xCorrelationId }) async
    test('test getMe', () async {
      // TODO
    });

    // Update current user profile.
    //
    //Future<InlineObject> updateMe(UpdateUserRequest updateUserRequest, { String xCorrelationId }) async
    test('test updateMe', () async {
      // TODO
    });

  });
}
