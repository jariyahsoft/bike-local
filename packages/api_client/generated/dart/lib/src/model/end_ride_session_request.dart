//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'end_ride_session_request.g.dart';

/// EndRideSessionRequest
///
/// Properties:
/// * [endedAt] 
/// * [version] 
@BuiltValue()
abstract class EndRideSessionRequest implements Built<EndRideSessionRequest, EndRideSessionRequestBuilder> {
  @BuiltValueField(wireName: r'ended_at')
  DateTime get endedAt;

  @BuiltValueField(wireName: r'version')
  int get version;

  EndRideSessionRequest._();

  factory EndRideSessionRequest([void updates(EndRideSessionRequestBuilder b)]) = _$EndRideSessionRequest;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(EndRideSessionRequestBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<EndRideSessionRequest> get serializer => _$EndRideSessionRequestSerializer();
}

class _$EndRideSessionRequestSerializer implements PrimitiveSerializer<EndRideSessionRequest> {
  @override
  final Iterable<Type> types = const [EndRideSessionRequest, _$EndRideSessionRequest];

  @override
  final String wireName = r'EndRideSessionRequest';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    EndRideSessionRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'ended_at';
    yield serializers.serialize(
      object.endedAt,
      specifiedType: const FullType(DateTime),
    );
    yield r'version';
    yield serializers.serialize(
      object.version,
      specifiedType: const FullType(int),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    EndRideSessionRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required EndRideSessionRequestBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'ended_at':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DateTime),
          ) as DateTime;
          result.endedAt = valueDes;
          break;
        case r'version':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.version = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  EndRideSessionRequest deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = EndRideSessionRequestBuilder();
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

