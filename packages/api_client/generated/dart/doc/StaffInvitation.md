# bike_local_generated_api_client.model.StaffInvitation

## Load the model package
```dart
import 'package:bike_local_generated_api_client/api.dart';
```

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **String** |  |
**storeId** | **String** |  |
**role** | [**Role**](Role.md) |  |
**channel** | **String** |  |
**phone** | **String** |  | [optional]
**email** | **String** |  | [optional]
**inviteLinkHint** | **String** | Masked invitation link/QR reference; raw invitation secrets are never returned. | [optional]
**branchIds** | **BuiltList&lt;String&gt;** |  |
**permissionOverrides** | **BuiltList&lt;String&gt;** |  |
**status** | **String** |  |

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
