//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:bike_local_generated_api_client/src/model/response_meta.dart';
import 'package:built_value/json_object.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'success_envelope.g.dart';

/// SuccessEnvelope
///
/// Properties:
/// * [data] 
/// * [meta] 
@BuiltValue(instantiable: false)
abstract class SuccessEnvelope  {
  @BuiltValueField(wireName: r'data')
  JsonObject? get data;

  @BuiltValueField(wireName: r'meta')
  ResponseMeta get meta;

  @BuiltValueSerializer(custom: true)
  static Serializer<SuccessEnvelope> get serializer => _$SuccessEnvelopeSerializer();
}

class _$SuccessEnvelopeSerializer implements PrimitiveSerializer<SuccessEnvelope> {
  @override
  final Iterable<Type> types = const [SuccessEnvelope];

  @override
  final String wireName = r'SuccessEnvelope';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    SuccessEnvelope object, {
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
    SuccessEnvelope object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  @override
  SuccessEnvelope deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return serializers.deserialize(serialized, specifiedType: FullType($SuccessEnvelope)) as $SuccessEnvelope;
  }
}

/// a concrete implementation of [SuccessEnvelope], since [SuccessEnvelope] is not instantiable
@BuiltValue(instantiable: true)
abstract class $SuccessEnvelope implements SuccessEnvelope, Built<$SuccessEnvelope, $SuccessEnvelopeBuilder> {
  $SuccessEnvelope._();

  factory $SuccessEnvelope([void Function($SuccessEnvelopeBuilder)? updates]) = _$$SuccessEnvelope;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults($SuccessEnvelopeBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<$SuccessEnvelope> get serializer => _$$SuccessEnvelopeSerializer();
}

class _$$SuccessEnvelopeSerializer implements PrimitiveSerializer<$SuccessEnvelope> {
  @override
  final Iterable<Type> types = const [$SuccessEnvelope, _$$SuccessEnvelope];

  @override
  final String wireName = r'$SuccessEnvelope';

  @override
  Object serialize(
    Serializers serializers,
    $SuccessEnvelope object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return serializers.serialize(object, specifiedType: FullType(SuccessEnvelope))!;
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required SuccessEnvelopeBuilder result,
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
  $SuccessEnvelope deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = $SuccessEnvelopeBuilder();
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

