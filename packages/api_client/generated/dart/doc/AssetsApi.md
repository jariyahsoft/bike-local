# bike_local_generated_api_client.api.AssetsApi

## Load the API package
```dart
import 'package:bike_local_generated_api_client/api.dart';
```

All URIs are relative to */api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**checkAvailability**](AssetsApi.md#checkavailability) | **POST** /availability/check | Check or reserve asset availability for a time range.
[**createAsset**](AssetsApi.md#createasset) | **POST** /assets | Create rentable asset.
[**createAssetCategory**](AssetsApi.md#createassetcategory) | **POST** /asset-categories | Create an asset category with default pricing and deposit.
[**createEquipmentItem**](AssetsApi.md#createequipmentitem) | **POST** /equipment-items | Create rentable or bundled equipment.
[**createInventoryUnit**](AssetsApi.md#createinventoryunit) | **POST** /inventory-units | Create an inventory unit for asset or equipment stock tracking.
[**listAssets**](AssetsApi.md#listassets) | **GET** /assets | List assets by allowed filters.
[**updateAsset**](AssetsApi.md#updateasset) | **PATCH** /assets/{id} | Update asset data or status.


# **checkAvailability**
> CheckAvailability200Response checkAvailability(availabilityCheckRequest, xCorrelationId)

Check or reserve asset availability for a time range.

### Example
```dart
import 'package:bike_local_generated_api_client/api.dart';
// TODO Configure API key authorization: appCheck
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKeyPrefix = 'Bearer';

final api = BikeLocalGeneratedApiClient().getAssetsApi();
final AvailabilityCheckRequest availabilityCheckRequest = ; // AvailabilityCheckRequest | 
final String xCorrelationId = req_01HV9X8D9N9HQ; // String | 

try {
    final response = api.checkAvailability(availabilityCheckRequest, xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling AssetsApi->checkAvailability: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **availabilityCheckRequest** | [**AvailabilityCheckRequest**](AvailabilityCheckRequest.md)|  | 
 **xCorrelationId** | **String**|  | [optional] 

### Return type

[**CheckAvailability200Response**](CheckAvailability200Response.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **createAsset**
> InlineObject3 createAsset(idempotencyKey, createAssetRequest, xCorrelationId)

Create rentable asset.

### Example
```dart
import 'package:bike_local_generated_api_client/api.dart';
// TODO Configure API key authorization: appCheck
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKeyPrefix = 'Bearer';

final api = BikeLocalGeneratedApiClient().getAssetsApi();
final String idempotencyKey = idem_01HV9X8D9N9HQ; // String | 
final CreateAssetRequest createAssetRequest = ; // CreateAssetRequest | 
final String xCorrelationId = req_01HV9X8D9N9HQ; // String | 

try {
    final response = api.createAsset(idempotencyKey, createAssetRequest, xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling AssetsApi->createAsset: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **idempotencyKey** | **String**|  | 
 **createAssetRequest** | [**CreateAssetRequest**](CreateAssetRequest.md)|  | 
 **xCorrelationId** | **String**|  | [optional] 

### Return type

[**InlineObject3**](InlineObject3.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **createAssetCategory**
> CreateAssetCategory201Response createAssetCategory(idempotencyKey, createAssetCategoryRequest, xCorrelationId)

Create an asset category with default pricing and deposit.

### Example
```dart
import 'package:bike_local_generated_api_client/api.dart';
// TODO Configure API key authorization: appCheck
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKeyPrefix = 'Bearer';

final api = BikeLocalGeneratedApiClient().getAssetsApi();
final String idempotencyKey = idem_01HV9X8D9N9HQ; // String | 
final CreateAssetCategoryRequest createAssetCategoryRequest = ; // CreateAssetCategoryRequest | 
final String xCorrelationId = req_01HV9X8D9N9HQ; // String | 

try {
    final response = api.createAssetCategory(idempotencyKey, createAssetCategoryRequest, xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling AssetsApi->createAssetCategory: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **idempotencyKey** | **String**|  | 
 **createAssetCategoryRequest** | [**CreateAssetCategoryRequest**](CreateAssetCategoryRequest.md)|  | 
 **xCorrelationId** | **String**|  | [optional] 

### Return type

[**CreateAssetCategory201Response**](CreateAssetCategory201Response.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **createEquipmentItem**
> CreateEquipmentItem201Response createEquipmentItem(idempotencyKey, createEquipmentItemRequest, xCorrelationId)

Create rentable or bundled equipment.

### Example
```dart
import 'package:bike_local_generated_api_client/api.dart';
// TODO Configure API key authorization: appCheck
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKeyPrefix = 'Bearer';

final api = BikeLocalGeneratedApiClient().getAssetsApi();
final String idempotencyKey = idem_01HV9X8D9N9HQ; // String | 
final CreateEquipmentItemRequest createEquipmentItemRequest = ; // CreateEquipmentItemRequest | 
final String xCorrelationId = req_01HV9X8D9N9HQ; // String | 

try {
    final response = api.createEquipmentItem(idempotencyKey, createEquipmentItemRequest, xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling AssetsApi->createEquipmentItem: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **idempotencyKey** | **String**|  | 
 **createEquipmentItemRequest** | [**CreateEquipmentItemRequest**](CreateEquipmentItemRequest.md)|  | 
 **xCorrelationId** | **String**|  | [optional] 

### Return type

[**CreateEquipmentItem201Response**](CreateEquipmentItem201Response.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **createInventoryUnit**
> CreateInventoryUnit201Response createInventoryUnit(idempotencyKey, createInventoryUnitRequest, xCorrelationId)

Create an inventory unit for asset or equipment stock tracking.

### Example
```dart
import 'package:bike_local_generated_api_client/api.dart';
// TODO Configure API key authorization: appCheck
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKeyPrefix = 'Bearer';

final api = BikeLocalGeneratedApiClient().getAssetsApi();
final String idempotencyKey = idem_01HV9X8D9N9HQ; // String | 
final CreateInventoryUnitRequest createInventoryUnitRequest = ; // CreateInventoryUnitRequest | 
final String xCorrelationId = req_01HV9X8D9N9HQ; // String | 

try {
    final response = api.createInventoryUnit(idempotencyKey, createInventoryUnitRequest, xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling AssetsApi->createInventoryUnit: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **idempotencyKey** | **String**|  | 
 **createInventoryUnitRequest** | [**CreateInventoryUnitRequest**](CreateInventoryUnitRequest.md)|  | 
 **xCorrelationId** | **String**|  | [optional] 

### Return type

[**CreateInventoryUnit201Response**](CreateInventoryUnit201Response.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **listAssets**
> ListAssets200Response listAssets(storeId, branchId, limit, cursor, xCorrelationId)

List assets by allowed filters.

### Example
```dart
import 'package:bike_local_generated_api_client/api.dart';
// TODO Configure API key authorization: appCheck
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKeyPrefix = 'Bearer';

final api = BikeLocalGeneratedApiClient().getAssetsApi();
final String storeId = storeId_example; // String | 
final String branchId = branchId_example; // String | 
final int limit = 56; // int | 
final String cursor = cursor_example; // String | 
final String xCorrelationId = req_01HV9X8D9N9HQ; // String | 

try {
    final response = api.listAssets(storeId, branchId, limit, cursor, xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling AssetsApi->listAssets: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **storeId** | **String**|  | [optional] 
 **branchId** | **String**|  | [optional] 
 **limit** | **int**|  | [optional] [default to 20]
 **cursor** | **String**|  | [optional] 
 **xCorrelationId** | **String**|  | [optional] 

### Return type

[**ListAssets200Response**](ListAssets200Response.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateAsset**
> InlineObject3 updateAsset(id, updateAssetRequest, xCorrelationId)

Update asset data or status.

### Example
```dart
import 'package:bike_local_generated_api_client/api.dart';
// TODO Configure API key authorization: appCheck
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('appCheck').apiKeyPrefix = 'Bearer';

final api = BikeLocalGeneratedApiClient().getAssetsApi();
final String id = id_example; // String | 
final UpdateAssetRequest updateAssetRequest = ; // UpdateAssetRequest | 
final String xCorrelationId = req_01HV9X8D9N9HQ; // String | 

try {
    final response = api.updateAsset(id, updateAssetRequest, xCorrelationId);
    print(response);
} on DioException catch (e) {
    print('Exception when calling AssetsApi->updateAsset: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**|  | 
 **updateAssetRequest** | [**UpdateAssetRequest**](UpdateAssetRequest.md)|  | 
 **xCorrelationId** | **String**|  | [optional] 

### Return type

[**InlineObject3**](InlineObject3.md)

### Authorization

[appCheck](../README.md#appCheck), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

