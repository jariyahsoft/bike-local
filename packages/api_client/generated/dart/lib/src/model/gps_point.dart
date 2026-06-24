//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'gps_point.g.dart';

/// GpsPoint
///
/// Properties:
/// * [capturedAt] 
/// * [latitude] 
/// * [longitude] 
/// * [accuracyMeters] 
/// * [speedMps] 
/// * [altitudeMeters] 
@BuiltValue()
abstract class GpsPoint implements Built<GpsPoint, GpsPointBuilder> {
  @BuiltValueField(wireName: r'captured_at')
  DateTime get capturedAt;

  @BuiltValueField(wireName: r'latitude')
  num get latitude;

  @BuiltValueField(wireName: r'longitude')
  num get longitude;

  @BuiltValueField(wireName: r'accuracy_meters')
  num get accuracyMeters;

  @BuiltValueField(wireName: r'speed_mps')
  num? get speedMps;

  @BuiltValueField(wireName: r'altitude_meters')
  num? get altitudeMeters;

  GpsPoint._();

  factory GpsPoint([void updates(GpsPointBuilder b)]) = _$GpsPoint;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(GpsPointBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<GpsPoint> get serializer => _$GpsPointSerializer();
}

class _$GpsPointSerializer implements PrimitiveSerializer<GpsPoint> {
  @override
  final Iterable<Type> types = const [GpsPoint, _$GpsPoint];

  @override
  final String wireName = r'GpsPoint';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    GpsPoint object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'captured_at';
    yield serializers.serialize(
      object.capturedAt,
      specifiedType: const FullType(DateTime),
    );
    yield r'latitude';
    yield serializers.serialize(
      object.latitude,
      specifiedType: const FullType(num),
    );
    yield r'longitude';
    yield serializers.serialize(
      object.longitude,
      specifiedType: const FullType(num),
    );
    yield r'accuracy_meters';
    yield serializers.serialize(
      object.accuracyMeters,
      specifiedType: const FullType(num),
    );
    if (object.speedMps != null) {
      yield r'speed_mps';
      yield serializers.serialize(
        object.speedMps,
        specifiedType: const FullType(num),
      );
    }
    if (object.altitudeMeters != null) {
      yield r'altitude_meters';
      yield serializers.serialize(
        object.altitudeMeters,
        specifiedType: const FullType(num),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    GpsPoint object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required GpsPointBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'captured_at':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DateTime),
          ) as DateTime;
          result.capturedAt = valueDes;
          break;
        case r'latitude':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(num),
          ) as num;
          result.latitude = valueDes;
          break;
        case r'longitude':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(num),
          ) as num;
          result.longitude = valueDes;
          break;
        case r'accuracy_meters':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(num),
          ) as num;
          result.accuracyMeters = valueDes;
          break;
        case r'speed_mps':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(num),
          ) as num;
          result.speedMps = valueDes;
          break;
        case r'altitude_meters':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(num),
          ) as num;
          result.altitudeMeters = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  GpsPoint deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = GpsPointBuilder();
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

