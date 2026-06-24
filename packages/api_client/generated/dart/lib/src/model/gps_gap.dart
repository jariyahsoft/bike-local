//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'gps_gap.g.dart';

/// GpsGap
///
/// Properties:
/// * [from] 
/// * [to] 
/// * [reason] 
@BuiltValue()
abstract class GpsGap implements Built<GpsGap, GpsGapBuilder> {
  @BuiltValueField(wireName: r'from')
  DateTime get from;

  @BuiltValueField(wireName: r'to')
  DateTime get to;

  @BuiltValueField(wireName: r'reason')
  GpsGapReasonEnum get reason;
  // enum reasonEnum {  APP_INTERRUPTED,  PERMISSION_REVOKED,  SIGNAL_LOST,  DEVICE_OFFLINE,  };

  GpsGap._();

  factory GpsGap([void updates(GpsGapBuilder b)]) = _$GpsGap;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(GpsGapBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<GpsGap> get serializer => _$GpsGapSerializer();
}

class _$GpsGapSerializer implements PrimitiveSerializer<GpsGap> {
  @override
  final Iterable<Type> types = const [GpsGap, _$GpsGap];

  @override
  final String wireName = r'GpsGap';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    GpsGap object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'from';
    yield serializers.serialize(
      object.from,
      specifiedType: const FullType(DateTime),
    );
    yield r'to';
    yield serializers.serialize(
      object.to,
      specifiedType: const FullType(DateTime),
    );
    yield r'reason';
    yield serializers.serialize(
      object.reason,
      specifiedType: const FullType(GpsGapReasonEnum),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    GpsGap object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required GpsGapBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'from':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DateTime),
          ) as DateTime;
          result.from = valueDes;
          break;
        case r'to':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DateTime),
          ) as DateTime;
          result.to = valueDes;
          break;
        case r'reason':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(GpsGapReasonEnum),
          ) as GpsGapReasonEnum;
          result.reason = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  GpsGap deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = GpsGapBuilder();
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

class GpsGapReasonEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'APP_INTERRUPTED')
  static const GpsGapReasonEnum APP_INTERRUPTED = _$gpsGapReasonEnum_APP_INTERRUPTED;
  @BuiltValueEnumConst(wireName: r'PERMISSION_REVOKED')
  static const GpsGapReasonEnum PERMISSION_REVOKED = _$gpsGapReasonEnum_PERMISSION_REVOKED;
  @BuiltValueEnumConst(wireName: r'SIGNAL_LOST')
  static const GpsGapReasonEnum SIGNAL_LOST = _$gpsGapReasonEnum_SIGNAL_LOST;
  @BuiltValueEnumConst(wireName: r'DEVICE_OFFLINE')
  static const GpsGapReasonEnum DEVICE_OFFLINE = _$gpsGapReasonEnum_DEVICE_OFFLINE;

  static Serializer<GpsGapReasonEnum> get serializer => _$gpsGapReasonEnumSerializer;

  const GpsGapReasonEnum._(String name): super(name);

  static BuiltSet<GpsGapReasonEnum> get values => _$gpsGapReasonEnumValues;
  static GpsGapReasonEnum valueOf(String name) => _$gpsGapReasonEnumValueOf(name);
}

