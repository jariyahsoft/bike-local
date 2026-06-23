//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:bike_local_generated_api_client/src/model/success_envelope.dart';
import 'package:bike_local_generated_api_client/src/model/response_meta.dart';
import 'package:bike_local_generated_api_client/src/model/staff_invitation.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'create_staff_invitation202_response.g.dart';

/// CreateStaffInvitation202Response
///
/// Properties:
/// * [data] 
/// * [meta] 
@BuiltValue()
abstract class CreateStaffInvitation202Response implements SuccessEnvelope, Built<CreateStaffInvitation202Response, CreateStaffInvitation202ResponseBuilder> {
  CreateStaffInvitation202Response._();

  factory CreateStaffInvitation202Response([void updates(CreateStaffInvitation202ResponseBuilder b)]) = _$CreateStaffInvitation202Response;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(CreateStaffInvitation202ResponseBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<CreateStaffInvitation202Response> get serializer => _$CreateStaffInvitation202ResponseSerializer();
}

class _$CreateStaffInvitation202ResponseSerializer implements PrimitiveSerializer<CreateStaffInvitation202Response> {
  @override
  final Iterable<Type> types = const [CreateStaffInvitation202Response, _$CreateStaffInvitation202Response];

  @override
  final String wireName = r'CreateStaffInvitation202Response';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    CreateStaffInvitation202Response object, {
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
    CreateStaffInvitation202Response object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required CreateStaffInvitation202ResponseBuilder result,
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
  CreateStaffInvitation202Response deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = CreateStaffInvitation202ResponseBuilder();
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

