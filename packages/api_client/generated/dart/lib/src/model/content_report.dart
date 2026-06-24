//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:bike_local_generated_api_client/src/model/entity_base.dart';
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'content_report.g.dart';

/// ContentReport
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
/// * [reportedByUserId] 
/// * [reason] 
/// * [notes] 
@BuiltValue()
abstract class ContentReport implements EntityBase, Built<ContentReport, ContentReportBuilder> {
  @BuiltValueField(wireName: r'reason')
  ContentReportReasonEnum get reason;
  // enum reasonEnum {  UNSAFE,  WRONG,  OUTDATED,  ABUSE,  OTHER,  };

  @BuiltValueField(wireName: r'notes')
  String? get notes;

  @BuiltValueField(wireName: r'content_id')
  String get contentId;

  @BuiltValueField(wireName: r'content_type')
  ContentReportContentTypeEnum get contentType;
  // enum contentTypeEnum {  ROUTE,  PLACE,  REVIEW,  };

  @BuiltValueField(wireName: r'reported_by_user_id')
  String get reportedByUserId;

  ContentReport._();

  factory ContentReport([void updates(ContentReportBuilder b)]) = _$ContentReport;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(ContentReportBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<ContentReport> get serializer => _$ContentReportSerializer();
}

class _$ContentReportSerializer implements PrimitiveSerializer<ContentReport> {
  @override
  final Iterable<Type> types = const [ContentReport, _$ContentReport];

  @override
  final String wireName = r'ContentReport';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    ContentReport object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'reason';
    yield serializers.serialize(
      object.reason,
      specifiedType: const FullType(ContentReportReasonEnum),
    );
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
    yield r'content_id';
    yield serializers.serialize(
      object.contentId,
      specifiedType: const FullType(String),
    );
    yield r'version';
    yield serializers.serialize(
      object.version,
      specifiedType: const FullType(int),
    );
    yield r'reported_by_user_id';
    yield serializers.serialize(
      object.reportedByUserId,
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
    yield r'content_type';
    yield serializers.serialize(
      object.contentType,
      specifiedType: const FullType(ContentReportContentTypeEnum),
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
    ContentReport object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required ContentReportBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'reason':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(ContentReportReasonEnum),
          ) as ContentReportReasonEnum;
          result.reason = valueDes;
          break;
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
        case r'content_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.contentId = valueDes;
          break;
        case r'version':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.version = valueDes;
          break;
        case r'reported_by_user_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.reportedByUserId = valueDes;
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
        case r'content_type':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(ContentReportContentTypeEnum),
          ) as ContentReportContentTypeEnum;
          result.contentType = valueDes;
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
  ContentReport deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = ContentReportBuilder();
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

class ContentReportContentTypeEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'ROUTE')
  static const ContentReportContentTypeEnum ROUTE = _$contentReportContentTypeEnum_ROUTE;
  @BuiltValueEnumConst(wireName: r'PLACE')
  static const ContentReportContentTypeEnum PLACE = _$contentReportContentTypeEnum_PLACE;
  @BuiltValueEnumConst(wireName: r'REVIEW')
  static const ContentReportContentTypeEnum REVIEW = _$contentReportContentTypeEnum_REVIEW;

  static Serializer<ContentReportContentTypeEnum> get serializer => _$contentReportContentTypeEnumSerializer;

  const ContentReportContentTypeEnum._(String name): super(name);

  static BuiltSet<ContentReportContentTypeEnum> get values => _$contentReportContentTypeEnumValues;
  static ContentReportContentTypeEnum valueOf(String name) => _$contentReportContentTypeEnumValueOf(name);
}

class ContentReportReasonEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'UNSAFE')
  static const ContentReportReasonEnum UNSAFE = _$contentReportReasonEnum_UNSAFE;
  @BuiltValueEnumConst(wireName: r'WRONG')
  static const ContentReportReasonEnum WRONG = _$contentReportReasonEnum_WRONG;
  @BuiltValueEnumConst(wireName: r'OUTDATED')
  static const ContentReportReasonEnum OUTDATED = _$contentReportReasonEnum_OUTDATED;
  @BuiltValueEnumConst(wireName: r'ABUSE')
  static const ContentReportReasonEnum ABUSE = _$contentReportReasonEnum_ABUSE;
  @BuiltValueEnumConst(wireName: r'OTHER')
  static const ContentReportReasonEnum OTHER = _$contentReportReasonEnum_OTHER;

  static Serializer<ContentReportReasonEnum> get serializer => _$contentReportReasonEnumSerializer;

  const ContentReportReasonEnum._(String name): super(name);

  static BuiltSet<ContentReportReasonEnum> get values => _$contentReportReasonEnumValues;
  static ContentReportReasonEnum valueOf(String name) => _$contentReportReasonEnumValueOf(name);
}

