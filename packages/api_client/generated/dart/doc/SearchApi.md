# bike_local_generated_api_client.api.SearchApi

## Load the API package
```dart
import 'package:bike_local_generated_api_client/api.dart';
```

All URIs are relative to */api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**searchAssets**](SearchApi.md#searchassets) | **GET** /search/assets | Search available assets by date/time and filters.
[**searchStores**](SearchApi.md#searchstores) | **GET** /search/stores | Search stores by text, location, and filters.


# **searchAssets**
> ListAssets200Response searchAssets(q, storeId, branchId, startAt, endAt, limit, cursor, xCorrelationId)

Search available assets by date/time and filters.

### Example
```dart
import 'package:bike_local_generated_api_client/api.dart';
// TODO Configure API key authorization: appCheck
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKeyPrefix = 'Bearer';

final api = BikeLocalGeneratedApiClient().getSearchApi();
final String q = q_example; // String |
final String storeId = storeId_example; // String |
final String branchId = branchId_example; // String |
final DateTime startAt = 2013-10-20T19:20:30+01:00; // DateTime |
final DateTime endAt = 2013-10-20T19:20:30+01:00; // DateTime |
final int limit = 56; // int |
final String cursor = cursor_example; // String |
final String xCorrelationId = req_01HV9X8D9N9HQ; // String |

try {
    final response = api.searchAssets(q, storeId, branchId, startAt, endAt, limit, cursor, xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling SearchApi->searchAssets: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **q** | **String**|  | [optional]
 **storeId** | **String**|  | [optional]
 **branchId** | **String**|  | [optional]
 **startAt** | **DateTime**|  | [optional]
 **endAt** | **DateTime**|  | [optional]
 **limit** | **int**|  | [optional] [default to 20]
 **cursor** | **String**|  | [optional]
 **xCorrelationId** | **String**|  | [optional]

### Return type

[**ListAssets200Response**](ListAssets200Response.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **searchStores**
> ListStores200Response searchStores(q, latitude, longitude, limit, cursor, xCorrelationId)

Search stores by text, location, and filters.

### Example
```dart
import 'package:bike_local_generated_api_client/api.dart';
// TODO Configure API key authorization: appCheck
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKeyPrefix = 'Bearer';

final api = BikeLocalGeneratedApiClient().getSearchApi();
final String q = q_example; // String |
final num latitude = 8.14; // num |
final num longitude = 8.14; // num |
final int limit = 56; // int |
final String cursor = cursor_example; // String |
final String xCorrelationId = req_01HV9X8D9N9HQ; // String |

try {
    final response = api.searchStores(q, latitude, longitude, limit, cursor, xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling SearchApi->searchStores: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **q** | **String**|  | [optional]
 **latitude** | **num**|  | [optional]
 **longitude** | **num**|  | [optional]
 **limit** | **int**|  | [optional] [default to 20]
 **cursor** | **String**|  | [optional]
 **xCorrelationId** | **String**|  | [optional]

### Return type

[**ListStores200Response**](ListStores200Response.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)
