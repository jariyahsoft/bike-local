//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:bike_local_generated_api_client/src/model/success_envelope.dart';
import 'package:bike_local_generated_api_client/src/model/response_meta.dart';
import 'package:bike_local_generated_api_client/src/model/asset_category.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'create_asset_category201_response.g.dart';

/// CreateAssetCategory201Response
///
/// Properties:
/// * [data] 
/// * [meta] 
@BuiltValue()
abstract class CreateAssetCategory201Response implements SuccessEnvelope, Built<CreateAssetCategory201Response, CreateAssetCategory201ResponseBuilder> {
  CreateAssetCategory201Response._();

  factory CreateAssetCategory201Response([void updates(CreateAssetCategory201ResponseBuilder b)]) = _$CreateAssetCategory201Response;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(CreateAssetCategory201ResponseBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<CreateAssetCategory201Response> get serializer => _$CreateAssetCategory201ResponseSerializer();
}

class _$CreateAssetCategory201ResponseSerializer implements PrimitiveSerializer<CreateAssetCategory201Response> {
  @override
  final Iterable<Type> types = const [CreateAssetCategory201Response, _$CreateAssetCategory201Response];

  @override
  final String wireName = r'CreateAssetCategory201Response';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    CreateAssetCategory201Response object, {
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
    CreateAssetCategory201Response object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required CreateAssetCategory201ResponseBuilder result,
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
  CreateAssetCategory201Response deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = CreateAssetCategory201ResponseBuilder();
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

