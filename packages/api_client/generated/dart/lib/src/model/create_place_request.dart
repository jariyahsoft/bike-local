//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:bike_local_generated_api_client/src/model/location.dart';
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'create_place_request.g.dart';

/// CreatePlaceRequest
///
/// Properties:
/// * [storeId] 
/// * [branchId] 
/// * [name] 
/// * [placeType] 
/// * [location] 
@BuiltValue()
abstract class CreatePlaceRequest implements Built<CreatePlaceRequest, CreatePlaceRequestBuilder> {
  @BuiltValueField(wireName: r'store_id')
  String get storeId;

  @BuiltValueField(wireName: r'branch_id')
  String? get branchId;

  @BuiltValueField(wireName: r'name')
  String get name;

  @BuiltValueField(wireName: r'place_type')
  CreatePlaceRequestPlaceTypeEnum get placeType;
  // enum placeTypeEnum {  CHECK_IN,  VIEWPOINT,  CAFE,  RESTAURANT,  REPAIR_POINT,  WATER_POINT,  TOILET,  HAZARD,  TOURIST_ATTRACTION,  };

  @BuiltValueField(wireName: r'location')
  Location get location;

  CreatePlaceRequest._();

  factory CreatePlaceRequest([void updates(CreatePlaceRequestBuilder b)]) = _$CreatePlaceRequest;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(CreatePlaceRequestBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<CreatePlaceRequest> get serializer => _$CreatePlaceRequestSerializer();
}

class _$CreatePlaceRequestSerializer implements PrimitiveSerializer<CreatePlaceRequest> {
  @override
  final Iterable<Type> types = const [CreatePlaceRequest, _$CreatePlaceRequest];

  @override
  final String wireName = r'CreatePlaceRequest';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    CreatePlaceRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'store_id';
    yield serializers.serialize(
      object.storeId,
      specifiedType: const FullType(String),
    );
    if (object.branchId != null) {
      yield r'branch_id';
      yield serializers.serialize(
        object.branchId,
        specifiedType: const FullType(String),
      );
    }
    yield r'name';
    yield serializers.serialize(
      object.name,
      specifiedType: const FullType(String),
    );
    yield r'place_type';
    yield serializers.serialize(
      object.placeType,
      specifiedType: const FullType(CreatePlaceRequestPlaceTypeEnum),
    );
    yield r'location';
    yield serializers.serialize(
      object.location,
      specifiedType: const FullType(Location),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    CreatePlaceRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required CreatePlaceRequestBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'store_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.storeId = valueDes;
          break;
        case r'branch_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.branchId = valueDes;
          break;
        case r'name':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.name = valueDes;
          break;
        case r'place_type':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(CreatePlaceRequestPlaceTypeEnum),
          ) as CreatePlaceRequestPlaceTypeEnum;
          result.placeType = valueDes;
          break;
        case r'location':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(Location),
          ) as Location;
          result.location.replace(valueDes);
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  CreatePlaceRequest deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = CreatePlaceRequestBuilder();
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

class CreatePlaceRequestPlaceTypeEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'CHECK_IN')
  static const CreatePlaceRequestPlaceTypeEnum CHECK_IN = _$createPlaceRequestPlaceTypeEnum_CHECK_IN;
  @BuiltValueEnumConst(wireName: r'VIEWPOINT')
  static const CreatePlaceRequestPlaceTypeEnum VIEWPOINT = _$createPlaceRequestPlaceTypeEnum_VIEWPOINT;
  @BuiltValueEnumConst(wireName: r'CAFE')
  static const CreatePlaceRequestPlaceTypeEnum CAFE = _$createPlaceRequestPlaceTypeEnum_CAFE;
  @BuiltValueEnumConst(wireName: r'RESTAURANT')
  static const CreatePlaceRequestPlaceTypeEnum RESTAURANT = _$createPlaceRequestPlaceTypeEnum_RESTAURANT;
  @BuiltValueEnumConst(wireName: r'REPAIR_POINT')
  static const CreatePlaceRequestPlaceTypeEnum REPAIR_POINT = _$createPlaceRequestPlaceTypeEnum_REPAIR_POINT;
  @BuiltValueEnumConst(wireName: r'WATER_POINT')
  static const CreatePlaceRequestPlaceTypeEnum WATER_POINT = _$createPlaceRequestPlaceTypeEnum_WATER_POINT;
  @BuiltValueEnumConst(wireName: r'TOILET')
  static const CreatePlaceRequestPlaceTypeEnum TOILET = _$createPlaceRequestPlaceTypeEnum_TOILET;
  @BuiltValueEnumConst(wireName: r'HAZARD')
  static const CreatePlaceRequestPlaceTypeEnum HAZARD = _$createPlaceRequestPlaceTypeEnum_HAZARD;
  @BuiltValueEnumConst(wireName: r'TOURIST_ATTRACTION')
  static const CreatePlaceRequestPlaceTypeEnum TOURIST_ATTRACTION = _$createPlaceRequestPlaceTypeEnum_TOURIST_ATTRACTION;

  static Serializer<CreatePlaceRequestPlaceTypeEnum> get serializer => _$createPlaceRequestPlaceTypeEnumSerializer;

  const CreatePlaceRequestPlaceTypeEnum._(String name): super(name);

  static BuiltSet<CreatePlaceRequestPlaceTypeEnum> get values => _$createPlaceRequestPlaceTypeEnumValues;
  static CreatePlaceRequestPlaceTypeEnum valueOf(String name) => _$createPlaceRequestPlaceTypeEnumValueOf(name);
}

