//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:bike_local_generated_api_client/src/model/booking_status.dart';
import 'package:bike_local_generated_api_client/src/model/entity_base.dart';
import 'package:bike_local_generated_api_client/src/model/booking_status_transition.dart';
import 'package:built_collection/built_collection.dart';
import 'package:bike_local_generated_api_client/src/model/booking_item.dart';
import 'package:built_value/json_object.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'booking.g.dart';

/// Booking
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
/// * [bookingNumber]
/// * [userId]
/// * [storeId]
/// * [branchId]
/// * [assetIds]
/// * [equipmentIds]
/// * [status]
/// * [startAt]
/// * [endAt]
/// * [pickupPointId]
/// * [returnPointId]
/// * [paymentMethod]
/// * [currency]
/// * [subtotalAmount]
/// * [feeAmount]
/// * [depositAmount]
/// * [discountAmount]
/// * [totalAmount]
/// * [priceSnapshot]
/// * [policySnapshot]
/// * [qrBookingTokenReference] - One-time or time-limited booking QR token reference; raw token secret is not returned.
/// * [statusHistory]
/// * [bookingItems]
@BuiltValue()
abstract class Booking implements EntityBase, Built<Booking, BookingBuilder> {
  @BuiltValueField(wireName: r'deposit_amount')
  int get depositAmount;

  @BuiltValueField(wireName: r'branch_id')
  String get branchId;

  @BuiltValueField(wireName: r'booking_items')
  BuiltList<BookingItem> get bookingItems;

  @BuiltValueField(wireName: r'return_point_id')
  String get returnPointId;

  @BuiltValueField(wireName: r'asset_ids')
  BuiltList<String> get assetIds;

  @BuiltValueField(wireName: r'discount_amount')
  int get discountAmount;

  @BuiltValueField(wireName: r'store_id')
  String get storeId;

  @BuiltValueField(wireName: r'end_at')
  DateTime get endAt;

  @BuiltValueField(wireName: r'user_id')
  String get userId;

  @BuiltValueField(wireName: r'subtotal_amount')
  int get subtotalAmount;

  @BuiltValueField(wireName: r'fee_amount')
  int get feeAmount;

  @BuiltValueField(wireName: r'total_amount')
  int get totalAmount;

  @BuiltValueField(wireName: r'status_history')
  BuiltList<BookingStatusTransition> get statusHistory;

  @BuiltValueField(wireName: r'equipment_ids')
  BuiltList<String> get equipmentIds;

  @BuiltValueField(wireName: r'payment_method')
  BookingPaymentMethodEnum get paymentMethod;
  // enum paymentMethodEnum {  ONLINE,  CASH,  };

  @BuiltValueField(wireName: r'pickup_point_id')
  String get pickupPointId;

  @BuiltValueField(wireName: r'currency')
  String get currency;

  @BuiltValueField(wireName: r'price_snapshot')
  BuiltMap<String, JsonObject?> get priceSnapshot;

  @BuiltValueField(wireName: r'policy_snapshot')
  BuiltMap<String, JsonObject?> get policySnapshot;

  @BuiltValueField(wireName: r'start_at')
  DateTime get startAt;

  /// One-time or time-limited booking QR token reference; raw token secret is not returned.
  @BuiltValueField(wireName: r'qr_booking_token_reference')
  String get qrBookingTokenReference;

  @BuiltValueField(wireName: r'booking_number')
  String get bookingNumber;

  @BuiltValueField(wireName: r'status')
  BookingStatus get status;
  // enum statusEnum {  PENDING_PAYMENT,  PENDING_STORE_CONFIRMATION,  CONFIRMED,  PREPARING,  AWAITING_PICKUP,  IN_PROGRESS,  RETURN_PENDING,  INSPECTION_PENDING,  COMPLETED,  CANCELLED,  NO_SHOW,  DISPUTED,  };

  Booking._();

  factory Booking([void updates(BookingBuilder b)]) = _$Booking;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(BookingBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<Booking> get serializer => _$BookingSerializer();
}

class _$BookingSerializer implements PrimitiveSerializer<Booking> {
  @override
  final Iterable<Type> types = const [Booking, _$Booking];

  @override
  final String wireName = r'Booking';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    Booking object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'booking_items';
    yield serializers.serialize(
      object.bookingItems,
      specifiedType: const FullType(BuiltList, [FullType(BookingItem)]),
    );
    yield r'return_point_id';
    yield serializers.serialize(
      object.returnPointId,
      specifiedType: const FullType(String),
    );
    yield r'discount_amount';
    yield serializers.serialize(
      object.discountAmount,
      specifiedType: const FullType(int),
    );
    yield r'created_at';
    yield serializers.serialize(
      object.createdAt,
      specifiedType: const FullType(DateTime),
    );
    yield r'equipment_ids';
    yield serializers.serialize(
      object.equipmentIds,
      specifiedType: const FullType(BuiltList, [FullType(String)]),
    );
    yield r'pickup_point_id';
    yield serializers.serialize(
      object.pickupPointId,
      specifiedType: const FullType(String),
    );
    yield r'currency';
    yield serializers.serialize(
      object.currency,
      specifiedType: const FullType(String),
    );
    yield r'price_snapshot';
    yield serializers.serialize(
      object.priceSnapshot,
      specifiedType: const FullType(BuiltMap, [FullType(String), FullType.nullable(JsonObject)]),
    );
    yield r'id';
    yield serializers.serialize(
      object.id,
      specifiedType: const FullType(String),
    );
    yield r'start_at';
    yield serializers.serialize(
      object.startAt,
      specifiedType: const FullType(DateTime),
    );
    yield r'qr_booking_token_reference';
    yield serializers.serialize(
      object.qrBookingTokenReference,
      specifiedType: const FullType(String),
    );
    yield r'updated_at';
    yield serializers.serialize(
      object.updatedAt,
      specifiedType: const FullType(DateTime),
    );
    yield r'deposit_amount';
    yield serializers.serialize(
      object.depositAmount,
      specifiedType: const FullType(int),
    );
    yield r'branch_id';
    yield serializers.serialize(
      object.branchId,
      specifiedType: const FullType(String),
    );
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
    yield r'asset_ids';
    yield serializers.serialize(
      object.assetIds,
      specifiedType: const FullType(BuiltList, [FullType(String)]),
    );
    yield r'store_id';
    yield serializers.serialize(
      object.storeId,
      specifiedType: const FullType(String),
    );
    yield r'end_at';
    yield serializers.serialize(
      object.endAt,
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
    yield r'subtotal_amount';
    yield serializers.serialize(
      object.subtotalAmount,
      specifiedType: const FullType(int),
    );
    yield r'fee_amount';
    yield serializers.serialize(
      object.feeAmount,
      specifiedType: const FullType(int),
    );
    yield r'total_amount';
    yield serializers.serialize(
      object.totalAmount,
      specifiedType: const FullType(int),
    );
    yield r'status_history';
    yield serializers.serialize(
      object.statusHistory,
      specifiedType: const FullType(BuiltList, [FullType(BookingStatusTransition)]),
    );
    if (object.deletedAt != null) {
      yield r'deleted_at';
      yield serializers.serialize(
        object.deletedAt,
        specifiedType: const FullType(DateTime),
      );
    }
    if (object.createdBy != null) {
      yield r'created_by';
      yield serializers.serialize(
        object.createdBy,
        specifiedType: const FullType(String),
      );
    }
    if (object.tenantId != null) {
      yield r'tenant_id';
      yield serializers.serialize(
        object.tenantId,
        specifiedType: const FullType(String),
      );
    }
    yield r'payment_method';
    yield serializers.serialize(
      object.paymentMethod,
      specifiedType: const FullType(BookingPaymentMethodEnum),
    );
    yield r'policy_snapshot';
    yield serializers.serialize(
      object.policySnapshot,
      specifiedType: const FullType(BuiltMap, [FullType(String), FullType.nullable(JsonObject)]),
    );
    yield r'booking_number';
    yield serializers.serialize(
      object.bookingNumber,
      specifiedType: const FullType(String),
    );
    yield r'status';
    yield serializers.serialize(
      object.status,
      specifiedType: const FullType(BookingStatus),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    Booking object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required BookingBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'booking_items':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BuiltList, [FullType(BookingItem)]),
          ) as BuiltList<BookingItem>;
          result.bookingItems.replace(valueDes);
          break;
        case r'return_point_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.returnPointId = valueDes;
          break;
        case r'discount_amount':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.discountAmount = valueDes;
          break;
        case r'created_at':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DateTime),
          ) as DateTime;
          result.createdAt = valueDes;
          break;
        case r'equipment_ids':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BuiltList, [FullType(String)]),
          ) as BuiltList<String>;
          result.equipmentIds.replace(valueDes);
          break;
        case r'pickup_point_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.pickupPointId = valueDes;
          break;
        case r'currency':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.currency = valueDes;
          break;
        case r'price_snapshot':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BuiltMap, [FullType(String), FullType.nullable(JsonObject)]),
          ) as BuiltMap<String, JsonObject?>;
          result.priceSnapshot.replace(valueDes);
          break;
        case r'id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.id = valueDes;
          break;
        case r'start_at':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DateTime),
          ) as DateTime;
          result.startAt = valueDes;
          break;
        case r'qr_booking_token_reference':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.qrBookingTokenReference = valueDes;
          break;
        case r'updated_at':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DateTime),
          ) as DateTime;
          result.updatedAt = valueDes;
          break;
        case r'deposit_amount':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.depositAmount = valueDes;
          break;
        case r'branch_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.branchId = valueDes;
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
        case r'asset_ids':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BuiltList, [FullType(String)]),
          ) as BuiltList<String>;
          result.assetIds.replace(valueDes);
          break;
        case r'store_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.storeId = valueDes;
          break;
        case r'end_at':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DateTime),
          ) as DateTime;
          result.endAt = valueDes;
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
        case r'subtotal_amount':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.subtotalAmount = valueDes;
          break;
        case r'fee_amount':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.feeAmount = valueDes;
          break;
        case r'total_amount':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.totalAmount = valueDes;
          break;
        case r'status_history':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BuiltList, [FullType(BookingStatusTransition)]),
          ) as BuiltList<BookingStatusTransition>;
          result.statusHistory.replace(valueDes);
          break;
        case r'deleted_at':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DateTime),
          ) as DateTime;
          result.deletedAt = valueDes;
          break;
        case r'created_by':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.createdBy = valueDes;
          break;
        case r'tenant_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.tenantId = valueDes;
          break;
        case r'payment_method':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BookingPaymentMethodEnum),
          ) as BookingPaymentMethodEnum;
          result.paymentMethod = valueDes;
          break;
        case r'policy_snapshot':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BuiltMap, [FullType(String), FullType.nullable(JsonObject)]),
          ) as BuiltMap<String, JsonObject?>;
          result.policySnapshot.replace(valueDes);
          break;
        case r'booking_number':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.bookingNumber = valueDes;
          break;
        case r'status':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BookingStatus),
          ) as BookingStatus;
          result.status = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  Booking deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = BookingBuilder();
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

class BookingPaymentMethodEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'ONLINE')
  static const BookingPaymentMethodEnum ONLINE = _$bookingPaymentMethodEnum_ONLINE;
  @BuiltValueEnumConst(wireName: r'CASH')
  static const BookingPaymentMethodEnum CASH = _$bookingPaymentMethodEnum_CASH;

  static Serializer<BookingPaymentMethodEnum> get serializer => _$bookingPaymentMethodEnumSerializer;

  const BookingPaymentMethodEnum._(String name): super(name);

  static BuiltSet<BookingPaymentMethodEnum> get values => _$bookingPaymentMethodEnumValues;
  static BookingPaymentMethodEnum valueOf(String name) => _$bookingPaymentMethodEnumValueOf(name);
}
