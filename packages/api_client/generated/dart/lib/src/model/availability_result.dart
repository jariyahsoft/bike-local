//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:bike_local_generated_api_client/src/model/availability_conflict.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'availability_result.g.dart';

/// AvailabilityResult
///
/// Properties:
/// * [available]
/// * [conflicts]
@BuiltValue()
abstract class AvailabilityResult implements Built<AvailabilityResult, AvailabilityResultBuilder> {
  @BuiltValueField(wireName: r'available')
  bool get available;

  @BuiltValueField(wireName: r'conflicts')
  BuiltList<AvailabilityConflict> get conflicts;

  AvailabilityResult._();

  factory AvailabilityResult([void updates(AvailabilityResultBuilder b)]) = _$AvailabilityResult;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(AvailabilityResultBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<AvailabilityResult> get serializer => _$AvailabilityResultSerializer();
}

class _$AvailabilityResultSerializer implements PrimitiveSerializer<AvailabilityResult> {
  @override
  final Iterable<Type> types = const [AvailabilityResult, _$AvailabilityResult];

  @override
  final String wireName = r'AvailabilityResult';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    AvailabilityResult object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'available';
    yield serializers.serialize(
      object.available,
      specifiedType: const FullType(bool),
    );
    yield r'conflicts';
    yield serializers.serialize(
      object.conflicts,
      specifiedType: const FullType(BuiltList, [FullType(AvailabilityConflict)]),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    AvailabilityResult object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required AvailabilityResultBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'available':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(bool),
          ) as bool;
          result.available = valueDes;
          break;
        case r'conflicts':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BuiltList, [FullType(AvailabilityConflict)]),
          ) as BuiltList<AvailabilityConflict>;
          result.conflicts.replace(valueDes);
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  AvailabilityResult deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = AvailabilityResultBuilder();
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
