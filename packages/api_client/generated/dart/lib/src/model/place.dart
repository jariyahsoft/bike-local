//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:bike_local_generated_api_client/src/model/entity_base.dart';
import 'package:bike_local_generated_api_client/src/model/location.dart';
import 'package:built_collection/built_collection.dart';
import 'package:bike_local_generated_api_client/src/model/content_approval_status.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'place.g.dart';

/// Place
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
/// * [name] 
/// * [placeType] 
/// * [location] 
/// * [status] 
@BuiltValue()
abstract class Place implements EntityBase, Built<Place, PlaceBuilder> {
  @BuiltValueField(wireName: r'place_type')
  PlacePlaceTypeEnum get placeType;
  // enum placeTypeEnum {  CHECK_IN,  VIEWPOINT,  CAFE,  RESTAURANT,  REPAIR_POINT,  WATER_POINT,  TOILET,  HAZARD,  TOURIST_ATTRACTION,  };

  @BuiltValueField(wireName: r'name')
  String get name;

  @BuiltValueField(wireName: r'location')
  Location get location;

  @BuiltValueField(wireName: r'status')
  ContentApprovalStatus get status;
  // enum statusEnum {  DRAFT,  SUBMITTED,  UNDER_REVIEW,  REVISION_REQUIRED,  APPROVED,  REJECTED,  SUSPENDED,  OUTDATED,  };

  Place._();

  factory Place([void updates(PlaceBuilder b)]) = _$Place;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(PlaceBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<Place> get serializer => _$PlaceSerializer();
}

class _$PlaceSerializer implements PrimitiveSerializer<Place> {
  @override
  final Iterable<Type> types = const [Place, _$Place];

  @override
  final String wireName = r'Place';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    Place object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
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
    yield r'version';
    yield serializers.serialize(
      object.version,
      specifiedType: const FullType(int),
    );
    yield r'created_at';
    yield serializers.serialize(
      object.createdAt,
      specifiedType: const FullType(DateTime),
    );
    yield r'place_type';
    yield serializers.serialize(
      object.placeType,
      specifiedType: const FullType(PlacePlaceTypeEnum),
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
    yield r'name';
    yield serializers.serialize(
      object.name,
      specifiedType: const FullType(String),
    );
    if (object.tenantId != null) {
      yield r'tenant_id';
      yield serializers.serialize(
        object.tenantId,
        specifiedType: const FullType(String),
      );
    }
    yield r'location';
    yield serializers.serialize(
      object.location,
      specifiedType: const FullType(Location),
    );
    yield r'id';
    yield serializers.serialize(
      object.id,
      specifiedType: const FullType(String),
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
    Place object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required PlaceBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
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
        case r'version':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.version = valueDes;
          break;
        case r'created_at':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DateTime),
          ) as DateTime;
          result.createdAt = valueDes;
          break;
        case r'place_type':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(PlacePlaceTypeEnum),
          ) as PlacePlaceTypeEnum;
          result.placeType = valueDes;
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
        case r'name':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.name = valueDes;
          break;
        case r'tenant_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.tenantId = valueDes;
          break;
        case r'location':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(Location),
          ) as Location;
          result.location.replace(valueDes);
          break;
        case r'id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.id = valueDes;
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
  Place deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = PlaceBuilder();
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

class PlacePlaceTypeEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'CHECK_IN')
  static const PlacePlaceTypeEnum CHECK_IN = _$placePlaceTypeEnum_CHECK_IN;
  @BuiltValueEnumConst(wireName: r'VIEWPOINT')
  static const PlacePlaceTypeEnum VIEWPOINT = _$placePlaceTypeEnum_VIEWPOINT;
  @BuiltValueEnumConst(wireName: r'CAFE')
  static const PlacePlaceTypeEnum CAFE = _$placePlaceTypeEnum_CAFE;
  @BuiltValueEnumConst(wireName: r'RESTAURANT')
  static const PlacePlaceTypeEnum RESTAURANT = _$placePlaceTypeEnum_RESTAURANT;
  @BuiltValueEnumConst(wireName: r'REPAIR_POINT')
  static const PlacePlaceTypeEnum REPAIR_POINT = _$placePlaceTypeEnum_REPAIR_POINT;
  @BuiltValueEnumConst(wireName: r'WATER_POINT')
  static const PlacePlaceTypeEnum WATER_POINT = _$placePlaceTypeEnum_WATER_POINT;
  @BuiltValueEnumConst(wireName: r'TOILET')
  static const PlacePlaceTypeEnum TOILET = _$placePlaceTypeEnum_TOILET;
  @BuiltValueEnumConst(wireName: r'HAZARD')
  static const PlacePlaceTypeEnum HAZARD = _$placePlaceTypeEnum_HAZARD;
  @BuiltValueEnumConst(wireName: r'TOURIST_ATTRACTION')
  static const PlacePlaceTypeEnum TOURIST_ATTRACTION = _$placePlaceTypeEnum_TOURIST_ATTRACTION;

  static Serializer<PlacePlaceTypeEnum> get serializer => _$placePlaceTypeEnumSerializer;

  const PlacePlaceTypeEnum._(String name): super(name);

  static BuiltSet<PlacePlaceTypeEnum> get values => _$placePlaceTypeEnumValues;
  static PlacePlaceTypeEnum valueOf(String name) => _$placePlaceTypeEnumValueOf(name);
}

