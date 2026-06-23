//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:bike_local_generated_api_client/src/model/role.dart';
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'create_staff_invitation_request.g.dart';

/// CreateStaffInvitationRequest
///
/// Properties:
/// * [role] 
/// * [email] 
/// * [phone] 
/// * [branchIds] 
@BuiltValue()
abstract class CreateStaffInvitationRequest implements Built<CreateStaffInvitationRequest, CreateStaffInvitationRequestBuilder> {
  @BuiltValueField(wireName: r'role')
  Role get role;
  // enum roleEnum {  RENTER,  STORE_OWNER,  STORE_MANAGER,  STORE_STAFF,  STORE_ACCOUNTING,  PLATFORM_ADMIN,  PLATFORM_MODERATOR,  PLATFORM_SUPPORT,  };

  @BuiltValueField(wireName: r'email')
  String? get email;

  @BuiltValueField(wireName: r'phone')
  String? get phone;

  @BuiltValueField(wireName: r'branch_ids')
  BuiltList<String>? get branchIds;

  CreateStaffInvitationRequest._();

  factory CreateStaffInvitationRequest([void updates(CreateStaffInvitationRequestBuilder b)]) = _$CreateStaffInvitationRequest;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(CreateStaffInvitationRequestBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<CreateStaffInvitationRequest> get serializer => _$CreateStaffInvitationRequestSerializer();
}

class _$CreateStaffInvitationRequestSerializer implements PrimitiveSerializer<CreateStaffInvitationRequest> {
  @override
  final Iterable<Type> types = const [CreateStaffInvitationRequest, _$CreateStaffInvitationRequest];

  @override
  final String wireName = r'CreateStaffInvitationRequest';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    CreateStaffInvitationRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'role';
    yield serializers.serialize(
      object.role,
      specifiedType: const FullType(Role),
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
    if (object.branchIds != null) {
      yield r'branch_ids';
      yield serializers.serialize(
        object.branchIds,
        specifiedType: const FullType(BuiltList, [FullType(String)]),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    CreateStaffInvitationRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required CreateStaffInvitationRequestBuilder result,
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
        case r'branch_ids':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BuiltList, [FullType(String)]),
          ) as BuiltList<String>;
          result.branchIds.replace(valueDes);
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  CreateStaffInvitationRequest deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = CreateStaffInvitationRequestBuilder();
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

