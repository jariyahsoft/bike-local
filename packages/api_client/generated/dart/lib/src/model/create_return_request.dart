//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:bike_local_generated_api_client/src/model/location.dart';
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'create_return_request.g.dart';

/// CreateReturnRequest
///
/// Properties:
/// * [bookingId]
/// * [returnType]
/// * [returnPointId]
/// * [evidenceImageRefs]
/// * [location]
/// * [notes]
@BuiltValue()
abstract class CreateReturnRequest implements Built<CreateReturnRequest, CreateReturnRequestBuilder> {
  @BuiltValueField(wireName: r'booking_id')
  String get bookingId;

  @BuiltValueField(wireName: r'return_type')
  CreateReturnRequestReturnTypeEnum get returnType;
  // enum returnTypeEnum {  STORE,  DEFINED_POINT,  STAFF_PICKUP,  };

  @BuiltValueField(wireName: r'return_point_id')
  String? get returnPointId;

  @BuiltValueField(wireName: r'evidence_image_refs')
  BuiltList<String> get evidenceImageRefs;

  @BuiltValueField(wireName: r'location')
  Location get location;

  @BuiltValueField(wireName: r'notes')
  String? get notes;

  CreateReturnRequest._();

  factory CreateReturnRequest([void updates(CreateReturnRequestBuilder b)]) = _$CreateReturnRequest;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(CreateReturnRequestBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<CreateReturnRequest> get serializer => _$CreateReturnRequestSerializer();
}

class _$CreateReturnRequestSerializer implements PrimitiveSerializer<CreateReturnRequest> {
  @override
  final Iterable<Type> types = const [CreateReturnRequest, _$CreateReturnRequest];

  @override
  final String wireName = r'CreateReturnRequest';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    CreateReturnRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'booking_id';
    yield serializers.serialize(
      object.bookingId,
      specifiedType: const FullType(String),
    );
    yield r'return_type';
    yield serializers.serialize(
      object.returnType,
      specifiedType: const FullType(CreateReturnRequestReturnTypeEnum),
    );
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
    yield r'location';
    yield serializers.serialize(
      object.location,
      specifiedType: const FullType(Location),
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
    CreateReturnRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required CreateReturnRequestBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'booking_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.bookingId = valueDes;
          break;
        case r'return_type':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(CreateReturnRequestReturnTypeEnum),
          ) as CreateReturnRequestReturnTypeEnum;
          result.returnType = valueDes;
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
        case r'location':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(Location),
          ) as Location;
          result.location.replace(valueDes);
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
  CreateReturnRequest deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = CreateReturnRequestBuilder();
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

class CreateReturnRequestReturnTypeEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'STORE')
  static const CreateReturnRequestReturnTypeEnum STORE = _$createReturnRequestReturnTypeEnum_STORE;
  @BuiltValueEnumConst(wireName: r'DEFINED_POINT')
  static const CreateReturnRequestReturnTypeEnum DEFINED_POINT = _$createReturnRequestReturnTypeEnum_DEFINED_POINT;
  @BuiltValueEnumConst(wireName: r'STAFF_PICKUP')
  static const CreateReturnRequestReturnTypeEnum STAFF_PICKUP = _$createReturnRequestReturnTypeEnum_STAFF_PICKUP;

  static Serializer<CreateReturnRequestReturnTypeEnum> get serializer => _$createReturnRequestReturnTypeEnumSerializer;

  const CreateReturnRequestReturnTypeEnum._(String name): super(name);

  static BuiltSet<CreateReturnRequestReturnTypeEnum> get values => _$createReturnRequestReturnTypeEnumValues;
  static CreateReturnRequestReturnTypeEnum valueOf(String name) => _$createReturnRequestReturnTypeEnumValueOf(name);
}
