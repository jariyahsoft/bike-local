//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:bike_local_generated_api_client/src/model/gps_point.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'ride_track_chunk.g.dart';

/// RideTrackChunk
///
/// Properties:
/// * [rideSessionId] 
/// * [sequence] 
/// * [checksum] 
/// * [capturedFrom] 
/// * [capturedTo] 
/// * [points] 
@BuiltValue()
abstract class RideTrackChunk implements Built<RideTrackChunk, RideTrackChunkBuilder> {
  @BuiltValueField(wireName: r'ride_session_id')
  String get rideSessionId;

  @BuiltValueField(wireName: r'sequence')
  int get sequence;

  @BuiltValueField(wireName: r'checksum')
  String get checksum;

  @BuiltValueField(wireName: r'captured_from')
  DateTime get capturedFrom;

  @BuiltValueField(wireName: r'captured_to')
  DateTime get capturedTo;

  @BuiltValueField(wireName: r'points')
  BuiltList<GpsPoint> get points;

  RideTrackChunk._();

  factory RideTrackChunk([void updates(RideTrackChunkBuilder b)]) = _$RideTrackChunk;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(RideTrackChunkBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<RideTrackChunk> get serializer => _$RideTrackChunkSerializer();
}

class _$RideTrackChunkSerializer implements PrimitiveSerializer<RideTrackChunk> {
  @override
  final Iterable<Type> types = const [RideTrackChunk, _$RideTrackChunk];

  @override
  final String wireName = r'RideTrackChunk';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    RideTrackChunk object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'ride_session_id';
    yield serializers.serialize(
      object.rideSessionId,
      specifiedType: const FullType(String),
    );
    yield r'sequence';
    yield serializers.serialize(
      object.sequence,
      specifiedType: const FullType(int),
    );
    yield r'checksum';
    yield serializers.serialize(
      object.checksum,
      specifiedType: const FullType(String),
    );
    yield r'captured_from';
    yield serializers.serialize(
      object.capturedFrom,
      specifiedType: const FullType(DateTime),
    );
    yield r'captured_to';
    yield serializers.serialize(
      object.capturedTo,
      specifiedType: const FullType(DateTime),
    );
    yield r'points';
    yield serializers.serialize(
      object.points,
      specifiedType: const FullType(BuiltList, [FullType(GpsPoint)]),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    RideTrackChunk object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required RideTrackChunkBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'ride_session_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.rideSessionId = valueDes;
          break;
        case r'sequence':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.sequence = valueDes;
          break;
        case r'checksum':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.checksum = valueDes;
          break;
        case r'captured_from':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DateTime),
          ) as DateTime;
          result.capturedFrom = valueDes;
          break;
        case r'captured_to':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DateTime),
          ) as DateTime;
          result.capturedTo = valueDes;
          break;
        case r'points':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BuiltList, [FullType(GpsPoint)]),
          ) as BuiltList<GpsPoint>;
          result.points.replace(valueDes);
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  RideTrackChunk deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = RideTrackChunkBuilder();
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

