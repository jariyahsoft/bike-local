//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'asset_status_transition.g.dart';

/// AssetStatusTransition
///
/// Properties:
/// * [fromStatus]
/// * [toStatus]
/// * [changedAt]
/// * [changedByUserId]
/// * [reason]
@BuiltValue()
abstract class AssetStatusTransition implements Built<AssetStatusTransition, AssetStatusTransitionBuilder> {
  @BuiltValueField(wireName: r'from_status')
  AssetStatusTransitionFromStatusEnum get fromStatus;
  // enum fromStatusEnum {  AVAILABLE,  RESERVED,  PREPARING,  AWAITING_HANDOVER,  RENTED,  RETURN_PENDING,  INSPECTION_PENDING,  MAINTENANCE,  INACTIVE,  LOST,  };

  @BuiltValueField(wireName: r'to_status')
  AssetStatusTransitionToStatusEnum get toStatus;
  // enum toStatusEnum {  AVAILABLE,  RESERVED,  PREPARING,  AWAITING_HANDOVER,  RENTED,  RETURN_PENDING,  INSPECTION_PENDING,  MAINTENANCE,  INACTIVE,  LOST,  };

  @BuiltValueField(wireName: r'changed_at')
  DateTime get changedAt;

  @BuiltValueField(wireName: r'changed_by_user_id')
  String? get changedByUserId;

  @BuiltValueField(wireName: r'reason')
  String? get reason;

  AssetStatusTransition._();

  factory AssetStatusTransition([void updates(AssetStatusTransitionBuilder b)]) = _$AssetStatusTransition;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(AssetStatusTransitionBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<AssetStatusTransition> get serializer => _$AssetStatusTransitionSerializer();
}

class _$AssetStatusTransitionSerializer implements PrimitiveSerializer<AssetStatusTransition> {
  @override
  final Iterable<Type> types = const [AssetStatusTransition, _$AssetStatusTransition];

  @override
  final String wireName = r'AssetStatusTransition';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    AssetStatusTransition object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'from_status';
    yield serializers.serialize(
      object.fromStatus,
      specifiedType: const FullType(AssetStatusTransitionFromStatusEnum),
    );
    yield r'to_status';
    yield serializers.serialize(
      object.toStatus,
      specifiedType: const FullType(AssetStatusTransitionToStatusEnum),
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
    AssetStatusTransition object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required AssetStatusTransitionBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'from_status':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(AssetStatusTransitionFromStatusEnum),
          ) as AssetStatusTransitionFromStatusEnum;
          result.fromStatus = valueDes;
          break;
        case r'to_status':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(AssetStatusTransitionToStatusEnum),
          ) as AssetStatusTransitionToStatusEnum;
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
  AssetStatusTransition deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = AssetStatusTransitionBuilder();
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

class AssetStatusTransitionFromStatusEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'AVAILABLE')
  static const AssetStatusTransitionFromStatusEnum AVAILABLE = _$assetStatusTransitionFromStatusEnum_AVAILABLE;
  @BuiltValueEnumConst(wireName: r'RESERVED')
  static const AssetStatusTransitionFromStatusEnum RESERVED = _$assetStatusTransitionFromStatusEnum_RESERVED;
  @BuiltValueEnumConst(wireName: r'PREPARING')
  static const AssetStatusTransitionFromStatusEnum PREPARING = _$assetStatusTransitionFromStatusEnum_PREPARING;
  @BuiltValueEnumConst(wireName: r'AWAITING_HANDOVER')
  static const AssetStatusTransitionFromStatusEnum AWAITING_HANDOVER = _$assetStatusTransitionFromStatusEnum_AWAITING_HANDOVER;
  @BuiltValueEnumConst(wireName: r'RENTED')
  static const AssetStatusTransitionFromStatusEnum RENTED = _$assetStatusTransitionFromStatusEnum_RENTED;
  @BuiltValueEnumConst(wireName: r'RETURN_PENDING')
  static const AssetStatusTransitionFromStatusEnum RETURN_PENDING = _$assetStatusTransitionFromStatusEnum_RETURN_PENDING;
  @BuiltValueEnumConst(wireName: r'INSPECTION_PENDING')
  static const AssetStatusTransitionFromStatusEnum INSPECTION_PENDING = _$assetStatusTransitionFromStatusEnum_INSPECTION_PENDING;
  @BuiltValueEnumConst(wireName: r'MAINTENANCE')
  static const AssetStatusTransitionFromStatusEnum MAINTENANCE = _$assetStatusTransitionFromStatusEnum_MAINTENANCE;
  @BuiltValueEnumConst(wireName: r'INACTIVE')
  static const AssetStatusTransitionFromStatusEnum INACTIVE = _$assetStatusTransitionFromStatusEnum_INACTIVE;
  @BuiltValueEnumConst(wireName: r'LOST')
  static const AssetStatusTransitionFromStatusEnum LOST = _$assetStatusTransitionFromStatusEnum_LOST;

  static Serializer<AssetStatusTransitionFromStatusEnum> get serializer => _$assetStatusTransitionFromStatusEnumSerializer;

  const AssetStatusTransitionFromStatusEnum._(String name): super(name);

  static BuiltSet<AssetStatusTransitionFromStatusEnum> get values => _$assetStatusTransitionFromStatusEnumValues;
  static AssetStatusTransitionFromStatusEnum valueOf(String name) => _$assetStatusTransitionFromStatusEnumValueOf(name);
}

class AssetStatusTransitionToStatusEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'AVAILABLE')
  static const AssetStatusTransitionToStatusEnum AVAILABLE = _$assetStatusTransitionToStatusEnum_AVAILABLE;
  @BuiltValueEnumConst(wireName: r'RESERVED')
  static const AssetStatusTransitionToStatusEnum RESERVED = _$assetStatusTransitionToStatusEnum_RESERVED;
  @BuiltValueEnumConst(wireName: r'PREPARING')
  static const AssetStatusTransitionToStatusEnum PREPARING = _$assetStatusTransitionToStatusEnum_PREPARING;
  @BuiltValueEnumConst(wireName: r'AWAITING_HANDOVER')
  static const AssetStatusTransitionToStatusEnum AWAITING_HANDOVER = _$assetStatusTransitionToStatusEnum_AWAITING_HANDOVER;
  @BuiltValueEnumConst(wireName: r'RENTED')
  static const AssetStatusTransitionToStatusEnum RENTED = _$assetStatusTransitionToStatusEnum_RENTED;
  @BuiltValueEnumConst(wireName: r'RETURN_PENDING')
  static const AssetStatusTransitionToStatusEnum RETURN_PENDING = _$assetStatusTransitionToStatusEnum_RETURN_PENDING;
  @BuiltValueEnumConst(wireName: r'INSPECTION_PENDING')
  static const AssetStatusTransitionToStatusEnum INSPECTION_PENDING = _$assetStatusTransitionToStatusEnum_INSPECTION_PENDING;
  @BuiltValueEnumConst(wireName: r'MAINTENANCE')
  static const AssetStatusTransitionToStatusEnum MAINTENANCE = _$assetStatusTransitionToStatusEnum_MAINTENANCE;
  @BuiltValueEnumConst(wireName: r'INACTIVE')
  static const AssetStatusTransitionToStatusEnum INACTIVE = _$assetStatusTransitionToStatusEnum_INACTIVE;
  @BuiltValueEnumConst(wireName: r'LOST')
  static const AssetStatusTransitionToStatusEnum LOST = _$assetStatusTransitionToStatusEnum_LOST;

  static Serializer<AssetStatusTransitionToStatusEnum> get serializer => _$assetStatusTransitionToStatusEnumSerializer;

  const AssetStatusTransitionToStatusEnum._(String name): super(name);

  static BuiltSet<AssetStatusTransitionToStatusEnum> get values => _$assetStatusTransitionToStatusEnumValues;
  static AssetStatusTransitionToStatusEnum valueOf(String name) => _$assetStatusTransitionToStatusEnumValueOf(name);
}
