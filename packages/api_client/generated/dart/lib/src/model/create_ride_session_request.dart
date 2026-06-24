//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'create_ride_session_request.g.dart';

/// CreateRideSessionRequest
///
/// Properties:
/// * [bookingId] 
@BuiltValue()
abstract class CreateRideSessionRequest implements Built<CreateRideSessionRequest, CreateRideSessionRequestBuilder> {
  @BuiltValueField(wireName: r'booking_id')
  String get bookingId;

  CreateRideSessionRequest._();

  factory CreateRideSessionRequest([void updates(CreateRideSessionRequestBuilder b)]) = _$CreateRideSessionRequest;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(CreateRideSessionRequestBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<CreateRideSessionRequest> get serializer => _$CreateRideSessionRequestSerializer();
}

class _$CreateRideSessionRequestSerializer implements PrimitiveSerializer<CreateRideSessionRequest> {
  @override
  final Iterable<Type> types = const [CreateRideSessionRequest, _$CreateRideSessionRequest];

  @override
  final String wireName = r'CreateRideSessionRequest';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    CreateRideSessionRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'booking_id';
    yield serializers.serialize(
      object.bookingId,
      specifiedType: const FullType(String),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    CreateRideSessionRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required CreateRideSessionRequestBuilder result,
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
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  CreateRideSessionRequest deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = CreateRideSessionRequestBuilder();
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

