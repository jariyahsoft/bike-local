//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:bike_local_generated_api_client/src/model/success_envelope.dart';
import 'package:bike_local_generated_api_client/src/model/response_meta.dart';
import 'package:bike_local_generated_api_client/src/model/content_report.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'inline_object16.g.dart';

/// InlineObject16
///
/// Properties:
/// * [data] 
/// * [meta] 
@BuiltValue()
abstract class InlineObject16 implements SuccessEnvelope, Built<InlineObject16, InlineObject16Builder> {
  InlineObject16._();

  factory InlineObject16([void updates(InlineObject16Builder b)]) = _$InlineObject16;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(InlineObject16Builder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<InlineObject16> get serializer => _$InlineObject16Serializer();
}

class _$InlineObject16Serializer implements PrimitiveSerializer<InlineObject16> {
  @override
  final Iterable<Type> types = const [InlineObject16, _$InlineObject16];

  @override
  final String wireName = r'InlineObject16';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    InlineObject16 object, {
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
    InlineObject16 object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required InlineObject16Builder result,
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
  InlineObject16 deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = InlineObject16Builder();
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

