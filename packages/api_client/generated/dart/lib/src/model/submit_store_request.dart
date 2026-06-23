//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'submit_store_request.g.dart';

/// SubmitStoreRequest
///
/// Properties:
/// * [version]
@BuiltValue()
abstract class SubmitStoreRequest implements Built<SubmitStoreRequest, SubmitStoreRequestBuilder> {
  @BuiltValueField(wireName: r'version')
  int get version;

  SubmitStoreRequest._();

  factory SubmitStoreRequest([void updates(SubmitStoreRequestBuilder b)]) = _$SubmitStoreRequest;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(SubmitStoreRequestBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<SubmitStoreRequest> get serializer => _$SubmitStoreRequestSerializer();
}

class _$SubmitStoreRequestSerializer implements PrimitiveSerializer<SubmitStoreRequest> {
  @override
  final Iterable<Type> types = const [SubmitStoreRequest, _$SubmitStoreRequest];

  @override
  final String wireName = r'SubmitStoreRequest';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    SubmitStoreRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'version';
    yield serializers.serialize(
      object.version,
      specifiedType: const FullType(int),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    SubmitStoreRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required SubmitStoreRequestBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'version':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.version = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  SubmitStoreRequest deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = SubmitStoreRequestBuilder();
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
