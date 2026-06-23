# bike_local_generated_api_client.api.BranchesApi

## Load the API package
```dart
import 'package:bike_local_generated_api_client/api.dart';
```

All URIs are relative to */api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createBranch**](BranchesApi.md#createbranch) | **POST** /stores/{store_id}/branches | Create branch under a store.
[**createRentalPoint**](BranchesApi.md#createrentalpoint) | **POST** /rental-points | Create a pickup or return point for an active branch.
[**getBranch**](BranchesApi.md#getbranch) | **GET** /branches/{id} | Get branch by ID.
[**updateBranch**](BranchesApi.md#updatebranch) | **PATCH** /branches/{id} | Update branch details or temporary closure state.


# **createBranch**
> InlineObject2 createBranch(storeId, idempotencyKey, createBranchRequest, xCorrelationId)

Create branch under a store.

### Example
```dart
import 'package:bike_local_generated_api_client/api.dart';
// TODO Configure API key authorization: appCheck
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKeyPrefix = 'Bearer';

final api = BikeLocalGeneratedApiClient().getBranchesApi();
final String storeId = storeId_example; // String |
final String idempotencyKey = idem_01HV9X8D9N9HQ; // String |
final CreateBranchRequest createBranchRequest = ; // CreateBranchRequest |
final String xCorrelationId = req_01HV9X8D9N9HQ; // String |

try {
    final response = api.createBranch(storeId, idempotencyKey, createBranchRequest, xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling BranchesApi->createBranch: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **storeId** | **String**|  |
 **idempotencyKey** | **String**|  |
 **createBranchRequest** | [**CreateBranchRequest**](CreateBranchRequest.md)|  |
 **xCorrelationId** | **String**|  | [optional]

### Return type

[**InlineObject2**](InlineObject2.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **createRentalPoint**
> CreateRentalPoint201Response createRentalPoint(idempotencyKey, createRentalPointRequest, xCorrelationId)

Create a pickup or return point for an active branch.

### Example
```dart
import 'package:bike_local_generated_api_client/api.dart';
// TODO Configure API key authorization: appCheck
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKeyPrefix = 'Bearer';

final api = BikeLocalGeneratedApiClient().getBranchesApi();
final String idempotencyKey = idem_01HV9X8D9N9HQ; // String |
final CreateRentalPointRequest createRentalPointRequest = ; // CreateRentalPointRequest |
final String xCorrelationId = req_01HV9X8D9N9HQ; // String |

try {
    final response = api.createRentalPoint(idempotencyKey, createRentalPointRequest, xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling BranchesApi->createRentalPoint: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **idempotencyKey** | **String**|  |
 **createRentalPointRequest** | [**CreateRentalPointRequest**](CreateRentalPointRequest.md)|  |
 **xCorrelationId** | **String**|  | [optional]

### Return type

[**CreateRentalPoint201Response**](CreateRentalPoint201Response.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getBranch**
> InlineObject2 getBranch(id, xCorrelationId)

Get branch by ID.

### Example
```dart
import 'package:bike_local_generated_api_client/api.dart';
// TODO Configure API key authorization: appCheck
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKeyPrefix = 'Bearer';

final api = BikeLocalGeneratedApiClient().getBranchesApi();
final String id = id_example; // String |
final String xCorrelationId = req_01HV9X8D9N9HQ; // String |

try {
    final response = api.getBranch(id, xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling BranchesApi->getBranch: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**|  |
 **xCorrelationId** | **String**|  | [optional]

### Return type

[**InlineObject2**](InlineObject2.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateBranch**
> InlineObject2 updateBranch(id, updateBranchRequest, xCorrelationId)

Update branch details or temporary closure state.

### Example
```dart
import 'package:bike_local_generated_api_client/api.dart';
// TODO Configure API key authorization: appCheck
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKeyPrefix = 'Bearer';

final api = BikeLocalGeneratedApiClient().getBranchesApi();
final String id = id_example; // String |
final UpdateBranchRequest updateBranchRequest = ; // UpdateBranchRequest |
final String xCorrelationId = req_01HV9X8D9N9HQ; // String |

try {
    final response = api.updateBranch(id, updateBranchRequest, xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling BranchesApi->updateBranch: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**|  |
 **updateBranchRequest** | [**UpdateBranchRequest**](UpdateBranchRequest.md)|  |
 **xCorrelationId** | **String**|  | [optional]

### Return type

[**InlineObject2**](InlineObject2.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)
