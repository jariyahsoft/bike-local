//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'availability_conflict.g.dart';

/// AvailabilityConflict
///
/// Properties:
/// * [assetId]
/// * [reason]
/// * [referenceId]
@BuiltValue()
abstract class AvailabilityConflict implements Built<AvailabilityConflict, AvailabilityConflictBuilder> {
  @BuiltValueField(wireName: r'asset_id')
  String get assetId;

  @BuiltValueField(wireName: r'reason')
  AvailabilityConflictReasonEnum get reason;
  // enum reasonEnum {  BOOKING_OVERLAP,  AVAILABILITY_BLOCK,  };

  @BuiltValueField(wireName: r'reference_id')
  String get referenceId;

  AvailabilityConflict._();

  factory AvailabilityConflict([void updates(AvailabilityConflictBuilder b)]) = _$AvailabilityConflict;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(AvailabilityConflictBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<AvailabilityConflict> get serializer => _$AvailabilityConflictSerializer();
}

class _$AvailabilityConflictSerializer implements PrimitiveSerializer<AvailabilityConflict> {
  @override
  final Iterable<Type> types = const [AvailabilityConflict, _$AvailabilityConflict];

  @override
  final String wireName = r'AvailabilityConflict';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    AvailabilityConflict object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'asset_id';
    yield serializers.serialize(
      object.assetId,
      specifiedType: const FullType(String),
    );
    yield r'reason';
    yield serializers.serialize(
      object.reason,
      specifiedType: const FullType(AvailabilityConflictReasonEnum),
    );
    yield r'reference_id';
    yield serializers.serialize(
      object.referenceId,
      specifiedType: const FullType(String),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    AvailabilityConflict object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required AvailabilityConflictBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'asset_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.assetId = valueDes;
          break;
        case r'reason':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(AvailabilityConflictReasonEnum),
          ) as AvailabilityConflictReasonEnum;
          result.reason = valueDes;
          break;
        case r'reference_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.referenceId = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  AvailabilityConflict deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = AvailabilityConflictBuilder();
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

class AvailabilityConflictReasonEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'BOOKING_OVERLAP')
  static const AvailabilityConflictReasonEnum BOOKING_OVERLAP = _$availabilityConflictReasonEnum_BOOKING_OVERLAP;
  @BuiltValueEnumConst(wireName: r'AVAILABILITY_BLOCK')
  static const AvailabilityConflictReasonEnum AVAILABILITY_BLOCK = _$availabilityConflictReasonEnum_AVAILABILITY_BLOCK;

  static Serializer<AvailabilityConflictReasonEnum> get serializer => _$availabilityConflictReasonEnumSerializer;

  const AvailabilityConflictReasonEnum._(String name): super(name);

  static BuiltSet<AvailabilityConflictReasonEnum> get values => _$availabilityConflictReasonEnumValues;
  static AvailabilityConflictReasonEnum valueOf(String name) => _$availabilityConflictReasonEnumValueOf(name);
}
