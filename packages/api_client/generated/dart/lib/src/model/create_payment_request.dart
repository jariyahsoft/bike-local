//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'create_payment_request.g.dart';

/// CreatePaymentRequest
///
/// Properties:
/// * [bookingId] 
/// * [method] 
/// * [amount] 
/// * [currency] 
@BuiltValue()
abstract class CreatePaymentRequest implements Built<CreatePaymentRequest, CreatePaymentRequestBuilder> {
  @BuiltValueField(wireName: r'booking_id')
  String get bookingId;

  @BuiltValueField(wireName: r'method')
  CreatePaymentRequestMethodEnum get method;
  // enum methodEnum {  GATEWAY,  CASH,  };

  @BuiltValueField(wireName: r'amount')
  int get amount;

  @BuiltValueField(wireName: r'currency')
  String get currency;

  CreatePaymentRequest._();

  factory CreatePaymentRequest([void updates(CreatePaymentRequestBuilder b)]) = _$CreatePaymentRequest;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(CreatePaymentRequestBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<CreatePaymentRequest> get serializer => _$CreatePaymentRequestSerializer();
}

class _$CreatePaymentRequestSerializer implements PrimitiveSerializer<CreatePaymentRequest> {
  @override
  final Iterable<Type> types = const [CreatePaymentRequest, _$CreatePaymentRequest];

  @override
  final String wireName = r'CreatePaymentRequest';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    CreatePaymentRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'booking_id';
    yield serializers.serialize(
      object.bookingId,
      specifiedType: const FullType(String),
    );
    yield r'method';
    yield serializers.serialize(
      object.method,
      specifiedType: const FullType(CreatePaymentRequestMethodEnum),
    );
    yield r'amount';
    yield serializers.serialize(
      object.amount,
      specifiedType: const FullType(int),
    );
    yield r'currency';
    yield serializers.serialize(
      object.currency,
      specifiedType: const FullType(String),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    CreatePaymentRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required CreatePaymentRequestBuilder result,
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
        case r'method':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(CreatePaymentRequestMethodEnum),
          ) as CreatePaymentRequestMethodEnum;
          result.method = valueDes;
          break;
        case r'amount':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.amount = valueDes;
          break;
        case r'currency':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.currency = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  CreatePaymentRequest deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = CreatePaymentRequestBuilder();
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

class CreatePaymentRequestMethodEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'GATEWAY')
  static const CreatePaymentRequestMethodEnum GATEWAY = _$createPaymentRequestMethodEnum_GATEWAY;
  @BuiltValueEnumConst(wireName: r'CASH')
  static const CreatePaymentRequestMethodEnum CASH = _$createPaymentRequestMethodEnum_CASH;

  static Serializer<CreatePaymentRequestMethodEnum> get serializer => _$createPaymentRequestMethodEnumSerializer;

  const CreatePaymentRequestMethodEnum._(String name): super(name);

  static BuiltSet<CreatePaymentRequestMethodEnum> get values => _$createPaymentRequestMethodEnumValues;
  static CreatePaymentRequestMethodEnum valueOf(String name) => _$createPaymentRequestMethodEnumValueOf(name);
}

