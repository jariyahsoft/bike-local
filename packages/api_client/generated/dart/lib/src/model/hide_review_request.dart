//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'hide_review_request.g.dart';

/// HideReviewRequest
///
/// Properties:
/// * [reason] 
@BuiltValue()
abstract class HideReviewRequest implements Built<HideReviewRequest, HideReviewRequestBuilder> {
  @BuiltValueField(wireName: r'reason')
  String get reason;

  HideReviewRequest._();

  factory HideReviewRequest([void updates(HideReviewRequestBuilder b)]) = _$HideReviewRequest;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(HideReviewRequestBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<HideReviewRequest> get serializer => _$HideReviewRequestSerializer();
}

class _$HideReviewRequestSerializer implements PrimitiveSerializer<HideReviewRequest> {
  @override
  final Iterable<Type> types = const [HideReviewRequest, _$HideReviewRequest];

  @override
  final String wireName = r'HideReviewRequest';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    HideReviewRequest object, {
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
    HideReviewRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required HideReviewRequestBuilder result,
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
  HideReviewRequest deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = HideReviewRequestBuilder();
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

