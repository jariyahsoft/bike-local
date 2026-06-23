# bike_local_generated_api_client.api.ReturnApi

## Load the API package
```dart
import 'package:bike_local_generated_api_client/api.dart';
```

All URIs are relative to */api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**acceptReturnRequest**](ReturnApi.md#acceptreturnrequest) | **POST** /return-requests/{id}/accept | Accept return and record inspection.
[**createReturnRequest**](ReturnApi.md#createreturnrequest) | **POST** /return-requests | Request bike return with evidence.


# **acceptReturnRequest**
> InlineObject7 acceptReturnRequest(id, idempotencyKey, returnInspection, xCorrelationId)

Accept return and record inspection.

### Example
```dart
import 'package:bike_local_generated_api_client/api.dart';
// TODO Configure API key authorization: appCheck
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKeyPrefix = 'Bearer';

final api = BikeLocalGeneratedApiClient().getReturnApi();
final String id = id_example; // String |
final String idempotencyKey = idem_01HV9X8D9N9HQ; // String |
final ReturnInspection returnInspection = ; // ReturnInspection |
final String xCorrelationId = req_01HV9X8D9N9HQ; // String |

try {
    final response = api.acceptReturnRequest(id, idempotencyKey, returnInspection, xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling ReturnApi->acceptReturnRequest: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**|  |
 **idempotencyKey** | **String**|  |
 **returnInspection** | [**ReturnInspection**](ReturnInspection.md)|  |
 **xCorrelationId** | **String**|  | [optional]

### Return type

[**InlineObject7**](InlineObject7.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **createReturnRequest**
> InlineObject7 createReturnRequest(idempotencyKey, createReturnRequest, xCorrelationId)

Request bike return with evidence.

### Example
```dart
import 'package:bike_local_generated_api_client/api.dart';
// TODO Configure API key authorization: appCheck
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKeyPrefix = 'Bearer';

final api = BikeLocalGeneratedApiClient().getReturnApi();
final String idempotencyKey = idem_01HV9X8D9N9HQ; // String |
final CreateReturnRequest createReturnRequest = ; // CreateReturnRequest |
final String xCorrelationId = req_01HV9X8D9N9HQ; // String |

try {
    final response = api.createReturnRequest(idempotencyKey, createReturnRequest, xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling ReturnApi->createReturnRequest: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **idempotencyKey** | **String**|  |
 **createReturnRequest** | [**CreateReturnRequest**](CreateReturnRequest.md)|  |
 **xCorrelationId** | **String**|  | [optional]

### Return type

[**InlineObject7**](InlineObject7.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)
