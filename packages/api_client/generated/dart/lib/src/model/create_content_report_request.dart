//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'create_content_report_request.g.dart';

/// CreateContentReportRequest
///
/// Properties:
/// * [contentType] 
/// * [contentId] 
/// * [reason] 
/// * [notes] 
@BuiltValue()
abstract class CreateContentReportRequest implements Built<CreateContentReportRequest, CreateContentReportRequestBuilder> {
  @BuiltValueField(wireName: r'content_type')
  CreateContentReportRequestContentTypeEnum get contentType;
  // enum contentTypeEnum {  ROUTE,  PLACE,  REVIEW,  };

  @BuiltValueField(wireName: r'content_id')
  String get contentId;

  @BuiltValueField(wireName: r'reason')
  CreateContentReportRequestReasonEnum get reason;
  // enum reasonEnum {  UNSAFE,  WRONG,  OUTDATED,  ABUSE,  OTHER,  };

  @BuiltValueField(wireName: r'notes')
  String? get notes;

  CreateContentReportRequest._();

  factory CreateContentReportRequest([void updates(CreateContentReportRequestBuilder b)]) = _$CreateContentReportRequest;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(CreateContentReportRequestBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<CreateContentReportRequest> get serializer => _$CreateContentReportRequestSerializer();
}

class _$CreateContentReportRequestSerializer implements PrimitiveSerializer<CreateContentReportRequest> {
  @override
  final Iterable<Type> types = const [CreateContentReportRequest, _$CreateContentReportRequest];

  @override
  final String wireName = r'CreateContentReportRequest';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    CreateContentReportRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'content_type';
    yield serializers.serialize(
      object.contentType,
      specifiedType: const FullType(CreateContentReportRequestContentTypeEnum),
    );
    yield r'content_id';
    yield serializers.serialize(
      object.contentId,
      specifiedType: const FullType(String),
    );
    yield r'reason';
    yield serializers.serialize(
      object.reason,
      specifiedType: const FullType(CreateContentReportRequestReasonEnum),
    );
    if (object.notes != null) {
      yield r'notes';
      yield serializers.serialize(
        object.notes,
        specifiedType: const FullType(String),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    CreateContentReportRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required CreateContentReportRequestBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'content_type':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(CreateContentReportRequestContentTypeEnum),
          ) as CreateContentReportRequestContentTypeEnum;
          result.contentType = valueDes;
          break;
        case r'content_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.contentId = valueDes;
          break;
        case r'reason':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(CreateContentReportRequestReasonEnum),
          ) as CreateContentReportRequestReasonEnum;
          result.reason = valueDes;
          break;
        case r'notes':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.notes = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  CreateContentReportRequest deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = CreateContentReportRequestBuilder();
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

class CreateContentReportRequestContentTypeEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'ROUTE')
  static const CreateContentReportRequestContentTypeEnum ROUTE = _$createContentReportRequestContentTypeEnum_ROUTE;
  @BuiltValueEnumConst(wireName: r'PLACE')
  static const CreateContentReportRequestContentTypeEnum PLACE = _$createContentReportRequestContentTypeEnum_PLACE;
  @BuiltValueEnumConst(wireName: r'REVIEW')
  static const CreateContentReportRequestContentTypeEnum REVIEW = _$createContentReportRequestContentTypeEnum_REVIEW;

  static Serializer<CreateContentReportRequestContentTypeEnum> get serializer => _$createContentReportRequestContentTypeEnumSerializer;

  const CreateContentReportRequestContentTypeEnum._(String name): super(name);

  static BuiltSet<CreateContentReportRequestContentTypeEnum> get values => _$createContentReportRequestContentTypeEnumValues;
  static CreateContentReportRequestContentTypeEnum valueOf(String name) => _$createContentReportRequestContentTypeEnumValueOf(name);
}

class CreateContentReportRequestReasonEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'UNSAFE')
  static const CreateContentReportRequestReasonEnum UNSAFE = _$createContentReportRequestReasonEnum_UNSAFE;
  @BuiltValueEnumConst(wireName: r'WRONG')
  static const CreateContentReportRequestReasonEnum WRONG = _$createContentReportRequestReasonEnum_WRONG;
  @BuiltValueEnumConst(wireName: r'OUTDATED')
  static const CreateContentReportRequestReasonEnum OUTDATED = _$createContentReportRequestReasonEnum_OUTDATED;
  @BuiltValueEnumConst(wireName: r'ABUSE')
  static const CreateContentReportRequestReasonEnum ABUSE = _$createContentReportRequestReasonEnum_ABUSE;
  @BuiltValueEnumConst(wireName: r'OTHER')
  static const CreateContentReportRequestReasonEnum OTHER = _$createContentReportRequestReasonEnum_OTHER;

  static Serializer<CreateContentReportRequestReasonEnum> get serializer => _$createContentReportRequestReasonEnumSerializer;

  const CreateContentReportRequestReasonEnum._(String name): super(name);

  static BuiltSet<CreateContentReportRequestReasonEnum> get values => _$createContentReportRequestReasonEnumValues;
  static CreateContentReportRequestReasonEnum valueOf(String name) => _$createContentReportRequestReasonEnumValueOf(name);
}

