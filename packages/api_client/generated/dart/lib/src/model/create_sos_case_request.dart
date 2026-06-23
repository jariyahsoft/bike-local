//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:bike_local_generated_api_client/src/model/location.dart';
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'create_sos_case_request.g.dart';

/// CreateSosCaseRequest
///
/// Properties:
/// * [bookingId]
/// * [rentalId]
/// * [assetId]
/// * [phone]
/// * [location]
/// * [issueType]
@BuiltValue()
abstract class CreateSosCaseRequest implements Built<CreateSosCaseRequest, CreateSosCaseRequestBuilder> {
  @BuiltValueField(wireName: r'booking_id')
  String get bookingId;

  @BuiltValueField(wireName: r'rental_id')
  String get rentalId;

  @BuiltValueField(wireName: r'asset_id')
  String get assetId;

  @BuiltValueField(wireName: r'phone')
  String get phone;

  @BuiltValueField(wireName: r'location')
  Location get location;

  @BuiltValueField(wireName: r'issue_type')
  CreateSosCaseRequestIssueTypeEnum get issueType;
  // enum issueTypeEnum {  BIKE_BROKEN,  FLAT_TIRE,  ACCIDENT,  LOST,  HEALTH,  UNSAFE,  OTHER,  };

  CreateSosCaseRequest._();

  factory CreateSosCaseRequest([void updates(CreateSosCaseRequestBuilder b)]) = _$CreateSosCaseRequest;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(CreateSosCaseRequestBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<CreateSosCaseRequest> get serializer => _$CreateSosCaseRequestSerializer();
}

class _$CreateSosCaseRequestSerializer implements PrimitiveSerializer<CreateSosCaseRequest> {
  @override
  final Iterable<Type> types = const [CreateSosCaseRequest, _$CreateSosCaseRequest];

  @override
  final String wireName = r'CreateSosCaseRequest';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    CreateSosCaseRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'booking_id';
    yield serializers.serialize(
      object.bookingId,
      specifiedType: const FullType(String),
    );
    yield r'rental_id';
    yield serializers.serialize(
      object.rentalId,
      specifiedType: const FullType(String),
    );
    yield r'asset_id';
    yield serializers.serialize(
      object.assetId,
      specifiedType: const FullType(String),
    );
    yield r'phone';
    yield serializers.serialize(
      object.phone,
      specifiedType: const FullType(String),
    );
    yield r'location';
    yield serializers.serialize(
      object.location,
      specifiedType: const FullType(Location),
    );
    yield r'issue_type';
    yield serializers.serialize(
      object.issueType,
      specifiedType: const FullType(CreateSosCaseRequestIssueTypeEnum),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    CreateSosCaseRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required CreateSosCaseRequestBuilder result,
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
        case r'rental_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.rentalId = valueDes;
          break;
        case r'asset_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.assetId = valueDes;
          break;
        case r'phone':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.phone = valueDes;
          break;
        case r'location':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(Location),
          ) as Location;
          result.location.replace(valueDes);
          break;
        case r'issue_type':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(CreateSosCaseRequestIssueTypeEnum),
          ) as CreateSosCaseRequestIssueTypeEnum;
          result.issueType = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  CreateSosCaseRequest deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = CreateSosCaseRequestBuilder();
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

class CreateSosCaseRequestIssueTypeEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'BIKE_BROKEN')
  static const CreateSosCaseRequestIssueTypeEnum BIKE_BROKEN = _$createSosCaseRequestIssueTypeEnum_BIKE_BROKEN;
  @BuiltValueEnumConst(wireName: r'FLAT_TIRE')
  static const CreateSosCaseRequestIssueTypeEnum FLAT_TIRE = _$createSosCaseRequestIssueTypeEnum_FLAT_TIRE;
  @BuiltValueEnumConst(wireName: r'ACCIDENT')
  static const CreateSosCaseRequestIssueTypeEnum ACCIDENT = _$createSosCaseRequestIssueTypeEnum_ACCIDENT;
  @BuiltValueEnumConst(wireName: r'LOST')
  static const CreateSosCaseRequestIssueTypeEnum LOST = _$createSosCaseRequestIssueTypeEnum_LOST;
  @BuiltValueEnumConst(wireName: r'HEALTH')
  static const CreateSosCaseRequestIssueTypeEnum HEALTH = _$createSosCaseRequestIssueTypeEnum_HEALTH;
  @BuiltValueEnumConst(wireName: r'UNSAFE')
  static const CreateSosCaseRequestIssueTypeEnum UNSAFE = _$createSosCaseRequestIssueTypeEnum_UNSAFE;
  @BuiltValueEnumConst(wireName: r'OTHER')
  static const CreateSosCaseRequestIssueTypeEnum OTHER = _$createSosCaseRequestIssueTypeEnum_OTHER;

  static Serializer<CreateSosCaseRequestIssueTypeEnum> get serializer => _$createSosCaseRequestIssueTypeEnumSerializer;

  const CreateSosCaseRequestIssueTypeEnum._(String name): super(name);

  static BuiltSet<CreateSosCaseRequestIssueTypeEnum> get values => _$createSosCaseRequestIssueTypeEnumValues;
  static CreateSosCaseRequestIssueTypeEnum valueOf(String name) => _$createSosCaseRequestIssueTypeEnumValueOf(name);
}
