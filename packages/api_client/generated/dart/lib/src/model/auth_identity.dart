//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:bike_local_generated_api_client/src/model/entity_base.dart';
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'auth_identity.g.dart';

/// AuthIdentity
///
/// Properties:
/// * [id] 
/// * [schemaVersion] 
/// * [tenantId] 
/// * [createdAt] 
/// * [createdBy] 
/// * [updatedAt] 
/// * [updatedBy] 
/// * [deletedAt] 
/// * [version] 
/// * [userId] 
/// * [provider] 
/// * [providerSubject] 
/// * [verified] 
@BuiltValue()
abstract class AuthIdentity implements EntityBase, Built<AuthIdentity, AuthIdentityBuilder> {
  @BuiltValueField(wireName: r'provider_subject')
  String get providerSubject;

  @BuiltValueField(wireName: r'provider')
  AuthIdentityProviderEnum get provider;
  // enum providerEnum {  PHONE,  EMAIL_PASSWORD,  GOOGLE,  APPLE,  };

  @BuiltValueField(wireName: r'verified')
  bool get verified;

  @BuiltValueField(wireName: r'user_id')
  String get userId;

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
    yield r'provider_subject';
    yield serializers.serialize(
      object.providerSubject,
      specifiedType: const FullType(String),
    );
    yield r'schema_version';
    yield serializers.serialize(
      object.schemaVersion,
      specifiedType: const FullType(int),
    );
    if (object.updatedBy != null) {
      yield r'updated_by';
      yield serializers.serialize(
        object.updatedBy,
        specifiedType: const FullType(String),
      );
    }
    yield r'verified';
    yield serializers.serialize(
      object.verified,
      specifiedType: const FullType(bool),
    );
    yield r'user_id';
    yield serializers.serialize(
      object.userId,
      specifiedType: const FullType(String),
    );
    yield r'version';
    yield serializers.serialize(
      object.version,
      specifiedType: const FullType(int),
    );
    yield r'created_at';
    yield serializers.serialize(
      object.createdAt,
      specifiedType: const FullType(DateTime),
    );
    if (object.deletedAt != null) {
      yield r'deleted_at';
      yield serializers.serialize(
        object.deletedAt,
        specifiedType: const FullType(DateTime),
      );
    }
    yield r'provider';
    yield serializers.serialize(
      object.provider,
      specifiedType: const FullType(AuthIdentityProviderEnum),
    );
    if (object.createdBy != null) {
      yield r'created_by';
      yield serializers.serialize(
        object.createdBy,
        specifiedType: const FullType(String),
      );
    }
    if (object.tenantId != null) {
      yield r'tenant_id';
      yield serializers.serialize(
        object.tenantId,
        specifiedType: const FullType(String),
      );
    }
    yield r'id';
    yield serializers.serialize(
      object.id,
      specifiedType: const FullType(String),
    );
    yield r'updated_at';
    yield serializers.serialize(
      object.updatedAt,
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
        case r'provider_subject':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.providerSubject = valueDes;
          break;
        case r'schema_version':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.schemaVersion = valueDes;
          break;
        case r'updated_by':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.updatedBy = valueDes;
          break;
        case r'verified':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(bool),
          ) as bool;
          result.verified = valueDes;
          break;
        case r'user_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.userId = valueDes;
          break;
        case r'version':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.version = valueDes;
          break;
        case r'created_at':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DateTime),
          ) as DateTime;
          result.createdAt = valueDes;
          break;
        case r'deleted_at':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DateTime),
          ) as DateTime;
          result.deletedAt = valueDes;
          break;
        case r'provider':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(AuthIdentityProviderEnum),
          ) as AuthIdentityProviderEnum;
          result.provider = valueDes;
          break;
        case r'created_by':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.createdBy = valueDes;
          break;
        case r'tenant_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.tenantId = valueDes;
          break;
        case r'id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.id = valueDes;
          break;
        case r'updated_at':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DateTime),
          ) as DateTime;
          result.updatedAt = valueDes;
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

