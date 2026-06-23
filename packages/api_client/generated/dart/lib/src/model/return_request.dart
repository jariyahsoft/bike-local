//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:bike_local_generated_api_client/src/model/entity_base.dart';
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'return_request.g.dart';

/// ReturnRequest
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
/// * [bookingId] 
/// * [userId] 
/// * [storeId] 
/// * [status] 
/// * [returnType] 
/// * [returnPointId] 
/// * [requestedAt] 
/// * [evidenceImageRefs] 
/// * [notes] 
@BuiltValue()
abstract class ReturnRequest implements EntityBase, Built<ReturnRequest, ReturnRequestBuilder> {
  @BuiltValueField(wireName: r'notes')
  String? get notes;

  @BuiltValueField(wireName: r'requested_at')
  DateTime get requestedAt;

  @BuiltValueField(wireName: r'return_point_id')
  String? get returnPointId;

  @BuiltValueField(wireName: r'evidence_image_refs')
  BuiltList<String> get evidenceImageRefs;

  @BuiltValueField(wireName: r'store_id')
  String get storeId;

  @BuiltValueField(wireName: r'user_id')
  String get userId;

  @BuiltValueField(wireName: r'booking_id')
  String get bookingId;

  @BuiltValueField(wireName: r'return_type')
  ReturnRequestReturnTypeEnum get returnType;
  // enum returnTypeEnum {  STORE,  DEFINED_POINT,  STAFF_PICKUP,  SMART_DOCK,  };

  @BuiltValueField(wireName: r'status')
  ReturnRequestStatusEnum get status;
  // enum statusEnum {  REQUESTED,  VALIDATING_LOCATION,  WAITING_FOR_STORE,  STAFF_ASSIGNED,  PICKUP_IN_PROGRESS,  INSPECTION_PENDING,  ACCEPTED,  REJECTED,  DISPUTED,  CANCELLED,  };

  ReturnRequest._();

  factory ReturnRequest([void updates(ReturnRequestBuilder b)]) = _$ReturnRequest;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(ReturnRequestBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<ReturnRequest> get serializer => _$ReturnRequestSerializer();
}

class _$ReturnRequestSerializer implements PrimitiveSerializer<ReturnRequest> {
  @override
  final Iterable<Type> types = const [ReturnRequest, _$ReturnRequest];

  @override
  final String wireName = r'ReturnRequest';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    ReturnRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    if (object.notes != null) {
      yield r'notes';
      yield serializers.serialize(
        object.notes,
        specifiedType: const FullType(String),
      );
    }
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
    if (object.returnPointId != null) {
      yield r'return_point_id';
      yield serializers.serialize(
        object.returnPointId,
        specifiedType: const FullType(String),
      );
    }
    yield r'evidence_image_refs';
    yield serializers.serialize(
      object.evidenceImageRefs,
      specifiedType: const FullType(BuiltList, [FullType(String)]),
    );
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
    yield r'booking_id';
    yield serializers.serialize(
      object.bookingId,
      specifiedType: const FullType(String),
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
    yield r'requested_at';
    yield serializers.serialize(
      object.requestedAt,
      specifiedType: const FullType(DateTime),
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
    yield r'return_type';
    yield serializers.serialize(
      object.returnType,
      specifiedType: const FullType(ReturnRequestReturnTypeEnum),
    );
    yield r'status';
    yield serializers.serialize(
      object.status,
      specifiedType: const FullType(ReturnRequestStatusEnum),
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
    ReturnRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required ReturnRequestBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'notes':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.notes = valueDes;
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
        case r'return_point_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.returnPointId = valueDes;
          break;
        case r'evidence_image_refs':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BuiltList, [FullType(String)]),
          ) as BuiltList<String>;
          result.evidenceImageRefs.replace(valueDes);
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
        case r'booking_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.bookingId = valueDes;
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
        case r'requested_at':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DateTime),
          ) as DateTime;
          result.requestedAt = valueDes;
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
        case r'return_type':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(ReturnRequestReturnTypeEnum),
          ) as ReturnRequestReturnTypeEnum;
          result.returnType = valueDes;
          break;
        case r'status':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(ReturnRequestStatusEnum),
          ) as ReturnRequestStatusEnum;
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
  ReturnRequest deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = ReturnRequestBuilder();
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

class ReturnRequestStatusEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'REQUESTED')
  static const ReturnRequestStatusEnum REQUESTED = _$returnRequestStatusEnum_REQUESTED;
  @BuiltValueEnumConst(wireName: r'VALIDATING_LOCATION')
  static const ReturnRequestStatusEnum VALIDATING_LOCATION = _$returnRequestStatusEnum_VALIDATING_LOCATION;
  @BuiltValueEnumConst(wireName: r'WAITING_FOR_STORE')
  static const ReturnRequestStatusEnum WAITING_FOR_STORE = _$returnRequestStatusEnum_WAITING_FOR_STORE;
  @BuiltValueEnumConst(wireName: r'STAFF_ASSIGNED')
  static const ReturnRequestStatusEnum STAFF_ASSIGNED = _$returnRequestStatusEnum_STAFF_ASSIGNED;
  @BuiltValueEnumConst(wireName: r'PICKUP_IN_PROGRESS')
  static const ReturnRequestStatusEnum PICKUP_IN_PROGRESS = _$returnRequestStatusEnum_PICKUP_IN_PROGRESS;
  @BuiltValueEnumConst(wireName: r'INSPECTION_PENDING')
  static const ReturnRequestStatusEnum INSPECTION_PENDING = _$returnRequestStatusEnum_INSPECTION_PENDING;
  @BuiltValueEnumConst(wireName: r'ACCEPTED')
  static const ReturnRequestStatusEnum ACCEPTED = _$returnRequestStatusEnum_ACCEPTED;
  @BuiltValueEnumConst(wireName: r'REJECTED')
  static const ReturnRequestStatusEnum REJECTED = _$returnRequestStatusEnum_REJECTED;
  @BuiltValueEnumConst(wireName: r'DISPUTED')
  static const ReturnRequestStatusEnum DISPUTED = _$returnRequestStatusEnum_DISPUTED;
  @BuiltValueEnumConst(wireName: r'CANCELLED')
  static const ReturnRequestStatusEnum CANCELLED = _$returnRequestStatusEnum_CANCELLED;

  static Serializer<ReturnRequestStatusEnum> get serializer => _$returnRequestStatusEnumSerializer;

  const ReturnRequestStatusEnum._(String name): super(name);

  static BuiltSet<ReturnRequestStatusEnum> get values => _$returnRequestStatusEnumValues;
  static ReturnRequestStatusEnum valueOf(String name) => _$returnRequestStatusEnumValueOf(name);
}

class ReturnRequestReturnTypeEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'STORE')
  static const ReturnRequestReturnTypeEnum STORE = _$returnRequestReturnTypeEnum_STORE;
  @BuiltValueEnumConst(wireName: r'DEFINED_POINT')
  static const ReturnRequestReturnTypeEnum DEFINED_POINT = _$returnRequestReturnTypeEnum_DEFINED_POINT;
  @BuiltValueEnumConst(wireName: r'STAFF_PICKUP')
  static const ReturnRequestReturnTypeEnum STAFF_PICKUP = _$returnRequestReturnTypeEnum_STAFF_PICKUP;
  @BuiltValueEnumConst(wireName: r'SMART_DOCK')
  static const ReturnRequestReturnTypeEnum SMART_DOCK = _$returnRequestReturnTypeEnum_SMART_DOCK;

  static Serializer<ReturnRequestReturnTypeEnum> get serializer => _$returnRequestReturnTypeEnumSerializer;

  const ReturnRequestReturnTypeEnum._(String name): super(name);

  static BuiltSet<ReturnRequestReturnTypeEnum> get values => _$returnRequestReturnTypeEnumValues;
  static ReturnRequestReturnTypeEnum valueOf(String name) => _$returnRequestReturnTypeEnumValueOf(name);
}

