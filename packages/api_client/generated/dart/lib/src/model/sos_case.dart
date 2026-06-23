//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:bike_local_generated_api_client/src/model/entity_base.dart';
import 'package:bike_local_generated_api_client/src/model/location.dart';
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'sos_case.g.dart';

/// SosCase
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
/// * [bookingId] 
/// * [rentalId] 
/// * [assetId] 
/// * [phone] 
/// * [location] 
/// * [issueType] 
/// * [status] 
/// * [assignedStaffUserId] 
@BuiltValue()
abstract class SosCase implements EntityBase, Built<SosCase, SosCaseBuilder> {
  @BuiltValueField(wireName: r'issue_type')
  SosCaseIssueTypeEnum get issueType;
  // enum issueTypeEnum {  BIKE_BROKEN,  FLAT_TIRE,  ACCIDENT,  LOST,  HEALTH,  UNSAFE,  OTHER,  };

  @BuiltValueField(wireName: r'phone')
  String get phone;

  @BuiltValueField(wireName: r'asset_id')
  String get assetId;

  @BuiltValueField(wireName: r'location')
  Location get location;

  @BuiltValueField(wireName: r'assigned_staff_user_id')
  String? get assignedStaffUserId;

  @BuiltValueField(wireName: r'user_id')
  String get userId;

  @BuiltValueField(wireName: r'booking_id')
  String get bookingId;

  @BuiltValueField(wireName: r'rental_id')
  String get rentalId;

  @BuiltValueField(wireName: r'status')
  SosCaseStatusEnum get status;
  // enum statusEnum {  OPEN,  ACKNOWLEDGED,  ASSIGNED,  IN_PROGRESS,  RESOLVED,  CLOSED,  };

  SosCase._();

  factory SosCase([void updates(SosCaseBuilder b)]) = _$SosCase;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(SosCaseBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<SosCase> get serializer => _$SosCaseSerializer();
}

class _$SosCaseSerializer implements PrimitiveSerializer<SosCase> {
  @override
  final Iterable<Type> types = const [SosCase, _$SosCase];

  @override
  final String wireName = r'SosCase';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    SosCase object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
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
    yield r'booking_id';
    yield serializers.serialize(
      object.bookingId,
      specifiedType: const FullType(String),
    );
    yield r'issue_type';
    yield serializers.serialize(
      object.issueType,
      specifiedType: const FullType(SosCaseIssueTypeEnum),
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
    yield r'phone';
    yield serializers.serialize(
      object.phone,
      specifiedType: const FullType(String),
    );
    if (object.createdBy != null) {
      yield r'created_by';
      yield serializers.serialize(
        object.createdBy,
        specifiedType: const FullType(String),
      );
    }
    yield r'asset_id';
    yield serializers.serialize(
      object.assetId,
      specifiedType: const FullType(String),
    );
    if (object.tenantId != null) {
      yield r'tenant_id';
      yield serializers.serialize(
        object.tenantId,
        specifiedType: const FullType(String),
      );
    }
    yield r'location';
    yield serializers.serialize(
      object.location,
      specifiedType: const FullType(Location),
    );
    if (object.assignedStaffUserId != null) {
      yield r'assigned_staff_user_id';
      yield serializers.serialize(
        object.assignedStaffUserId,
        specifiedType: const FullType(String),
      );
    }
    yield r'id';
    yield serializers.serialize(
      object.id,
      specifiedType: const FullType(String),
    );
    yield r'rental_id';
    yield serializers.serialize(
      object.rentalId,
      specifiedType: const FullType(String),
    );
    yield r'status';
    yield serializers.serialize(
      object.status,
      specifiedType: const FullType(SosCaseStatusEnum),
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
    SosCase object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required SosCaseBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
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
        case r'booking_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.bookingId = valueDes;
          break;
        case r'issue_type':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(SosCaseIssueTypeEnum),
          ) as SosCaseIssueTypeEnum;
          result.issueType = valueDes;
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
        case r'phone':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.phone = valueDes;
          break;
        case r'created_by':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.createdBy = valueDes;
          break;
        case r'asset_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.assetId = valueDes;
          break;
        case r'tenant_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.tenantId = valueDes;
          break;
        case r'location':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(Location),
          ) as Location;
          result.location.replace(valueDes);
          break;
        case r'assigned_staff_user_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.assignedStaffUserId = valueDes;
          break;
        case r'id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.id = valueDes;
          break;
        case r'rental_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.rentalId = valueDes;
          break;
        case r'status':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(SosCaseStatusEnum),
          ) as SosCaseStatusEnum;
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
  SosCase deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = SosCaseBuilder();
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

class SosCaseIssueTypeEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'BIKE_BROKEN')
  static const SosCaseIssueTypeEnum BIKE_BROKEN = _$sosCaseIssueTypeEnum_BIKE_BROKEN;
  @BuiltValueEnumConst(wireName: r'FLAT_TIRE')
  static const SosCaseIssueTypeEnum FLAT_TIRE = _$sosCaseIssueTypeEnum_FLAT_TIRE;
  @BuiltValueEnumConst(wireName: r'ACCIDENT')
  static const SosCaseIssueTypeEnum ACCIDENT = _$sosCaseIssueTypeEnum_ACCIDENT;
  @BuiltValueEnumConst(wireName: r'LOST')
  static const SosCaseIssueTypeEnum LOST = _$sosCaseIssueTypeEnum_LOST;
  @BuiltValueEnumConst(wireName: r'HEALTH')
  static const SosCaseIssueTypeEnum HEALTH = _$sosCaseIssueTypeEnum_HEALTH;
  @BuiltValueEnumConst(wireName: r'UNSAFE')
  static const SosCaseIssueTypeEnum UNSAFE = _$sosCaseIssueTypeEnum_UNSAFE;
  @BuiltValueEnumConst(wireName: r'OTHER')
  static const SosCaseIssueTypeEnum OTHER = _$sosCaseIssueTypeEnum_OTHER;

  static Serializer<SosCaseIssueTypeEnum> get serializer => _$sosCaseIssueTypeEnumSerializer;

  const SosCaseIssueTypeEnum._(String name): super(name);

  static BuiltSet<SosCaseIssueTypeEnum> get values => _$sosCaseIssueTypeEnumValues;
  static SosCaseIssueTypeEnum valueOf(String name) => _$sosCaseIssueTypeEnumValueOf(name);
}

class SosCaseStatusEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'OPEN')
  static const SosCaseStatusEnum OPEN = _$sosCaseStatusEnum_OPEN;
  @BuiltValueEnumConst(wireName: r'ACKNOWLEDGED')
  static const SosCaseStatusEnum ACKNOWLEDGED = _$sosCaseStatusEnum_ACKNOWLEDGED;
  @BuiltValueEnumConst(wireName: r'ASSIGNED')
  static const SosCaseStatusEnum ASSIGNED = _$sosCaseStatusEnum_ASSIGNED;
  @BuiltValueEnumConst(wireName: r'IN_PROGRESS')
  static const SosCaseStatusEnum IN_PROGRESS = _$sosCaseStatusEnum_IN_PROGRESS;
  @BuiltValueEnumConst(wireName: r'RESOLVED')
  static const SosCaseStatusEnum RESOLVED = _$sosCaseStatusEnum_RESOLVED;
  @BuiltValueEnumConst(wireName: r'CLOSED')
  static const SosCaseStatusEnum CLOSED = _$sosCaseStatusEnum_CLOSED;

  static Serializer<SosCaseStatusEnum> get serializer => _$sosCaseStatusEnumSerializer;

  const SosCaseStatusEnum._(String name): super(name);

  static BuiltSet<SosCaseStatusEnum> get values => _$sosCaseStatusEnumValues;
  static SosCaseStatusEnum valueOf(String name) => _$sosCaseStatusEnumValueOf(name);
}

