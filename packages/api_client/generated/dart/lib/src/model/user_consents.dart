//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:bike_local_generated_api_client/src/model/gps_consent_input.dart';
import 'package:bike_local_generated_api_client/src/model/required_consent_input.dart';
import 'package:bike_local_generated_api_client/src/model/marketing_consent_input.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'user_consents.g.dart';

/// UserConsents
///
/// Properties:
/// * [terms]
/// * [privacy]
/// * [gps]
/// * [marketing]
@BuiltValue()
abstract class UserConsents implements Built<UserConsents, UserConsentsBuilder> {
  @BuiltValueField(wireName: r'terms')
  RequiredConsentInput get terms;

  @BuiltValueField(wireName: r'privacy')
  RequiredConsentInput get privacy;

  @BuiltValueField(wireName: r'gps')
  GpsConsentInput? get gps;

  @BuiltValueField(wireName: r'marketing')
  MarketingConsentInput? get marketing;

  UserConsents._();

  factory UserConsents([void updates(UserConsentsBuilder b)]) = _$UserConsents;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(UserConsentsBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<UserConsents> get serializer => _$UserConsentsSerializer();
}

class _$UserConsentsSerializer implements PrimitiveSerializer<UserConsents> {
  @override
  final Iterable<Type> types = const [UserConsents, _$UserConsents];

  @override
  final String wireName = r'UserConsents';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    UserConsents object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'terms';
    yield serializers.serialize(
      object.terms,
      specifiedType: const FullType(RequiredConsentInput),
    );
    yield r'privacy';
    yield serializers.serialize(
      object.privacy,
      specifiedType: const FullType(RequiredConsentInput),
    );
    if (object.gps != null) {
      yield r'gps';
      yield serializers.serialize(
        object.gps,
        specifiedType: const FullType(GpsConsentInput),
      );
    }
    if (object.marketing != null) {
      yield r'marketing';
      yield serializers.serialize(
        object.marketing,
        specifiedType: const FullType(MarketingConsentInput),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    UserConsents object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required UserConsentsBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'terms':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(RequiredConsentInput),
          ) as RequiredConsentInput;
          result.terms.replace(valueDes);
          break;
        case r'privacy':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(RequiredConsentInput),
          ) as RequiredConsentInput;
          result.privacy.replace(valueDes);
          break;
        case r'gps':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(GpsConsentInput),
          ) as GpsConsentInput;
          result.gps.replace(valueDes);
          break;
        case r'marketing':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(MarketingConsentInput),
          ) as MarketingConsentInput;
          result.marketing.replace(valueDes);
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  UserConsents deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = UserConsentsBuilder();
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
