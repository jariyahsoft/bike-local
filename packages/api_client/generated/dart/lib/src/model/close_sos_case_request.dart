//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'close_sos_case_request.g.dart';

/// CloseSosCaseRequest
///
/// Properties:
/// * [notes] 
@BuiltValue()
abstract class CloseSosCaseRequest implements Built<CloseSosCaseRequest, CloseSosCaseRequestBuilder> {
  @BuiltValueField(wireName: r'notes')
  String get notes;

  CloseSosCaseRequest._();

  factory CloseSosCaseRequest([void updates(CloseSosCaseRequestBuilder b)]) = _$CloseSosCaseRequest;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(CloseSosCaseRequestBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<CloseSosCaseRequest> get serializer => _$CloseSosCaseRequestSerializer();
}

class _$CloseSosCaseRequestSerializer implements PrimitiveSerializer<CloseSosCaseRequest> {
  @override
  final Iterable<Type> types = const [CloseSosCaseRequest, _$CloseSosCaseRequest];

  @override
  final String wireName = r'CloseSosCaseRequest';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    CloseSosCaseRequest object, {
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
    CloseSosCaseRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required CloseSosCaseRequestBuilder result,
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
  CloseSosCaseRequest deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = CloseSosCaseRequestBuilder();
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

