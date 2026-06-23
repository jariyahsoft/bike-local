//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:built_value/json_object.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'pricing_quote.g.dart';

/// PricingQuote
///
/// Properties:
/// * [subtotalAmount] 
/// * [feeAmount] 
/// * [depositAmount] 
/// * [discountAmount] 
/// * [totalAmount] 
/// * [currency] 
/// * [priceSnapshot] 
/// * [policySnapshot] 
@BuiltValue()
abstract class PricingQuote implements Built<PricingQuote, PricingQuoteBuilder> {
  @BuiltValueField(wireName: r'subtotal_amount')
  int get subtotalAmount;

  @BuiltValueField(wireName: r'fee_amount')
  int get feeAmount;

  @BuiltValueField(wireName: r'deposit_amount')
  int get depositAmount;

  @BuiltValueField(wireName: r'discount_amount')
  int get discountAmount;

  @BuiltValueField(wireName: r'total_amount')
  int get totalAmount;

  @BuiltValueField(wireName: r'currency')
  String get currency;

  @BuiltValueField(wireName: r'price_snapshot')
  BuiltMap<String, JsonObject?>? get priceSnapshot;

  @BuiltValueField(wireName: r'policy_snapshot')
  BuiltMap<String, JsonObject?>? get policySnapshot;

  PricingQuote._();

  factory PricingQuote([void updates(PricingQuoteBuilder b)]) = _$PricingQuote;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(PricingQuoteBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<PricingQuote> get serializer => _$PricingQuoteSerializer();
}

class _$PricingQuoteSerializer implements PrimitiveSerializer<PricingQuote> {
  @override
  final Iterable<Type> types = const [PricingQuote, _$PricingQuote];

  @override
  final String wireName = r'PricingQuote';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    PricingQuote object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'subtotal_amount';
    yield serializers.serialize(
      object.subtotalAmount,
      specifiedType: const FullType(int),
    );
    yield r'fee_amount';
    yield serializers.serialize(
      object.feeAmount,
      specifiedType: const FullType(int),
    );
    yield r'deposit_amount';
    yield serializers.serialize(
      object.depositAmount,
      specifiedType: const FullType(int),
    );
    yield r'discount_amount';
    yield serializers.serialize(
      object.discountAmount,
      specifiedType: const FullType(int),
    );
    yield r'total_amount';
    yield serializers.serialize(
      object.totalAmount,
      specifiedType: const FullType(int),
    );
    yield r'currency';
    yield serializers.serialize(
      object.currency,
      specifiedType: const FullType(String),
    );
    if (object.priceSnapshot != null) {
      yield r'price_snapshot';
      yield serializers.serialize(
        object.priceSnapshot,
        specifiedType: const FullType(BuiltMap, [FullType(String), FullType.nullable(JsonObject)]),
      );
    }
    if (object.policySnapshot != null) {
      yield r'policy_snapshot';
      yield serializers.serialize(
        object.policySnapshot,
        specifiedType: const FullType(BuiltMap, [FullType(String), FullType.nullable(JsonObject)]),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    PricingQuote object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required PricingQuoteBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'subtotal_amount':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.subtotalAmount = valueDes;
          break;
        case r'fee_amount':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.feeAmount = valueDes;
          break;
        case r'deposit_amount':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.depositAmount = valueDes;
          break;
        case r'discount_amount':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.discountAmount = valueDes;
          break;
        case r'total_amount':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.totalAmount = valueDes;
          break;
        case r'currency':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.currency = valueDes;
          break;
        case r'price_snapshot':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BuiltMap, [FullType(String), FullType.nullable(JsonObject)]),
          ) as BuiltMap<String, JsonObject?>;
          result.priceSnapshot.replace(valueDes);
          break;
        case r'policy_snapshot':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BuiltMap, [FullType(String), FullType.nullable(JsonObject)]),
          ) as BuiltMap<String, JsonObject?>;
          result.policySnapshot.replace(valueDes);
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  PricingQuote deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = PricingQuoteBuilder();
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

