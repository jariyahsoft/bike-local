import 'package:test/test.dart';
import 'package:bike_local_generated_api_client/bike_local_generated_api_client.dart';


/// tests for ReportsApi
void main() {
  final instance = BikeLocalGeneratedApiClient().getReportsApi();

  group(ReportsApi, () {
    // Get platform overview report.
    //
    //Future<GetPlatformReport200Response> getPlatformReport(DateTime from, DateTime to, { String xCorrelationId }) async
    test('test getPlatformReport', () async {
      // TODO
    });

    // Get merchant rental and revenue report.
    //
    //Future<GetStoreReport200Response> getStoreReport(DateTime from, DateTime to, { String storeId, String xCorrelationId }) async
    test('test getStoreReport', () async {
      // TODO
    });

  });
}
