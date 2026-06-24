//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'sos_case_note_request.g.dart';

/// SosCaseNoteRequest
///
/// Properties:
/// * [notes] 
@BuiltValue()
abstract class SosCaseNoteRequest implements Built<SosCaseNoteRequest, SosCaseNoteRequestBuilder> {
  @BuiltValueField(wireName: r'notes')
  String? get notes;

  SosCaseNoteRequest._();

  factory SosCaseNoteRequest([void updates(SosCaseNoteRequestBuilder b)]) = _$SosCaseNoteRequest;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(SosCaseNoteRequestBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<SosCaseNoteRequest> get serializer => _$SosCaseNoteRequestSerializer();
}

class _$SosCaseNoteRequestSerializer implements PrimitiveSerializer<SosCaseNoteRequest> {
  @override
  final Iterable<Type> types = const [SosCaseNoteRequest, _$SosCaseNoteRequest];

  @override
  final String wireName = r'SosCaseNoteRequest';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    SosCaseNoteRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    if (object.notes != null) {
      yield r'notes';
      yield serializers.serialize(
        object.notes,
        specifiedType: const FullType(String),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    SosCaseNoteRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required SosCaseNoteRequestBuilder result,
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
  SosCaseNoteRequest deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = SosCaseNoteRequestBuilder();
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

