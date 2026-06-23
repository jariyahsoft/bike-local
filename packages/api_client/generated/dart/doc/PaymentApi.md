# bike_local_generated_api_client.api.PaymentApi

## Load the API package
```dart
import 'package:bike_local_generated_api_client/api.dart';
```

All URIs are relative to */api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**confirmCashPayment**](PaymentApi.md#confirmcashpayment) | **POST** /bookings/{id}/cash-confirmations | Confirm cash payment by authorized staff.
[**createPayment**](PaymentApi.md#createpayment) | **POST** /payments | Create payment intent or cash payment record.
[**processPaymentWebhook**](PaymentApi.md#processpaymentwebhook) | **POST** /payment-webhooks/{provider} | Process provider webhook with server-side verification.


# **confirmCashPayment**
> InlineObject5 confirmCashPayment(id, idempotencyKey, cashConfirmationRequest, xCorrelationId)

Confirm cash payment by authorized staff.

### Example
```dart
import 'package:bike_local_generated_api_client/api.dart';
// TODO Configure API key authorization: appCheck
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKeyPrefix = 'Bearer';

final api = BikeLocalGeneratedApiClient().getPaymentApi();
final String id = id_example; // String |
final String idempotencyKey = idem_01HV9X8D9N9HQ; // String |
final CashConfirmationRequest cashConfirmationRequest = ; // CashConfirmationRequest |
final String xCorrelationId = req_01HV9X8D9N9HQ; // String |

try {
    final response = api.confirmCashPayment(id, idempotencyKey, cashConfirmationRequest, xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling PaymentApi->confirmCashPayment: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**|  |
 **idempotencyKey** | **String**|  |
 **cashConfirmationRequest** | [**CashConfirmationRequest**](CashConfirmationRequest.md)|  |
 **xCorrelationId** | **String**|  | [optional]

### Return type

[**InlineObject5**](InlineObject5.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **createPayment**
> InlineObject5 createPayment(idempotencyKey, createPaymentRequest, xCorrelationId)

Create payment intent or cash payment record.

### Example
```dart
import 'package:bike_local_generated_api_client/api.dart';
// TODO Configure API key authorization: appCheck
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKeyPrefix = 'Bearer';

final api = BikeLocalGeneratedApiClient().getPaymentApi();
final String idempotencyKey = idem_01HV9X8D9N9HQ; // String |
final CreatePaymentRequest createPaymentRequest = ; // CreatePaymentRequest |
final String xCorrelationId = req_01HV9X8D9N9HQ; // String |

try {
    final response = api.createPayment(idempotencyKey, createPaymentRequest, xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling PaymentApi->createPayment: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **idempotencyKey** | **String**|  |
 **createPaymentRequest** | [**CreatePaymentRequest**](CreatePaymentRequest.md)|  |
 **xCorrelationId** | **String**|  | [optional]

### Return type

[**InlineObject5**](InlineObject5.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **processPaymentWebhook**
> SuccessEnvelope processPaymentWebhook(provider, idempotencyKey, requestBody, xCorrelationId)

Process provider webhook with server-side verification.

### Example
```dart
import 'package:bike_local_generated_api_client/api.dart';

final api = BikeLocalGeneratedApiClient().getPaymentApi();
final String provider = provider_example; // String |
final String idempotencyKey = idem_01HV9X8D9N9HQ; // String |
final BuiltMap<String, JsonObject> requestBody = Object; // BuiltMap<String, JsonObject> |
final String xCorrelationId = req_01HV9X8D9N9HQ; // String |

try {
    final response = api.processPaymentWebhook(provider, idempotencyKey, requestBody, xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling PaymentApi->processPaymentWebhook: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **provider** | **String**|  |
 **idempotencyKey** | **String**|  |
 **requestBody** | [**BuiltMap&lt;String, JsonObject&gt;**](JsonObject.md)|  |
 **xCorrelationId** | **String**|  | [optional]

### Return type

[**SuccessEnvelope**](SuccessEnvelope.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)
