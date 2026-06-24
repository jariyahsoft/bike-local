//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'staff_report_item.g.dart';

/// StaffReportItem
///
/// Properties:
/// * [userId] 
/// * [role] 
/// * [branchIds] 
/// * [bookingsTouchedCount] 
/// * [cashConfirmedCount] 
@BuiltValue()
abstract class StaffReportItem implements Built<StaffReportItem, StaffReportItemBuilder> {
  @BuiltValueField(wireName: r'user_id')
  String get userId;

  @BuiltValueField(wireName: r'role')
  String get role;

  @BuiltValueField(wireName: r'branch_ids')
  BuiltList<String> get branchIds;

  @BuiltValueField(wireName: r'bookings_touched_count')
  int get bookingsTouchedCount;

  @BuiltValueField(wireName: r'cash_confirmed_count')
  int get cashConfirmedCount;

  StaffReportItem._();

  factory StaffReportItem([void updates(StaffReportItemBuilder b)]) = _$StaffReportItem;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(StaffReportItemBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<StaffReportItem> get serializer => _$StaffReportItemSerializer();
}

class _$StaffReportItemSerializer implements PrimitiveSerializer<StaffReportItem> {
  @override
  final Iterable<Type> types = const [StaffReportItem, _$StaffReportItem];

  @override
  final String wireName = r'StaffReportItem';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    StaffReportItem object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'user_id';
    yield serializers.serialize(
      object.userId,
      specifiedType: const FullType(String),
    );
    yield r'role';
    yield serializers.serialize(
      object.role,
      specifiedType: const FullType(String),
    );
    yield r'branch_ids';
    yield serializers.serialize(
      object.branchIds,
      specifiedType: const FullType(BuiltList, [FullType(String)]),
    );
    yield r'bookings_touched_count';
    yield serializers.serialize(
      object.bookingsTouchedCount,
      specifiedType: const FullType(int),
    );
    yield r'cash_confirmed_count';
    yield serializers.serialize(
      object.cashConfirmedCount,
      specifiedType: const FullType(int),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    StaffReportItem object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required StaffReportItemBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'user_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.userId = valueDes;
          break;
        case r'role':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.role = valueDes;
          break;
        case r'branch_ids':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BuiltList, [FullType(String)]),
          ) as BuiltList<String>;
          result.branchIds.replace(valueDes);
          break;
        case r'bookings_touched_count':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.bookingsTouchedCount = valueDes;
          break;
        case r'cash_confirmed_count':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.cashConfirmedCount = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  StaffReportItem deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = StaffReportItemBuilder();
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

