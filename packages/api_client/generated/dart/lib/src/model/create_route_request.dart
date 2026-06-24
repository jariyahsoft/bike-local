//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:bike_local_generated_api_client/src/model/location.dart';
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'create_route_request.g.dart';

/// CreateRouteRequest
///
/// Properties:
/// * [storeId] 
/// * [branchId] 
/// * [name] 
/// * [description] 
/// * [startLocation] 
/// * [endLocation] 
/// * [distanceMeters] 
/// * [difficulty] 
/// * [surface] 
/// * [warning] 
/// * [suitableBikeTypes] 
@BuiltValue()
abstract class CreateRouteRequest implements Built<CreateRouteRequest, CreateRouteRequestBuilder> {
  @BuiltValueField(wireName: r'store_id')
  String get storeId;

  @BuiltValueField(wireName: r'branch_id')
  String? get branchId;

  @BuiltValueField(wireName: r'name')
  String get name;

  @BuiltValueField(wireName: r'description')
  String get description;

  @BuiltValueField(wireName: r'start_location')
  Location get startLocation;

  @BuiltValueField(wireName: r'end_location')
  Location get endLocation;

  @BuiltValueField(wireName: r'distance_meters')
  int get distanceMeters;

  @BuiltValueField(wireName: r'difficulty')
  String get difficulty;

  @BuiltValueField(wireName: r'surface')
  String? get surface;

  @BuiltValueField(wireName: r'warning')
  String? get warning;

  @BuiltValueField(wireName: r'suitable_bike_types')
  BuiltList<String>? get suitableBikeTypes;

  CreateRouteRequest._();

  factory CreateRouteRequest([void updates(CreateRouteRequestBuilder b)]) = _$CreateRouteRequest;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(CreateRouteRequestBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<CreateRouteRequest> get serializer => _$CreateRouteRequestSerializer();
}

class _$CreateRouteRequestSerializer implements PrimitiveSerializer<CreateRouteRequest> {
  @override
  final Iterable<Type> types = const [CreateRouteRequest, _$CreateRouteRequest];

  @override
  final String wireName = r'CreateRouteRequest';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    CreateRouteRequest object, {
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
    yield r'description';
    yield serializers.serialize(
      object.description,
      specifiedType: const FullType(String),
    );
    yield r'start_location';
    yield serializers.serialize(
      object.startLocation,
      specifiedType: const FullType(Location),
    );
    yield r'end_location';
    yield serializers.serialize(
      object.endLocation,
      specifiedType: const FullType(Location),
    );
    yield r'distance_meters';
    yield serializers.serialize(
      object.distanceMeters,
      specifiedType: const FullType(int),
    );
    yield r'difficulty';
    yield serializers.serialize(
      object.difficulty,
      specifiedType: const FullType(String),
    );
    if (object.surface != null) {
      yield r'surface';
      yield serializers.serialize(
        object.surface,
        specifiedType: const FullType(String),
      );
    }
    if (object.warning != null) {
      yield r'warning';
      yield serializers.serialize(
        object.warning,
        specifiedType: const FullType(String),
      );
    }
    if (object.suitableBikeTypes != null) {
      yield r'suitable_bike_types';
      yield serializers.serialize(
        object.suitableBikeTypes,
        specifiedType: const FullType(BuiltList, [FullType(String)]),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    CreateRouteRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required CreateRouteRequestBuilder result,
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
        case r'description':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.description = valueDes;
          break;
        case r'start_location':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(Location),
          ) as Location;
          result.startLocation.replace(valueDes);
          break;
        case r'end_location':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(Location),
          ) as Location;
          result.endLocation.replace(valueDes);
          break;
        case r'distance_meters':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.distanceMeters = valueDes;
          break;
        case r'difficulty':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.difficulty = valueDes;
          break;
        case r'surface':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.surface = valueDes;
          break;
        case r'warning':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.warning = valueDes;
          break;
        case r'suitable_bike_types':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BuiltList, [FullType(String)]),
          ) as BuiltList<String>;
          result.suitableBikeTypes.replace(valueDes);
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  CreateRouteRequest deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = CreateRouteRequestBuilder();
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

