//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'create_asset_category_request.g.dart';

/// CreateAssetCategoryRequest
///
/// Properties:
/// * [storeId]
/// * [name]
/// * [type]
/// * [description]
/// * [defaultBasePrice] - Integer minor units only.
/// * [defaultDepositAmount] - Integer minor units only.
/// * [currency]
@BuiltValue()
abstract class CreateAssetCategoryRequest implements Built<CreateAssetCategoryRequest, CreateAssetCategoryRequestBuilder> {
  @BuiltValueField(wireName: r'store_id')
  String get storeId;

  @BuiltValueField(wireName: r'name')
  String get name;

  @BuiltValueField(wireName: r'type')
  CreateAssetCategoryRequestTypeEnum get type;
  // enum typeEnum {  BIKE,  E_BIKE,  SCOOTER,  OTHER,  };

  @BuiltValueField(wireName: r'description')
  String? get description;

  /// Integer minor units only.
  @BuiltValueField(wireName: r'default_base_price')
  int get defaultBasePrice;

  /// Integer minor units only.
  @BuiltValueField(wireName: r'default_deposit_amount')
  int get defaultDepositAmount;

  @BuiltValueField(wireName: r'currency')
  String get currency;

  CreateAssetCategoryRequest._();

  factory CreateAssetCategoryRequest([void updates(CreateAssetCategoryRequestBuilder b)]) = _$CreateAssetCategoryRequest;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(CreateAssetCategoryRequestBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<CreateAssetCategoryRequest> get serializer => _$CreateAssetCategoryRequestSerializer();
}

class _$CreateAssetCategoryRequestSerializer implements PrimitiveSerializer<CreateAssetCategoryRequest> {
  @override
  final Iterable<Type> types = const [CreateAssetCategoryRequest, _$CreateAssetCategoryRequest];

  @override
  final String wireName = r'CreateAssetCategoryRequest';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    CreateAssetCategoryRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'store_id';
    yield serializers.serialize(
      object.storeId,
      specifiedType: const FullType(String),
    );
    yield r'name';
    yield serializers.serialize(
      object.name,
      specifiedType: const FullType(String),
    );
    yield r'type';
    yield serializers.serialize(
      object.type,
      specifiedType: const FullType(CreateAssetCategoryRequestTypeEnum),
    );
    if (object.description != null) {
      yield r'description';
      yield serializers.serialize(
        object.description,
        specifiedType: const FullType(String),
      );
    }
    yield r'default_base_price';
    yield serializers.serialize(
      object.defaultBasePrice,
      specifiedType: const FullType(int),
    );
    yield r'default_deposit_amount';
    yield serializers.serialize(
      object.defaultDepositAmount,
      specifiedType: const FullType(int),
    );
    yield r'currency';
    yield serializers.serialize(
      object.currency,
      specifiedType: const FullType(String),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    CreateAssetCategoryRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required CreateAssetCategoryRequestBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'store_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.storeId = valueDes;
          break;
        case r'name':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.name = valueDes;
          break;
        case r'type':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(CreateAssetCategoryRequestTypeEnum),
          ) as CreateAssetCategoryRequestTypeEnum;
          result.type = valueDes;
          break;
        case r'description':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.description = valueDes;
          break;
        case r'default_base_price':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.defaultBasePrice = valueDes;
          break;
        case r'default_deposit_amount':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.defaultDepositAmount = valueDes;
          break;
        case r'currency':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.currency = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  CreateAssetCategoryRequest deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = CreateAssetCategoryRequestBuilder();
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

class CreateAssetCategoryRequestTypeEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'BIKE')
  static const CreateAssetCategoryRequestTypeEnum BIKE = _$createAssetCategoryRequestTypeEnum_BIKE;
  @BuiltValueEnumConst(wireName: r'E_BIKE')
  static const CreateAssetCategoryRequestTypeEnum E_BIKE = _$createAssetCategoryRequestTypeEnum_E_BIKE;
  @BuiltValueEnumConst(wireName: r'SCOOTER')
  static const CreateAssetCategoryRequestTypeEnum SCOOTER = _$createAssetCategoryRequestTypeEnum_SCOOTER;
  @BuiltValueEnumConst(wireName: r'OTHER')
  static const CreateAssetCategoryRequestTypeEnum OTHER = _$createAssetCategoryRequestTypeEnum_OTHER;

  static Serializer<CreateAssetCategoryRequestTypeEnum> get serializer => _$createAssetCategoryRequestTypeEnumSerializer;

  const CreateAssetCategoryRequestTypeEnum._(String name): super(name);

  static BuiltSet<CreateAssetCategoryRequestTypeEnum> get values => _$createAssetCategoryRequestTypeEnumValues;
  static CreateAssetCategoryRequestTypeEnum valueOf(String name) => _$createAssetCategoryRequestTypeEnumValueOf(name);
}
