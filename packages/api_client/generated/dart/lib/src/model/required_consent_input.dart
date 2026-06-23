//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'required_consent_input.g.dart';

/// RequiredConsentInput
///
/// Properties:
/// * [version]
@BuiltValue()
abstract class RequiredConsentInput implements Built<RequiredConsentInput, RequiredConsentInputBuilder> {
  @BuiltValueField(wireName: r'version')
  String get version;

  RequiredConsentInput._();

  factory RequiredConsentInput([void updates(RequiredConsentInputBuilder b)]) = _$RequiredConsentInput;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(RequiredConsentInputBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<RequiredConsentInput> get serializer => _$RequiredConsentInputSerializer();
}

class _$RequiredConsentInputSerializer implements PrimitiveSerializer<RequiredConsentInput> {
  @override
  final Iterable<Type> types = const [RequiredConsentInput, _$RequiredConsentInput];

  @override
  final String wireName = r'RequiredConsentInput';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    RequiredConsentInput object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'version';
    yield serializers.serialize(
      object.version,
      specifiedType: const FullType(String),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    RequiredConsentInput object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required RequiredConsentInputBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'version':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
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
  RequiredConsentInput deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = RequiredConsentInputBuilder();
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
