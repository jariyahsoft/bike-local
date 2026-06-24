# bike_local_generated_api_client.api.StaffApi

## Load the API package
```dart
import 'package:bike_local_generated_api_client/api.dart';
```

All URIs are relative to */api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createStaffInvitation**](StaffApi.md#createstaffinvitation) | **POST** /stores/{store_id}/staff-invitations | Invite staff to a store.
[**updateStoreMember**](StaffApi.md#updatestoremember) | **PATCH** /store-members/{id} | Update store member role, branch access, or status.


# **createStaffInvitation**
> CreateStaffInvitation202Response createStaffInvitation(storeId, idempotencyKey, createStaffInvitationRequest, xCorrelationId)

Invite staff to a store.

### Example
```dart
import 'package:bike_local_generated_api_client/api.dart';
// TODO Configure API key authorization: appCheck
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKeyPrefix = 'Bearer';

final api = BikeLocalGeneratedApiClient().getStaffApi();
final String storeId = storeId_example; // String | 
final String idempotencyKey = idem_01HV9X8D9N9HQ; // String | 
final CreateStaffInvitationRequest createStaffInvitationRequest = ; // CreateStaffInvitationRequest | 
final String xCorrelationId = req_01HV9X8D9N9HQ; // String | 

try {
    final response = api.createStaffInvitation(storeId, idempotencyKey, createStaffInvitationRequest, xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling StaffApi->createStaffInvitation: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **storeId** | **String**|  | 
 **idempotencyKey** | **String**|  | 
 **createStaffInvitationRequest** | [**CreateStaffInvitationRequest**](CreateStaffInvitationRequest.md)|  | 
 **xCorrelationId** | **String**|  | [optional] 

### Return type

[**CreateStaffInvitation202Response**](CreateStaffInvitation202Response.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateStoreMember**
> UpdateStoreMember200Response updateStoreMember(id, updateStoreMemberRequest, xCorrelationId)

Update store member role, branch access, or status.

### Example
```dart
import 'package:bike_local_generated_api_client/api.dart';
// TODO Configure API key authorization: appCheck
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKeyPrefix = 'Bearer';

final api = BikeLocalGeneratedApiClient().getStaffApi();
final String id = id_example; // String | 
final UpdateStoreMemberRequest updateStoreMemberRequest = ; // UpdateStoreMemberRequest | 
final String xCorrelationId = req_01HV9X8D9N9HQ; // String | 

try {
    final response = api.updateStoreMember(id, updateStoreMemberRequest, xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling StaffApi->updateStoreMember: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**|  | 
 **updateStoreMemberRequest** | [**UpdateStoreMemberRequest**](UpdateStoreMemberRequest.md)|  | 
 **xCorrelationId** | **String**|  | [optional] 

### Return type

[**UpdateStoreMember200Response**](UpdateStoreMember200Response.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

