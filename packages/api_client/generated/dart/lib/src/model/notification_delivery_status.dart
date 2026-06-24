//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'notification_delivery_status.g.dart';

class NotificationDeliveryStatus extends EnumClass {

  @BuiltValueEnumConst(wireName: r'QUEUED')
  static const NotificationDeliveryStatus QUEUED = _$QUEUED;
  @BuiltValueEnumConst(wireName: r'SENT')
  static const NotificationDeliveryStatus SENT = _$SENT;
  @BuiltValueEnumConst(wireName: r'DELIVERED')
  static const NotificationDeliveryStatus DELIVERED = _$DELIVERED;
  @BuiltValueEnumConst(wireName: r'FAILED')
  static const NotificationDeliveryStatus FAILED = _$FAILED;
  @BuiltValueEnumConst(wireName: r'READ')
  static const NotificationDeliveryStatus READ = _$READ;

  static Serializer<NotificationDeliveryStatus> get serializer => _$notificationDeliveryStatusSerializer;

  const NotificationDeliveryStatus._(String name): super(name);

  static BuiltSet<NotificationDeliveryStatus> get values => _$values;
  static NotificationDeliveryStatus valueOf(String name) => _$valueOf(name);
}

/// Optionally, enum_class can generate a mixin to go with your enum for use
/// with Angular. It exposes your enum constants as getters. So, if you mix it
/// in to your Dart component class, the values become available to the
/// corresponding Angular template.
///
/// Trigger mixin generation by writing a line like this one next to your enum.
abstract class NotificationDeliveryStatusMixin = Object with _$NotificationDeliveryStatusMixin;

