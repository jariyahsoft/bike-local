//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:bike_local_generated_api_client/src/model/notification_device_platform.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'register_notification_device_request.g.dart';

/// RegisterNotificationDeviceRequest
///
/// Properties:
/// * [platform] 
/// * [deviceId] 
/// * [fcmToken] 
@BuiltValue()
abstract class RegisterNotificationDeviceRequest implements Built<RegisterNotificationDeviceRequest, RegisterNotificationDeviceRequestBuilder> {
  @BuiltValueField(wireName: r'platform')
  NotificationDevicePlatform get platform;
  // enum platformEnum {  IOS,  ANDROID,  WEB,  };

  @BuiltValueField(wireName: r'device_id')
  String get deviceId;

  @BuiltValueField(wireName: r'fcm_token')
  String get fcmToken;

  RegisterNotificationDeviceRequest._();

  factory RegisterNotificationDeviceRequest([void updates(RegisterNotificationDeviceRequestBuilder b)]) = _$RegisterNotificationDeviceRequest;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(RegisterNotificationDeviceRequestBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<RegisterNotificationDeviceRequest> get serializer => _$RegisterNotificationDeviceRequestSerializer();
}

class _$RegisterNotificationDeviceRequestSerializer implements PrimitiveSerializer<RegisterNotificationDeviceRequest> {
  @override
  final Iterable<Type> types = const [RegisterNotificationDeviceRequest, _$RegisterNotificationDeviceRequest];

  @override
  final String wireName = r'RegisterNotificationDeviceRequest';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    RegisterNotificationDeviceRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'platform';
    yield serializers.serialize(
      object.platform,
      specifiedType: const FullType(NotificationDevicePlatform),
    );
    yield r'device_id';
    yield serializers.serialize(
      object.deviceId,
      specifiedType: const FullType(String),
    );
    yield r'fcm_token';
    yield serializers.serialize(
      object.fcmToken,
      specifiedType: const FullType(String),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    RegisterNotificationDeviceRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required RegisterNotificationDeviceRequestBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'platform':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(NotificationDevicePlatform),
          ) as NotificationDevicePlatform;
          result.platform = valueDes;
          break;
        case r'device_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.deviceId = valueDes;
          break;
        case r'fcm_token':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.fcmToken = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  RegisterNotificationDeviceRequest deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = RegisterNotificationDeviceRequestBuilder();
    final serializedList = (serialized as Iterable<Object?>).toList();
    final unhandled = <Object?>[];
    _deserializeProperties(
      serializers,
      serialized,
      specifiedType: specifiedType,
      serializedList: serializedList,
      unhandled: unhandled,
      result: result,
    );
    return result.build();
  }
}

