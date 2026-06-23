# bike_local_generated_api_client.api.StoresApi

## Load the API package
```dart
import 'package:bike_local_generated_api_client/api.dart';
```

All URIs are relative to */api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createStore**](StoresApi.md#createstore) | **POST** /stores | Create store draft for approval.
[**decideStoreApproval**](StoresApi.md#decidestoreapproval) | **POST** /stores/{id}/approval-decisions | Record a platform approval, rejection, revision, suspension, or closure decision.
[**listStores**](StoresApi.md#liststores) | **GET** /stores | List stores visible to the current user.
[**submitStore**](StoresApi.md#submitstore) | **POST** /stores/{id}/submit | Submit a draft or revision-required store for platform approval.
[**updateStore**](StoresApi.md#updatestore) | **PATCH** /stores/{id} | Update store details with optimistic concurrency.


# **createStore**
> InlineObject1 createStore(idempotencyKey, createStoreRequest, xCorrelationId)

Create store draft for approval.

### Example
```dart
import 'package:bike_local_generated_api_client/api.dart';
// TODO Configure API key authorization: appCheck
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKeyPrefix = 'Bearer';

final api = BikeLocalGeneratedApiClient().getStoresApi();
final String idempotencyKey = idem_01HV9X8D9N9HQ; // String |
final CreateStoreRequest createStoreRequest = ; // CreateStoreRequest |
final String xCorrelationId = req_01HV9X8D9N9HQ; // String |

try {
    final response = api.createStore(idempotencyKey, createStoreRequest, xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling StoresApi->createStore: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **idempotencyKey** | **String**|  |
 **createStoreRequest** | [**CreateStoreRequest**](CreateStoreRequest.md)|  |
 **xCorrelationId** | **String**|  | [optional]

### Return type

[**InlineObject1**](InlineObject1.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **decideStoreApproval**
> InlineObject1 decideStoreApproval(id, storeApprovalDecisionRequest, xCorrelationId)

Record a platform approval, rejection, revision, suspension, or closure decision.

### Example
```dart
import 'package:bike_local_generated_api_client/api.dart';
// TODO Configure API key authorization: appCheck
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKeyPrefix = 'Bearer';

final api = BikeLocalGeneratedApiClient().getStoresApi();
final String id = id_example; // String |
final StoreApprovalDecisionRequest storeApprovalDecisionRequest = ; // StoreApprovalDecisionRequest |
final String xCorrelationId = req_01HV9X8D9N9HQ; // String |

try {
    final response = api.decideStoreApproval(id, storeApprovalDecisionRequest, xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling StoresApi->decideStoreApproval: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**|  |
 **storeApprovalDecisionRequest** | [**StoreApprovalDecisionRequest**](StoreApprovalDecisionRequest.md)|  |
 **xCorrelationId** | **String**|  | [optional]

### Return type

[**InlineObject1**](InlineObject1.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **listStores**
> ListStores200Response listStores(limit, cursor, xCorrelationId)

List stores visible to the current user.

### Example
```dart
import 'package:bike_local_generated_api_client/api.dart';
// TODO Configure API key authorization: appCheck
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKeyPrefix = 'Bearer';

final api = BikeLocalGeneratedApiClient().getStoresApi();
final int limit = 56; // int |
final String cursor = cursor_example; // String |
final String xCorrelationId = req_01HV9X8D9N9HQ; // String |

try {
    final response = api.listStores(limit, cursor, xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling StoresApi->listStores: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
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

# **submitStore**
> InlineObject1 submitStore(id, submitStoreRequest, xCorrelationId)

Submit a draft or revision-required store for platform approval.

### Example
```dart
import 'package:bike_local_generated_api_client/api.dart';
// TODO Configure API key authorization: appCheck
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKeyPrefix = 'Bearer';

final api = BikeLocalGeneratedApiClient().getStoresApi();
final String id = id_example; // String |
final SubmitStoreRequest submitStoreRequest = ; // SubmitStoreRequest |
final String xCorrelationId = req_01HV9X8D9N9HQ; // String |

try {
    final response = api.submitStore(id, submitStoreRequest, xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling StoresApi->submitStore: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**|  |
 **submitStoreRequest** | [**SubmitStoreRequest**](SubmitStoreRequest.md)|  |
 **xCorrelationId** | **String**|  | [optional]

### Return type

[**InlineObject1**](InlineObject1.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateStore**
> InlineObject1 updateStore(id, updateStoreRequest, xCorrelationId)

Update store details with optimistic concurrency.

### Example
```dart
import 'package:bike_local_generated_api_client/api.dart';
// TODO Configure API key authorization: appCheck
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKeyPrefix = 'Bearer';

final api = BikeLocalGeneratedApiClient().getStoresApi();
final String id = id_example; // String |
final UpdateStoreRequest updateStoreRequest = ; // UpdateStoreRequest |
final String xCorrelationId = req_01HV9X8D9N9HQ; // String |

try {
    final response = api.updateStore(id, updateStoreRequest, xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling StoresApi->updateStore: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**|  |
 **updateStoreRequest** | [**UpdateStoreRequest**](UpdateStoreRequest.md)|  |
 **xCorrelationId** | **String**|  | [optional]

### Return type

[**InlineObject1**](InlineObject1.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)
