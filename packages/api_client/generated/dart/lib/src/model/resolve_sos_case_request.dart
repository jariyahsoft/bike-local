//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'resolve_sos_case_request.g.dart';

/// ResolveSosCaseRequest
///
/// Properties:
/// * [notes] 
@BuiltValue()
abstract class ResolveSosCaseRequest implements Built<ResolveSosCaseRequest, ResolveSosCaseRequestBuilder> {
  @BuiltValueField(wireName: r'notes')
  String get notes;

  ResolveSosCaseRequest._();

  factory ResolveSosCaseRequest([void updates(ResolveSosCaseRequestBuilder b)]) = _$ResolveSosCaseRequest;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(ResolveSosCaseRequestBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<ResolveSosCaseRequest> get serializer => _$ResolveSosCaseRequestSerializer();
}

class _$ResolveSosCaseRequestSerializer implements PrimitiveSerializer<ResolveSosCaseRequest> {
  @override
  final Iterable<Type> types = const [ResolveSosCaseRequest, _$ResolveSosCaseRequest];

  @override
  final String wireName = r'ResolveSosCaseRequest';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    ResolveSosCaseRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'notes';
    yield serializers.serialize(
      object.notes,
      specifiedType: const FullType(String),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    ResolveSosCaseRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required ResolveSosCaseRequestBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'notes':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.notes = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  ResolveSosCaseRequest deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = ResolveSosCaseRequestBuilder();
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

