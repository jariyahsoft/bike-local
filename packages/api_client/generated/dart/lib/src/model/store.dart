//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:bike_local_generated_api_client/src/model/entity_base.dart';
import 'package:bike_local_generated_api_client/src/model/store_document_metadata.dart';
import 'package:built_collection/built_collection.dart';
import 'package:bike_local_generated_api_client/src/model/store_approval_status.dart';
import 'package:bike_local_generated_api_client/src/model/store_operational_status.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'store.g.dart';

/// Store
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
/// * [ownerUserId] 
/// * [legalName] 
/// * [displayName] 
/// * [description] 
/// * [phone] 
/// * [email] 
/// * [defaultCurrency] 
/// * [timezone] 
/// * [approvalStatus] 
/// * [operationalStatus] 
/// * [commissionPlanId] 
/// * [documentMetadata] 
/// * [submittedAt] 
/// * [reviewedAt] 
/// * [reviewedBy] 
/// * [decisionReason] 
@BuiltValue()
abstract class Store implements EntityBase, Built<Store, StoreBuilder> {
  @BuiltValueField(wireName: r'approval_status')
  StoreApprovalStatus get approvalStatus;
  // enum approvalStatusEnum {  DRAFT,  SUBMITTED,  UNDER_REVIEW,  REVISION_REQUIRED,  APPROVED,  REJECTED,  SUSPENDED,  CLOSED,  };

  @BuiltValueField(wireName: r'operational_status')
  StoreOperationalStatus get operationalStatus;
  // enum operationalStatusEnum {  DRAFT,  ACTIVE,  INACTIVE,  SUSPENDED,  CLOSED,  };

  @BuiltValueField(wireName: r'display_name')
  String get displayName;

  @BuiltValueField(wireName: r'timezone')
  String get timezone;

  @BuiltValueField(wireName: r'reviewed_at')
  DateTime? get reviewedAt;

  @BuiltValueField(wireName: r'description')
  String? get description;

  @BuiltValueField(wireName: r'reviewed_by')
  String? get reviewedBy;

  @BuiltValueField(wireName: r'commission_plan_id')
  String? get commissionPlanId;

  @BuiltValueField(wireName: r'legal_name')
  String get legalName;

  @BuiltValueField(wireName: r'document_metadata')
  BuiltList<StoreDocumentMetadata> get documentMetadata;

  @BuiltValueField(wireName: r'phone')
  String? get phone;

  @BuiltValueField(wireName: r'default_currency')
  String get defaultCurrency;

  @BuiltValueField(wireName: r'owner_user_id')
  String get ownerUserId;

  @BuiltValueField(wireName: r'submitted_at')
  DateTime? get submittedAt;

  @BuiltValueField(wireName: r'email')
  String? get email;

  @BuiltValueField(wireName: r'decision_reason')
  String? get decisionReason;

  Store._();

  factory Store([void updates(StoreBuilder b)]) = _$Store;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(StoreBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<Store> get serializer => _$StoreSerializer();
}

class _$StoreSerializer implements PrimitiveSerializer<Store> {
  @override
  final Iterable<Type> types = const [Store, _$Store];

  @override
  final String wireName = r'Store';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    Store object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'operational_status';
    yield serializers.serialize(
      object.operationalStatus,
      specifiedType: const FullType(StoreOperationalStatus),
    );
    yield r'display_name';
    yield serializers.serialize(
      object.displayName,
      specifiedType: const FullType(String),
    );
    yield r'timezone';
    yield serializers.serialize(
      object.timezone,
      specifiedType: const FullType(String),
    );
    if (object.reviewedAt != null) {
      yield r'reviewed_at';
      yield serializers.serialize(
        object.reviewedAt,
        specifiedType: const FullType(DateTime),
      );
    }
    if (object.description != null) {
      yield r'description';
      yield serializers.serialize(
        object.description,
        specifiedType: const FullType(String),
      );
    }
    if (object.commissionPlanId != null) {
      yield r'commission_plan_id';
      yield serializers.serialize(
        object.commissionPlanId,
        specifiedType: const FullType(String),
      );
    }
    yield r'legal_name';
    yield serializers.serialize(
      object.legalName,
      specifiedType: const FullType(String),
    );
    yield r'document_metadata';
    yield serializers.serialize(
      object.documentMetadata,
      specifiedType: const FullType(BuiltList, [FullType(StoreDocumentMetadata)]),
    );
    yield r'created_at';
    yield serializers.serialize(
      object.createdAt,
      specifiedType: const FullType(DateTime),
    );
    yield r'default_currency';
    yield serializers.serialize(
      object.defaultCurrency,
      specifiedType: const FullType(String),
    );
    yield r'id';
    yield serializers.serialize(
      object.id,
      specifiedType: const FullType(String),
    );
    if (object.submittedAt != null) {
      yield r'submitted_at';
      yield serializers.serialize(
        object.submittedAt,
        specifiedType: const FullType(DateTime),
      );
    }
    if (object.email != null) {
      yield r'email';
      yield serializers.serialize(
        object.email,
        specifiedType: const FullType(String),
      );
    }
    if (object.decisionReason != null) {
      yield r'decision_reason';
      yield serializers.serialize(
        object.decisionReason,
        specifiedType: const FullType(String),
      );
    }
    yield r'updated_at';
    yield serializers.serialize(
      object.updatedAt,
      specifiedType: const FullType(DateTime),
    );
    yield r'approval_status';
    yield serializers.serialize(
      object.approvalStatus,
      specifiedType: const FullType(StoreApprovalStatus),
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
    if (object.reviewedBy != null) {
      yield r'reviewed_by';
      yield serializers.serialize(
        object.reviewedBy,
        specifiedType: const FullType(String),
      );
    }
    yield r'version';
    yield serializers.serialize(
      object.version,
      specifiedType: const FullType(int),
    );
    if (object.deletedAt != null) {
      yield r'deleted_at';
      yield serializers.serialize(
        object.deletedAt,
        specifiedType: const FullType(DateTime),
      );
    }
    if (object.phone != null) {
      yield r'phone';
      yield serializers.serialize(
        object.phone,
        specifiedType: const FullType(String),
      );
    }
    if (object.createdBy != null) {
      yield r'created_by';
      yield serializers.serialize(
        object.createdBy,
        specifiedType: const FullType(String),
      );
    }
    yield r'owner_user_id';
    yield serializers.serialize(
      object.ownerUserId,
      specifiedType: const FullType(String),
    );
    if (object.tenantId != null) {
      yield r'tenant_id';
      yield serializers.serialize(
        object.tenantId,
        specifiedType: const FullType(String),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    Store object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required StoreBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'operational_status':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(StoreOperationalStatus),
          ) as StoreOperationalStatus;
          result.operationalStatus = valueDes;
          break;
        case r'display_name':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.displayName = valueDes;
          break;
        case r'timezone':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.timezone = valueDes;
          break;
        case r'reviewed_at':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DateTime),
          ) as DateTime;
          result.reviewedAt = valueDes;
          break;
        case r'description':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.description = valueDes;
          break;
        case r'commission_plan_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.commissionPlanId = valueDes;
          break;
        case r'legal_name':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.legalName = valueDes;
          break;
        case r'document_metadata':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BuiltList, [FullType(StoreDocumentMetadata)]),
          ) as BuiltList<StoreDocumentMetadata>;
          result.documentMetadata.replace(valueDes);
          break;
        case r'created_at':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DateTime),
          ) as DateTime;
          result.createdAt = valueDes;
          break;
        case r'default_currency':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.defaultCurrency = valueDes;
          break;
        case r'id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.id = valueDes;
          break;
        case r'submitted_at':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DateTime),
          ) as DateTime;
          result.submittedAt = valueDes;
          break;
        case r'email':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.email = valueDes;
          break;
        case r'decision_reason':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.decisionReason = valueDes;
          break;
        case r'updated_at':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DateTime),
          ) as DateTime;
          result.updatedAt = valueDes;
          break;
        case r'approval_status':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(StoreApprovalStatus),
          ) as StoreApprovalStatus;
          result.approvalStatus = valueDes;
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
        case r'reviewed_by':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.reviewedBy = valueDes;
          break;
        case r'version':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.version = valueDes;
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
        case r'owner_user_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.ownerUserId = valueDes;
          break;
        case r'tenant_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.tenantId = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  Store deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = StoreBuilder();
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

