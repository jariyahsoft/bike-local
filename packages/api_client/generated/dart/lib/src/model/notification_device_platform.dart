//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'notification_device_platform.g.dart';

class NotificationDevicePlatform extends EnumClass {

  @BuiltValueEnumConst(wireName: r'IOS')
  static const NotificationDevicePlatform IOS = _$IOS;
  @BuiltValueEnumConst(wireName: r'ANDROID')
  static const NotificationDevicePlatform ANDROID = _$ANDROID;
  @BuiltValueEnumConst(wireName: r'WEB')
  static const NotificationDevicePlatform WEB = _$WEB;

  static Serializer<NotificationDevicePlatform> get serializer => _$notificationDevicePlatformSerializer;

  const NotificationDevicePlatform._(String name): super(name);

  static BuiltSet<NotificationDevicePlatform> get values => _$values;
  static NotificationDevicePlatform valueOf(String name) => _$valueOf(name);
}

/// Optionally, enum_class can generate a mixin to go with your enum for use
/// with Angular. It exposes your enum constants as getters. So, if you mix it
/// in to your Dart component class, the values become available to the
/// corresponding Angular template.
///
/// Trigger mixin generation by writing a line like this one next to your enum.
abstract class NotificationDevicePlatformMixin = Object with _$NotificationDevicePlatformMixin;

