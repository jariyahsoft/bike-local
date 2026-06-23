# bike_local_generated_api_client.api.RideApi

## Load the API package
```dart
import 'package:bike_local_generated_api_client/api.dart';
```

All URIs are relative to */api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createRideSession**](RideApi.md#createridesession) | **POST** /ride-sessions | Start ride session for an in-progress rental.
[**endRideSession**](RideApi.md#endridesession) | **POST** /ride-sessions/{id}/end | End ride session without closing rental.
[**uploadRideTrackChunk**](RideApi.md#uploadridetrackchunk) | **POST** /ride-sessions/{id}/chunks | Upload buffered GPS track chunk.


# **createRideSession**
> InlineObject6 createRideSession(idempotencyKey, createRideSessionRequest, xCorrelationId)

Start ride session for an in-progress rental.

### Example
```dart
import 'package:bike_local_generated_api_client/api.dart';
// TODO Configure API key authorization: appCheck
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKeyPrefix = 'Bearer';

final api = BikeLocalGeneratedApiClient().getRideApi();
final String idempotencyKey = idem_01HV9X8D9N9HQ; // String |
final CreateRideSessionRequest createRideSessionRequest = ; // CreateRideSessionRequest |
final String xCorrelationId = req_01HV9X8D9N9HQ; // String |

try {
    final response = api.createRideSession(idempotencyKey, createRideSessionRequest, xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling RideApi->createRideSession: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **idempotencyKey** | **String**|  |
 **createRideSessionRequest** | [**CreateRideSessionRequest**](CreateRideSessionRequest.md)|  |
 **xCorrelationId** | **String**|  | [optional]

### Return type

[**InlineObject6**](InlineObject6.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **endRideSession**
> InlineObject6 endRideSession(id, idempotencyKey, endRideSessionRequest, xCorrelationId)

End ride session without closing rental.

### Example
```dart
import 'package:bike_local_generated_api_client/api.dart';
// TODO Configure API key authorization: appCheck
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKeyPrefix = 'Bearer';

final api = BikeLocalGeneratedApiClient().getRideApi();
final String id = id_example; // String |
final String idempotencyKey = idem_01HV9X8D9N9HQ; // String |
final EndRideSessionRequest endRideSessionRequest = ; // EndRideSessionRequest |
final String xCorrelationId = req_01HV9X8D9N9HQ; // String |

try {
    final response = api.endRideSession(id, idempotencyKey, endRideSessionRequest, xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling RideApi->endRideSession: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**|  |
 **idempotencyKey** | **String**|  |
 **endRideSessionRequest** | [**EndRideSessionRequest**](EndRideSessionRequest.md)|  |
 **xCorrelationId** | **String**|  | [optional]

### Return type

[**InlineObject6**](InlineObject6.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **uploadRideTrackChunk**
> UploadRideTrackChunk202Response uploadRideTrackChunk(id, idempotencyKey, uploadRideTrackChunkRequest, xCorrelationId)

Upload buffered GPS track chunk.

### Example
```dart
import 'package:bike_local_generated_api_client/api.dart';
// TODO Configure API key authorization: appCheck
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKeyPrefix = 'Bearer';

final api = BikeLocalGeneratedApiClient().getRideApi();
final String id = id_example; // String |
final String idempotencyKey = idem_01HV9X8D9N9HQ; // String |
final UploadRideTrackChunkRequest uploadRideTrackChunkRequest = ; // UploadRideTrackChunkRequest |
final String xCorrelationId = req_01HV9X8D9N9HQ; // String |

try {
    final response = api.uploadRideTrackChunk(id, idempotencyKey, uploadRideTrackChunkRequest, xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling RideApi->uploadRideTrackChunk: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**|  |
 **idempotencyKey** | **String**|  |
 **uploadRideTrackChunkRequest** | [**UploadRideTrackChunkRequest**](UploadRideTrackChunkRequest.md)|  |
 **xCorrelationId** | **String**|  | [optional]

### Return type

[**UploadRideTrackChunk202Response**](UploadRideTrackChunk202Response.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)
