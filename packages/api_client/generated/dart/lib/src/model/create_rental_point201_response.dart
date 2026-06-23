//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:bike_local_generated_api_client/src/model/success_envelope.dart';
import 'package:bike_local_generated_api_client/src/model/response_meta.dart';
import 'package:bike_local_generated_api_client/src/model/rental_point.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'create_rental_point201_response.g.dart';

/// CreateRentalPoint201Response
///
/// Properties:
/// * [data]
/// * [meta]
@BuiltValue()
abstract class CreateRentalPoint201Response implements SuccessEnvelope, Built<CreateRentalPoint201Response, CreateRentalPoint201ResponseBuilder> {
  CreateRentalPoint201Response._();

  factory CreateRentalPoint201Response([void updates(CreateRentalPoint201ResponseBuilder b)]) = _$CreateRentalPoint201Response;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(CreateRentalPoint201ResponseBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<CreateRentalPoint201Response> get serializer => _$CreateRentalPoint201ResponseSerializer();
}

class _$CreateRentalPoint201ResponseSerializer implements PrimitiveSerializer<CreateRentalPoint201Response> {
  @override
  final Iterable<Type> types = const [CreateRentalPoint201Response, _$CreateRentalPoint201Response];

  @override
  final String wireName = r'CreateRentalPoint201Response';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    CreateRentalPoint201Response object, {
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
    CreateRentalPoint201Response object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required CreateRentalPoint201ResponseBuilder result,
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
  CreateRentalPoint201Response deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = CreateRentalPoint201ResponseBuilder();
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
