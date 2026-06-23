//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:bike_local_generated_api_client/src/model/entity_base.dart';
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'deposit.g.dart';

/// Deposit
///
/// Properties:
/// * [id]
/// * [schemaVersion]
/// * [tenantId]
/// * [createdAt]
/// * [createdBy]
/// * [updatedAt]
/// * [updatedBy]
/// * [deletedAt]
/// * [version]
/// * [bookingId]
/// * [status]
/// * [amount]
/// * [currency]
/// * [deductedAmount]
@BuiltValue()
abstract class Deposit implements EntityBase, Built<Deposit, DepositBuilder> {
  @BuiltValueField(wireName: r'amount')
  int get amount;

  @BuiltValueField(wireName: r'deducted_amount')
  int? get deductedAmount;

  @BuiltValueField(wireName: r'currency')
  String get currency;

  @BuiltValueField(wireName: r'booking_id')
  String get bookingId;

  @BuiltValueField(wireName: r'status')
  DepositStatusEnum get status;
  // enum statusEnum {  NOT_REQUIRED,  PENDING,  HELD,  PARTIALLY_DEDUCTED,  RELEASED,  FORFEITED,  };

  Deposit._();

  factory Deposit([void updates(DepositBuilder b)]) = _$Deposit;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(DepositBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<Deposit> get serializer => _$DepositSerializer();
}

class _$DepositSerializer implements PrimitiveSerializer<Deposit> {
  @override
  final Iterable<Type> types = const [Deposit, _$Deposit];

  @override
  final String wireName = r'Deposit';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    Deposit object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'amount';
    yield serializers.serialize(
      object.amount,
      specifiedType: const FullType(int),
    );
    yield r'schema_version';
    yield serializers.serialize(
      object.schemaVersion,
      specifiedType: const FullType(int),
    );
    if (object.updatedBy != null) {
      yield r'updated_by';
      yield serializers.serialize(
        object.updatedBy,
        specifiedType: const FullType(String),
      );
    }
    yield r'version';
    yield serializers.serialize(
      object.version,
      specifiedType: const FullType(int),
    );
    yield r'booking_id';
    yield serializers.serialize(
      object.bookingId,
      specifiedType: const FullType(String),
    );
    yield r'created_at';
    yield serializers.serialize(
      object.createdAt,
      specifiedType: const FullType(DateTime),
    );
    if (object.deletedAt != null) {
      yield r'deleted_at';
      yield serializers.serialize(
        object.deletedAt,
        specifiedType: const FullType(DateTime),
      );
    }
    if (object.createdBy != null) {
      yield r'created_by';
      yield serializers.serialize(
        object.createdBy,
        specifiedType: const FullType(String),
      );
    }
    if (object.deductedAmount != null) {
      yield r'deducted_amount';
      yield serializers.serialize(
        object.deductedAmount,
        specifiedType: const FullType(int),
      );
    }
    if (object.tenantId != null) {
      yield r'tenant_id';
      yield serializers.serialize(
        object.tenantId,
        specifiedType: const FullType(String),
      );
    }
    yield r'currency';
    yield serializers.serialize(
      object.currency,
      specifiedType: const FullType(String),
    );
    yield r'id';
    yield serializers.serialize(
      object.id,
      specifiedType: const FullType(String),
    );
    yield r'status';
    yield serializers.serialize(
      object.status,
      specifiedType: const FullType(DepositStatusEnum),
    );
    yield r'updated_at';
    yield serializers.serialize(
      object.updatedAt,
      specifiedType: const FullType(DateTime),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    Deposit object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required DepositBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'amount':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.amount = valueDes;
          break;
        case r'schema_version':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.schemaVersion = valueDes;
          break;
        case r'updated_by':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.updatedBy = valueDes;
          break;
        case r'version':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.version = valueDes;
          break;
        case r'booking_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.bookingId = valueDes;
          break;
        case r'created_at':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DateTime),
          ) as DateTime;
          result.createdAt = valueDes;
          break;
        case r'deleted_at':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DateTime),
          ) as DateTime;
          result.deletedAt = valueDes;
          break;
        case r'created_by':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.createdBy = valueDes;
          break;
        case r'deducted_amount':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.deductedAmount = valueDes;
          break;
        case r'tenant_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.tenantId = valueDes;
          break;
        case r'currency':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.currency = valueDes;
          break;
        case r'id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.id = valueDes;
          break;
        case r'status':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DepositStatusEnum),
          ) as DepositStatusEnum;
          result.status = valueDes;
          break;
        case r'updated_at':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DateTime),
          ) as DateTime;
          result.updatedAt = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  Deposit deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = DepositBuilder();
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

class DepositStatusEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'NOT_REQUIRED')
  static const DepositStatusEnum NOT_REQUIRED = _$depositStatusEnum_NOT_REQUIRED;
  @BuiltValueEnumConst(wireName: r'PENDING')
  static const DepositStatusEnum PENDING = _$depositStatusEnum_PENDING;
  @BuiltValueEnumConst(wireName: r'HELD')
  static const DepositStatusEnum HELD = _$depositStatusEnum_HELD;
  @BuiltValueEnumConst(wireName: r'PARTIALLY_DEDUCTED')
  static const DepositStatusEnum PARTIALLY_DEDUCTED = _$depositStatusEnum_PARTIALLY_DEDUCTED;
  @BuiltValueEnumConst(wireName: r'RELEASED')
  static const DepositStatusEnum RELEASED = _$depositStatusEnum_RELEASED;
  @BuiltValueEnumConst(wireName: r'FORFEITED')
  static const DepositStatusEnum FORFEITED = _$depositStatusEnum_FORFEITED;

  static Serializer<DepositStatusEnum> get serializer => _$depositStatusEnumSerializer;

  const DepositStatusEnum._(String name): super(name);

  static BuiltSet<DepositStatusEnum> get values => _$depositStatusEnumValues;
  static DepositStatusEnum valueOf(String name) => _$depositStatusEnumValueOf(name);
}
