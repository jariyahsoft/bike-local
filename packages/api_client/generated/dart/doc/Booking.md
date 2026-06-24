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
**assetIds** | **BuiltList&lt;String&gt;** |  | 
**equipmentIds** | **BuiltList&lt;String&gt;** |  | 
**status** | [**BookingStatus**](BookingStatus.md) |  | 
**startAt** | [**DateTime**](DateTime.md) |  | 
**endAt** | [**DateTime**](DateTime.md) |  | 
**pickupPointId** | **String** |  | 
**returnPointId** | **String** |  | 
**paymentMethod** | **String** |  | 
**currency** | **String** |  | 
**subtotalAmount** | **int** |  | 
**feeAmount** | **int** |  | 
**depositAmount** | **int** |  | 
**discountAmount** | **int** |  | 
**totalAmount** | **int** |  | 
**priceSnapshot** | [**BuiltMap&lt;String, JsonObject&gt;**](JsonObject.md) |  | 
**policySnapshot** | [**BuiltMap&lt;String, JsonObject&gt;**](JsonObject.md) |  | 
**qrBookingTokenReference** | **String** | One-time or time-limited booking QR token reference; raw token secret is not returned. | 
**statusHistory** | [**BuiltList&lt;BookingStatusTransition&gt;**](BookingStatusTransition.md) |  | 
**bookingItems** | [**BuiltList&lt;BookingItem&gt;**](BookingItem.md) |  | 

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


