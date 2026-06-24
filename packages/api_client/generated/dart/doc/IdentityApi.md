# bike_local_generated_api_client.api.IdentityApi

## Load the API package
```dart
import 'package:bike_local_generated_api_client/api.dart';
```

All URIs are relative to */api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createUser**](IdentityApi.md#createuser) | **POST** /users | Create a domain user profile, link the authenticated identity, and record onboarding consent.
[**getMe**](IdentityApi.md#getme) | **GET** /me | Get current user profile and auth identities.
[**requestAccountDeletion**](IdentityApi.md#requestaccountdeletion) | **POST** /me/deletion-request | Request account deletion while retaining legally required transactional and audit records.
[**updateMe**](IdentityApi.md#updateme) | **PATCH** /me | Update the current user profile, add onboarding roles, and append consent records.


# **createUser**
> InlineObject createUser(idempotencyKey, createUserRequest, xCorrelationId)

Create a domain user profile, link the authenticated identity, and record onboarding consent.

### Example
```dart
import 'package:bike_local_generated_api_client/api.dart';
// TODO Configure API key authorization: appCheck
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKeyPrefix = 'Bearer';

final api = BikeLocalGeneratedApiClient().getIdentityApi();
final String idempotencyKey = idem_01HV9X8D9N9HQ; // String | 
final CreateUserRequest createUserRequest = ; // CreateUserRequest | 
final String xCorrelationId = req_01HV9X8D9N9HQ; // String | 

try {
    final response = api.createUser(idempotencyKey, createUserRequest, xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling IdentityApi->createUser: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **idempotencyKey** | **String**|  | 
 **createUserRequest** | [**CreateUserRequest**](CreateUserRequest.md)|  | 
 **xCorrelationId** | **String**|  | [optional] 

### Return type

[**InlineObject**](InlineObject.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getMe**
> InlineObject getMe(xCorrelationId)

Get current user profile and auth identities.

### Example
```dart
import 'package:bike_local_generated_api_client/api.dart';
// TODO Configure API key authorization: appCheck
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKeyPrefix = 'Bearer';

final api = BikeLocalGeneratedApiClient().getIdentityApi();
final String xCorrelationId = req_01HV9X8D9N9HQ; // String | 

try {
    final response = api.getMe(xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling IdentityApi->getMe: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **xCorrelationId** | **String**|  | [optional] 

### Return type

[**InlineObject**](InlineObject.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **requestAccountDeletion**
> InlineObject requestAccountDeletion(accountDeletionRequest, xCorrelationId)

Request account deletion while retaining legally required transactional and audit records.

### Example
```dart
import 'package:bike_local_generated_api_client/api.dart';
// TODO Configure API key authorization: appCheck
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKeyPrefix = 'Bearer';

final api = BikeLocalGeneratedApiClient().getIdentityApi();
final AccountDeletionRequest accountDeletionRequest = ; // AccountDeletionRequest | 
final String xCorrelationId = req_01HV9X8D9N9HQ; // String | 

try {
    final response = api.requestAccountDeletion(accountDeletionRequest, xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling IdentityApi->requestAccountDeletion: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **accountDeletionRequest** | [**AccountDeletionRequest**](AccountDeletionRequest.md)|  | 
 **xCorrelationId** | **String**|  | [optional] 

### Return type

[**InlineObject**](InlineObject.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateMe**
> InlineObject updateMe(updateUserRequest, xCorrelationId)

Update the current user profile, add onboarding roles, and append consent records.

### Example
```dart
import 'package:bike_local_generated_api_client/api.dart';
// TODO Configure API key authorization: appCheck
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKeyPrefix = 'Bearer';

final api = BikeLocalGeneratedApiClient().getIdentityApi();
final UpdateUserRequest updateUserRequest = ; // UpdateUserRequest | 
final String xCorrelationId = req_01HV9X8D9N9HQ; // String | 

try {
    final response = api.updateMe(updateUserRequest, xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling IdentityApi->updateMe: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **updateUserRequest** | [**UpdateUserRequest**](UpdateUserRequest.md)|  | 
 **xCorrelationId** | **String**|  | [optional] 

### Return type

[**InlineObject**](InlineObject.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

