//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:bike_local_generated_api_client/src/model/success_envelope.dart';
import 'package:bike_local_generated_api_client/src/model/response_meta.dart';
import 'package:bike_local_generated_api_client/src/model/inventory_unit.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'create_inventory_unit201_response.g.dart';

/// CreateInventoryUnit201Response
///
/// Properties:
/// * [data]
/// * [meta]
@BuiltValue()
abstract class CreateInventoryUnit201Response implements SuccessEnvelope, Built<CreateInventoryUnit201Response, CreateInventoryUnit201ResponseBuilder> {
  CreateInventoryUnit201Response._();

  factory CreateInventoryUnit201Response([void updates(CreateInventoryUnit201ResponseBuilder b)]) = _$CreateInventoryUnit201Response;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(CreateInventoryUnit201ResponseBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<CreateInventoryUnit201Response> get serializer => _$CreateInventoryUnit201ResponseSerializer();
}

class _$CreateInventoryUnit201ResponseSerializer implements PrimitiveSerializer<CreateInventoryUnit201Response> {
  @override
  final Iterable<Type> types = const [CreateInventoryUnit201Response, _$CreateInventoryUnit201Response];

  @override
  final String wireName = r'CreateInventoryUnit201Response';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    CreateInventoryUnit201Response object, {
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
    CreateInventoryUnit201Response object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required CreateInventoryUnit201ResponseBuilder result,
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
  CreateInventoryUnit201Response deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = CreateInventoryUnit201ResponseBuilder();
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
