//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:bike_local_generated_api_client/src/model/entity_base.dart';
import 'package:bike_local_generated_api_client/src/model/role.dart';
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'store_member.g.dart';

/// StoreMember
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
/// * [storeId] 
/// * [userId] 
/// * [role] 
/// * [branchIds] 
/// * [permissions] 
/// * [grantedPermissions] 
/// * [deniedPermissions] 
/// * [status] 
@BuiltValue()
abstract class StoreMember implements EntityBase, Built<StoreMember, StoreMemberBuilder> {
  @BuiltValueField(wireName: r'denied_permissions')
  BuiltList<String>? get deniedPermissions;

  @BuiltValueField(wireName: r'role')
  Role get role;
  // enum roleEnum {  RENTER,  STORE_OWNER,  STORE_MANAGER,  STORE_STAFF,  STORE_ACCOUNTING,  PLATFORM_ADMIN,  PLATFORM_MODERATOR,  PLATFORM_SUPPORT,  };

  @BuiltValueField(wireName: r'permissions')
  BuiltList<String>? get permissions;

  @BuiltValueField(wireName: r'branch_ids')
  BuiltList<String> get branchIds;

  @BuiltValueField(wireName: r'store_id')
  String get storeId;

  @BuiltValueField(wireName: r'granted_permissions')
  BuiltList<String>? get grantedPermissions;

  @BuiltValueField(wireName: r'user_id')
  String get userId;

  @BuiltValueField(wireName: r'status')
  StoreMemberStatusEnum get status;
  // enum statusEnum {  ACTIVE,  SUSPENDED,  };

  StoreMember._();

  factory StoreMember([void updates(StoreMemberBuilder b)]) = _$StoreMember;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(StoreMemberBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<StoreMember> get serializer => _$StoreMemberSerializer();
}

class _$StoreMemberSerializer implements PrimitiveSerializer<StoreMember> {
  @override
  final Iterable<Type> types = const [StoreMember, _$StoreMember];

  @override
  final String wireName = r'StoreMember';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    StoreMember object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'role';
    yield serializers.serialize(
      object.role,
      specifiedType: const FullType(Role),
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
    yield r'store_id';
    yield serializers.serialize(
      object.storeId,
      specifiedType: const FullType(String),
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
    if (object.deniedPermissions != null) {
      yield r'denied_permissions';
      yield serializers.serialize(
        object.deniedPermissions,
        specifiedType: const FullType(BuiltList, [FullType(String)]),
      );
    }
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
    if (object.createdBy != null) {
      yield r'created_by';
      yield serializers.serialize(
        object.createdBy,
        specifiedType: const FullType(String),
      );
    }
    if (object.permissions != null) {
      yield r'permissions';
      yield serializers.serialize(
        object.permissions,
        specifiedType: const FullType(BuiltList, [FullType(String)]),
      );
    }
    if (object.tenantId != null) {
      yield r'tenant_id';
      yield serializers.serialize(
        object.tenantId,
        specifiedType: const FullType(String),
      );
    }
    yield r'branch_ids';
    yield serializers.serialize(
      object.branchIds,
      specifiedType: const FullType(BuiltList, [FullType(String)]),
    );
    yield r'id';
    yield serializers.serialize(
      object.id,
      specifiedType: const FullType(String),
    );
    if (object.grantedPermissions != null) {
      yield r'granted_permissions';
      yield serializers.serialize(
        object.grantedPermissions,
        specifiedType: const FullType(BuiltList, [FullType(String)]),
      );
    }
    yield r'status';
    yield serializers.serialize(
      object.status,
      specifiedType: const FullType(StoreMemberStatusEnum),
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
    StoreMember object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required StoreMemberBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'role':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(Role),
          ) as Role;
          result.role = valueDes;
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
        case r'store_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.storeId = valueDes;
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
        case r'denied_permissions':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BuiltList, [FullType(String)]),
          ) as BuiltList<String>;
          result.deniedPermissions.replace(valueDes);
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
        case r'created_by':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.createdBy = valueDes;
          break;
        case r'permissions':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BuiltList, [FullType(String)]),
          ) as BuiltList<String>;
          result.permissions.replace(valueDes);
          break;
        case r'tenant_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.tenantId = valueDes;
          break;
        case r'branch_ids':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BuiltList, [FullType(String)]),
          ) as BuiltList<String>;
          result.branchIds.replace(valueDes);
          break;
        case r'id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.id = valueDes;
          break;
        case r'granted_permissions':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BuiltList, [FullType(String)]),
          ) as BuiltList<String>;
          result.grantedPermissions.replace(valueDes);
          break;
        case r'status':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(StoreMemberStatusEnum),
          ) as StoreMemberStatusEnum;
          result.status = valueDes;
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
  StoreMember deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = StoreMemberBuilder();
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

class StoreMemberStatusEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'ACTIVE')
  static const StoreMemberStatusEnum ACTIVE = _$storeMemberStatusEnum_ACTIVE;
  @BuiltValueEnumConst(wireName: r'SUSPENDED')
  static const StoreMemberStatusEnum SUSPENDED = _$storeMemberStatusEnum_SUSPENDED;

  static Serializer<StoreMemberStatusEnum> get serializer => _$storeMemberStatusEnumSerializer;

  const StoreMemberStatusEnum._(String name): super(name);

  static BuiltSet<StoreMemberStatusEnum> get values => _$storeMemberStatusEnumValues;
  static StoreMemberStatusEnum valueOf(String name) => _$storeMemberStatusEnumValueOf(name);
}

