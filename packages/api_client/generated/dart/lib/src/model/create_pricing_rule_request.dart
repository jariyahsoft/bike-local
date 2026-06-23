//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'create_pricing_rule_request.g.dart';

/// CreatePricingRuleRequest
///
/// Properties:
/// * [storeId]
/// * [branchId]
/// * [categoryId]
/// * [type]
/// * [amount] - Integer minor units only; percent discounts use whole percentage points.
/// * [currency]
/// * [priority]
@BuiltValue()
abstract class CreatePricingRuleRequest implements Built<CreatePricingRuleRequest, CreatePricingRuleRequestBuilder> {
  @BuiltValueField(wireName: r'store_id')
  String get storeId;

  @BuiltValueField(wireName: r'branch_id')
  String? get branchId;

  @BuiltValueField(wireName: r'category_id')
  String? get categoryId;

  @BuiltValueField(wireName: r'type')
  CreatePricingRuleRequestTypeEnum get type;
  // enum typeEnum {  HOURLY_BASE,  FIXED_FEE,  PERCENT_DISCOUNT,  CASH_SURCHARGE,  };

  /// Integer minor units only; percent discounts use whole percentage points.
  @BuiltValueField(wireName: r'amount')
  int get amount;

  @BuiltValueField(wireName: r'currency')
  String get currency;

  @BuiltValueField(wireName: r'priority')
  int? get priority;

  CreatePricingRuleRequest._();

  factory CreatePricingRuleRequest([void updates(CreatePricingRuleRequestBuilder b)]) = _$CreatePricingRuleRequest;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(CreatePricingRuleRequestBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<CreatePricingRuleRequest> get serializer => _$CreatePricingRuleRequestSerializer();
}

class _$CreatePricingRuleRequestSerializer implements PrimitiveSerializer<CreatePricingRuleRequest> {
  @override
  final Iterable<Type> types = const [CreatePricingRuleRequest, _$CreatePricingRuleRequest];

  @override
  final String wireName = r'CreatePricingRuleRequest';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    CreatePricingRuleRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'store_id';
    yield serializers.serialize(
      object.storeId,
      specifiedType: const FullType(String),
    );
    if (object.branchId != null) {
      yield r'branch_id';
      yield serializers.serialize(
        object.branchId,
        specifiedType: const FullType(String),
      );
    }
    if (object.categoryId != null) {
      yield r'category_id';
      yield serializers.serialize(
        object.categoryId,
        specifiedType: const FullType(String),
      );
    }
    yield r'type';
    yield serializers.serialize(
      object.type,
      specifiedType: const FullType(CreatePricingRuleRequestTypeEnum),
    );
    yield r'amount';
    yield serializers.serialize(
      object.amount,
      specifiedType: const FullType(int),
    );
    yield r'currency';
    yield serializers.serialize(
      object.currency,
      specifiedType: const FullType(String),
    );
    if (object.priority != null) {
      yield r'priority';
      yield serializers.serialize(
        object.priority,
        specifiedType: const FullType(int),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    CreatePricingRuleRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required CreatePricingRuleRequestBuilder result,
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
        case r'branch_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.branchId = valueDes;
          break;
        case r'category_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.categoryId = valueDes;
          break;
        case r'type':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(CreatePricingRuleRequestTypeEnum),
          ) as CreatePricingRuleRequestTypeEnum;
          result.type = valueDes;
          break;
        case r'amount':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.amount = valueDes;
          break;
        case r'currency':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.currency = valueDes;
          break;
        case r'priority':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.priority = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  CreatePricingRuleRequest deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = CreatePricingRuleRequestBuilder();
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

class CreatePricingRuleRequestTypeEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'HOURLY_BASE')
  static const CreatePricingRuleRequestTypeEnum HOURLY_BASE = _$createPricingRuleRequestTypeEnum_HOURLY_BASE;
  @BuiltValueEnumConst(wireName: r'FIXED_FEE')
  static const CreatePricingRuleRequestTypeEnum FIXED_FEE = _$createPricingRuleRequestTypeEnum_FIXED_FEE;
  @BuiltValueEnumConst(wireName: r'PERCENT_DISCOUNT')
  static const CreatePricingRuleRequestTypeEnum PERCENT_DISCOUNT = _$createPricingRuleRequestTypeEnum_PERCENT_DISCOUNT;
  @BuiltValueEnumConst(wireName: r'CASH_SURCHARGE')
  static const CreatePricingRuleRequestTypeEnum CASH_SURCHARGE = _$createPricingRuleRequestTypeEnum_CASH_SURCHARGE;

  static Serializer<CreatePricingRuleRequestTypeEnum> get serializer => _$createPricingRuleRequestTypeEnumSerializer;

  const CreatePricingRuleRequestTypeEnum._(String name): super(name);

  static BuiltSet<CreatePricingRuleRequestTypeEnum> get values => _$createPricingRuleRequestTypeEnumValues;
  static CreatePricingRuleRequestTypeEnum valueOf(String name) => _$createPricingRuleRequestTypeEnumValueOf(name);
}
