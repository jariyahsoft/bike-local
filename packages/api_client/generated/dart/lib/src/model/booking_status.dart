//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'booking_status.g.dart';

class BookingStatus extends EnumClass {

  @BuiltValueEnumConst(wireName: r'PENDING_PAYMENT')
  static const BookingStatus PENDING_PAYMENT = _$PENDING_PAYMENT;
  @BuiltValueEnumConst(wireName: r'PENDING_STORE_CONFIRMATION')
  static const BookingStatus PENDING_STORE_CONFIRMATION = _$PENDING_STORE_CONFIRMATION;
  @BuiltValueEnumConst(wireName: r'CONFIRMED')
  static const BookingStatus CONFIRMED = _$CONFIRMED;
  @BuiltValueEnumConst(wireName: r'PREPARING')
  static const BookingStatus PREPARING = _$PREPARING;
  @BuiltValueEnumConst(wireName: r'AWAITING_PICKUP')
  static const BookingStatus AWAITING_PICKUP = _$AWAITING_PICKUP;
  @BuiltValueEnumConst(wireName: r'IN_PROGRESS')
  static const BookingStatus IN_PROGRESS = _$IN_PROGRESS;
  @BuiltValueEnumConst(wireName: r'RETURN_PENDING')
  static const BookingStatus RETURN_PENDING = _$RETURN_PENDING;
  @BuiltValueEnumConst(wireName: r'INSPECTION_PENDING')
  static const BookingStatus INSPECTION_PENDING = _$INSPECTION_PENDING;
  @BuiltValueEnumConst(wireName: r'COMPLETED')
  static const BookingStatus COMPLETED = _$COMPLETED;
  @BuiltValueEnumConst(wireName: r'CANCELLED')
  static const BookingStatus CANCELLED = _$CANCELLED;
  @BuiltValueEnumConst(wireName: r'NO_SHOW')
  static const BookingStatus NO_SHOW = _$NO_SHOW;
  @BuiltValueEnumConst(wireName: r'DISPUTED')
  static const BookingStatus DISPUTED = _$DISPUTED;

  static Serializer<BookingStatus> get serializer => _$bookingStatusSerializer;

  const BookingStatus._(String name): super(name);

  static BuiltSet<BookingStatus> get values => _$values;
  static BookingStatus valueOf(String name) => _$valueOf(name);
}

/// Optionally, enum_class can generate a mixin to go with your enum for use
/// with Angular. It exposes your enum constants as getters. So, if you mix it
/// in to your Dart component class, the values become available to the
/// corresponding Angular template.
///
/// Trigger mixin generation by writing a line like this one next to your enum.
abstract class BookingStatusMixin = Object with _$BookingStatusMixin;

