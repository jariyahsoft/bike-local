# bike_local_generated_api_client.api.PricingApi

## Load the API package
```dart
import 'package:bike_local_generated_api_client/api.dart';
```

All URIs are relative to */api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createPricingQuote**](PricingApi.md#createpricingquote) | **POST** /pricing/quote | Calculate price and deposit quote before booking.
[**createPricingRule**](PricingApi.md#createpricingrule) | **POST** /pricing/rules | Create a store, branch, or category pricing rule.


# **createPricingQuote**
> CreatePricingQuote200Response createPricingQuote(pricingQuoteRequest, xCorrelationId)

Calculate price and deposit quote before booking.

### Example
```dart
import 'package:bike_local_generated_api_client/api.dart';
// TODO Configure API key authorization: appCheck
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKeyPrefix = 'Bearer';

final api = BikeLocalGeneratedApiClient().getPricingApi();
final PricingQuoteRequest pricingQuoteRequest = ; // PricingQuoteRequest |
final String xCorrelationId = req_01HV9X8D9N9HQ; // String |

try {
    final response = api.createPricingQuote(pricingQuoteRequest, xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling PricingApi->createPricingQuote: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **pricingQuoteRequest** | [**PricingQuoteRequest**](PricingQuoteRequest.md)|  |
 **xCorrelationId** | **String**|  | [optional]

### Return type

[**CreatePricingQuote200Response**](CreatePricingQuote200Response.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **createPricingRule**
> CreatePricingRule201Response createPricingRule(idempotencyKey, createPricingRuleRequest, xCorrelationId)

Create a store, branch, or category pricing rule.

### Example
```dart
import 'package:bike_local_generated_api_client/api.dart';
// TODO Configure API key authorization: appCheck
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKeyPrefix = 'Bearer';

final api = BikeLocalGeneratedApiClient().getPricingApi();
final String idempotencyKey = idem_01HV9X8D9N9HQ; // String |
final CreatePricingRuleRequest createPricingRuleRequest = ; // CreatePricingRuleRequest |
final String xCorrelationId = req_01HV9X8D9N9HQ; // String |

try {
    final response = api.createPricingRule(idempotencyKey, createPricingRuleRequest, xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling PricingApi->createPricingRule: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **idempotencyKey** | **String**|  |
 **createPricingRuleRequest** | [**CreatePricingRuleRequest**](CreatePricingRuleRequest.md)|  |
 **xCorrelationId** | **String**|  | [optional]

### Return type

[**CreatePricingRule201Response**](CreatePricingRule201Response.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)
