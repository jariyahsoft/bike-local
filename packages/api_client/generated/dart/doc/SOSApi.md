# bike_local_generated_api_client.api.SOSApi

## Load the API package
```dart
import 'package:bike_local_generated_api_client/api.dart';
```

All URIs are relative to */api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**acknowledgeSosCase**](SOSApi.md#acknowledgesoscase) | **POST** /sos-cases/{id}/acknowledge | Acknowledge SOS case by authorized staff.
[**createSosCase**](SOSApi.md#createsoscase) | **POST** /sos-cases | Open SOS case during active ride.


# **acknowledgeSosCase**
> InlineObject8 acknowledgeSosCase(id, idempotencyKey, xCorrelationId)

Acknowledge SOS case by authorized staff.

### Example
```dart
import 'package:bike_local_generated_api_client/api.dart';
// TODO Configure API key authorization: appCheck
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKeyPrefix = 'Bearer';

final api = BikeLocalGeneratedApiClient().getSOSApi();
final String id = id_example; // String | 
final String idempotencyKey = idem_01HV9X8D9N9HQ; // String | 
final String xCorrelationId = req_01HV9X8D9N9HQ; // String | 

try {
    final response = api.acknowledgeSosCase(id, idempotencyKey, xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling SOSApi->acknowledgeSosCase: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**|  | 
 **idempotencyKey** | **String**|  | 
 **xCorrelationId** | **String**|  | [optional] 

### Return type

[**InlineObject8**](InlineObject8.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **createSosCase**
> InlineObject8 createSosCase(idempotencyKey, createSosCaseRequest, xCorrelationId)

Open SOS case during active ride.

### Example
```dart
import 'package:bike_local_generated_api_client/api.dart';
// TODO Configure API key authorization: appCheck
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKeyPrefix = 'Bearer';

final api = BikeLocalGeneratedApiClient().getSOSApi();
final String idempotencyKey = idem_01HV9X8D9N9HQ; // String | 
final CreateSosCaseRequest createSosCaseRequest = ; // CreateSosCaseRequest | 
final String xCorrelationId = req_01HV9X8D9N9HQ; // String | 

try {
    final response = api.createSosCase(idempotencyKey, createSosCaseRequest, xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling SOSApi->createSosCase: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **idempotencyKey** | **String**|  | 
 **createSosCaseRequest** | [**CreateSosCaseRequest**](CreateSosCaseRequest.md)|  | 
 **xCorrelationId** | **String**|  | [optional] 

### Return type

[**InlineObject8**](InlineObject8.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

