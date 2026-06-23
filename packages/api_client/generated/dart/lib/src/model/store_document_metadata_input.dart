//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'store_document_metadata_input.g.dart';

/// StoreDocumentMetadataInput
///
/// Properties:
/// * [type]
/// * [storageObjectRef]
/// * [fileName]
/// * [contentType]
/// * [sizeBytes]
@BuiltValue()
abstract class StoreDocumentMetadataInput implements Built<StoreDocumentMetadataInput, StoreDocumentMetadataInputBuilder> {
  @BuiltValueField(wireName: r'type')
  StoreDocumentMetadataInputTypeEnum get type;
  // enum typeEnum {  BUSINESS_REGISTRATION,  TAX_DOCUMENT,  OWNER_IDENTITY,  STORE_PHOTO,  OTHER,  };

  @BuiltValueField(wireName: r'storage_object_ref')
  String get storageObjectRef;

  @BuiltValueField(wireName: r'file_name')
  String get fileName;

  @BuiltValueField(wireName: r'content_type')
  String get contentType;

  @BuiltValueField(wireName: r'size_bytes')
  int get sizeBytes;

  StoreDocumentMetadataInput._();

  factory StoreDocumentMetadataInput([void updates(StoreDocumentMetadataInputBuilder b)]) = _$StoreDocumentMetadataInput;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(StoreDocumentMetadataInputBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<StoreDocumentMetadataInput> get serializer => _$StoreDocumentMetadataInputSerializer();
}

class _$StoreDocumentMetadataInputSerializer implements PrimitiveSerializer<StoreDocumentMetadataInput> {
  @override
  final Iterable<Type> types = const [StoreDocumentMetadataInput, _$StoreDocumentMetadataInput];

  @override
  final String wireName = r'StoreDocumentMetadataInput';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    StoreDocumentMetadataInput object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'type';
    yield serializers.serialize(
      object.type,
      specifiedType: const FullType(StoreDocumentMetadataInputTypeEnum),
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
  }

  @override
  Object serialize(
    Serializers serializers,
    StoreDocumentMetadataInput object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required StoreDocumentMetadataInputBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'type':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(StoreDocumentMetadataInputTypeEnum),
          ) as StoreDocumentMetadataInputTypeEnum;
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
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  StoreDocumentMetadataInput deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = StoreDocumentMetadataInputBuilder();
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

class StoreDocumentMetadataInputTypeEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'BUSINESS_REGISTRATION')
  static const StoreDocumentMetadataInputTypeEnum BUSINESS_REGISTRATION = _$storeDocumentMetadataInputTypeEnum_BUSINESS_REGISTRATION;
  @BuiltValueEnumConst(wireName: r'TAX_DOCUMENT')
  static const StoreDocumentMetadataInputTypeEnum TAX_DOCUMENT = _$storeDocumentMetadataInputTypeEnum_TAX_DOCUMENT;
  @BuiltValueEnumConst(wireName: r'OWNER_IDENTITY')
  static const StoreDocumentMetadataInputTypeEnum OWNER_IDENTITY = _$storeDocumentMetadataInputTypeEnum_OWNER_IDENTITY;
  @BuiltValueEnumConst(wireName: r'STORE_PHOTO')
  static const StoreDocumentMetadataInputTypeEnum STORE_PHOTO = _$storeDocumentMetadataInputTypeEnum_STORE_PHOTO;
  @BuiltValueEnumConst(wireName: r'OTHER')
  static const StoreDocumentMetadataInputTypeEnum OTHER = _$storeDocumentMetadataInputTypeEnum_OTHER;

  static Serializer<StoreDocumentMetadataInputTypeEnum> get serializer => _$storeDocumentMetadataInputTypeEnumSerializer;

  const StoreDocumentMetadataInputTypeEnum._(String name): super(name);

  static BuiltSet<StoreDocumentMetadataInputTypeEnum> get values => _$storeDocumentMetadataInputTypeEnumValues;
  static StoreDocumentMetadataInputTypeEnum valueOf(String name) => _$storeDocumentMetadataInputTypeEnumValueOf(name);
}
