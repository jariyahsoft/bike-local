//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'asset_report_item.g.dart';

/// AssetReportItem
///
/// Properties:
/// * [assetId] 
/// * [code] 
/// * [branchId] 
/// * [status] 
/// * [bookingsCount] 
/// * [completedCount] 
/// * [revenueAmount] 
@BuiltValue()
abstract class AssetReportItem implements Built<AssetReportItem, AssetReportItemBuilder> {
  @BuiltValueField(wireName: r'asset_id')
  String get assetId;

  @BuiltValueField(wireName: r'code')
  String get code;

  @BuiltValueField(wireName: r'branch_id')
  String get branchId;

  @BuiltValueField(wireName: r'status')
  String get status;

  @BuiltValueField(wireName: r'bookings_count')
  int get bookingsCount;

  @BuiltValueField(wireName: r'completed_count')
  int get completedCount;

  @BuiltValueField(wireName: r'revenue_amount')
  int get revenueAmount;

  AssetReportItem._();

  factory AssetReportItem([void updates(AssetReportItemBuilder b)]) = _$AssetReportItem;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(AssetReportItemBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<AssetReportItem> get serializer => _$AssetReportItemSerializer();
}

class _$AssetReportItemSerializer implements PrimitiveSerializer<AssetReportItem> {
  @override
  final Iterable<Type> types = const [AssetReportItem, _$AssetReportItem];

  @override
  final String wireName = r'AssetReportItem';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    AssetReportItem object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'asset_id';
    yield serializers.serialize(
      object.assetId,
      specifiedType: const FullType(String),
    );
    yield r'code';
    yield serializers.serialize(
      object.code,
      specifiedType: const FullType(String),
    );
    yield r'branch_id';
    yield serializers.serialize(
      object.branchId,
      specifiedType: const FullType(String),
    );
    yield r'status';
    yield serializers.serialize(
      object.status,
      specifiedType: const FullType(String),
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
    yield r'revenue_amount';
    yield serializers.serialize(
      object.revenueAmount,
      specifiedType: const FullType(int),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    AssetReportItem object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required AssetReportItemBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'asset_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.assetId = valueDes;
          break;
        case r'code':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.code = valueDes;
          break;
        case r'branch_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.branchId = valueDes;
          break;
        case r'status':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.status = valueDes;
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
        case r'revenue_amount':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.revenueAmount = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  AssetReportItem deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = AssetReportItemBuilder();
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

