//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:bike_local_generated_api_client/src/model/success_envelope.dart';
import 'package:bike_local_generated_api_client/src/model/response_meta.dart';
import 'package:bike_local_generated_api_client/src/model/availability_result.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'check_availability200_response.g.dart';

/// CheckAvailability200Response
///
/// Properties:
/// * [data]
/// * [meta]
@BuiltValue()
abstract class CheckAvailability200Response implements SuccessEnvelope, Built<CheckAvailability200Response, CheckAvailability200ResponseBuilder> {
  CheckAvailability200Response._();

  factory CheckAvailability200Response([void updates(CheckAvailability200ResponseBuilder b)]) = _$CheckAvailability200Response;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(CheckAvailability200ResponseBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<CheckAvailability200Response> get serializer => _$CheckAvailability200ResponseSerializer();
}

class _$CheckAvailability200ResponseSerializer implements PrimitiveSerializer<CheckAvailability200Response> {
  @override
  final Iterable<Type> types = const [CheckAvailability200Response, _$CheckAvailability200Response];

  @override
  final String wireName = r'CheckAvailability200Response';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    CheckAvailability200Response object, {
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
    CheckAvailability200Response object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required CheckAvailability200ResponseBuilder result,
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
  CheckAvailability200Response deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = CheckAvailability200ResponseBuilder();
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
