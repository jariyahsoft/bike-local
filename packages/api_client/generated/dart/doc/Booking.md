# bike_local_generated_api_client.model.Booking

## Load the model package
```dart
import 'package:bike_local_generated_api_client/api.dart';
```

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **String** |  | 
**schemaVersion** | **int** |  | 
**tenantId** | **String** |  | [optional] 
**createdAt** | [**DateTime**](DateTime.md) |  | 
**createdBy** | **String** |  | [optional] 
**updatedAt** | [**DateTime**](DateTime.md) |  | 
**updatedBy** | **String** |  | [optional] 
**deletedAt** | [**DateTime**](DateTime.md) |  | [optional] 
**version** | **int** |  | 
**bookingNumber** | **String** |  | 
**userId** | **String** |  | 
**storeId** | **String** |  | 
**branchId** | **String** |  | 
**status** | [**BookingStatus**](BookingStatus.md) |  | 
**startAt** | [**DateTime**](DateTime.md) |  | 
**endAt** | [**DateTime**](DateTime.md) |  | 
**pickupPointId** | **String** |  | [optional] 
**returnPointId** | **String** |  | [optional] 
**paymentMethod** | **String** |  | 
**currency** | **String** |  | 
**subtotalAmount** | **int** |  | 
**feeAmount** | **int** |  | 
**depositAmount** | **int** |  | 
**discountAmount** | **int** |  | 
**totalAmount** | **int** |  | 
**priceSnapshot** | [**BuiltMap&lt;String, JsonObject&gt;**](JsonObject.md) |  | [optional] 
**policySnapshot** | [**BuiltMap&lt;String, JsonObject&gt;**](JsonObject.md) |  | [optional] 
**bookingItems** | [**BuiltList&lt;BookingItem&gt;**](BookingItem.md) |  | 

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


