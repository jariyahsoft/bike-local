# bike_local_generated_api_client.api.ReportsApi

## Load the API package
```dart
import 'package:bike_local_generated_api_client/api.dart';
```

All URIs are relative to */api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getPlatformReport**](ReportsApi.md#getplatformreport) | **GET** /reports/platform | Get platform overview report.
[**getStoreReport**](ReportsApi.md#getstorereport) | **GET** /reports/store | Get merchant rental and revenue report.


# **getPlatformReport**
> GetPlatformReport200Response getPlatformReport(from, to, xCorrelationId)

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
final String xCorrelationId = req_01HV9X8D9N9HQ; // String | 

try {
    final response = api.getPlatformReport(from, to, xCorrelationId);
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
 **xCorrelationId** | **String**|  | [optional] 

### Return type

[**GetPlatformReport200Response**](GetPlatformReport200Response.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getStoreReport**
> GetStoreReport200Response getStoreReport(from, to, storeId, xCorrelationId)

Get merchant rental and revenue report.

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
final String storeId = storeId_example; // String | 
final String xCorrelationId = req_01HV9X8D9N9HQ; // String | 

try {
    final response = api.getStoreReport(from, to, storeId, xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling ReportsApi->getStoreReport: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **from** | **DateTime**|  | 
 **to** | **DateTime**|  | 
 **storeId** | **String**|  | [optional] 
 **xCorrelationId** | **String**|  | [optional] 

### Return type

[**GetStoreReport200Response**](GetStoreReport200Response.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

