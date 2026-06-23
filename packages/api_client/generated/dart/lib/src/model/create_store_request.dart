//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:bike_local_generated_api_client/src/model/store_document_metadata_input.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'create_store_request.g.dart';

/// CreateStoreRequest
///
/// Properties:
/// * [legalName]
/// * [displayName]
/// * [defaultCurrency]
/// * [timezone]
/// * [phone]
/// * [email]
/// * [description]
/// * [documents]
@BuiltValue()
abstract class CreateStoreRequest implements Built<CreateStoreRequest, CreateStoreRequestBuilder> {
  @BuiltValueField(wireName: r'legal_name')
  String get legalName;

  @BuiltValueField(wireName: r'display_name')
  String get displayName;

  @BuiltValueField(wireName: r'default_currency')
  String get defaultCurrency;

  @BuiltValueField(wireName: r'timezone')
  String get timezone;

  @BuiltValueField(wireName: r'phone')
  String? get phone;

  @BuiltValueField(wireName: r'email')
  String? get email;

  @BuiltValueField(wireName: r'description')
  String? get description;

  @BuiltValueField(wireName: r'documents')
  BuiltList<StoreDocumentMetadataInput>? get documents;

  CreateStoreRequest._();

  factory CreateStoreRequest([void updates(CreateStoreRequestBuilder b)]) = _$CreateStoreRequest;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(CreateStoreRequestBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<CreateStoreRequest> get serializer => _$CreateStoreRequestSerializer();
}

class _$CreateStoreRequestSerializer implements PrimitiveSerializer<CreateStoreRequest> {
  @override
  final Iterable<Type> types = const [CreateStoreRequest, _$CreateStoreRequest];

  @override
  final String wireName = r'CreateStoreRequest';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    CreateStoreRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'legal_name';
    yield serializers.serialize(
      object.legalName,
      specifiedType: const FullType(String),
    );
    yield r'display_name';
    yield serializers.serialize(
      object.displayName,
      specifiedType: const FullType(String),
    );
    yield r'default_currency';
    yield serializers.serialize(
      object.defaultCurrency,
      specifiedType: const FullType(String),
    );
    yield r'timezone';
    yield serializers.serialize(
      object.timezone,
      specifiedType: const FullType(String),
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
    if (object.description != null) {
      yield r'description';
      yield serializers.serialize(
        object.description,
        specifiedType: const FullType(String),
      );
    }
    if (object.documents != null) {
      yield r'documents';
      yield serializers.serialize(
        object.documents,
        specifiedType: const FullType(BuiltList, [FullType(StoreDocumentMetadataInput)]),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    CreateStoreRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required CreateStoreRequestBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'legal_name':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.legalName = valueDes;
          break;
        case r'display_name':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.displayName = valueDes;
          break;
        case r'default_currency':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.defaultCurrency = valueDes;
          break;
        case r'timezone':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.timezone = valueDes;
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
        case r'description':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.description = valueDes;
          break;
        case r'documents':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BuiltList, [FullType(StoreDocumentMetadataInput)]),
          ) as BuiltList<StoreDocumentMetadataInput>;
          result.documents.replace(valueDes);
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  CreateStoreRequest deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = CreateStoreRequestBuilder();
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
