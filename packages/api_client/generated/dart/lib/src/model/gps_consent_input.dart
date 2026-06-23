//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'gps_consent_input.g.dart';

/// GpsConsentInput
///
/// Properties:
/// * [version]
/// * [purpose]
/// * [backgroundAllowed]
@BuiltValue()
abstract class GpsConsentInput implements Built<GpsConsentInput, GpsConsentInputBuilder> {
  @BuiltValueField(wireName: r'version')
  String get version;

  @BuiltValueField(wireName: r'purpose')
  String get purpose;

  @BuiltValueField(wireName: r'background_allowed')
  bool get backgroundAllowed;

  GpsConsentInput._();

  factory GpsConsentInput([void updates(GpsConsentInputBuilder b)]) = _$GpsConsentInput;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(GpsConsentInputBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<GpsConsentInput> get serializer => _$GpsConsentInputSerializer();
}

class _$GpsConsentInputSerializer implements PrimitiveSerializer<GpsConsentInput> {
  @override
  final Iterable<Type> types = const [GpsConsentInput, _$GpsConsentInput];

  @override
  final String wireName = r'GpsConsentInput';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    GpsConsentInput object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'version';
    yield serializers.serialize(
      object.version,
      specifiedType: const FullType(String),
    );
    yield r'purpose';
    yield serializers.serialize(
      object.purpose,
      specifiedType: const FullType(String),
    );
    yield r'background_allowed';
    yield serializers.serialize(
      object.backgroundAllowed,
      specifiedType: const FullType(bool),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    GpsConsentInput object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required GpsConsentInputBuilder result,
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
        case r'purpose':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.purpose = valueDes;
          break;
        case r'background_allowed':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(bool),
          ) as bool;
          result.backgroundAllowed = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  GpsConsentInput deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = GpsConsentInputBuilder();
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
