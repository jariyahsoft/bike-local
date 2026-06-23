//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'create_user_request.g.dart';

/// CreateUserRequest
///
/// Properties:
/// * [displayName] 
/// * [locale] 
/// * [acceptedTermsVersion] 
/// * [acceptedPrivacyVersion] 
/// * [acceptedGpsVersion] 
/// * [marketingConsentVersion] 
@BuiltValue()
abstract class CreateUserRequest implements Built<CreateUserRequest, CreateUserRequestBuilder> {
  @BuiltValueField(wireName: r'display_name')
  String get displayName;

  @BuiltValueField(wireName: r'locale')
  CreateUserRequestLocaleEnum get locale;
  // enum localeEnum {  th,  en,  };

  @BuiltValueField(wireName: r'accepted_terms_version')
  String get acceptedTermsVersion;

  @BuiltValueField(wireName: r'accepted_privacy_version')
  String get acceptedPrivacyVersion;

  @BuiltValueField(wireName: r'accepted_gps_version')
  String? get acceptedGpsVersion;

  @BuiltValueField(wireName: r'marketing_consent_version')
  String? get marketingConsentVersion;

  CreateUserRequest._();

  factory CreateUserRequest([void updates(CreateUserRequestBuilder b)]) = _$CreateUserRequest;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(CreateUserRequestBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<CreateUserRequest> get serializer => _$CreateUserRequestSerializer();
}

class _$CreateUserRequestSerializer implements PrimitiveSerializer<CreateUserRequest> {
  @override
  final Iterable<Type> types = const [CreateUserRequest, _$CreateUserRequest];

  @override
  final String wireName = r'CreateUserRequest';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    CreateUserRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'display_name';
    yield serializers.serialize(
      object.displayName,
      specifiedType: const FullType(String),
    );
    yield r'locale';
    yield serializers.serialize(
      object.locale,
      specifiedType: const FullType(CreateUserRequestLocaleEnum),
    );
    yield r'accepted_terms_version';
    yield serializers.serialize(
      object.acceptedTermsVersion,
      specifiedType: const FullType(String),
    );
    yield r'accepted_privacy_version';
    yield serializers.serialize(
      object.acceptedPrivacyVersion,
      specifiedType: const FullType(String),
    );
    if (object.acceptedGpsVersion != null) {
      yield r'accepted_gps_version';
      yield serializers.serialize(
        object.acceptedGpsVersion,
        specifiedType: const FullType(String),
      );
    }
    if (object.marketingConsentVersion != null) {
      yield r'marketing_consent_version';
      yield serializers.serialize(
        object.marketingConsentVersion,
        specifiedType: const FullType(String),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    CreateUserRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required CreateUserRequestBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'display_name':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.displayName = valueDes;
          break;
        case r'locale':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(CreateUserRequestLocaleEnum),
          ) as CreateUserRequestLocaleEnum;
          result.locale = valueDes;
          break;
        case r'accepted_terms_version':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.acceptedTermsVersion = valueDes;
          break;
        case r'accepted_privacy_version':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.acceptedPrivacyVersion = valueDes;
          break;
        case r'accepted_gps_version':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.acceptedGpsVersion = valueDes;
          break;
        case r'marketing_consent_version':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.marketingConsentVersion = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  CreateUserRequest deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = CreateUserRequestBuilder();
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

class CreateUserRequestLocaleEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'th')
  static const CreateUserRequestLocaleEnum th = _$createUserRequestLocaleEnum_th;
  @BuiltValueEnumConst(wireName: r'en')
  static const CreateUserRequestLocaleEnum en = _$createUserRequestLocaleEnum_en;

  static Serializer<CreateUserRequestLocaleEnum> get serializer => _$createUserRequestLocaleEnumSerializer;

  const CreateUserRequestLocaleEnum._(String name): super(name);

  static BuiltSet<CreateUserRequestLocaleEnum> get values => _$createUserRequestLocaleEnumValues;
  static CreateUserRequestLocaleEnum valueOf(String name) => _$createUserRequestLocaleEnumValueOf(name);
}

