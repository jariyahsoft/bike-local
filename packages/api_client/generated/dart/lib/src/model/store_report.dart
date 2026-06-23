//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'store_report.g.dart';

/// StoreReport
///
/// Properties:
/// * [storeId]
/// * [bookingsCount]
/// * [completedCount]
/// * [cancelledCount]
/// * [noShowCount]
/// * [grossRevenueAmount]
/// * [netRevenueAmount]
/// * [cashAmount]
/// * [onlineAmount]
/// * [depositAmount]
/// * [refundAmount]
/// * [penaltyAmount]
/// * [platformFeeAmount]
/// * [currency]
@BuiltValue()
abstract class StoreReport implements Built<StoreReport, StoreReportBuilder> {
  @BuiltValueField(wireName: r'store_id')
  String get storeId;

  @BuiltValueField(wireName: r'bookings_count')
  int? get bookingsCount;

  @BuiltValueField(wireName: r'completed_count')
  int? get completedCount;

  @BuiltValueField(wireName: r'cancelled_count')
  int? get cancelledCount;

  @BuiltValueField(wireName: r'no_show_count')
  int? get noShowCount;

  @BuiltValueField(wireName: r'gross_revenue_amount')
  int get grossRevenueAmount;

  @BuiltValueField(wireName: r'net_revenue_amount')
  int get netRevenueAmount;

  @BuiltValueField(wireName: r'cash_amount')
  int? get cashAmount;

  @BuiltValueField(wireName: r'online_amount')
  int? get onlineAmount;

  @BuiltValueField(wireName: r'deposit_amount')
  int? get depositAmount;

  @BuiltValueField(wireName: r'refund_amount')
  int? get refundAmount;

  @BuiltValueField(wireName: r'penalty_amount')
  int? get penaltyAmount;

  @BuiltValueField(wireName: r'platform_fee_amount')
  int? get platformFeeAmount;

  @BuiltValueField(wireName: r'currency')
  String get currency;

  StoreReport._();

  factory StoreReport([void updates(StoreReportBuilder b)]) = _$StoreReport;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(StoreReportBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<StoreReport> get serializer => _$StoreReportSerializer();
}

class _$StoreReportSerializer implements PrimitiveSerializer<StoreReport> {
  @override
  final Iterable<Type> types = const [StoreReport, _$StoreReport];

  @override
  final String wireName = r'StoreReport';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    StoreReport object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'store_id';
    yield serializers.serialize(
      object.storeId,
      specifiedType: const FullType(String),
    );
    if (object.bookingsCount != null) {
      yield r'bookings_count';
      yield serializers.serialize(
        object.bookingsCount,
        specifiedType: const FullType(int),
      );
    }
    if (object.completedCount != null) {
      yield r'completed_count';
      yield serializers.serialize(
        object.completedCount,
        specifiedType: const FullType(int),
      );
    }
    if (object.cancelledCount != null) {
      yield r'cancelled_count';
      yield serializers.serialize(
        object.cancelledCount,
        specifiedType: const FullType(int),
      );
    }
    if (object.noShowCount != null) {
      yield r'no_show_count';
      yield serializers.serialize(
        object.noShowCount,
        specifiedType: const FullType(int),
      );
    }
    yield r'gross_revenue_amount';
    yield serializers.serialize(
      object.grossRevenueAmount,
      specifiedType: const FullType(int),
    );
    yield r'net_revenue_amount';
    yield serializers.serialize(
      object.netRevenueAmount,
      specifiedType: const FullType(int),
    );
    if (object.cashAmount != null) {
      yield r'cash_amount';
      yield serializers.serialize(
        object.cashAmount,
        specifiedType: const FullType(int),
      );
    }
    if (object.onlineAmount != null) {
      yield r'online_amount';
      yield serializers.serialize(
        object.onlineAmount,
        specifiedType: const FullType(int),
      );
    }
    if (object.depositAmount != null) {
      yield r'deposit_amount';
      yield serializers.serialize(
        object.depositAmount,
        specifiedType: const FullType(int),
      );
    }
    if (object.refundAmount != null) {
      yield r'refund_amount';
      yield serializers.serialize(
        object.refundAmount,
        specifiedType: const FullType(int),
      );
    }
    if (object.penaltyAmount != null) {
      yield r'penalty_amount';
      yield serializers.serialize(
        object.penaltyAmount,
        specifiedType: const FullType(int),
      );
    }
    if (object.platformFeeAmount != null) {
      yield r'platform_fee_amount';
      yield serializers.serialize(
        object.platformFeeAmount,
        specifiedType: const FullType(int),
      );
    }
    yield r'currency';
    yield serializers.serialize(
      object.currency,
      specifiedType: const FullType(String),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    StoreReport object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required StoreReportBuilder result,
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
        case r'bookings_count':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.bookingsCount = valueDes;
          break;
        case r'completed_count':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.completedCount = valueDes;
          break;
        case r'cancelled_count':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.cancelledCount = valueDes;
          break;
        case r'no_show_count':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.noShowCount = valueDes;
          break;
        case r'gross_revenue_amount':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.grossRevenueAmount = valueDes;
          break;
        case r'net_revenue_amount':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.netRevenueAmount = valueDes;
          break;
        case r'cash_amount':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.cashAmount = valueDes;
          break;
        case r'online_amount':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.onlineAmount = valueDes;
          break;
        case r'deposit_amount':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.depositAmount = valueDes;
          break;
        case r'refund_amount':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.refundAmount = valueDes;
          break;
        case r'penalty_amount':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.penaltyAmount = valueDes;
          break;
        case r'platform_fee_amount':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.platformFeeAmount = valueDes;
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
  StoreReport deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = StoreReportBuilder();
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
