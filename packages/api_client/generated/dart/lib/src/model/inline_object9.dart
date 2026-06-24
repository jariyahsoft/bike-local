//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:bike_local_generated_api_client/src/model/success_envelope.dart';
import 'package:bike_local_generated_api_client/src/model/response_meta.dart';
import 'package:bike_local_generated_api_client/src/model/notification_device.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'inline_object9.g.dart';

/// InlineObject9
///
/// Properties:
/// * [data] 
/// * [meta] 
@BuiltValue()
abstract class InlineObject9 implements SuccessEnvelope, Built<InlineObject9, InlineObject9Builder> {
  InlineObject9._();

  factory InlineObject9([void updates(InlineObject9Builder b)]) = _$InlineObject9;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(InlineObject9Builder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<InlineObject9> get serializer => _$InlineObject9Serializer();
}

class _$InlineObject9Serializer implements PrimitiveSerializer<InlineObject9> {
  @override
  final Iterable<Type> types = const [InlineObject9, _$InlineObject9];

  @override
  final String wireName = r'InlineObject9';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    InlineObject9 object, {
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
    InlineObject9 object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required InlineObject9Builder result,
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
  InlineObject9 deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = InlineObject9Builder();
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

