//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:bike_local_generated_api_client/src/model/gps_gap.dart';
import 'package:built_collection/built_collection.dart';
import 'package:bike_local_generated_api_client/src/model/gps_point.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'upload_ride_track_chunk_request.g.dart';

/// UploadRideTrackChunkRequest
///
/// Properties:
/// * [sequence] 
/// * [checksum] 
/// * [capturedFrom] 
/// * [capturedTo] 
/// * [locationConsentGranted] 
/// * [points] 
/// * [gaps] 
@BuiltValue()
abstract class UploadRideTrackChunkRequest implements Built<UploadRideTrackChunkRequest, UploadRideTrackChunkRequestBuilder> {
  @BuiltValueField(wireName: r'sequence')
  int get sequence;

  @BuiltValueField(wireName: r'checksum')
  String get checksum;

  @BuiltValueField(wireName: r'captured_from')
  DateTime get capturedFrom;

  @BuiltValueField(wireName: r'captured_to')
  DateTime get capturedTo;

  @BuiltValueField(wireName: r'location_consent_granted')
  bool get locationConsentGranted;

  @BuiltValueField(wireName: r'points')
  BuiltList<GpsPoint> get points;

  @BuiltValueField(wireName: r'gaps')
  BuiltList<GpsGap>? get gaps;

  UploadRideTrackChunkRequest._();

  factory UploadRideTrackChunkRequest([void updates(UploadRideTrackChunkRequestBuilder b)]) = _$UploadRideTrackChunkRequest;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(UploadRideTrackChunkRequestBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<UploadRideTrackChunkRequest> get serializer => _$UploadRideTrackChunkRequestSerializer();
}

class _$UploadRideTrackChunkRequestSerializer implements PrimitiveSerializer<UploadRideTrackChunkRequest> {
  @override
  final Iterable<Type> types = const [UploadRideTrackChunkRequest, _$UploadRideTrackChunkRequest];

  @override
  final String wireName = r'UploadRideTrackChunkRequest';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    UploadRideTrackChunkRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
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
    yield r'location_consent_granted';
    yield serializers.serialize(
      object.locationConsentGranted,
      specifiedType: const FullType(bool),
    );
    yield r'points';
    yield serializers.serialize(
      object.points,
      specifiedType: const FullType(BuiltList, [FullType(GpsPoint)]),
    );
    if (object.gaps != null) {
      yield r'gaps';
      yield serializers.serialize(
        object.gaps,
        specifiedType: const FullType(BuiltList, [FullType(GpsGap)]),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    UploadRideTrackChunkRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required UploadRideTrackChunkRequestBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
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
        case r'location_consent_granted':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(bool),
          ) as bool;
          result.locationConsentGranted = valueDes;
          break;
        case r'points':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BuiltList, [FullType(GpsPoint)]),
          ) as BuiltList<GpsPoint>;
          result.points.replace(valueDes);
          break;
        case r'gaps':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BuiltList, [FullType(GpsGap)]),
          ) as BuiltList<GpsGap>;
          result.gaps.replace(valueDes);
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  UploadRideTrackChunkRequest deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = UploadRideTrackChunkRequestBuilder();
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

