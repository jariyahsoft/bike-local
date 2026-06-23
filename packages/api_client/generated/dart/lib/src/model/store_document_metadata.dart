//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'store_document_metadata.g.dart';

/// StoreDocumentMetadata
///
/// Properties:
/// * [id]
/// * [type]
/// * [storageObjectRef] - Storage object reference only; clients must not send raw document bytes through this API.
/// * [fileName]
/// * [contentType]
/// * [sizeBytes]
/// * [status]
/// * [uploadedAt]
@BuiltValue()
abstract class StoreDocumentMetadata implements Built<StoreDocumentMetadata, StoreDocumentMetadataBuilder> {
  @BuiltValueField(wireName: r'id')
  String get id;

  @BuiltValueField(wireName: r'type')
  StoreDocumentMetadataTypeEnum get type;
  // enum typeEnum {  BUSINESS_REGISTRATION,  TAX_DOCUMENT,  OWNER_IDENTITY,  STORE_PHOTO,  OTHER,  };

  /// Storage object reference only; clients must not send raw document bytes through this API.
  @BuiltValueField(wireName: r'storage_object_ref')
  String get storageObjectRef;

  @BuiltValueField(wireName: r'file_name')
  String get fileName;

  @BuiltValueField(wireName: r'content_type')
  String get contentType;

  @BuiltValueField(wireName: r'size_bytes')
  int get sizeBytes;

  @BuiltValueField(wireName: r'status')
  StoreDocumentMetadataStatusEnum get status;
  // enum statusEnum {  PENDING_REVIEW,  APPROVED,  REJECTED,  };

  @BuiltValueField(wireName: r'uploaded_at')
  DateTime get uploadedAt;

  StoreDocumentMetadata._();

  factory StoreDocumentMetadata([void updates(StoreDocumentMetadataBuilder b)]) = _$StoreDocumentMetadata;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(StoreDocumentMetadataBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<StoreDocumentMetadata> get serializer => _$StoreDocumentMetadataSerializer();
}

class _$StoreDocumentMetadataSerializer implements PrimitiveSerializer<StoreDocumentMetadata> {
  @override
  final Iterable<Type> types = const [StoreDocumentMetadata, _$StoreDocumentMetadata];

  @override
  final String wireName = r'StoreDocumentMetadata';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    StoreDocumentMetadata object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'id';
    yield serializers.serialize(
      object.id,
      specifiedType: const FullType(String),
    );
    yield r'type';
    yield serializers.serialize(
      object.type,
      specifiedType: const FullType(StoreDocumentMetadataTypeEnum),
    );
    yield r'storage_object_ref';
    yield serializers.serialize(
      object.storageObjectRef,
      specifiedType: const FullType(String),
    );
    yield r'file_name';
    yield serializers.serialize(
      object.fileName,
      specifiedType: const FullType(String),
    );
    yield r'content_type';
    yield serializers.serialize(
      object.contentType,
      specifiedType: const FullType(String),
    );
    yield r'size_bytes';
    yield serializers.serialize(
      object.sizeBytes,
      specifiedType: const FullType(int),
    );
    yield r'status';
    yield serializers.serialize(
      object.status,
      specifiedType: const FullType(StoreDocumentMetadataStatusEnum),
    );
    yield r'uploaded_at';
    yield serializers.serialize(
      object.uploadedAt,
      specifiedType: const FullType(DateTime),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    StoreDocumentMetadata object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required StoreDocumentMetadataBuilder result,
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
        case r'type':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(StoreDocumentMetadataTypeEnum),
          ) as StoreDocumentMetadataTypeEnum;
          result.type = valueDes;
          break;
        case r'storage_object_ref':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.storageObjectRef = valueDes;
          break;
        case r'file_name':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.fileName = valueDes;
          break;
        case r'content_type':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.contentType = valueDes;
          break;
        case r'size_bytes':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.sizeBytes = valueDes;
          break;
        case r'status':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(StoreDocumentMetadataStatusEnum),
          ) as StoreDocumentMetadataStatusEnum;
          result.status = valueDes;
          break;
        case r'uploaded_at':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DateTime),
          ) as DateTime;
          result.uploadedAt = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  StoreDocumentMetadata deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = StoreDocumentMetadataBuilder();
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

class StoreDocumentMetadataTypeEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'BUSINESS_REGISTRATION')
  static const StoreDocumentMetadataTypeEnum BUSINESS_REGISTRATION = _$storeDocumentMetadataTypeEnum_BUSINESS_REGISTRATION;
  @BuiltValueEnumConst(wireName: r'TAX_DOCUMENT')
  static const StoreDocumentMetadataTypeEnum TAX_DOCUMENT = _$storeDocumentMetadataTypeEnum_TAX_DOCUMENT;
  @BuiltValueEnumConst(wireName: r'OWNER_IDENTITY')
  static const StoreDocumentMetadataTypeEnum OWNER_IDENTITY = _$storeDocumentMetadataTypeEnum_OWNER_IDENTITY;
  @BuiltValueEnumConst(wireName: r'STORE_PHOTO')
  static const StoreDocumentMetadataTypeEnum STORE_PHOTO = _$storeDocumentMetadataTypeEnum_STORE_PHOTO;
  @BuiltValueEnumConst(wireName: r'OTHER')
  static const StoreDocumentMetadataTypeEnum OTHER = _$storeDocumentMetadataTypeEnum_OTHER;

  static Serializer<StoreDocumentMetadataTypeEnum> get serializer => _$storeDocumentMetadataTypeEnumSerializer;

  const StoreDocumentMetadataTypeEnum._(String name): super(name);

  static BuiltSet<StoreDocumentMetadataTypeEnum> get values => _$storeDocumentMetadataTypeEnumValues;
  static StoreDocumentMetadataTypeEnum valueOf(String name) => _$storeDocumentMetadataTypeEnumValueOf(name);
}

class StoreDocumentMetadataStatusEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'PENDING_REVIEW')
  static const StoreDocumentMetadataStatusEnum PENDING_REVIEW = _$storeDocumentMetadataStatusEnum_PENDING_REVIEW;
  @BuiltValueEnumConst(wireName: r'APPROVED')
  static const StoreDocumentMetadataStatusEnum APPROVED = _$storeDocumentMetadataStatusEnum_APPROVED;
  @BuiltValueEnumConst(wireName: r'REJECTED')
  static const StoreDocumentMetadataStatusEnum REJECTED = _$storeDocumentMetadataStatusEnum_REJECTED;

  static Serializer<StoreDocumentMetadataStatusEnum> get serializer => _$storeDocumentMetadataStatusEnumSerializer;

  const StoreDocumentMetadataStatusEnum._(String name): super(name);

  static BuiltSet<StoreDocumentMetadataStatusEnum> get values => _$storeDocumentMetadataStatusEnumValues;
  static StoreDocumentMetadataStatusEnum valueOf(String name) => _$storeDocumentMetadataStatusEnumValueOf(name);
}
