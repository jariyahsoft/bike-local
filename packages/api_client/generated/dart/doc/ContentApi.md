# bike_local_generated_api_client.api.ContentApi

## Load the API package
```dart
import 'package:bike_local_generated_api_client/api.dart';
```

All URIs are relative to */api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**approveContentSubmission**](ContentApi.md#approvecontentsubmission) | **POST** /content-submissions/{id}/approve | Approve route/place/review content.
[**createPlace**](ContentApi.md#createplace) | **POST** /places | Submit place content for approval.
[**createRoute**](ContentApi.md#createroute) | **POST** /routes | Submit route content for approval.


# **approveContentSubmission**
> ApproveContentSubmission200Response approveContentSubmission(id, idempotencyKey, xCorrelationId)

Approve route/place/review content.

### Example
```dart
import 'package:bike_local_generated_api_client/api.dart';
// TODO Configure API key authorization: appCheck
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKeyPrefix = 'Bearer';

final api = BikeLocalGeneratedApiClient().getContentApi();
final String id = id_example; // String | 
final String idempotencyKey = idem_01HV9X8D9N9HQ; // String | 
final String xCorrelationId = req_01HV9X8D9N9HQ; // String | 

try {
    final response = api.approveContentSubmission(id, idempotencyKey, xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling ContentApi->approveContentSubmission: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**|  | 
 **idempotencyKey** | **String**|  | 
 **xCorrelationId** | **String**|  | [optional] 

### Return type

[**ApproveContentSubmission200Response**](ApproveContentSubmission200Response.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **createPlace**
> CreatePlace201Response createPlace(idempotencyKey, place, xCorrelationId)

Submit place content for approval.

### Example
```dart
import 'package:bike_local_generated_api_client/api.dart';
// TODO Configure API key authorization: appCheck
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKeyPrefix = 'Bearer';

final api = BikeLocalGeneratedApiClient().getContentApi();
final String idempotencyKey = idem_01HV9X8D9N9HQ; // String | 
final Place place = ; // Place | 
final String xCorrelationId = req_01HV9X8D9N9HQ; // String | 

try {
    final response = api.createPlace(idempotencyKey, place, xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling ContentApi->createPlace: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **idempotencyKey** | **String**|  | 
 **place** | [**Place**](Place.md)|  | 
 **xCorrelationId** | **String**|  | [optional] 

### Return type

[**CreatePlace201Response**](CreatePlace201Response.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **createRoute**
> CreateRoute201Response createRoute(idempotencyKey, route, xCorrelationId)

Submit route content for approval.

### Example
```dart
import 'package:bike_local_generated_api_client/api.dart';
// TODO Configure API key authorization: appCheck
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKeyPrefix = 'Bearer';

final api = BikeLocalGeneratedApiClient().getContentApi();
final String idempotencyKey = idem_01HV9X8D9N9HQ; // String | 
final Route route = ; // Route | 
final String xCorrelationId = req_01HV9X8D9N9HQ; // String | 

try {
    final response = api.createRoute(idempotencyKey, route, xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling ContentApi->createRoute: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **idempotencyKey** | **String**|  | 
 **route** | [**Route**](Route.md)|  | 
 **xCorrelationId** | **String**|  | [optional] 

### Return type

[**CreateRoute201Response**](CreateRoute201Response.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

