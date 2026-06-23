//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:bike_local_generated_api_client/src/model/success_envelope.dart';
import 'package:bike_local_generated_api_client/src/model/response_meta.dart';
import 'package:bike_local_generated_api_client/src/model/payment_webhook_accepted.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'process_payment_webhook202_response.g.dart';

/// ProcessPaymentWebhook202Response
///
/// Properties:
/// * [data]
/// * [meta]
@BuiltValue()
abstract class ProcessPaymentWebhook202Response implements SuccessEnvelope, Built<ProcessPaymentWebhook202Response, ProcessPaymentWebhook202ResponseBuilder> {
  ProcessPaymentWebhook202Response._();

  factory ProcessPaymentWebhook202Response([void updates(ProcessPaymentWebhook202ResponseBuilder b)]) = _$ProcessPaymentWebhook202Response;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(ProcessPaymentWebhook202ResponseBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<ProcessPaymentWebhook202Response> get serializer => _$ProcessPaymentWebhook202ResponseSerializer();
}

class _$ProcessPaymentWebhook202ResponseSerializer implements PrimitiveSerializer<ProcessPaymentWebhook202Response> {
  @override
  final Iterable<Type> types = const [ProcessPaymentWebhook202Response, _$ProcessPaymentWebhook202Response];

  @override
  final String wireName = r'ProcessPaymentWebhook202Response';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    ProcessPaymentWebhook202Response object, {
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
    ProcessPaymentWebhook202Response object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required ProcessPaymentWebhook202ResponseBuilder result,
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
  ProcessPaymentWebhook202Response deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = ProcessPaymentWebhook202ResponseBuilder();
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
