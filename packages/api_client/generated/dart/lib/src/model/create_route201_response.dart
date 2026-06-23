//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:bike_local_generated_api_client/src/model/success_envelope.dart';
import 'package:bike_local_generated_api_client/src/model/response_meta.dart';
import 'package:bike_local_generated_api_client/src/model/route.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'create_route201_response.g.dart';

/// CreateRoute201Response
///
/// Properties:
/// * [data]
/// * [meta]
@BuiltValue()
abstract class CreateRoute201Response implements SuccessEnvelope, Built<CreateRoute201Response, CreateRoute201ResponseBuilder> {
  CreateRoute201Response._();

  factory CreateRoute201Response([void updates(CreateRoute201ResponseBuilder b)]) = _$CreateRoute201Response;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(CreateRoute201ResponseBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<CreateRoute201Response> get serializer => _$CreateRoute201ResponseSerializer();
}

class _$CreateRoute201ResponseSerializer implements PrimitiveSerializer<CreateRoute201Response> {
  @override
  final Iterable<Type> types = const [CreateRoute201Response, _$CreateRoute201Response];

  @override
  final String wireName = r'CreateRoute201Response';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    CreateRoute201Response object, {
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
    CreateRoute201Response object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required CreateRoute201ResponseBuilder result,
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
  CreateRoute201Response deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = CreateRoute201ResponseBuilder();
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
