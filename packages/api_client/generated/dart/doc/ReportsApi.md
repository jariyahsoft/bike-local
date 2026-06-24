# bike_local_generated_api_client.api.ReportsApi

## Load the API package
```dart
import 'package:bike_local_generated_api_client/api.dart';
```

All URIs are relative to */api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**approveSettlement**](ReportsApi.md#approvesettlement) | **POST** /settlements/{id}/approve | Approve a draft settlement.
[**createReportExport**](ReportsApi.md#createreportexport) | **POST** /report-exports | Create a filtered report export.
[**createSettlement**](ReportsApi.md#createsettlement) | **POST** /settlements | Calculate and create a draft store settlement.
[**getAssetReport**](ReportsApi.md#getassetreport) | **GET** /reports/store/assets | Get merchant asset performance report.
[**getPlatformReport**](ReportsApi.md#getplatformreport) | **GET** /reports/platform | Get platform overview report.
[**getStaffReport**](ReportsApi.md#getstaffreport) | **GET** /reports/store/staff | Get merchant staff operations report.
[**getStoreRentalReport**](ReportsApi.md#getstorerentalreport) | **GET** /reports/store/rental | Get merchant rental report.
[**getStoreRevenueReport**](ReportsApi.md#getstorerevenuereport) | **GET** /reports/store/revenue | Get merchant revenue report.
[**markSettlementPaid**](ReportsApi.md#marksettlementpaid) | **POST** /settlements/{id}/paid | Mark a requested settlement payment as paid.
[**requestSettlementPayment**](ReportsApi.md#requestsettlementpayment) | **POST** /settlements/{id}/payment-request | Mark an approved settlement as payment requested.


# **approveSettlement**
> InlineObject22 approveSettlement(id, idempotencyKey, tenantId, storeId, xCorrelationId)

Approve a draft settlement.

### Example
```dart
import 'package:bike_local_generated_api_client/api.dart';
// TODO Configure API key authorization: appCheck
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKeyPrefix = 'Bearer';

final api = BikeLocalGeneratedApiClient().getReportsApi();
final String id = id_example; // String | 
final String idempotencyKey = idem_01HV9X8D9N9HQ; // String | 
final String tenantId = tenantId_example; // String | 
final String storeId = storeId_example; // String | 
final String xCorrelationId = req_01HV9X8D9N9HQ; // String | 

try {
    final response = api.approveSettlement(id, idempotencyKey, tenantId, storeId, xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling ReportsApi->approveSettlement: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**|  | 
 **idempotencyKey** | **String**|  | 
 **tenantId** | **String**|  | [optional] 
 **storeId** | **String**|  | [optional] 
 **xCorrelationId** | **String**|  | [optional] 

### Return type

[**InlineObject22**](InlineObject22.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **createReportExport**
> InlineObject23 createReportExport(from, to, idempotencyKey, createReportExportRequest, tenantId, storeId, branchId, xCorrelationId)

Create a filtered report export.

### Example
```dart
import 'package:bike_local_generated_api_client/api.dart';
// TODO Configure API key authorization: appCheck
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKeyPrefix = 'Bearer';

final api = BikeLocalGeneratedApiClient().getReportsApi();
final DateTime from = 2013-10-20T19:20:30+01:00; // DateTime | 
final DateTime to = 2013-10-20T19:20:30+01:00; // DateTime | 
final String idempotencyKey = idem_01HV9X8D9N9HQ; // String | 
final CreateReportExportRequest createReportExportRequest = ; // CreateReportExportRequest | 
final String tenantId = tenantId_example; // String | 
final String storeId = storeId_example; // String | 
final String branchId = branchId_example; // String | 
final String xCorrelationId = req_01HV9X8D9N9HQ; // String | 

try {
    final response = api.createReportExport(from, to, idempotencyKey, createReportExportRequest, tenantId, storeId, branchId, xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling ReportsApi->createReportExport: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **from** | **DateTime**|  | 
 **to** | **DateTime**|  | 
 **idempotencyKey** | **String**|  | 
 **createReportExportRequest** | [**CreateReportExportRequest**](CreateReportExportRequest.md)|  | 
 **tenantId** | **String**|  | [optional] 
 **storeId** | **String**|  | [optional] 
 **branchId** | **String**|  | [optional] 
 **xCorrelationId** | **String**|  | [optional] 

### Return type

[**InlineObject23**](InlineObject23.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **createSettlement**
> InlineObject22 createSettlement(from, to, idempotencyKey, tenantId, storeId, branchId, xCorrelationId)

Calculate and create a draft store settlement.

### Example
```dart
import 'package:bike_local_generated_api_client/api.dart';
// TODO Configure API key authorization: appCheck
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKeyPrefix = 'Bearer';

final api = BikeLocalGeneratedApiClient().getReportsApi();
final DateTime from = 2013-10-20T19:20:30+01:00; // DateTime | 
final DateTime to = 2013-10-20T19:20:30+01:00; // DateTime | 
final String idempotencyKey = idem_01HV9X8D9N9HQ; // String | 
final String tenantId = tenantId_example; // String | 
final String storeId = storeId_example; // String | 
final String branchId = branchId_example; // String | 
final String xCorrelationId = req_01HV9X8D9N9HQ; // String | 

try {
    final response = api.createSettlement(from, to, idempotencyKey, tenantId, storeId, branchId, xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling ReportsApi->createSettlement: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **from** | **DateTime**|  | 
 **to** | **DateTime**|  | 
 **idempotencyKey** | **String**|  | 
 **tenantId** | **String**|  | [optional] 
 **storeId** | **String**|  | [optional] 
 **branchId** | **String**|  | [optional] 
 **xCorrelationId** | **String**|  | [optional] 

### Return type

[**InlineObject22**](InlineObject22.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getAssetReport**
> InlineObject19 getAssetReport(from, to, tenantId, storeId, branchId, xCorrelationId)

Get merchant asset performance report.

### Example
```dart
import 'package:bike_local_generated_api_client/api.dart';
// TODO Configure API key authorization: appCheck
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKeyPrefix = 'Bearer';

final api = BikeLocalGeneratedApiClient().getReportsApi();
final DateTime from = 2013-10-20T19:20:30+01:00; // DateTime | 
final DateTime to = 2013-10-20T19:20:30+01:00; // DateTime | 
final String tenantId = tenantId_example; // String | 
final String storeId = storeId_example; // String | 
final String branchId = branchId_example; // String | 
final String xCorrelationId = req_01HV9X8D9N9HQ; // String | 

try {
    final response = api.getAssetReport(from, to, tenantId, storeId, branchId, xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling ReportsApi->getAssetReport: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **from** | **DateTime**|  | 
 **to** | **DateTime**|  | 
 **tenantId** | **String**|  | [optional] 
 **storeId** | **String**|  | [optional] 
 **branchId** | **String**|  | [optional] 
 **xCorrelationId** | **String**|  | [optional] 

### Return type

[**InlineObject19**](InlineObject19.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getPlatformReport**
> InlineObject21 getPlatformReport(from, to, tenantId, xCorrelationId)

Get platform overview report.

### Example
```dart
import 'package:bike_local_generated_api_client/api.dart';
// TODO Configure API key authorization: appCheck
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKeyPrefix = 'Bearer';

final api = BikeLocalGeneratedApiClient().getReportsApi();
final DateTime from = 2013-10-20T19:20:30+01:00; // DateTime | 
final DateTime to = 2013-10-20T19:20:30+01:00; // DateTime | 
final String tenantId = tenantId_example; // String | 
final String xCorrelationId = req_01HV9X8D9N9HQ; // String | 

try {
    final response = api.getPlatformReport(from, to, tenantId, xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling ReportsApi->getPlatformReport: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **from** | **DateTime**|  | 
 **to** | **DateTime**|  | 
 **tenantId** | **String**|  | [optional] 
 **xCorrelationId** | **String**|  | [optional] 

### Return type

[**InlineObject21**](InlineObject21.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getStaffReport**
> InlineObject20 getStaffReport(from, to, tenantId, storeId, branchId, xCorrelationId)

Get merchant staff operations report.

### Example
```dart
import 'package:bike_local_generated_api_client/api.dart';
// TODO Configure API key authorization: appCheck
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKeyPrefix = 'Bearer';

final api = BikeLocalGeneratedApiClient().getReportsApi();
final DateTime from = 2013-10-20T19:20:30+01:00; // DateTime | 
final DateTime to = 2013-10-20T19:20:30+01:00; // DateTime | 
final String tenantId = tenantId_example; // String | 
final String storeId = storeId_example; // String | 
final String branchId = branchId_example; // String | 
final String xCorrelationId = req_01HV9X8D9N9HQ; // String | 

try {
    final response = api.getStaffReport(from, to, tenantId, storeId, branchId, xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling ReportsApi->getStaffReport: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **from** | **DateTime**|  | 
 **to** | **DateTime**|  | 
 **tenantId** | **String**|  | [optional] 
 **storeId** | **String**|  | [optional] 
 **branchId** | **String**|  | [optional] 
 **xCorrelationId** | **String**|  | [optional] 

### Return type

[**InlineObject20**](InlineObject20.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getStoreRentalReport**
> InlineObject17 getStoreRentalReport(from, to, tenantId, storeId, branchId, xCorrelationId)

Get merchant rental report.

### Example
```dart
import 'package:bike_local_generated_api_client/api.dart';
// TODO Configure API key authorization: appCheck
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKeyPrefix = 'Bearer';

final api = BikeLocalGeneratedApiClient().getReportsApi();
final DateTime from = 2013-10-20T19:20:30+01:00; // DateTime | 
final DateTime to = 2013-10-20T19:20:30+01:00; // DateTime | 
final String tenantId = tenantId_example; // String | 
final String storeId = storeId_example; // String | 
final String branchId = branchId_example; // String | 
final String xCorrelationId = req_01HV9X8D9N9HQ; // String | 

try {
    final response = api.getStoreRentalReport(from, to, tenantId, storeId, branchId, xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling ReportsApi->getStoreRentalReport: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **from** | **DateTime**|  | 
 **to** | **DateTime**|  | 
 **tenantId** | **String**|  | [optional] 
 **storeId** | **String**|  | [optional] 
 **branchId** | **String**|  | [optional] 
 **xCorrelationId** | **String**|  | [optional] 

### Return type

[**InlineObject17**](InlineObject17.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getStoreRevenueReport**
> InlineObject18 getStoreRevenueReport(from, to, tenantId, storeId, branchId, xCorrelationId)

Get merchant revenue report.

### Example
```dart
import 'package:bike_local_generated_api_client/api.dart';
// TODO Configure API key authorization: appCheck
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKeyPrefix = 'Bearer';

final api = BikeLocalGeneratedApiClient().getReportsApi();
final DateTime from = 2013-10-20T19:20:30+01:00; // DateTime | 
final DateTime to = 2013-10-20T19:20:30+01:00; // DateTime | 
final String tenantId = tenantId_example; // String | 
final String storeId = storeId_example; // String | 
final String branchId = branchId_example; // String | 
final String xCorrelationId = req_01HV9X8D9N9HQ; // String | 

try {
    final response = api.getStoreRevenueReport(from, to, tenantId, storeId, branchId, xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling ReportsApi->getStoreRevenueReport: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **from** | **DateTime**|  | 
 **to** | **DateTime**|  | 
 **tenantId** | **String**|  | [optional] 
 **storeId** | **String**|  | [optional] 
 **branchId** | **String**|  | [optional] 
 **xCorrelationId** | **String**|  | [optional] 

### Return type

[**InlineObject18**](InlineObject18.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **markSettlementPaid**
> InlineObject22 markSettlementPaid(id, idempotencyKey, tenantId, storeId, xCorrelationId)

Mark a requested settlement payment as paid.

### Example
```dart
import 'package:bike_local_generated_api_client/api.dart';
// TODO Configure API key authorization: appCheck
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKeyPrefix = 'Bearer';

final api = BikeLocalGeneratedApiClient().getReportsApi();
final String id = id_example; // String | 
final String idempotencyKey = idem_01HV9X8D9N9HQ; // String | 
final String tenantId = tenantId_example; // String | 
final String storeId = storeId_example; // String | 
final String xCorrelationId = req_01HV9X8D9N9HQ; // String | 

try {
    final response = api.markSettlementPaid(id, idempotencyKey, tenantId, storeId, xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling ReportsApi->markSettlementPaid: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**|  | 
 **idempotencyKey** | **String**|  | 
 **tenantId** | **String**|  | [optional] 
 **storeId** | **String**|  | [optional] 
 **xCorrelationId** | **String**|  | [optional] 

### Return type

[**InlineObject22**](InlineObject22.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **requestSettlementPayment**
> InlineObject22 requestSettlementPayment(id, idempotencyKey, tenantId, storeId, xCorrelationId)

Mark an approved settlement as payment requested.

### Example
```dart
import 'package:bike_local_generated_api_client/api.dart';
// TODO Configure API key authorization: appCheck
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKeyPrefix = 'Bearer';

final api = BikeLocalGeneratedApiClient().getReportsApi();
final String id = id_example; // String | 
final String idempotencyKey = idem_01HV9X8D9N9HQ; // String | 
final String tenantId = tenantId_example; // String | 
final String storeId = storeId_example; // String | 
final String xCorrelationId = req_01HV9X8D9N9HQ; // String | 

try {
    final response = api.requestSettlementPayment(id, idempotencyKey, tenantId, storeId, xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling ReportsApi->requestSettlementPayment: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**|  | 
 **idempotencyKey** | **String**|  | 
 **tenantId** | **String**|  | [optional] 
 **storeId** | **String**|  | [optional] 
 **xCorrelationId** | **String**|  | [optional] 

### Return type

[**InlineObject22**](InlineObject22.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

