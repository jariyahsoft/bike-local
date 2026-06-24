//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:bike_local_generated_api_client/src/model/entity_base.dart';
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'equipment.g.dart';

/// Equipment
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
/// * [storeId] 
/// * [branchId] 
/// * [name] 
/// * [rentalMode] 
/// * [status] 
/// * [priceAmount] 
/// * [depositAmount] 
/// * [currency] 
@BuiltValue()
abstract class Equipment implements EntityBase, Built<Equipment, EquipmentBuilder> {
  @BuiltValueField(wireName: r'deposit_amount')
  int? get depositAmount;

  @BuiltValueField(wireName: r'branch_id')
  String? get branchId;

  @BuiltValueField(wireName: r'rental_mode')
  EquipmentRentalModeEnum get rentalMode;
  // enum rentalModeEnum {  SEPARATE,  BUNDLED,  PACKAGE_INCLUDED,  DEPOSIT_REQUIRED,  };

  @BuiltValueField(wireName: r'name')
  String get name;

  @BuiltValueField(wireName: r'currency')
  String? get currency;

  @BuiltValueField(wireName: r'store_id')
  String get storeId;

  @BuiltValueField(wireName: r'price_amount')
  int? get priceAmount;

  @BuiltValueField(wireName: r'status')
  EquipmentStatusEnum get status;
  // enum statusEnum {  AVAILABLE,  RENTED,  MAINTENANCE,  INACTIVE,  };

  Equipment._();

  factory Equipment([void updates(EquipmentBuilder b)]) = _$Equipment;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(EquipmentBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<Equipment> get serializer => _$EquipmentSerializer();
}

class _$EquipmentSerializer implements PrimitiveSerializer<Equipment> {
  @override
  final Iterable<Type> types = const [Equipment, _$Equipment];

  @override
  final String wireName = r'Equipment';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    Equipment object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    if (object.depositAmount != null) {
      yield r'deposit_amount';
      yield serializers.serialize(
        object.depositAmount,
        specifiedType: const FullType(int),
      );
    }
    if (object.branchId != null) {
      yield r'branch_id';
      yield serializers.serialize(
        object.branchId,
        specifiedType: const FullType(String),
      );
    }
    yield r'rental_mode';
    yield serializers.serialize(
      object.rentalMode,
      specifiedType: const FullType(EquipmentRentalModeEnum),
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
    yield r'store_id';
    yield serializers.serialize(
      object.storeId,
      specifiedType: const FullType(String),
    );
    yield r'version';
    yield serializers.serialize(
      object.version,
      specifiedType: const FullType(int),
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
    yield r'name';
    yield serializers.serialize(
      object.name,
      specifiedType: const FullType(String),
    );
    if (object.tenantId != null) {
      yield r'tenant_id';
      yield serializers.serialize(
        object.tenantId,
        specifiedType: const FullType(String),
      );
    }
    if (object.currency != null) {
      yield r'currency';
      yield serializers.serialize(
        object.currency,
        specifiedType: const FullType(String),
      );
    }
    yield r'id';
    yield serializers.serialize(
      object.id,
      specifiedType: const FullType(String),
    );
    if (object.priceAmount != null) {
      yield r'price_amount';
      yield serializers.serialize(
        object.priceAmount,
        specifiedType: const FullType(int),
      );
    }
    yield r'status';
    yield serializers.serialize(
      object.status,
      specifiedType: const FullType(EquipmentStatusEnum),
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
    Equipment object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required EquipmentBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'deposit_amount':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.depositAmount = valueDes;
          break;
        case r'branch_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.branchId = valueDes;
          break;
        case r'rental_mode':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(EquipmentRentalModeEnum),
          ) as EquipmentRentalModeEnum;
          result.rentalMode = valueDes;
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
        case r'store_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.storeId = valueDes;
          break;
        case r'version':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.version = valueDes;
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
        case r'name':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.name = valueDes;
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
        case r'price_amount':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.priceAmount = valueDes;
          break;
        case r'status':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(EquipmentStatusEnum),
          ) as EquipmentStatusEnum;
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
  Equipment deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = EquipmentBuilder();
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

class EquipmentRentalModeEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'SEPARATE')
  static const EquipmentRentalModeEnum SEPARATE = _$equipmentRentalModeEnum_SEPARATE;
  @BuiltValueEnumConst(wireName: r'BUNDLED')
  static const EquipmentRentalModeEnum BUNDLED = _$equipmentRentalModeEnum_BUNDLED;
  @BuiltValueEnumConst(wireName: r'PACKAGE_INCLUDED')
  static const EquipmentRentalModeEnum PACKAGE_INCLUDED = _$equipmentRentalModeEnum_PACKAGE_INCLUDED;
  @BuiltValueEnumConst(wireName: r'DEPOSIT_REQUIRED')
  static const EquipmentRentalModeEnum DEPOSIT_REQUIRED = _$equipmentRentalModeEnum_DEPOSIT_REQUIRED;

  static Serializer<EquipmentRentalModeEnum> get serializer => _$equipmentRentalModeEnumSerializer;

  const EquipmentRentalModeEnum._(String name): super(name);

  static BuiltSet<EquipmentRentalModeEnum> get values => _$equipmentRentalModeEnumValues;
  static EquipmentRentalModeEnum valueOf(String name) => _$equipmentRentalModeEnumValueOf(name);
}

class EquipmentStatusEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'AVAILABLE')
  static const EquipmentStatusEnum AVAILABLE = _$equipmentStatusEnum_AVAILABLE;
  @BuiltValueEnumConst(wireName: r'RENTED')
  static const EquipmentStatusEnum RENTED = _$equipmentStatusEnum_RENTED;
  @BuiltValueEnumConst(wireName: r'MAINTENANCE')
  static const EquipmentStatusEnum MAINTENANCE = _$equipmentStatusEnum_MAINTENANCE;
  @BuiltValueEnumConst(wireName: r'INACTIVE')
  static const EquipmentStatusEnum INACTIVE = _$equipmentStatusEnum_INACTIVE;

  static Serializer<EquipmentStatusEnum> get serializer => _$equipmentStatusEnumSerializer;

  const EquipmentStatusEnum._(String name): super(name);

  static BuiltSet<EquipmentStatusEnum> get values => _$equipmentStatusEnumValues;
  static EquipmentStatusEnum valueOf(String name) => _$equipmentStatusEnumValueOf(name);
}

