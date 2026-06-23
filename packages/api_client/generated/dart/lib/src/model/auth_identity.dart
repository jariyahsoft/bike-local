//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'auth_identity.g.dart';

/// AuthIdentity
///
/// Properties:
/// * [provider]
/// * [providerSubjectHint] - Masked provider subject for UI display. Raw provider subjects and tokens must never be exposed.
/// * [verified]
/// * [lastAuthenticatedAt]
@BuiltValue()
abstract class AuthIdentity implements Built<AuthIdentity, AuthIdentityBuilder> {
  @BuiltValueField(wireName: r'provider')
  AuthIdentityProviderEnum get provider;
  // enum providerEnum {  PHONE,  EMAIL_PASSWORD,  GOOGLE,  APPLE,  };

  /// Masked provider subject for UI display. Raw provider subjects and tokens must never be exposed.
  @BuiltValueField(wireName: r'provider_subject_hint')
  String get providerSubjectHint;

  @BuiltValueField(wireName: r'verified')
  bool get verified;

  @BuiltValueField(wireName: r'last_authenticated_at')
  DateTime get lastAuthenticatedAt;

  AuthIdentity._();

  factory AuthIdentity([void updates(AuthIdentityBuilder b)]) = _$AuthIdentity;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(AuthIdentityBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<AuthIdentity> get serializer => _$AuthIdentitySerializer();
}

class _$AuthIdentitySerializer implements PrimitiveSerializer<AuthIdentity> {
  @override
  final Iterable<Type> types = const [AuthIdentity, _$AuthIdentity];

  @override
  final String wireName = r'AuthIdentity';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    AuthIdentity object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'provider';
    yield serializers.serialize(
      object.provider,
      specifiedType: const FullType(AuthIdentityProviderEnum),
    );
    yield r'provider_subject_hint';
    yield serializers.serialize(
      object.providerSubjectHint,
      specifiedType: const FullType(String),
    );
    yield r'verified';
    yield serializers.serialize(
      object.verified,
      specifiedType: const FullType(bool),
    );
    yield r'last_authenticated_at';
    yield serializers.serialize(
      object.lastAuthenticatedAt,
      specifiedType: const FullType(DateTime),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    AuthIdentity object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required AuthIdentityBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'provider':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(AuthIdentityProviderEnum),
          ) as AuthIdentityProviderEnum;
          result.provider = valueDes;
          break;
        case r'provider_subject_hint':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.providerSubjectHint = valueDes;
          break;
        case r'verified':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(bool),
          ) as bool;
          result.verified = valueDes;
          break;
        case r'last_authenticated_at':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DateTime),
          ) as DateTime;
          result.lastAuthenticatedAt = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  AuthIdentity deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = AuthIdentityBuilder();
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

class AuthIdentityProviderEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'PHONE')
  static const AuthIdentityProviderEnum PHONE = _$authIdentityProviderEnum_PHONE;
  @BuiltValueEnumConst(wireName: r'EMAIL_PASSWORD')
  static const AuthIdentityProviderEnum EMAIL_PASSWORD = _$authIdentityProviderEnum_EMAIL_PASSWORD;
  @BuiltValueEnumConst(wireName: r'GOOGLE')
  static const AuthIdentityProviderEnum GOOGLE = _$authIdentityProviderEnum_GOOGLE;
  @BuiltValueEnumConst(wireName: r'APPLE')
  static const AuthIdentityProviderEnum APPLE = _$authIdentityProviderEnum_APPLE;

  static Serializer<AuthIdentityProviderEnum> get serializer => _$authIdentityProviderEnumSerializer;

  const AuthIdentityProviderEnum._(String name): super(name);

  static BuiltSet<AuthIdentityProviderEnum> get values => _$authIdentityProviderEnumValues;
  static AuthIdentityProviderEnum valueOf(String name) => _$authIdentityProviderEnumValueOf(name);
}
