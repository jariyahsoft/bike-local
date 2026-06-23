//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:bike_local_generated_api_client/src/model/success_envelope.dart';
import 'package:bike_local_generated_api_client/src/model/response_meta.dart';
import 'package:bike_local_generated_api_client/src/model/equipment.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'create_equipment_item201_response.g.dart';

/// CreateEquipmentItem201Response
///
/// Properties:
/// * [data]
/// * [meta]
@BuiltValue()
abstract class CreateEquipmentItem201Response implements SuccessEnvelope, Built<CreateEquipmentItem201Response, CreateEquipmentItem201ResponseBuilder> {
  CreateEquipmentItem201Response._();

  factory CreateEquipmentItem201Response([void updates(CreateEquipmentItem201ResponseBuilder b)]) = _$CreateEquipmentItem201Response;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(CreateEquipmentItem201ResponseBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<CreateEquipmentItem201Response> get serializer => _$CreateEquipmentItem201ResponseSerializer();
}

class _$CreateEquipmentItem201ResponseSerializer implements PrimitiveSerializer<CreateEquipmentItem201Response> {
  @override
  final Iterable<Type> types = const [CreateEquipmentItem201Response, _$CreateEquipmentItem201Response];

  @override
  final String wireName = r'CreateEquipmentItem201Response';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    CreateEquipmentItem201Response object, {
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
    CreateEquipmentItem201Response object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required CreateEquipmentItem201ResponseBuilder result,
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
  CreateEquipmentItem201Response deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = CreateEquipmentItem201ResponseBuilder();
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
