# bike_local_generated_api_client.api.NotificationsApi

## Load the API package
```dart
import 'package:bike_local_generated_api_client/api.dart';
```

All URIs are relative to */api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**listNotifications**](NotificationsApi.md#listnotifications) | **GET** /notifications | List inbox notifications for the signed-in user.
[**markNotificationRead**](NotificationsApi.md#marknotificationread) | **POST** /notifications/{id}/read | Mark a notification as read by its recipient.
[**registerNotificationDevice**](NotificationsApi.md#registernotificationdevice) | **POST** /notification-devices | Register or refresh an FCM device token reference for the signed-in user.


# **listNotifications**
> InlineObject11 listNotifications(xCorrelationId)

List inbox notifications for the signed-in user.

### Example
```dart
import 'package:bike_local_generated_api_client/api.dart';
// TODO Configure API key authorization: appCheck
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKeyPrefix = 'Bearer';

final api = BikeLocalGeneratedApiClient().getNotificationsApi();
final String xCorrelationId = req_01HV9X8D9N9HQ; // String | 

try {
    final response = api.listNotifications(xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling NotificationsApi->listNotifications: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **xCorrelationId** | **String**|  | [optional] 

### Return type

[**InlineObject11**](InlineObject11.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **markNotificationRead**
> InlineObject10 markNotificationRead(id, idempotencyKey, xCorrelationId)

Mark a notification as read by its recipient.

### Example
```dart
import 'package:bike_local_generated_api_client/api.dart';
// TODO Configure API key authorization: appCheck
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKeyPrefix = 'Bearer';

final api = BikeLocalGeneratedApiClient().getNotificationsApi();
final String id = id_example; // String | 
final String idempotencyKey = idem_01HV9X8D9N9HQ; // String | 
final String xCorrelationId = req_01HV9X8D9N9HQ; // String | 

try {
    final response = api.markNotificationRead(id, idempotencyKey, xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling NotificationsApi->markNotificationRead: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**|  | 
 **idempotencyKey** | **String**|  | 
 **xCorrelationId** | **String**|  | [optional] 

### Return type

[**InlineObject10**](InlineObject10.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **registerNotificationDevice**
> InlineObject9 registerNotificationDevice(idempotencyKey, registerNotificationDeviceRequest, xCorrelationId)

Register or refresh an FCM device token reference for the signed-in user.

### Example
```dart
import 'package:bike_local_generated_api_client/api.dart';
// TODO Configure API key authorization: appCheck
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKeyPrefix = 'Bearer';

final api = BikeLocalGeneratedApiClient().getNotificationsApi();
final String idempotencyKey = idem_01HV9X8D9N9HQ; // String | 
final RegisterNotificationDeviceRequest registerNotificationDeviceRequest = ; // RegisterNotificationDeviceRequest | 
final String xCorrelationId = req_01HV9X8D9N9HQ; // String | 

try {
    final response = api.registerNotificationDevice(idempotencyKey, registerNotificationDeviceRequest, xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling NotificationsApi->registerNotificationDevice: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **idempotencyKey** | **String**|  | 
 **registerNotificationDeviceRequest** | [**RegisterNotificationDeviceRequest**](RegisterNotificationDeviceRequest.md)|  | 
 **xCorrelationId** | **String**|  | [optional] 

### Return type

[**InlineObject9**](InlineObject9.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

