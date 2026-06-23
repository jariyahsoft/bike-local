//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:bike_local_generated_api_client/src/model/consent_summary.dart';
import 'package:bike_local_generated_api_client/src/model/role.dart';
import 'package:built_collection/built_collection.dart';
import 'package:bike_local_generated_api_client/src/model/auth_identity.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'user.g.dart';

/// User
///
/// Properties:
/// * [id]
/// * [displayName]
/// * [locale]
/// * [status]
/// * [roles]
/// * [email]
/// * [phone]
/// * [consentSummaries]
/// * [authIdentities]
/// * [deletionRequestedAt]
/// * [version]
/// * [createdAt]
/// * [updatedAt]
@BuiltValue()
abstract class User implements Built<User, UserBuilder> {
  @BuiltValueField(wireName: r'id')
  String get id;

  @BuiltValueField(wireName: r'display_name')
  String get displayName;

  @BuiltValueField(wireName: r'locale')
  UserLocaleEnum get locale;
  // enum localeEnum {  th,  en,  };

  @BuiltValueField(wireName: r'status')
  UserStatusEnum get status;
  // enum statusEnum {  ACTIVE,  SUSPENDED,  DELETION_REQUESTED,  };

  @BuiltValueField(wireName: r'roles')
  BuiltList<Role> get roles;

  @BuiltValueField(wireName: r'email')
  String? get email;

  @BuiltValueField(wireName: r'phone')
  String? get phone;

  @BuiltValueField(wireName: r'consent_summaries')
  BuiltList<ConsentSummary> get consentSummaries;

  @BuiltValueField(wireName: r'auth_identities')
  BuiltList<AuthIdentity> get authIdentities;

  @BuiltValueField(wireName: r'deletion_requested_at')
  DateTime? get deletionRequestedAt;

  @BuiltValueField(wireName: r'version')
  int get version;

  @BuiltValueField(wireName: r'created_at')
  DateTime get createdAt;

  @BuiltValueField(wireName: r'updated_at')
  DateTime get updatedAt;

  User._();

  factory User([void updates(UserBuilder b)]) = _$User;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(UserBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<User> get serializer => _$UserSerializer();
}

class _$UserSerializer implements PrimitiveSerializer<User> {
  @override
  final Iterable<Type> types = const [User, _$User];

  @override
  final String wireName = r'User';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    User object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'id';
    yield serializers.serialize(
      object.id,
      specifiedType: const FullType(String),
    );
    yield r'display_name';
    yield serializers.serialize(
      object.displayName,
      specifiedType: const FullType(String),
    );
    yield r'locale';
    yield serializers.serialize(
      object.locale,
      specifiedType: const FullType(UserLocaleEnum),
    );
    yield r'status';
    yield serializers.serialize(
      object.status,
      specifiedType: const FullType(UserStatusEnum),
    );
    yield r'roles';
    yield serializers.serialize(
      object.roles,
      specifiedType: const FullType(BuiltList, [FullType(Role)]),
    );
    if (object.email != null) {
      yield r'email';
      yield serializers.serialize(
        object.email,
        specifiedType: const FullType(String),
      );
    }
    if (object.phone != null) {
      yield r'phone';
      yield serializers.serialize(
        object.phone,
        specifiedType: const FullType(String),
      );
    }
    yield r'consent_summaries';
    yield serializers.serialize(
      object.consentSummaries,
      specifiedType: const FullType(BuiltList, [FullType(ConsentSummary)]),
    );
    yield r'auth_identities';
    yield serializers.serialize(
      object.authIdentities,
      specifiedType: const FullType(BuiltList, [FullType(AuthIdentity)]),
    );
    if (object.deletionRequestedAt != null) {
      yield r'deletion_requested_at';
      yield serializers.serialize(
        object.deletionRequestedAt,
        specifiedType: const FullType(DateTime),
      );
    }
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
    yield r'updated_at';
    yield serializers.serialize(
      object.updatedAt,
      specifiedType: const FullType(DateTime),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    User object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required UserBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.id = valueDes;
          break;
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
            specifiedType: const FullType(UserLocaleEnum),
          ) as UserLocaleEnum;
          result.locale = valueDes;
          break;
        case r'status':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(UserStatusEnum),
          ) as UserStatusEnum;
          result.status = valueDes;
          break;
        case r'roles':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BuiltList, [FullType(Role)]),
          ) as BuiltList<Role>;
          result.roles.replace(valueDes);
          break;
        case r'email':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.email = valueDes;
          break;
        case r'phone':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.phone = valueDes;
          break;
        case r'consent_summaries':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BuiltList, [FullType(ConsentSummary)]),
          ) as BuiltList<ConsentSummary>;
          result.consentSummaries.replace(valueDes);
          break;
        case r'auth_identities':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BuiltList, [FullType(AuthIdentity)]),
          ) as BuiltList<AuthIdentity>;
          result.authIdentities.replace(valueDes);
          break;
        case r'deletion_requested_at':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DateTime),
          ) as DateTime;
          result.deletionRequestedAt = valueDes;
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
  User deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = UserBuilder();
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

class UserLocaleEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'th')
  static const UserLocaleEnum th = _$userLocaleEnum_th;
  @BuiltValueEnumConst(wireName: r'en')
  static const UserLocaleEnum en = _$userLocaleEnum_en;

  static Serializer<UserLocaleEnum> get serializer => _$userLocaleEnumSerializer;

  const UserLocaleEnum._(String name): super(name);

  static BuiltSet<UserLocaleEnum> get values => _$userLocaleEnumValues;
  static UserLocaleEnum valueOf(String name) => _$userLocaleEnumValueOf(name);
}

class UserStatusEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'ACTIVE')
  static const UserStatusEnum ACTIVE = _$userStatusEnum_ACTIVE;
  @BuiltValueEnumConst(wireName: r'SUSPENDED')
  static const UserStatusEnum SUSPENDED = _$userStatusEnum_SUSPENDED;
  @BuiltValueEnumConst(wireName: r'DELETION_REQUESTED')
  static const UserStatusEnum DELETION_REQUESTED = _$userStatusEnum_DELETION_REQUESTED;

  static Serializer<UserStatusEnum> get serializer => _$userStatusEnumSerializer;

  const UserStatusEnum._(String name): super(name);

  static BuiltSet<UserStatusEnum> get values => _$userStatusEnumValues;
  static UserStatusEnum valueOf(String name) => _$userStatusEnumValueOf(name);
}
