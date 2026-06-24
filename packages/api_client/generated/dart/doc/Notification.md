# bike_local_generated_api_client.model.Notification

## Load the model package
```dart
import 'package:bike_local_generated_api_client/api.dart';
```

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **String** |  | 
**schemaVersion** | **int** |  | 
**tenantId** | **String** |  | 
**createdAt** | [**DateTime**](DateTime.md) |  | 
**createdBy** | **String** |  | [optional] 
**updatedAt** | [**DateTime**](DateTime.md) |  | 
**updatedBy** | **String** |  | [optional] 
**deletedAt** | [**DateTime**](DateTime.md) |  | [optional] 
**version** | **int** |  | 
**recipientUserId** | **String** |  | 
**type** | [**NotificationEventType**](NotificationEventType.md) |  | 
**channel** | [**NotificationChannel**](NotificationChannel.md) |  | 
**deliveryStatus** | [**NotificationDeliveryStatus**](NotificationDeliveryStatus.md) |  | 
**payload** | [**BuiltMap&lt;String, JsonObject&gt;**](JsonObject.md) |  | 
**readAt** | [**DateTime**](DateTime.md) |  | [optional] 
**lastDeliveryAttemptAt** | [**DateTime**](DateTime.md) |  | [optional] 

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


