# bike_local_generated_api_client.api.AuditApi

## Load the API package
```dart
import 'package:bike_local_generated_api_client/api.dart';
```

All URIs are relative to */api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**listAuditLogs**](AuditApi.md#listauditlogs) | **GET** /audit-logs | Search audit logs.


# **listAuditLogs**
> ListAuditLogs200Response listAuditLogs(resourceType, resourceId, actorUserId, limit, cursor, xCorrelationId)

Search audit logs.

### Example
```dart
import 'package:bike_local_generated_api_client/api.dart';
// TODO Configure API key authorization: appCheck
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKeyPrefix = 'Bearer';

final api = BikeLocalGeneratedApiClient().getAuditApi();
final String resourceType = resourceType_example; // String |
final String resourceId = resourceId_example; // String |
final String actorUserId = actorUserId_example; // String |
final int limit = 56; // int |
final String cursor = cursor_example; // String |
final String xCorrelationId = req_01HV9X8D9N9HQ; // String |

try {
    final response = api.listAuditLogs(resourceType, resourceId, actorUserId, limit, cursor, xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling AuditApi->listAuditLogs: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **resourceType** | **String**|  | [optional]
 **resourceId** | **String**|  | [optional]
 **actorUserId** | **String**|  | [optional]
 **limit** | **int**|  | [optional] [default to 20]
 **cursor** | **String**|  | [optional]
 **xCorrelationId** | **String**|  | [optional]

### Return type

[**ListAuditLogs200Response**](ListAuditLogs200Response.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)
