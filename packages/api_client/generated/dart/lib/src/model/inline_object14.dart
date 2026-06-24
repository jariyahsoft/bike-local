//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:bike_local_generated_api_client/src/model/content_submission.dart';
import 'package:bike_local_generated_api_client/src/model/success_envelope.dart';
import 'package:bike_local_generated_api_client/src/model/response_meta.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'inline_object14.g.dart';

/// InlineObject14
///
/// Properties:
/// * [data] 
/// * [meta] 
@BuiltValue()
abstract class InlineObject14 implements SuccessEnvelope, Built<InlineObject14, InlineObject14Builder> {
  InlineObject14._();

  factory InlineObject14([void updates(InlineObject14Builder b)]) = _$InlineObject14;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(InlineObject14Builder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<InlineObject14> get serializer => _$InlineObject14Serializer();
}

class _$InlineObject14Serializer implements PrimitiveSerializer<InlineObject14> {
  @override
  final Iterable<Type> types = const [InlineObject14, _$InlineObject14];

  @override
  final String wireName = r'InlineObject14';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    InlineObject14 object, {
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
    InlineObject14 object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required InlineObject14Builder result,
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
  InlineObject14 deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = InlineObject14Builder();
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

