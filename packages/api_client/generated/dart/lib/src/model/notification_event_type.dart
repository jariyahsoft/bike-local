//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'notification_event_type.g.dart';

class NotificationEventType extends EnumClass {

  @BuiltValueEnumConst(wireName: r'BOOKING_CREATED')
  static const NotificationEventType BOOKING_CREATED = _$BOOKING_CREATED;
  @BuiltValueEnumConst(wireName: r'BOOKING_CONFIRMED')
  static const NotificationEventType BOOKING_CONFIRMED = _$BOOKING_CONFIRMED;
  @BuiltValueEnumConst(wireName: r'PAYMENT_COMPLETED')
  static const NotificationEventType PAYMENT_COMPLETED = _$PAYMENT_COMPLETED;
  @BuiltValueEnumConst(wireName: r'CASH_PAYMENT_SELECTED')
  static const NotificationEventType CASH_PAYMENT_SELECTED = _$CASH_PAYMENT_SELECTED;
  @BuiltValueEnumConst(wireName: r'STAFF_TASK_ASSIGNED')
  static const NotificationEventType STAFF_TASK_ASSIGNED = _$STAFF_TASK_ASSIGNED;
  @BuiltValueEnumConst(wireName: r'RENTAL_STARTED')
  static const NotificationEventType RENTAL_STARTED = _$RENTAL_STARTED;
  @BuiltValueEnumConst(wireName: r'RENTAL_NEAR_EXPIRY')
  static const NotificationEventType RENTAL_NEAR_EXPIRY = _$RENTAL_NEAR_EXPIRY;
  @BuiltValueEnumConst(wireName: r'RENTAL_OVERDUE')
  static const NotificationEventType RENTAL_OVERDUE = _$RENTAL_OVERDUE;
  @BuiltValueEnumConst(wireName: r'RETURN_REQUESTED')
  static const NotificationEventType RETURN_REQUESTED = _$RETURN_REQUESTED;
  @BuiltValueEnumConst(wireName: r'RETURN_ACCEPTED')
  static const NotificationEventType RETURN_ACCEPTED = _$RETURN_ACCEPTED;
  @BuiltValueEnumConst(wireName: r'SOS_OPENED')
  static const NotificationEventType SOS_OPENED = _$SOS_OPENED;
  @BuiltValueEnumConst(wireName: r'SOS_ASSIGNED')
  static const NotificationEventType SOS_ASSIGNED = _$SOS_ASSIGNED;
  @BuiltValueEnumConst(wireName: r'REFUND_COMPLETED')
  static const NotificationEventType REFUND_COMPLETED = _$REFUND_COMPLETED;

  static Serializer<NotificationEventType> get serializer => _$notificationEventTypeSerializer;

  const NotificationEventType._(String name): super(name);

  static BuiltSet<NotificationEventType> get values => _$values;
  static NotificationEventType valueOf(String name) => _$valueOf(name);
}

/// Optionally, enum_class can generate a mixin to go with your enum for use
/// with Angular. It exposes your enum constants as getters. So, if you mix it
/// in to your Dart component class, the values become available to the
/// corresponding Angular template.
///
/// Trigger mixin generation by writing a line like this one next to your enum.
abstract class NotificationEventTypeMixin = Object with _$NotificationEventTypeMixin;

