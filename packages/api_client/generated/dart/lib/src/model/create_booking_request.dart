//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'create_booking_request.g.dart';

/// CreateBookingRequest
///
/// Properties:
/// * [storeId]
/// * [branchId]
/// * [assetIds]
/// * [equipmentIds]
/// * [startAt]
/// * [endAt]
/// * [pickupPointId]
/// * [returnPointId]
/// * [paymentMethod]
@BuiltValue()
abstract class CreateBookingRequest implements Built<CreateBookingRequest, CreateBookingRequestBuilder> {
  @BuiltValueField(wireName: r'store_id')
  String get storeId;

  @BuiltValueField(wireName: r'branch_id')
  String get branchId;

  @BuiltValueField(wireName: r'asset_ids')
  BuiltList<String> get assetIds;

  @BuiltValueField(wireName: r'equipment_ids')
  BuiltList<String>? get equipmentIds;

  @BuiltValueField(wireName: r'start_at')
  DateTime get startAt;

  @BuiltValueField(wireName: r'end_at')
  DateTime get endAt;

  @BuiltValueField(wireName: r'pickup_point_id')
  String get pickupPointId;

  @BuiltValueField(wireName: r'return_point_id')
  String get returnPointId;

  @BuiltValueField(wireName: r'payment_method')
  CreateBookingRequestPaymentMethodEnum get paymentMethod;
  // enum paymentMethodEnum {  ONLINE,  CASH,  };

  CreateBookingRequest._();

  factory CreateBookingRequest([void updates(CreateBookingRequestBuilder b)]) = _$CreateBookingRequest;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(CreateBookingRequestBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<CreateBookingRequest> get serializer => _$CreateBookingRequestSerializer();
}

class _$CreateBookingRequestSerializer implements PrimitiveSerializer<CreateBookingRequest> {
  @override
  final Iterable<Type> types = const [CreateBookingRequest, _$CreateBookingRequest];

  @override
  final String wireName = r'CreateBookingRequest';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    CreateBookingRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'store_id';
    yield serializers.serialize(
      object.storeId,
      specifiedType: const FullType(String),
    );
    yield r'branch_id';
    yield serializers.serialize(
      object.branchId,
      specifiedType: const FullType(String),
    );
    yield r'asset_ids';
    yield serializers.serialize(
      object.assetIds,
      specifiedType: const FullType(BuiltList, [FullType(String)]),
    );
    if (object.equipmentIds != null) {
      yield r'equipment_ids';
      yield serializers.serialize(
        object.equipmentIds,
        specifiedType: const FullType(BuiltList, [FullType(String)]),
      );
    }
    yield r'start_at';
    yield serializers.serialize(
      object.startAt,
      specifiedType: const FullType(DateTime),
    );
    yield r'end_at';
    yield serializers.serialize(
      object.endAt,
      specifiedType: const FullType(DateTime),
    );
    yield r'pickup_point_id';
    yield serializers.serialize(
      object.pickupPointId,
      specifiedType: const FullType(String),
    );
    yield r'return_point_id';
    yield serializers.serialize(
      object.returnPointId,
      specifiedType: const FullType(String),
    );
    yield r'payment_method';
    yield serializers.serialize(
      object.paymentMethod,
      specifiedType: const FullType(CreateBookingRequestPaymentMethodEnum),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    CreateBookingRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required CreateBookingRequestBuilder result,
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
        case r'asset_ids':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BuiltList, [FullType(String)]),
          ) as BuiltList<String>;
          result.assetIds.replace(valueDes);
          break;
        case r'equipment_ids':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BuiltList, [FullType(String)]),
          ) as BuiltList<String>;
          result.equipmentIds.replace(valueDes);
          break;
        case r'start_at':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DateTime),
          ) as DateTime;
          result.startAt = valueDes;
          break;
        case r'end_at':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DateTime),
          ) as DateTime;
          result.endAt = valueDes;
          break;
        case r'pickup_point_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.pickupPointId = valueDes;
          break;
        case r'return_point_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.returnPointId = valueDes;
          break;
        case r'payment_method':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(CreateBookingRequestPaymentMethodEnum),
          ) as CreateBookingRequestPaymentMethodEnum;
          result.paymentMethod = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  CreateBookingRequest deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = CreateBookingRequestBuilder();
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

class CreateBookingRequestPaymentMethodEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'ONLINE')
  static const CreateBookingRequestPaymentMethodEnum ONLINE = _$createBookingRequestPaymentMethodEnum_ONLINE;
  @BuiltValueEnumConst(wireName: r'CASH')
  static const CreateBookingRequestPaymentMethodEnum CASH = _$createBookingRequestPaymentMethodEnum_CASH;

  static Serializer<CreateBookingRequestPaymentMethodEnum> get serializer => _$createBookingRequestPaymentMethodEnumSerializer;

  const CreateBookingRequestPaymentMethodEnum._(String name): super(name);

  static BuiltSet<CreateBookingRequestPaymentMethodEnum> get values => _$createBookingRequestPaymentMethodEnumValues;
  static CreateBookingRequestPaymentMethodEnum valueOf(String name) => _$createBookingRequestPaymentMethodEnumValueOf(name);
}
