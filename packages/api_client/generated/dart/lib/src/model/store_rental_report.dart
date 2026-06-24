//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'store_rental_report.g.dart';

/// StoreRentalReport
///
/// Properties:
/// * [storeId] 
/// * [branchId] 
/// * [from] 
/// * [to] 
/// * [bookingsCount] 
/// * [completedCount] 
/// * [cancelledCount] 
/// * [noShowCount] 
/// * [overdueCount] 
/// * [averageDurationMinutes] 
@BuiltValue()
abstract class StoreRentalReport implements Built<StoreRentalReport, StoreRentalReportBuilder> {
  @BuiltValueField(wireName: r'store_id')
  String get storeId;

  @BuiltValueField(wireName: r'branch_id')
  String? get branchId;

  @BuiltValueField(wireName: r'from')
  DateTime get from;

  @BuiltValueField(wireName: r'to')
  DateTime get to;

  @BuiltValueField(wireName: r'bookings_count')
  int get bookingsCount;

  @BuiltValueField(wireName: r'completed_count')
  int get completedCount;

  @BuiltValueField(wireName: r'cancelled_count')
  int get cancelledCount;

  @BuiltValueField(wireName: r'no_show_count')
  int get noShowCount;

  @BuiltValueField(wireName: r'overdue_count')
  int get overdueCount;

  @BuiltValueField(wireName: r'average_duration_minutes')
  int get averageDurationMinutes;

  StoreRentalReport._();

  factory StoreRentalReport([void updates(StoreRentalReportBuilder b)]) = _$StoreRentalReport;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(StoreRentalReportBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<StoreRentalReport> get serializer => _$StoreRentalReportSerializer();
}

class _$StoreRentalReportSerializer implements PrimitiveSerializer<StoreRentalReport> {
  @override
  final Iterable<Type> types = const [StoreRentalReport, _$StoreRentalReport];

  @override
  final String wireName = r'StoreRentalReport';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    StoreRentalReport object, {
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
    yield r'bookings_count';
    yield serializers.serialize(
      object.bookingsCount,
      specifiedType: const FullType(int),
    );
    yield r'completed_count';
    yield serializers.serialize(
      object.completedCount,
      specifiedType: const FullType(int),
    );
    yield r'cancelled_count';
    yield serializers.serialize(
      object.cancelledCount,
      specifiedType: const FullType(int),
    );
    yield r'no_show_count';
    yield serializers.serialize(
      object.noShowCount,
      specifiedType: const FullType(int),
    );
    yield r'overdue_count';
    yield serializers.serialize(
      object.overdueCount,
      specifiedType: const FullType(int),
    );
    yield r'average_duration_minutes';
    yield serializers.serialize(
      object.averageDurationMinutes,
      specifiedType: const FullType(int),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    StoreRentalReport object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required StoreRentalReportBuilder result,
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
        case r'overdue_count':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.overdueCount = valueDes;
          break;
        case r'average_duration_minutes':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.averageDurationMinutes = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  StoreRentalReport deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = StoreRentalReportBuilder();
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

