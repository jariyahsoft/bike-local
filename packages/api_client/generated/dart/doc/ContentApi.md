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
[**createReview**](ContentApi.md#createreview) | **POST** /reviews | Create a review from the renter&#39;s completed booking.
[**createRoute**](ContentApi.md#createroute) | **POST** /routes | Submit route content for approval.
[**hideReview**](ContentApi.md#hidereview) | **POST** /reviews/{id}/hide | Hide a review with a moderation reason.
[**rejectContentSubmission**](ContentApi.md#rejectcontentsubmission) | **POST** /content-submissions/{id}/reject | Reject route/place/review content.
[**reportContent**](ContentApi.md#reportcontent) | **POST** /content-reports | Report unsafe, wrong, outdated, or abusive public content.


# **approveContentSubmission**
> InlineObject14 approveContentSubmission(id, idempotencyKey, moderateContentSubmissionRequest, xCorrelationId)

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
final ModerateContentSubmissionRequest moderateContentSubmissionRequest = ; // ModerateContentSubmissionRequest | 
final String xCorrelationId = req_01HV9X8D9N9HQ; // String | 

try {
    final response = api.approveContentSubmission(id, idempotencyKey, moderateContentSubmissionRequest, xCorrelationId);
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
 **moderateContentSubmissionRequest** | [**ModerateContentSubmissionRequest**](ModerateContentSubmissionRequest.md)|  | 
 **xCorrelationId** | **String**|  | [optional] 

### Return type

[**InlineObject14**](InlineObject14.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **createPlace**
> InlineObject13 createPlace(idempotencyKey, createPlaceRequest, xCorrelationId)

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
final CreatePlaceRequest createPlaceRequest = ; // CreatePlaceRequest | 
final String xCorrelationId = req_01HV9X8D9N9HQ; // String | 

try {
    final response = api.createPlace(idempotencyKey, createPlaceRequest, xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling ContentApi->createPlace: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **idempotencyKey** | **String**|  | 
 **createPlaceRequest** | [**CreatePlaceRequest**](CreatePlaceRequest.md)|  | 
 **xCorrelationId** | **String**|  | [optional] 

### Return type

[**InlineObject13**](InlineObject13.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **createReview**
> InlineObject15 createReview(idempotencyKey, createReviewRequest, xCorrelationId)

Create a review from the renter's completed booking.

### Example
```dart
import 'package:bike_local_generated_api_client/api.dart';
// TODO Configure API key authorization: appCheck
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKeyPrefix = 'Bearer';

final api = BikeLocalGeneratedApiClient().getContentApi();
final String idempotencyKey = idem_01HV9X8D9N9HQ; // String | 
final CreateReviewRequest createReviewRequest = ; // CreateReviewRequest | 
final String xCorrelationId = req_01HV9X8D9N9HQ; // String | 

try {
    final response = api.createReview(idempotencyKey, createReviewRequest, xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling ContentApi->createReview: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **idempotencyKey** | **String**|  | 
 **createReviewRequest** | [**CreateReviewRequest**](CreateReviewRequest.md)|  | 
 **xCorrelationId** | **String**|  | [optional] 

### Return type

[**InlineObject15**](InlineObject15.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **createRoute**
> InlineObject12 createRoute(idempotencyKey, createRouteRequest, xCorrelationId)

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
final CreateRouteRequest createRouteRequest = ; // CreateRouteRequest | 
final String xCorrelationId = req_01HV9X8D9N9HQ; // String | 

try {
    final response = api.createRoute(idempotencyKey, createRouteRequest, xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling ContentApi->createRoute: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **idempotencyKey** | **String**|  | 
 **createRouteRequest** | [**CreateRouteRequest**](CreateRouteRequest.md)|  | 
 **xCorrelationId** | **String**|  | [optional] 

### Return type

[**InlineObject12**](InlineObject12.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **hideReview**
> InlineObject15 hideReview(id, idempotencyKey, hideReviewRequest, xCorrelationId)

Hide a review with a moderation reason.

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
final HideReviewRequest hideReviewRequest = ; // HideReviewRequest | 
final String xCorrelationId = req_01HV9X8D9N9HQ; // String | 

try {
    final response = api.hideReview(id, idempotencyKey, hideReviewRequest, xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling ContentApi->hideReview: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**|  | 
 **idempotencyKey** | **String**|  | 
 **hideReviewRequest** | [**HideReviewRequest**](HideReviewRequest.md)|  | 
 **xCorrelationId** | **String**|  | [optional] 

### Return type

[**InlineObject15**](InlineObject15.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **rejectContentSubmission**
> InlineObject14 rejectContentSubmission(id, idempotencyKey, moderateContentSubmissionRequest, xCorrelationId)

Reject route/place/review content.

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
final ModerateContentSubmissionRequest moderateContentSubmissionRequest = ; // ModerateContentSubmissionRequest | 
final String xCorrelationId = req_01HV9X8D9N9HQ; // String | 

try {
    final response = api.rejectContentSubmission(id, idempotencyKey, moderateContentSubmissionRequest, xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling ContentApi->rejectContentSubmission: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**|  | 
 **idempotencyKey** | **String**|  | 
 **moderateContentSubmissionRequest** | [**ModerateContentSubmissionRequest**](ModerateContentSubmissionRequest.md)|  | 
 **xCorrelationId** | **String**|  | [optional] 

### Return type

[**InlineObject14**](InlineObject14.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **reportContent**
> InlineObject16 reportContent(idempotencyKey, createContentReportRequest, xCorrelationId)

Report unsafe, wrong, outdated, or abusive public content.

### Example
```dart
import 'package:bike_local_generated_api_client/api.dart';
// TODO Configure API key authorization: appCheck
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKeyPrefix = 'Bearer';

final api = BikeLocalGeneratedApiClient().getContentApi();
final String idempotencyKey = idem_01HV9X8D9N9HQ; // String | 
final CreateContentReportRequest createContentReportRequest = ; // CreateContentReportRequest | 
final String xCorrelationId = req_01HV9X8D9N9HQ; // String | 

try {
    final response = api.reportContent(idempotencyKey, createContentReportRequest, xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling ContentApi->reportContent: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **idempotencyKey** | **String**|  | 
 **createContentReportRequest** | [**CreateContentReportRequest**](CreateContentReportRequest.md)|  | 
 **xCorrelationId** | **String**|  | [optional] 

### Return type

[**InlineObject16**](InlineObject16.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

