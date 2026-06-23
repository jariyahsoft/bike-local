//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:bike_local_generated_api_client/src/model/store_member.dart';
import 'package:bike_local_generated_api_client/src/model/success_envelope.dart';
import 'package:bike_local_generated_api_client/src/model/response_meta.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'update_store_member200_response.g.dart';

/// UpdateStoreMember200Response
///
/// Properties:
/// * [data]
/// * [meta]
@BuiltValue()
abstract class UpdateStoreMember200Response implements SuccessEnvelope, Built<UpdateStoreMember200Response, UpdateStoreMember200ResponseBuilder> {
  UpdateStoreMember200Response._();

  factory UpdateStoreMember200Response([void updates(UpdateStoreMember200ResponseBuilder b)]) = _$UpdateStoreMember200Response;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(UpdateStoreMember200ResponseBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<UpdateStoreMember200Response> get serializer => _$UpdateStoreMember200ResponseSerializer();
}

class _$UpdateStoreMember200ResponseSerializer implements PrimitiveSerializer<UpdateStoreMember200Response> {
  @override
  final Iterable<Type> types = const [UpdateStoreMember200Response, _$UpdateStoreMember200Response];

  @override
  final String wireName = r'UpdateStoreMember200Response';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    UpdateStoreMember200Response object, {
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
    UpdateStoreMember200Response object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required UpdateStoreMember200ResponseBuilder result,
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
  UpdateStoreMember200Response deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = UpdateStoreMember200ResponseBuilder();
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
