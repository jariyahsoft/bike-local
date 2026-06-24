//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:bike_local_generated_api_client/src/model/booking_status.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'booking_status_transition.g.dart';

/// BookingStatusTransition
///
/// Properties:
/// * [fromStatus] 
/// * [toStatus] 
/// * [changedAt] 
/// * [changedByUserId] 
/// * [reason] 
@BuiltValue()
abstract class BookingStatusTransition implements Built<BookingStatusTransition, BookingStatusTransitionBuilder> {
  @BuiltValueField(wireName: r'from_status')
  BookingStatus get fromStatus;
  // enum fromStatusEnum {  PENDING_PAYMENT,  PENDING_STORE_CONFIRMATION,  CONFIRMED,  PREPARING,  AWAITING_PICKUP,  IN_PROGRESS,  RETURN_PENDING,  INSPECTION_PENDING,  COMPLETED,  CANCELLED,  NO_SHOW,  DISPUTED,  };

  @BuiltValueField(wireName: r'to_status')
  BookingStatus get toStatus;
  // enum toStatusEnum {  PENDING_PAYMENT,  PENDING_STORE_CONFIRMATION,  CONFIRMED,  PREPARING,  AWAITING_PICKUP,  IN_PROGRESS,  RETURN_PENDING,  INSPECTION_PENDING,  COMPLETED,  CANCELLED,  NO_SHOW,  DISPUTED,  };

  @BuiltValueField(wireName: r'changed_at')
  DateTime get changedAt;

  @BuiltValueField(wireName: r'changed_by_user_id')
  String? get changedByUserId;

  @BuiltValueField(wireName: r'reason')
  String? get reason;

  BookingStatusTransition._();

  factory BookingStatusTransition([void updates(BookingStatusTransitionBuilder b)]) = _$BookingStatusTransition;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(BookingStatusTransitionBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<BookingStatusTransition> get serializer => _$BookingStatusTransitionSerializer();
}

class _$BookingStatusTransitionSerializer implements PrimitiveSerializer<BookingStatusTransition> {
  @override
  final Iterable<Type> types = const [BookingStatusTransition, _$BookingStatusTransition];

  @override
  final String wireName = r'BookingStatusTransition';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    BookingStatusTransition object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'from_status';
    yield serializers.serialize(
      object.fromStatus,
      specifiedType: const FullType(BookingStatus),
    );
    yield r'to_status';
    yield serializers.serialize(
      object.toStatus,
      specifiedType: const FullType(BookingStatus),
    );
    yield r'changed_at';
    yield serializers.serialize(
      object.changedAt,
      specifiedType: const FullType(DateTime),
    );
    if (object.changedByUserId != null) {
      yield r'changed_by_user_id';
      yield serializers.serialize(
        object.changedByUserId,
        specifiedType: const FullType(String),
      );
    }
    if (object.reason != null) {
      yield r'reason';
      yield serializers.serialize(
        object.reason,
        specifiedType: const FullType(String),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    BookingStatusTransition object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required BookingStatusTransitionBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'from_status':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BookingStatus),
          ) as BookingStatus;
          result.fromStatus = valueDes;
          break;
        case r'to_status':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BookingStatus),
          ) as BookingStatus;
          result.toStatus = valueDes;
          break;
        case r'changed_at':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DateTime),
          ) as DateTime;
          result.changedAt = valueDes;
          break;
        case r'changed_by_user_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.changedByUserId = valueDes;
          break;
        case r'reason':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.reason = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  BookingStatusTransition deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = BookingStatusTransitionBuilder();
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

