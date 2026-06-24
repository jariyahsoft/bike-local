//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:bike_local_generated_api_client/src/model/entity_base.dart';
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'settlement.g.dart';

/// Settlement
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
/// * [storeId] 
/// * [branchId] 
/// * [periodFrom] 
/// * [periodTo] 
/// * [currency] 
/// * [grossAmount] 
/// * [onlineAmount] 
/// * [cashAmount] 
/// * [refundAmount] 
/// * [penaltyAmount] 
/// * [platformFeeAmount] 
/// * [paymentFeeAmount] 
/// * [transferPayableAmount] 
/// * [status] 
/// * [approvedByUserId] 
/// * [approvedAt] 
/// * [paidByUserId] 
/// * [paidAt] 
@BuiltValue()
abstract class Settlement implements EntityBase, Built<Settlement, SettlementBuilder> {
  @BuiltValueField(wireName: r'branch_id')
  String? get branchId;

  @BuiltValueField(wireName: r'period_to')
  DateTime get periodTo;

  @BuiltValueField(wireName: r'paid_by_user_id')
  String? get paidByUserId;

  @BuiltValueField(wireName: r'online_amount')
  int get onlineAmount;

  @BuiltValueField(wireName: r'cash_amount')
  int get cashAmount;

  @BuiltValueField(wireName: r'period_from')
  DateTime get periodFrom;

  @BuiltValueField(wireName: r'gross_amount')
  int get grossAmount;

  @BuiltValueField(wireName: r'store_id')
  String get storeId;

  @BuiltValueField(wireName: r'approved_at')
  DateTime? get approvedAt;

  @BuiltValueField(wireName: r'payment_fee_amount')
  int get paymentFeeAmount;

  @BuiltValueField(wireName: r'approved_by_user_id')
  String? get approvedByUserId;

  @BuiltValueField(wireName: r'paid_at')
  DateTime? get paidAt;

  @BuiltValueField(wireName: r'currency')
  String get currency;

  @BuiltValueField(wireName: r'penalty_amount')
  int get penaltyAmount;

  @BuiltValueField(wireName: r'transfer_payable_amount')
  int get transferPayableAmount;

  @BuiltValueField(wireName: r'platform_fee_amount')
  int get platformFeeAmount;

  @BuiltValueField(wireName: r'refund_amount')
  int get refundAmount;

  @BuiltValueField(wireName: r'status')
  SettlementStatusEnum get status;
  // enum statusEnum {  DRAFT,  APPROVED,  PAYMENT_REQUESTED,  PAID,  };

  Settlement._();

  factory Settlement([void updates(SettlementBuilder b)]) = _$Settlement;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(SettlementBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<Settlement> get serializer => _$SettlementSerializer();
}

class _$SettlementSerializer implements PrimitiveSerializer<Settlement> {
  @override
  final Iterable<Type> types = const [Settlement, _$Settlement];

  @override
  final String wireName = r'Settlement';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    Settlement object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'period_to';
    yield serializers.serialize(
      object.periodTo,
      specifiedType: const FullType(DateTime),
    );
    if (object.paidByUserId != null) {
      yield r'paid_by_user_id';
      yield serializers.serialize(
        object.paidByUserId,
        specifiedType: const FullType(String),
      );
    }
    yield r'online_amount';
    yield serializers.serialize(
      object.onlineAmount,
      specifiedType: const FullType(int),
    );
    yield r'cash_amount';
    yield serializers.serialize(
      object.cashAmount,
      specifiedType: const FullType(int),
    );
    yield r'created_at';
    yield serializers.serialize(
      object.createdAt,
      specifiedType: const FullType(DateTime),
    );
    yield r'currency';
    yield serializers.serialize(
      object.currency,
      specifiedType: const FullType(String),
    );
    yield r'penalty_amount';
    yield serializers.serialize(
      object.penaltyAmount,
      specifiedType: const FullType(int),
    );
    yield r'id';
    yield serializers.serialize(
      object.id,
      specifiedType: const FullType(String),
    );
    yield r'platform_fee_amount';
    yield serializers.serialize(
      object.platformFeeAmount,
      specifiedType: const FullType(int),
    );
    yield r'refund_amount';
    yield serializers.serialize(
      object.refundAmount,
      specifiedType: const FullType(int),
    );
    yield r'updated_at';
    yield serializers.serialize(
      object.updatedAt,
      specifiedType: const FullType(DateTime),
    );
    if (object.branchId != null) {
      yield r'branch_id';
      yield serializers.serialize(
        object.branchId,
        specifiedType: const FullType(String),
      );
    }
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
    yield r'period_from';
    yield serializers.serialize(
      object.periodFrom,
      specifiedType: const FullType(DateTime),
    );
    yield r'gross_amount';
    yield serializers.serialize(
      object.grossAmount,
      specifiedType: const FullType(int),
    );
    yield r'store_id';
    yield serializers.serialize(
      object.storeId,
      specifiedType: const FullType(String),
    );
    if (object.approvedAt != null) {
      yield r'approved_at';
      yield serializers.serialize(
        object.approvedAt,
        specifiedType: const FullType(DateTime),
      );
    }
    yield r'version';
    yield serializers.serialize(
      object.version,
      specifiedType: const FullType(int),
    );
    yield r'payment_fee_amount';
    yield serializers.serialize(
      object.paymentFeeAmount,
      specifiedType: const FullType(int),
    );
    if (object.approvedByUserId != null) {
      yield r'approved_by_user_id';
      yield serializers.serialize(
        object.approvedByUserId,
        specifiedType: const FullType(String),
      );
    }
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
    if (object.paidAt != null) {
      yield r'paid_at';
      yield serializers.serialize(
        object.paidAt,
        specifiedType: const FullType(DateTime),
      );
    }
    yield r'transfer_payable_amount';
    yield serializers.serialize(
      object.transferPayableAmount,
      specifiedType: const FullType(int),
    );
    yield r'status';
    yield serializers.serialize(
      object.status,
      specifiedType: const FullType(SettlementStatusEnum),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    Settlement object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required SettlementBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'period_to':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DateTime),
          ) as DateTime;
          result.periodTo = valueDes;
          break;
        case r'paid_by_user_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.paidByUserId = valueDes;
          break;
        case r'online_amount':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.onlineAmount = valueDes;
          break;
        case r'cash_amount':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.cashAmount = valueDes;
          break;
        case r'created_at':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DateTime),
          ) as DateTime;
          result.createdAt = valueDes;
          break;
        case r'currency':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.currency = valueDes;
          break;
        case r'penalty_amount':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.penaltyAmount = valueDes;
          break;
        case r'id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.id = valueDes;
          break;
        case r'platform_fee_amount':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.platformFeeAmount = valueDes;
          break;
        case r'refund_amount':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.refundAmount = valueDes;
          break;
        case r'updated_at':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DateTime),
          ) as DateTime;
          result.updatedAt = valueDes;
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
        case r'period_from':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DateTime),
          ) as DateTime;
          result.periodFrom = valueDes;
          break;
        case r'gross_amount':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.grossAmount = valueDes;
          break;
        case r'store_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.storeId = valueDes;
          break;
        case r'approved_at':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DateTime),
          ) as DateTime;
          result.approvedAt = valueDes;
          break;
        case r'version':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.version = valueDes;
          break;
        case r'payment_fee_amount':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.paymentFeeAmount = valueDes;
          break;
        case r'approved_by_user_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.approvedByUserId = valueDes;
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
        case r'paid_at':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DateTime),
          ) as DateTime;
          result.paidAt = valueDes;
          break;
        case r'transfer_payable_amount':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.transferPayableAmount = valueDes;
          break;
        case r'status':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(SettlementStatusEnum),
          ) as SettlementStatusEnum;
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
  Settlement deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = SettlementBuilder();
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

class SettlementStatusEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'DRAFT')
  static const SettlementStatusEnum DRAFT = _$settlementStatusEnum_DRAFT;
  @BuiltValueEnumConst(wireName: r'APPROVED')
  static const SettlementStatusEnum APPROVED = _$settlementStatusEnum_APPROVED;
  @BuiltValueEnumConst(wireName: r'PAYMENT_REQUESTED')
  static const SettlementStatusEnum PAYMENT_REQUESTED = _$settlementStatusEnum_PAYMENT_REQUESTED;
  @BuiltValueEnumConst(wireName: r'PAID')
  static const SettlementStatusEnum PAID = _$settlementStatusEnum_PAID;

  static Serializer<SettlementStatusEnum> get serializer => _$settlementStatusEnumSerializer;

  const SettlementStatusEnum._(String name): super(name);

  static BuiltSet<SettlementStatusEnum> get values => _$settlementStatusEnumValues;
  static SettlementStatusEnum valueOf(String name) => _$settlementStatusEnumValueOf(name);
}

