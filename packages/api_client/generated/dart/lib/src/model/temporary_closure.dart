//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'temporary_closure.g.dart';

/// TemporaryClosure
///
/// Properties:
/// * [reason] 
/// * [reopenAt] 
@BuiltValue()
abstract class TemporaryClosure implements Built<TemporaryClosure, TemporaryClosureBuilder> {
  @BuiltValueField(wireName: r'reason')
  String get reason;

  @BuiltValueField(wireName: r'reopen_at')
  DateTime? get reopenAt;

  TemporaryClosure._();

  factory TemporaryClosure([void updates(TemporaryClosureBuilder b)]) = _$TemporaryClosure;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(TemporaryClosureBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<TemporaryClosure> get serializer => _$TemporaryClosureSerializer();
}

class _$TemporaryClosureSerializer implements PrimitiveSerializer<TemporaryClosure> {
  @override
  final Iterable<Type> types = const [TemporaryClosure, _$TemporaryClosure];

  @override
  final String wireName = r'TemporaryClosure';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    TemporaryClosure object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'reason';
    yield serializers.serialize(
      object.reason,
      specifiedType: const FullType(String),
    );
    if (object.reopenAt != null) {
      yield r'reopen_at';
      yield serializers.serialize(
        object.reopenAt,
        specifiedType: const FullType(DateTime),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    TemporaryClosure object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required TemporaryClosureBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'reason':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.reason = valueDes;
          break;
        case r'reopen_at':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DateTime),
          ) as DateTime;
          result.reopenAt = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  TemporaryClosure deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = TemporaryClosureBuilder();
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

