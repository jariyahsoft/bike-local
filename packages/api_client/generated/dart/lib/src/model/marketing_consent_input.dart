//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'marketing_consent_input.g.dart';

/// MarketingConsentInput
///
/// Properties:
/// * [version]
/// * [granted]
/// * [purpose]
@BuiltValue()
abstract class MarketingConsentInput implements Built<MarketingConsentInput, MarketingConsentInputBuilder> {
  @BuiltValueField(wireName: r'version')
  String get version;

  @BuiltValueField(wireName: r'granted')
  bool get granted;

  @BuiltValueField(wireName: r'purpose')
  String get purpose;

  MarketingConsentInput._();

  factory MarketingConsentInput([void updates(MarketingConsentInputBuilder b)]) = _$MarketingConsentInput;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(MarketingConsentInputBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<MarketingConsentInput> get serializer => _$MarketingConsentInputSerializer();
}

class _$MarketingConsentInputSerializer implements PrimitiveSerializer<MarketingConsentInput> {
  @override
  final Iterable<Type> types = const [MarketingConsentInput, _$MarketingConsentInput];

  @override
  final String wireName = r'MarketingConsentInput';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    MarketingConsentInput object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'version';
    yield serializers.serialize(
      object.version,
      specifiedType: const FullType(String),
    );
    yield r'granted';
    yield serializers.serialize(
      object.granted,
      specifiedType: const FullType(bool),
    );
    yield r'purpose';
    yield serializers.serialize(
      object.purpose,
      specifiedType: const FullType(String),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    MarketingConsentInput object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required MarketingConsentInputBuilder result,
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
        case r'granted':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(bool),
          ) as bool;
          result.granted = valueDes;
          break;
        case r'purpose':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.purpose = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  MarketingConsentInput deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = MarketingConsentInputBuilder();
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
