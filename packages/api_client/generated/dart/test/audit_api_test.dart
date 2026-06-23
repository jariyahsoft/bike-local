import 'package:test/test.dart';
import 'package:bike_local_generated_api_client/bike_local_generated_api_client.dart';


/// tests for AuditApi
void main() {
  final instance = BikeLocalGeneratedApiClient().getAuditApi();

  group(AuditApi, () {
    // Search audit logs.
    //
    //Future<ListAuditLogs200Response> listAuditLogs({ String resourceType, String resourceId, String actorUserId, int limit, String cursor, String xCorrelationId }) async
    test('test listAuditLogs', () async {
      // TODO
    });

  });
}
