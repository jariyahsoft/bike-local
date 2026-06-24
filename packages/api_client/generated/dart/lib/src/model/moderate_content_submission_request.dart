//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'moderate_content_submission_request.g.dart';

/// ModerateContentSubmissionRequest
///
/// Properties:
/// * [reason] 
@BuiltValue()
abstract class ModerateContentSubmissionRequest implements Built<ModerateContentSubmissionRequest, ModerateContentSubmissionRequestBuilder> {
  @BuiltValueField(wireName: r'reason')
  String get reason;

  ModerateContentSubmissionRequest._();

  factory ModerateContentSubmissionRequest([void updates(ModerateContentSubmissionRequestBuilder b)]) = _$ModerateContentSubmissionRequest;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(ModerateContentSubmissionRequestBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<ModerateContentSubmissionRequest> get serializer => _$ModerateContentSubmissionRequestSerializer();
}

class _$ModerateContentSubmissionRequestSerializer implements PrimitiveSerializer<ModerateContentSubmissionRequest> {
  @override
  final Iterable<Type> types = const [ModerateContentSubmissionRequest, _$ModerateContentSubmissionRequest];

  @override
  final String wireName = r'ModerateContentSubmissionRequest';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    ModerateContentSubmissionRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'reason';
    yield serializers.serialize(
      object.reason,
      specifiedType: const FullType(String),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    ModerateContentSubmissionRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required ModerateContentSubmissionRequestBuilder result,
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
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  ModerateContentSubmissionRequest deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = ModerateContentSubmissionRequestBuilder();
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

