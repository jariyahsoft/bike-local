# bike_local_generated_api_client.api.BookingApi

## Load the API package
```dart
import 'package:bike_local_generated_api_client/api.dart';
```

All URIs are relative to */api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**cancelBooking**](BookingApi.md#cancelbooking) | **POST** /bookings/{id}/cancel | Cancel booking and calculate refund eligibility.
[**createBooking**](BookingApi.md#createbooking) | **POST** /bookings | Create booking with asset hold.
[**getBooking**](BookingApi.md#getbooking) | **GET** /bookings/{id} | Get booking by ID.


# **cancelBooking**
> InlineObject4 cancelBooking(id, idempotencyKey, cancelBookingRequest, xCorrelationId)

Cancel booking and calculate refund eligibility.

### Example
```dart
import 'package:bike_local_generated_api_client/api.dart';
// TODO Configure API key authorization: appCheck
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKeyPrefix = 'Bearer';

final api = BikeLocalGeneratedApiClient().getBookingApi();
final String id = id_example; // String | 
final String idempotencyKey = idem_01HV9X8D9N9HQ; // String | 
final CancelBookingRequest cancelBookingRequest = ; // CancelBookingRequest | 
final String xCorrelationId = req_01HV9X8D9N9HQ; // String | 

try {
    final response = api.cancelBooking(id, idempotencyKey, cancelBookingRequest, xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling BookingApi->cancelBooking: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**|  | 
 **idempotencyKey** | **String**|  | 
 **cancelBookingRequest** | [**CancelBookingRequest**](CancelBookingRequest.md)|  | 
 **xCorrelationId** | **String**|  | [optional] 

### Return type

[**InlineObject4**](InlineObject4.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **createBooking**
> InlineObject4 createBooking(idempotencyKey, createBookingRequest, xCorrelationId)

Create booking with asset hold.

### Example
```dart
import 'package:bike_local_generated_api_client/api.dart';
// TODO Configure API key authorization: appCheck
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKeyPrefix = 'Bearer';

final api = BikeLocalGeneratedApiClient().getBookingApi();
final String idempotencyKey = idem_01HV9X8D9N9HQ; // String | 
final CreateBookingRequest createBookingRequest = {"store_id":"store_123","branch_id":"brn_123","asset_ids":["ast_123"],"start_at":"2026-07-01T02:00:00Z","end_at":"2026-07-01T06:00:00Z","pickup_point_id":"point_1","return_point_id":"point_1","payment_method":"ONLINE"}; // CreateBookingRequest | 
final String xCorrelationId = req_01HV9X8D9N9HQ; // String | 

try {
    final response = api.createBooking(idempotencyKey, createBookingRequest, xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling BookingApi->createBooking: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **idempotencyKey** | **String**|  | 
 **createBookingRequest** | [**CreateBookingRequest**](CreateBookingRequest.md)|  | 
 **xCorrelationId** | **String**|  | [optional] 

### Return type

[**InlineObject4**](InlineObject4.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getBooking**
> InlineObject4 getBooking(id, xCorrelationId)

Get booking by ID.

### Example
```dart
import 'package:bike_local_generated_api_client/api.dart';
// TODO Configure API key authorization: appCheck
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKeyPrefix = 'Bearer';

final api = BikeLocalGeneratedApiClient().getBookingApi();
final String id = id_example; // String | 
final String xCorrelationId = req_01HV9X8D9N9HQ; // String | 

try {
    final response = api.getBooking(id, xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling BookingApi->getBooking: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**|  | 
 **xCorrelationId** | **String**|  | [optional] 

### Return type

[**InlineObject4**](InlineObject4.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

