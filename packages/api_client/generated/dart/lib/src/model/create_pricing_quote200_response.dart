//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:bike_local_generated_api_client/src/model/success_envelope.dart';
import 'package:bike_local_generated_api_client/src/model/response_meta.dart';
import 'package:bike_local_generated_api_client/src/model/pricing_quote.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'create_pricing_quote200_response.g.dart';

/// CreatePricingQuote200Response
///
/// Properties:
/// * [data] 
/// * [meta] 
@BuiltValue()
abstract class CreatePricingQuote200Response implements SuccessEnvelope, Built<CreatePricingQuote200Response, CreatePricingQuote200ResponseBuilder> {
  CreatePricingQuote200Response._();

  factory CreatePricingQuote200Response([void updates(CreatePricingQuote200ResponseBuilder b)]) = _$CreatePricingQuote200Response;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(CreatePricingQuote200ResponseBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<CreatePricingQuote200Response> get serializer => _$CreatePricingQuote200ResponseSerializer();
}

class _$CreatePricingQuote200ResponseSerializer implements PrimitiveSerializer<CreatePricingQuote200Response> {
  @override
  final Iterable<Type> types = const [CreatePricingQuote200Response, _$CreatePricingQuote200Response];

  @override
  final String wireName = r'CreatePricingQuote200Response';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    CreatePricingQuote200Response object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'data';
    yield object.data == null ? null : serializers.serialize(
      object.data,
      specifiedType: const FullType.nullable(JsonObject),
    );
    yield r'meta';
    yield serializers.serialize(
      object.meta,
      specifiedType: const FullType(ResponseMeta),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    CreatePricingQuote200Response object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required CreatePricingQuote200ResponseBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'data':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType.nullable(JsonObject),
          ) as JsonObject?;
          if (valueDes == null) continue;
          result.data = valueDes;
          break;
        case r'meta':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(ResponseMeta),
          ) as ResponseMeta;
          result.meta.replace(valueDes);
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  CreatePricingQuote200Response deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = CreatePricingQuote200ResponseBuilder();
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

