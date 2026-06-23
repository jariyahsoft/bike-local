//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'payment_webhook_accepted.g.dart';

/// PaymentWebhookAccepted
///
/// Properties:
/// * [accepted]
/// * [replayed]
/// * [paymentId]
@BuiltValue()
abstract class PaymentWebhookAccepted implements Built<PaymentWebhookAccepted, PaymentWebhookAcceptedBuilder> {
  @BuiltValueField(wireName: r'accepted')
  bool get accepted;

  @BuiltValueField(wireName: r'replayed')
  bool get replayed;

  @BuiltValueField(wireName: r'payment_id')
  String? get paymentId;

  PaymentWebhookAccepted._();

  factory PaymentWebhookAccepted([void updates(PaymentWebhookAcceptedBuilder b)]) = _$PaymentWebhookAccepted;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(PaymentWebhookAcceptedBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<PaymentWebhookAccepted> get serializer => _$PaymentWebhookAcceptedSerializer();
}

class _$PaymentWebhookAcceptedSerializer implements PrimitiveSerializer<PaymentWebhookAccepted> {
  @override
  final Iterable<Type> types = const [PaymentWebhookAccepted, _$PaymentWebhookAccepted];

  @override
  final String wireName = r'PaymentWebhookAccepted';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    PaymentWebhookAccepted object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'accepted';
    yield serializers.serialize(
      object.accepted,
      specifiedType: const FullType(bool),
    );
    yield r'replayed';
    yield serializers.serialize(
      object.replayed,
      specifiedType: const FullType(bool),
    );
    if (object.paymentId != null) {
      yield r'payment_id';
      yield serializers.serialize(
        object.paymentId,
        specifiedType: const FullType(String),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    PaymentWebhookAccepted object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required PaymentWebhookAcceptedBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'accepted':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(bool),
          ) as bool;
          result.accepted = valueDes;
          break;
        case r'replayed':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(bool),
          ) as bool;
          result.replayed = valueDes;
          break;
        case r'payment_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.paymentId = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  PaymentWebhookAccepted deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = PaymentWebhookAcceptedBuilder();
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
