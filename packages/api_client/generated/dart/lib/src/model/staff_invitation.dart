//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:bike_local_generated_api_client/src/model/role.dart';
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'staff_invitation.g.dart';

/// StaffInvitation
///
/// Properties:
/// * [id] 
/// * [storeId] 
/// * [role] 
/// * [phone] 
/// * [email] 
/// * [status] 
@BuiltValue()
abstract class StaffInvitation implements Built<StaffInvitation, StaffInvitationBuilder> {
  @BuiltValueField(wireName: r'id')
  String get id;

  @BuiltValueField(wireName: r'store_id')
  String get storeId;

  @BuiltValueField(wireName: r'role')
  Role get role;
  // enum roleEnum {  RENTER,  STORE_OWNER,  STORE_MANAGER,  STORE_STAFF,  STORE_ACCOUNTING,  PLATFORM_ADMIN,  PLATFORM_MODERATOR,  PLATFORM_SUPPORT,  };

  @BuiltValueField(wireName: r'phone')
  String? get phone;

  @BuiltValueField(wireName: r'email')
  String? get email;

  @BuiltValueField(wireName: r'status')
  StaffInvitationStatusEnum get status;
  // enum statusEnum {  PENDING,  ACCEPTED,  EXPIRED,  CANCELLED,  };

  StaffInvitation._();

  factory StaffInvitation([void updates(StaffInvitationBuilder b)]) = _$StaffInvitation;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(StaffInvitationBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<StaffInvitation> get serializer => _$StaffInvitationSerializer();
}

class _$StaffInvitationSerializer implements PrimitiveSerializer<StaffInvitation> {
  @override
  final Iterable<Type> types = const [StaffInvitation, _$StaffInvitation];

  @override
  final String wireName = r'StaffInvitation';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    StaffInvitation object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'id';
    yield serializers.serialize(
      object.id,
      specifiedType: const FullType(String),
    );
    yield r'store_id';
    yield serializers.serialize(
      object.storeId,
      specifiedType: const FullType(String),
    );
    yield r'role';
    yield serializers.serialize(
      object.role,
      specifiedType: const FullType(Role),
    );
    if (object.phone != null) {
      yield r'phone';
      yield serializers.serialize(
        object.phone,
        specifiedType: const FullType(String),
      );
    }
    if (object.email != null) {
      yield r'email';
      yield serializers.serialize(
        object.email,
        specifiedType: const FullType(String),
      );
    }
    yield r'status';
    yield serializers.serialize(
      object.status,
      specifiedType: const FullType(StaffInvitationStatusEnum),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    StaffInvitation object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required StaffInvitationBuilder result,
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
        case r'store_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.storeId = valueDes;
          break;
        case r'role':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(Role),
          ) as Role;
          result.role = valueDes;
          break;
        case r'phone':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.phone = valueDes;
          break;
        case r'email':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.email = valueDes;
          break;
        case r'status':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(StaffInvitationStatusEnum),
          ) as StaffInvitationStatusEnum;
          result.status = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  StaffInvitation deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = StaffInvitationBuilder();
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

class StaffInvitationStatusEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'PENDING')
  static const StaffInvitationStatusEnum PENDING = _$staffInvitationStatusEnum_PENDING;
  @BuiltValueEnumConst(wireName: r'ACCEPTED')
  static const StaffInvitationStatusEnum ACCEPTED = _$staffInvitationStatusEnum_ACCEPTED;
  @BuiltValueEnumConst(wireName: r'EXPIRED')
  static const StaffInvitationStatusEnum EXPIRED = _$staffInvitationStatusEnum_EXPIRED;
  @BuiltValueEnumConst(wireName: r'CANCELLED')
  static const StaffInvitationStatusEnum CANCELLED = _$staffInvitationStatusEnum_CANCELLED;

  static Serializer<StaffInvitationStatusEnum> get serializer => _$staffInvitationStatusEnumSerializer;

  const StaffInvitationStatusEnum._(String name): super(name);

  static BuiltSet<StaffInvitationStatusEnum> get values => _$staffInvitationStatusEnumValues;
  static StaffInvitationStatusEnum valueOf(String name) => _$staffInvitationStatusEnumValueOf(name);
}

