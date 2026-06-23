//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:bike_local_generated_api_client/src/model/entity_base.dart';
import 'package:built_collection/built_collection.dart';
import 'package:bike_local_generated_api_client/src/model/asset_status_transition.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'asset.g.dart';

/// Asset
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
/// * [categoryId]
/// * [code]
/// * [qrTokenReference]
/// * [brand]
/// * [model]
/// * [color]
/// * [size]
/// * [description]
/// * [status]
/// * [basePrice]
/// * [depositAmount]
/// * [currency]
/// * [currentPointId]
/// * [images]
/// * [cashAccepted]
/// * [differentReturnAllowed]
/// * [equipmentIds]
/// * [statusHistory]
@BuiltValue()
abstract class Asset implements EntityBase, Built<Asset, AssetBuilder> {
  @BuiltValueField(wireName: r'deposit_amount')
  int get depositAmount;

  @BuiltValueField(wireName: r'different_return_allowed')
  bool get differentReturnAllowed;

  @BuiltValueField(wireName: r'branch_id')
  String get branchId;

  @BuiltValueField(wireName: r'images')
  BuiltList<String> get images;

  @BuiltValueField(wireName: r'code')
  String get code;

  @BuiltValueField(wireName: r'color')
  String? get color;

  @BuiltValueField(wireName: r'description')
  String? get description;

  @BuiltValueField(wireName: r'current_point_id')
  String? get currentPointId;

  @BuiltValueField(wireName: r'store_id')
  String get storeId;

  @BuiltValueField(wireName: r'status_history')
  BuiltList<AssetStatusTransition> get statusHistory;

  @BuiltValueField(wireName: r'size')
  String? get size;

  @BuiltValueField(wireName: r'cash_accepted')
  bool get cashAccepted;

  @BuiltValueField(wireName: r'qr_token_reference')
  String? get qrTokenReference;

  @BuiltValueField(wireName: r'equipment_ids')
  BuiltList<String> get equipmentIds;

  @BuiltValueField(wireName: r'model')
  String? get model;

  @BuiltValueField(wireName: r'currency')
  String get currency;

  @BuiltValueField(wireName: r'brand')
  String? get brand;

  @BuiltValueField(wireName: r'category_id')
  String get categoryId;

  @BuiltValueField(wireName: r'status')
  AssetStatusEnum get status;
  // enum statusEnum {  AVAILABLE,  RESERVED,  PREPARING,  AWAITING_HANDOVER,  RENTED,  RETURN_PENDING,  INSPECTION_PENDING,  MAINTENANCE,  INACTIVE,  LOST,  };

  @BuiltValueField(wireName: r'base_price')
  int get basePrice;

  Asset._();

  factory Asset([void updates(AssetBuilder b)]) = _$Asset;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(AssetBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<Asset> get serializer => _$AssetSerializer();
}

class _$AssetSerializer implements PrimitiveSerializer<Asset> {
  @override
  final Iterable<Type> types = const [Asset, _$Asset];

  @override
  final String wireName = r'Asset';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    Asset object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'code';
    yield serializers.serialize(
      object.code,
      specifiedType: const FullType(String),
    );
    if (object.color != null) {
      yield r'color';
      yield serializers.serialize(
        object.color,
        specifiedType: const FullType(String),
      );
    }
    if (object.description != null) {
      yield r'description';
      yield serializers.serialize(
        object.description,
        specifiedType: const FullType(String),
      );
    }
    if (object.currentPointId != null) {
      yield r'current_point_id';
      yield serializers.serialize(
        object.currentPointId,
        specifiedType: const FullType(String),
      );
    }
    yield r'created_at';
    yield serializers.serialize(
      object.createdAt,
      specifiedType: const FullType(DateTime),
    );
    if (object.qrTokenReference != null) {
      yield r'qr_token_reference';
      yield serializers.serialize(
        object.qrTokenReference,
        specifiedType: const FullType(String),
      );
    }
    yield r'equipment_ids';
    yield serializers.serialize(
      object.equipmentIds,
      specifiedType: const FullType(BuiltList, [FullType(String)]),
    );
    if (object.model != null) {
      yield r'model';
      yield serializers.serialize(
        object.model,
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
    if (object.brand != null) {
      yield r'brand';
      yield serializers.serialize(
        object.brand,
        specifiedType: const FullType(String),
      );
    }
    yield r'base_price';
    yield serializers.serialize(
      object.basePrice,
      specifiedType: const FullType(int),
    );
    yield r'updated_at';
    yield serializers.serialize(
      object.updatedAt,
      specifiedType: const FullType(DateTime),
    );
    yield r'deposit_amount';
    yield serializers.serialize(
      object.depositAmount,
      specifiedType: const FullType(int),
    );
    yield r'different_return_allowed';
    yield serializers.serialize(
      object.differentReturnAllowed,
      specifiedType: const FullType(bool),
    );
    yield r'branch_id';
    yield serializers.serialize(
      object.branchId,
      specifiedType: const FullType(String),
    );
    yield r'images';
    yield serializers.serialize(
      object.images,
      specifiedType: const FullType(BuiltList, [FullType(String)]),
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
    yield r'status_history';
    yield serializers.serialize(
      object.statusHistory,
      specifiedType: const FullType(BuiltList, [FullType(AssetStatusTransition)]),
    );
    if (object.deletedAt != null) {
      yield r'deleted_at';
      yield serializers.serialize(
        object.deletedAt,
        specifiedType: const FullType(DateTime),
      );
    }
    if (object.size != null) {
      yield r'size';
      yield serializers.serialize(
        object.size,
        specifiedType: const FullType(String),
      );
    }
    yield r'cash_accepted';
    yield serializers.serialize(
      object.cashAccepted,
      specifiedType: const FullType(bool),
    );
    if (object.createdBy != null) {
      yield r'created_by';
      yield serializers.serialize(
        object.createdBy,
        specifiedType: const FullType(String),
      );
    }
    if (object.tenantId != null) {
      yield r'tenant_id';
      yield serializers.serialize(
        object.tenantId,
        specifiedType: const FullType(String),
      );
    }
    yield r'category_id';
    yield serializers.serialize(
      object.categoryId,
      specifiedType: const FullType(String),
    );
    yield r'status';
    yield serializers.serialize(
      object.status,
      specifiedType: const FullType(AssetStatusEnum),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    Asset object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required AssetBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'code':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.code = valueDes;
          break;
        case r'color':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.color = valueDes;
          break;
        case r'description':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.description = valueDes;
          break;
        case r'current_point_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.currentPointId = valueDes;
          break;
        case r'created_at':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DateTime),
          ) as DateTime;
          result.createdAt = valueDes;
          break;
        case r'qr_token_reference':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.qrTokenReference = valueDes;
          break;
        case r'equipment_ids':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BuiltList, [FullType(String)]),
          ) as BuiltList<String>;
          result.equipmentIds.replace(valueDes);
          break;
        case r'model':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.model = valueDes;
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
        case r'brand':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.brand = valueDes;
          break;
        case r'base_price':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.basePrice = valueDes;
          break;
        case r'updated_at':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DateTime),
          ) as DateTime;
          result.updatedAt = valueDes;
          break;
        case r'deposit_amount':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.depositAmount = valueDes;
          break;
        case r'different_return_allowed':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(bool),
          ) as bool;
          result.differentReturnAllowed = valueDes;
          break;
        case r'branch_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.branchId = valueDes;
          break;
        case r'images':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BuiltList, [FullType(String)]),
          ) as BuiltList<String>;
          result.images.replace(valueDes);
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
        case r'status_history':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BuiltList, [FullType(AssetStatusTransition)]),
          ) as BuiltList<AssetStatusTransition>;
          result.statusHistory.replace(valueDes);
          break;
        case r'deleted_at':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DateTime),
          ) as DateTime;
          result.deletedAt = valueDes;
          break;
        case r'size':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.size = valueDes;
          break;
        case r'cash_accepted':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(bool),
          ) as bool;
          result.cashAccepted = valueDes;
          break;
        case r'created_by':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.createdBy = valueDes;
          break;
        case r'tenant_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.tenantId = valueDes;
          break;
        case r'category_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.categoryId = valueDes;
          break;
        case r'status':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(AssetStatusEnum),
          ) as AssetStatusEnum;
          result.status = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  Asset deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = AssetBuilder();
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

class AssetStatusEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'AVAILABLE')
  static const AssetStatusEnum AVAILABLE = _$assetStatusEnum_AVAILABLE;
  @BuiltValueEnumConst(wireName: r'RESERVED')
  static const AssetStatusEnum RESERVED = _$assetStatusEnum_RESERVED;
  @BuiltValueEnumConst(wireName: r'PREPARING')
  static const AssetStatusEnum PREPARING = _$assetStatusEnum_PREPARING;
  @BuiltValueEnumConst(wireName: r'AWAITING_HANDOVER')
  static const AssetStatusEnum AWAITING_HANDOVER = _$assetStatusEnum_AWAITING_HANDOVER;
  @BuiltValueEnumConst(wireName: r'RENTED')
  static const AssetStatusEnum RENTED = _$assetStatusEnum_RENTED;
  @BuiltValueEnumConst(wireName: r'RETURN_PENDING')
  static const AssetStatusEnum RETURN_PENDING = _$assetStatusEnum_RETURN_PENDING;
  @BuiltValueEnumConst(wireName: r'INSPECTION_PENDING')
  static const AssetStatusEnum INSPECTION_PENDING = _$assetStatusEnum_INSPECTION_PENDING;
  @BuiltValueEnumConst(wireName: r'MAINTENANCE')
  static const AssetStatusEnum MAINTENANCE = _$assetStatusEnum_MAINTENANCE;
  @BuiltValueEnumConst(wireName: r'INACTIVE')
  static const AssetStatusEnum INACTIVE = _$assetStatusEnum_INACTIVE;
  @BuiltValueEnumConst(wireName: r'LOST')
  static const AssetStatusEnum LOST = _$assetStatusEnum_LOST;

  static Serializer<AssetStatusEnum> get serializer => _$assetStatusEnumSerializer;

  const AssetStatusEnum._(String name): super(name);

  static BuiltSet<AssetStatusEnum> get values => _$assetStatusEnumValues;
  static AssetStatusEnum valueOf(String name) => _$assetStatusEnumValueOf(name);
}
