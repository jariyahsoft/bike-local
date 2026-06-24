# bike_local_generated_api_client.api.SOSApi

## Load the API package
```dart
import 'package:bike_local_generated_api_client/api.dart';
```

All URIs are relative to */api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**acknowledgeSosCase**](SOSApi.md#acknowledgesoscase) | **POST** /sos-cases/{id}/acknowledge | Acknowledge SOS case by authorized staff.
[**assignSosCase**](SOSApi.md#assignsoscase) | **POST** /sos-cases/{id}/assign | Assign SOS case to a store staff responder.
[**closeSosCase**](SOSApi.md#closesoscase) | **POST** /sos-cases/{id}/close | Close SOS case after follow-up is complete.
[**createSosCase**](SOSApi.md#createsoscase) | **POST** /sos-cases | Open SOS case during active ride.
[**resolveSosCase**](SOSApi.md#resolvesoscase) | **POST** /sos-cases/{id}/resolve | Resolve SOS case with closure notes.
[**startSosCase**](SOSApi.md#startsoscase) | **POST** /sos-cases/{id}/start | Mark an assigned SOS case as being actively handled.


# **acknowledgeSosCase**
> InlineObject8 acknowledgeSosCase(id, idempotencyKey, xCorrelationId, sosCaseNoteRequest)

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
final SosCaseNoteRequest sosCaseNoteRequest = ; // SosCaseNoteRequest | 

try {
    final response = api.acknowledgeSosCase(id, idempotencyKey, xCorrelationId, sosCaseNoteRequest);
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
 **sosCaseNoteRequest** | [**SosCaseNoteRequest**](SosCaseNoteRequest.md)|  | [optional] 

### Return type

[**InlineObject8**](InlineObject8.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **assignSosCase**
> InlineObject8 assignSosCase(id, idempotencyKey, assignSosCaseRequest, xCorrelationId)

Assign SOS case to a store staff responder.

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
final AssignSosCaseRequest assignSosCaseRequest = ; // AssignSosCaseRequest | 
final String xCorrelationId = req_01HV9X8D9N9HQ; // String | 

try {
    final response = api.assignSosCase(id, idempotencyKey, assignSosCaseRequest, xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling SOSApi->assignSosCase: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**|  | 
 **idempotencyKey** | **String**|  | 
 **assignSosCaseRequest** | [**AssignSosCaseRequest**](AssignSosCaseRequest.md)|  | 
 **xCorrelationId** | **String**|  | [optional] 

### Return type

[**InlineObject8**](InlineObject8.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **closeSosCase**
> InlineObject8 closeSosCase(id, idempotencyKey, closeSosCaseRequest, xCorrelationId)

Close SOS case after follow-up is complete.

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
final CloseSosCaseRequest closeSosCaseRequest = ; // CloseSosCaseRequest | 
final String xCorrelationId = req_01HV9X8D9N9HQ; // String | 

try {
    final response = api.closeSosCase(id, idempotencyKey, closeSosCaseRequest, xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling SOSApi->closeSosCase: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**|  | 
 **idempotencyKey** | **String**|  | 
 **closeSosCaseRequest** | [**CloseSosCaseRequest**](CloseSosCaseRequest.md)|  | 
 **xCorrelationId** | **String**|  | [optional] 

### Return type

[**InlineObject8**](InlineObject8.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
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

# **resolveSosCase**
> InlineObject8 resolveSosCase(id, idempotencyKey, resolveSosCaseRequest, xCorrelationId)

Resolve SOS case with closure notes.

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
final ResolveSosCaseRequest resolveSosCaseRequest = ; // ResolveSosCaseRequest | 
final String xCorrelationId = req_01HV9X8D9N9HQ; // String | 

try {
    final response = api.resolveSosCase(id, idempotencyKey, resolveSosCaseRequest, xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling SOSApi->resolveSosCase: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**|  | 
 **idempotencyKey** | **String**|  | 
 **resolveSosCaseRequest** | [**ResolveSosCaseRequest**](ResolveSosCaseRequest.md)|  | 
 **xCorrelationId** | **String**|  | [optional] 

### Return type

[**InlineObject8**](InlineObject8.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **startSosCase**
> InlineObject8 startSosCase(id, idempotencyKey, xCorrelationId, sosCaseNoteRequest)

Mark an assigned SOS case as being actively handled.

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
final SosCaseNoteRequest sosCaseNoteRequest = ; // SosCaseNoteRequest | 

try {
    final response = api.startSosCase(id, idempotencyKey, xCorrelationId, sosCaseNoteRequest);
    print(response);
} on DioException catch (e) {
    print('Exception when calling SOSApi->startSosCase: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**|  | 
 **idempotencyKey** | **String**|  | 
 **xCorrelationId** | **String**|  | [optional] 
 **sosCaseNoteRequest** | [**SosCaseNoteRequest**](SosCaseNoteRequest.md)|  | [optional] 

### Return type

[**InlineObject8**](InlineObject8.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

