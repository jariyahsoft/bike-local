//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'store_revenue_report.g.dart';

/// StoreRevenueReport
///
/// Properties:
/// * [storeId] 
/// * [branchId] 
/// * [from] 
/// * [to] 
/// * [grossRevenueAmount] 
/// * [netRevenueAmount] 
/// * [cashAmount] 
/// * [onlineAmount] 
/// * [depositAmount] 
/// * [refundAmount] 
/// * [penaltyAmount] 
/// * [platformFeeAmount] 
/// * [paymentFeeAmount] 
/// * [currency] 
@BuiltValue()
abstract class StoreRevenueReport implements Built<StoreRevenueReport, StoreRevenueReportBuilder> {
  @BuiltValueField(wireName: r'store_id')
  String get storeId;

  @BuiltValueField(wireName: r'branch_id')
  String? get branchId;

  @BuiltValueField(wireName: r'from')
  DateTime get from;

  @BuiltValueField(wireName: r'to')
  DateTime get to;

  @BuiltValueField(wireName: r'gross_revenue_amount')
  int get grossRevenueAmount;

  @BuiltValueField(wireName: r'net_revenue_amount')
  int get netRevenueAmount;

  @BuiltValueField(wireName: r'cash_amount')
  int get cashAmount;

  @BuiltValueField(wireName: r'online_amount')
  int get onlineAmount;

  @BuiltValueField(wireName: r'deposit_amount')
  int get depositAmount;

  @BuiltValueField(wireName: r'refund_amount')
  int get refundAmount;

  @BuiltValueField(wireName: r'penalty_amount')
  int get penaltyAmount;

  @BuiltValueField(wireName: r'platform_fee_amount')
  int get platformFeeAmount;

  @BuiltValueField(wireName: r'payment_fee_amount')
  int get paymentFeeAmount;

  @BuiltValueField(wireName: r'currency')
  String get currency;

  StoreRevenueReport._();

  factory StoreRevenueReport([void updates(StoreRevenueReportBuilder b)]) = _$StoreRevenueReport;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(StoreRevenueReportBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<StoreRevenueReport> get serializer => _$StoreRevenueReportSerializer();
}

class _$StoreRevenueReportSerializer implements PrimitiveSerializer<StoreRevenueReport> {
  @override
  final Iterable<Type> types = const [StoreRevenueReport, _$StoreRevenueReport];

  @override
  final String wireName = r'StoreRevenueReport';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    StoreRevenueReport object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'store_id';
    yield serializers.serialize(
      object.storeId,
      specifiedType: const FullType(String),
    );
    if (object.branchId != null) {
      yield r'branch_id';
      yield serializers.serialize(
        object.branchId,
        specifiedType: const FullType(String),
      );
    }
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
    yield r'cash_amount';
    yield serializers.serialize(
      object.cashAmount,
      specifiedType: const FullType(int),
    );
    yield r'online_amount';
    yield serializers.serialize(
      object.onlineAmount,
      specifiedType: const FullType(int),
    );
    yield r'deposit_amount';
    yield serializers.serialize(
      object.depositAmount,
      specifiedType: const FullType(int),
    );
    yield r'refund_amount';
    yield serializers.serialize(
      object.refundAmount,
      specifiedType: const FullType(int),
    );
    yield r'penalty_amount';
    yield serializers.serialize(
      object.penaltyAmount,
      specifiedType: const FullType(int),
    );
    yield r'platform_fee_amount';
    yield serializers.serialize(
      object.platformFeeAmount,
      specifiedType: const FullType(int),
    );
    yield r'payment_fee_amount';
    yield serializers.serialize(
      object.paymentFeeAmount,
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
    StoreRevenueReport object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required StoreRevenueReportBuilder result,
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
        case r'payment_fee_amount':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.paymentFeeAmount = valueDes;
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
  StoreRevenueReport deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = StoreRevenueReportBuilder();
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

