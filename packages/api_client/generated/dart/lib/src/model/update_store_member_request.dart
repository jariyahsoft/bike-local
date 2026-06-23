//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:bike_local_generated_api_client/src/model/role.dart';
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'update_store_member_request.g.dart';

/// UpdateStoreMemberRequest
///
/// Properties:
/// * [role]
/// * [branchIds]
/// * [grantedPermissions]
/// * [deniedPermissions]
/// * [status]
/// * [version]
@BuiltValue()
abstract class UpdateStoreMemberRequest implements Built<UpdateStoreMemberRequest, UpdateStoreMemberRequestBuilder> {
  @BuiltValueField(wireName: r'role')
  Role? get role;
  // enum roleEnum {  RENTER,  STORE_OWNER,  STORE_MANAGER,  STORE_STAFF,  STORE_ACCOUNTING,  PLATFORM_ADMIN,  PLATFORM_MODERATOR,  PLATFORM_SUPPORT,  };

  @BuiltValueField(wireName: r'branch_ids')
  BuiltList<String>? get branchIds;

  @BuiltValueField(wireName: r'granted_permissions')
  BuiltList<String>? get grantedPermissions;

  @BuiltValueField(wireName: r'denied_permissions')
  BuiltList<String>? get deniedPermissions;

  @BuiltValueField(wireName: r'status')
  UpdateStoreMemberRequestStatusEnum? get status;
  // enum statusEnum {  ACTIVE,  SUSPENDED,  };

  @BuiltValueField(wireName: r'version')
  int get version;

  UpdateStoreMemberRequest._();

  factory UpdateStoreMemberRequest([void updates(UpdateStoreMemberRequestBuilder b)]) = _$UpdateStoreMemberRequest;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(UpdateStoreMemberRequestBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<UpdateStoreMemberRequest> get serializer => _$UpdateStoreMemberRequestSerializer();
}

class _$UpdateStoreMemberRequestSerializer implements PrimitiveSerializer<UpdateStoreMemberRequest> {
  @override
  final Iterable<Type> types = const [UpdateStoreMemberRequest, _$UpdateStoreMemberRequest];

  @override
  final String wireName = r'UpdateStoreMemberRequest';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    UpdateStoreMemberRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    if (object.role != null) {
      yield r'role';
      yield serializers.serialize(
        object.role,
        specifiedType: const FullType(Role),
      );
    }
    if (object.branchIds != null) {
      yield r'branch_ids';
      yield serializers.serialize(
        object.branchIds,
        specifiedType: const FullType(BuiltList, [FullType(String)]),
      );
    }
    if (object.grantedPermissions != null) {
      yield r'granted_permissions';
      yield serializers.serialize(
        object.grantedPermissions,
        specifiedType: const FullType(BuiltList, [FullType(String)]),
      );
    }
    if (object.deniedPermissions != null) {
      yield r'denied_permissions';
      yield serializers.serialize(
        object.deniedPermissions,
        specifiedType: const FullType(BuiltList, [FullType(String)]),
      );
    }
    if (object.status != null) {
      yield r'status';
      yield serializers.serialize(
        object.status,
        specifiedType: const FullType(UpdateStoreMemberRequestStatusEnum),
      );
    }
    yield r'version';
    yield serializers.serialize(
      object.version,
      specifiedType: const FullType(int),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    UpdateStoreMemberRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required UpdateStoreMemberRequestBuilder result,
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
        case r'branch_ids':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BuiltList, [FullType(String)]),
          ) as BuiltList<String>;
          result.branchIds.replace(valueDes);
          break;
        case r'granted_permissions':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BuiltList, [FullType(String)]),
          ) as BuiltList<String>;
          result.grantedPermissions.replace(valueDes);
          break;
        case r'denied_permissions':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BuiltList, [FullType(String)]),
          ) as BuiltList<String>;
          result.deniedPermissions.replace(valueDes);
          break;
        case r'status':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(UpdateStoreMemberRequestStatusEnum),
          ) as UpdateStoreMemberRequestStatusEnum;
          result.status = valueDes;
          break;
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
  UpdateStoreMemberRequest deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = UpdateStoreMemberRequestBuilder();
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

class UpdateStoreMemberRequestStatusEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'ACTIVE')
  static const UpdateStoreMemberRequestStatusEnum ACTIVE = _$updateStoreMemberRequestStatusEnum_ACTIVE;
  @BuiltValueEnumConst(wireName: r'SUSPENDED')
  static const UpdateStoreMemberRequestStatusEnum SUSPENDED = _$updateStoreMemberRequestStatusEnum_SUSPENDED;

  static Serializer<UpdateStoreMemberRequestStatusEnum> get serializer => _$updateStoreMemberRequestStatusEnumSerializer;

  const UpdateStoreMemberRequestStatusEnum._(String name): super(name);

  static BuiltSet<UpdateStoreMemberRequestStatusEnum> get values => _$updateStoreMemberRequestStatusEnumValues;
  static UpdateStoreMemberRequestStatusEnum valueOf(String name) => _$updateStoreMemberRequestStatusEnumValueOf(name);
}
