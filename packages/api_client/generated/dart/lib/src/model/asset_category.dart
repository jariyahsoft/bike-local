//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:bike_local_generated_api_client/src/model/entity_base.dart';
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'asset_category.g.dart';

/// AssetCategory
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
/// * [name]
/// * [type]
/// * [description]
/// * [defaultBasePrice] - Integer minor units only.
/// * [defaultDepositAmount] - Integer minor units only.
/// * [currency]
/// * [active]
@BuiltValue()
abstract class AssetCategory implements EntityBase, Built<AssetCategory, AssetCategoryBuilder> {
  @BuiltValueField(wireName: r'name')
  String get name;

  /// Integer minor units only.
  @BuiltValueField(wireName: r'default_deposit_amount')
  int get defaultDepositAmount;

  @BuiltValueField(wireName: r'description')
  String? get description;

  @BuiltValueField(wireName: r'active')
  bool get active;

  @BuiltValueField(wireName: r'currency')
  String get currency;

  /// Integer minor units only.
  @BuiltValueField(wireName: r'default_base_price')
  int get defaultBasePrice;

  @BuiltValueField(wireName: r'store_id')
  String get storeId;

  @BuiltValueField(wireName: r'type')
  AssetCategoryTypeEnum get type;
  // enum typeEnum {  BIKE,  E_BIKE,  SCOOTER,  OTHER,  };

  AssetCategory._();

  factory AssetCategory([void updates(AssetCategoryBuilder b)]) = _$AssetCategory;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(AssetCategoryBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<AssetCategory> get serializer => _$AssetCategorySerializer();
}

class _$AssetCategorySerializer implements PrimitiveSerializer<AssetCategory> {
  @override
  final Iterable<Type> types = const [AssetCategory, _$AssetCategory];

  @override
  final String wireName = r'AssetCategory';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    AssetCategory object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
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
    yield r'default_deposit_amount';
    yield serializers.serialize(
      object.defaultDepositAmount,
      specifiedType: const FullType(int),
    );
    if (object.description != null) {
      yield r'description';
      yield serializers.serialize(
        object.description,
        specifiedType: const FullType(String),
      );
    }
    yield r'active';
    yield serializers.serialize(
      object.active,
      specifiedType: const FullType(bool),
    );
    yield r'default_base_price';
    yield serializers.serialize(
      object.defaultBasePrice,
      specifiedType: const FullType(int),
    );
    yield r'store_id';
    yield serializers.serialize(
      object.storeId,
      specifiedType: const FullType(String),
    );
    yield r'type';
    yield serializers.serialize(
      object.type,
      specifiedType: const FullType(AssetCategoryTypeEnum),
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
    yield r'updated_at';
    yield serializers.serialize(
      object.updatedAt,
      specifiedType: const FullType(DateTime),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    AssetCategory object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required AssetCategoryBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
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
        case r'default_deposit_amount':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.defaultDepositAmount = valueDes;
          break;
        case r'description':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.description = valueDes;
          break;
        case r'active':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(bool),
          ) as bool;
          result.active = valueDes;
          break;
        case r'default_base_price':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.defaultBasePrice = valueDes;
          break;
        case r'store_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.storeId = valueDes;
          break;
        case r'type':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(AssetCategoryTypeEnum),
          ) as AssetCategoryTypeEnum;
          result.type = valueDes;
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
  AssetCategory deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = AssetCategoryBuilder();
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

class AssetCategoryTypeEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'BIKE')
  static const AssetCategoryTypeEnum BIKE = _$assetCategoryTypeEnum_BIKE;
  @BuiltValueEnumConst(wireName: r'E_BIKE')
  static const AssetCategoryTypeEnum E_BIKE = _$assetCategoryTypeEnum_E_BIKE;
  @BuiltValueEnumConst(wireName: r'SCOOTER')
  static const AssetCategoryTypeEnum SCOOTER = _$assetCategoryTypeEnum_SCOOTER;
  @BuiltValueEnumConst(wireName: r'OTHER')
  static const AssetCategoryTypeEnum OTHER = _$assetCategoryTypeEnum_OTHER;

  static Serializer<AssetCategoryTypeEnum> get serializer => _$assetCategoryTypeEnumSerializer;

  const AssetCategoryTypeEnum._(String name): super(name);

  static BuiltSet<AssetCategoryTypeEnum> get values => _$assetCategoryTypeEnumValues;
  static AssetCategoryTypeEnum valueOf(String name) => _$assetCategoryTypeEnumValueOf(name);
}
