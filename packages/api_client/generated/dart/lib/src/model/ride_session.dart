//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:bike_local_generated_api_client/src/model/entity_base.dart';
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'ride_session.g.dart';

/// RideSession
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
/// * [bookingId]
/// * [userId]
/// * [status]
/// * [startedAt]
/// * [endedAt]
/// * [distanceMeters]
/// * [gpsGapCount]
@BuiltValue()
abstract class RideSession implements EntityBase, Built<RideSession, RideSessionBuilder> {
  @BuiltValueField(wireName: r'distance_meters')
  int? get distanceMeters;

  @BuiltValueField(wireName: r'gps_gap_count')
  int? get gpsGapCount;

  @BuiltValueField(wireName: r'ended_at')
  DateTime? get endedAt;

  @BuiltValueField(wireName: r'started_at')
  DateTime get startedAt;

  @BuiltValueField(wireName: r'user_id')
  String get userId;

  @BuiltValueField(wireName: r'booking_id')
  String get bookingId;

  @BuiltValueField(wireName: r'status')
  RideSessionStatusEnum get status;
  // enum statusEnum {  ACTIVE,  PAUSED,  ENDED,  SYNC_PENDING,  };

  RideSession._();

  factory RideSession([void updates(RideSessionBuilder b)]) = _$RideSession;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(RideSessionBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<RideSession> get serializer => _$RideSessionSerializer();
}

class _$RideSessionSerializer implements PrimitiveSerializer<RideSession> {
  @override
  final Iterable<Type> types = const [RideSession, _$RideSession];

  @override
  final String wireName = r'RideSession';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    RideSession object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    if (object.distanceMeters != null) {
      yield r'distance_meters';
      yield serializers.serialize(
        object.distanceMeters,
        specifiedType: const FullType(int),
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
    yield r'started_at';
    yield serializers.serialize(
      object.startedAt,
      specifiedType: const FullType(DateTime),
    );
    yield r'user_id';
    yield serializers.serialize(
      object.userId,
      specifiedType: const FullType(String),
    );
    yield r'version';
    yield serializers.serialize(
      object.version,
      specifiedType: const FullType(int),
    );
    yield r'booking_id';
    yield serializers.serialize(
      object.bookingId,
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
    if (object.gpsGapCount != null) {
      yield r'gps_gap_count';
      yield serializers.serialize(
        object.gpsGapCount,
        specifiedType: const FullType(int),
      );
    }
    if (object.createdBy != null) {
      yield r'created_by';
      yield serializers.serialize(
        object.createdBy,
        specifiedType: const FullType(String),
      );
    }
    if (object.endedAt != null) {
      yield r'ended_at';
      yield serializers.serialize(
        object.endedAt,
        specifiedType: const FullType(DateTime),
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
    yield r'status';
    yield serializers.serialize(
      object.status,
      specifiedType: const FullType(RideSessionStatusEnum),
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
    RideSession object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required RideSessionBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'distance_meters':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.distanceMeters = valueDes;
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
        case r'started_at':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DateTime),
          ) as DateTime;
          result.startedAt = valueDes;
          break;
        case r'user_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.userId = valueDes;
          break;
        case r'version':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.version = valueDes;
          break;
        case r'booking_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.bookingId = valueDes;
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
        case r'gps_gap_count':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.gpsGapCount = valueDes;
          break;
        case r'created_by':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.createdBy = valueDes;
          break;
        case r'ended_at':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DateTime),
          ) as DateTime;
          result.endedAt = valueDes;
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
        case r'status':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(RideSessionStatusEnum),
          ) as RideSessionStatusEnum;
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
  RideSession deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = RideSessionBuilder();
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

class RideSessionStatusEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'ACTIVE')
  static const RideSessionStatusEnum ACTIVE = _$rideSessionStatusEnum_ACTIVE;
  @BuiltValueEnumConst(wireName: r'PAUSED')
  static const RideSessionStatusEnum PAUSED = _$rideSessionStatusEnum_PAUSED;
  @BuiltValueEnumConst(wireName: r'ENDED')
  static const RideSessionStatusEnum ENDED = _$rideSessionStatusEnum_ENDED;
  @BuiltValueEnumConst(wireName: r'SYNC_PENDING')
  static const RideSessionStatusEnum SYNC_PENDING = _$rideSessionStatusEnum_SYNC_PENDING;

  static Serializer<RideSessionStatusEnum> get serializer => _$rideSessionStatusEnumSerializer;

  const RideSessionStatusEnum._(String name): super(name);

  static BuiltSet<RideSessionStatusEnum> get values => _$rideSessionStatusEnumValues;
  static RideSessionStatusEnum valueOf(String name) => _$rideSessionStatusEnumValueOf(name);
}
