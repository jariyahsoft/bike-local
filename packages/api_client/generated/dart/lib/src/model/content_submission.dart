//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:bike_local_generated_api_client/src/model/entity_base.dart';
import 'package:built_collection/built_collection.dart';
import 'package:bike_local_generated_api_client/src/model/content_approval_status.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'content_submission.g.dart';

/// ContentSubmission
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
/// * [contentType] 
/// * [contentId] 
/// * [submittedByUserId] 
/// * [status] 
/// * [moderationReason] 
/// * [moderatedByUserId] 
/// * [moderatedAt] 
@BuiltValue()
abstract class ContentSubmission implements EntityBase, Built<ContentSubmission, ContentSubmissionBuilder> {
  @BuiltValueField(wireName: r'submitted_by_user_id')
  String get submittedByUserId;

  @BuiltValueField(wireName: r'moderation_reason')
  String? get moderationReason;

  @BuiltValueField(wireName: r'content_id')
  String get contentId;

  @BuiltValueField(wireName: r'moderated_by_user_id')
  String? get moderatedByUserId;

  @BuiltValueField(wireName: r'moderated_at')
  DateTime? get moderatedAt;

  @BuiltValueField(wireName: r'content_type')
  ContentSubmissionContentTypeEnum get contentType;
  // enum contentTypeEnum {  ROUTE,  PLACE,  REVIEW,  };

  @BuiltValueField(wireName: r'status')
  ContentApprovalStatus get status;
  // enum statusEnum {  DRAFT,  SUBMITTED,  UNDER_REVIEW,  REVISION_REQUIRED,  APPROVED,  REJECTED,  SUSPENDED,  OUTDATED,  };

  ContentSubmission._();

  factory ContentSubmission([void updates(ContentSubmissionBuilder b)]) = _$ContentSubmission;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(ContentSubmissionBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<ContentSubmission> get serializer => _$ContentSubmissionSerializer();
}

class _$ContentSubmissionSerializer implements PrimitiveSerializer<ContentSubmission> {
  @override
  final Iterable<Type> types = const [ContentSubmission, _$ContentSubmission];

  @override
  final String wireName = r'ContentSubmission';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    ContentSubmission object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    if (object.moderationReason != null) {
      yield r'moderation_reason';
      yield serializers.serialize(
        object.moderationReason,
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
    yield r'content_id';
    yield serializers.serialize(
      object.contentId,
      specifiedType: const FullType(String),
    );
    if (object.moderatedByUserId != null) {
      yield r'moderated_by_user_id';
      yield serializers.serialize(
        object.moderatedByUserId,
        specifiedType: const FullType(String),
      );
    }
    yield r'version';
    yield serializers.serialize(
      object.version,
      specifiedType: const FullType(int),
    );
    yield r'submitted_by_user_id';
    yield serializers.serialize(
      object.submittedByUserId,
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
    if (object.moderatedAt != null) {
      yield r'moderated_at';
      yield serializers.serialize(
        object.moderatedAt,
        specifiedType: const FullType(DateTime),
      );
    }
    yield r'content_type';
    yield serializers.serialize(
      object.contentType,
      specifiedType: const FullType(ContentSubmissionContentTypeEnum),
    );
    yield r'status';
    yield serializers.serialize(
      object.status,
      specifiedType: const FullType(ContentApprovalStatus),
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
    ContentSubmission object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required ContentSubmissionBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'moderation_reason':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.moderationReason = valueDes;
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
        case r'content_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.contentId = valueDes;
          break;
        case r'moderated_by_user_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.moderatedByUserId = valueDes;
          break;
        case r'version':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.version = valueDes;
          break;
        case r'submitted_by_user_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.submittedByUserId = valueDes;
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
        case r'moderated_at':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DateTime),
          ) as DateTime;
          result.moderatedAt = valueDes;
          break;
        case r'content_type':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(ContentSubmissionContentTypeEnum),
          ) as ContentSubmissionContentTypeEnum;
          result.contentType = valueDes;
          break;
        case r'status':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(ContentApprovalStatus),
          ) as ContentApprovalStatus;
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
  ContentSubmission deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = ContentSubmissionBuilder();
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

class ContentSubmissionContentTypeEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'ROUTE')
  static const ContentSubmissionContentTypeEnum ROUTE = _$contentSubmissionContentTypeEnum_ROUTE;
  @BuiltValueEnumConst(wireName: r'PLACE')
  static const ContentSubmissionContentTypeEnum PLACE = _$contentSubmissionContentTypeEnum_PLACE;
  @BuiltValueEnumConst(wireName: r'REVIEW')
  static const ContentSubmissionContentTypeEnum REVIEW = _$contentSubmissionContentTypeEnum_REVIEW;

  static Serializer<ContentSubmissionContentTypeEnum> get serializer => _$contentSubmissionContentTypeEnumSerializer;

  const ContentSubmissionContentTypeEnum._(String name): super(name);

  static BuiltSet<ContentSubmissionContentTypeEnum> get values => _$contentSubmissionContentTypeEnumValues;
  static ContentSubmissionContentTypeEnum valueOf(String name) => _$contentSubmissionContentTypeEnumValueOf(name);
}

