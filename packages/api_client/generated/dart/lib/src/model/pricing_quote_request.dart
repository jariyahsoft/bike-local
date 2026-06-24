//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'pricing_quote_request.g.dart';

/// PricingQuoteRequest
///
/// Properties:
/// * [assetIds] 
/// * [equipmentIds] 
/// * [startAt] 
/// * [endAt] 
/// * [paymentMethod] 
@BuiltValue()
abstract class PricingQuoteRequest implements Built<PricingQuoteRequest, PricingQuoteRequestBuilder> {
  @BuiltValueField(wireName: r'asset_ids')
  BuiltList<String> get assetIds;

  @BuiltValueField(wireName: r'equipment_ids')
  BuiltList<String>? get equipmentIds;

  @BuiltValueField(wireName: r'start_at')
  DateTime get startAt;

  @BuiltValueField(wireName: r'end_at')
  DateTime get endAt;

  @BuiltValueField(wireName: r'payment_method')
  PricingQuoteRequestPaymentMethodEnum get paymentMethod;
  // enum paymentMethodEnum {  ONLINE,  CASH,  };

  PricingQuoteRequest._();

  factory PricingQuoteRequest([void updates(PricingQuoteRequestBuilder b)]) = _$PricingQuoteRequest;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(PricingQuoteRequestBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<PricingQuoteRequest> get serializer => _$PricingQuoteRequestSerializer();
}

class _$PricingQuoteRequestSerializer implements PrimitiveSerializer<PricingQuoteRequest> {
  @override
  final Iterable<Type> types = const [PricingQuoteRequest, _$PricingQuoteRequest];

  @override
  final String wireName = r'PricingQuoteRequest';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    PricingQuoteRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'asset_ids';
    yield serializers.serialize(
      object.assetIds,
      specifiedType: const FullType(BuiltList, [FullType(String)]),
    );
    if (object.equipmentIds != null) {
      yield r'equipment_ids';
      yield serializers.serialize(
        object.equipmentIds,
        specifiedType: const FullType(BuiltList, [FullType(String)]),
      );
    }
    yield r'start_at';
    yield serializers.serialize(
      object.startAt,
      specifiedType: const FullType(DateTime),
    );
    yield r'end_at';
    yield serializers.serialize(
      object.endAt,
      specifiedType: const FullType(DateTime),
    );
    yield r'payment_method';
    yield serializers.serialize(
      object.paymentMethod,
      specifiedType: const FullType(PricingQuoteRequestPaymentMethodEnum),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    PricingQuoteRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required PricingQuoteRequestBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'asset_ids':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BuiltList, [FullType(String)]),
          ) as BuiltList<String>;
          result.assetIds.replace(valueDes);
          break;
        case r'equipment_ids':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BuiltList, [FullType(String)]),
          ) as BuiltList<String>;
          result.equipmentIds.replace(valueDes);
          break;
        case r'start_at':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DateTime),
          ) as DateTime;
          result.startAt = valueDes;
          break;
        case r'end_at':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DateTime),
          ) as DateTime;
          result.endAt = valueDes;
          break;
        case r'payment_method':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(PricingQuoteRequestPaymentMethodEnum),
          ) as PricingQuoteRequestPaymentMethodEnum;
          result.paymentMethod = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  PricingQuoteRequest deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = PricingQuoteRequestBuilder();
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

class PricingQuoteRequestPaymentMethodEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'ONLINE')
  static const PricingQuoteRequestPaymentMethodEnum ONLINE = _$pricingQuoteRequestPaymentMethodEnum_ONLINE;
  @BuiltValueEnumConst(wireName: r'CASH')
  static const PricingQuoteRequestPaymentMethodEnum CASH = _$pricingQuoteRequestPaymentMethodEnum_CASH;

  static Serializer<PricingQuoteRequestPaymentMethodEnum> get serializer => _$pricingQuoteRequestPaymentMethodEnumSerializer;

  const PricingQuoteRequestPaymentMethodEnum._(String name): super(name);

  static BuiltSet<PricingQuoteRequestPaymentMethodEnum> get values => _$pricingQuoteRequestPaymentMethodEnumValues;
  static PricingQuoteRequestPaymentMethodEnum valueOf(String name) => _$pricingQuoteRequestPaymentMethodEnumValueOf(name);
}

