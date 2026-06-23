//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'platform_report.g.dart';

/// PlatformReport
///
/// Properties:
/// * [usersCount]
/// * [storesCount]
/// * [branchesCount]
/// * [assetsCount]
/// * [bookingsCount]
/// * [gmvAmount]
/// * [platformRevenueAmount]
/// * [currency]
@BuiltValue()
abstract class PlatformReport implements Built<PlatformReport, PlatformReportBuilder> {
  @BuiltValueField(wireName: r'users_count')
  int get usersCount;

  @BuiltValueField(wireName: r'stores_count')
  int get storesCount;

  @BuiltValueField(wireName: r'branches_count')
  int? get branchesCount;

  @BuiltValueField(wireName: r'assets_count')
  int? get assetsCount;

  @BuiltValueField(wireName: r'bookings_count')
  int get bookingsCount;

  @BuiltValueField(wireName: r'gmv_amount')
  int get gmvAmount;

  @BuiltValueField(wireName: r'platform_revenue_amount')
  int get platformRevenueAmount;

  @BuiltValueField(wireName: r'currency')
  String get currency;

  PlatformReport._();

  factory PlatformReport([void updates(PlatformReportBuilder b)]) = _$PlatformReport;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(PlatformReportBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<PlatformReport> get serializer => _$PlatformReportSerializer();
}

class _$PlatformReportSerializer implements PrimitiveSerializer<PlatformReport> {
  @override
  final Iterable<Type> types = const [PlatformReport, _$PlatformReport];

  @override
  final String wireName = r'PlatformReport';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    PlatformReport object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'users_count';
    yield serializers.serialize(
      object.usersCount,
      specifiedType: const FullType(int),
    );
    yield r'stores_count';
    yield serializers.serialize(
      object.storesCount,
      specifiedType: const FullType(int),
    );
    if (object.branchesCount != null) {
      yield r'branches_count';
      yield serializers.serialize(
        object.branchesCount,
        specifiedType: const FullType(int),
      );
    }
    if (object.assetsCount != null) {
      yield r'assets_count';
      yield serializers.serialize(
        object.assetsCount,
        specifiedType: const FullType(int),
      );
    }
    yield r'bookings_count';
    yield serializers.serialize(
      object.bookingsCount,
      specifiedType: const FullType(int),
    );
    yield r'gmv_amount';
    yield serializers.serialize(
      object.gmvAmount,
      specifiedType: const FullType(int),
    );
    yield r'platform_revenue_amount';
    yield serializers.serialize(
      object.platformRevenueAmount,
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
    PlatformReport object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required PlatformReportBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'users_count':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.usersCount = valueDes;
          break;
        case r'stores_count':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.storesCount = valueDes;
          break;
        case r'branches_count':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.branchesCount = valueDes;
          break;
        case r'assets_count':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.assetsCount = valueDes;
          break;
        case r'bookings_count':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.bookingsCount = valueDes;
          break;
        case r'gmv_amount':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.gmvAmount = valueDes;
          break;
        case r'platform_revenue_amount':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.platformRevenueAmount = valueDes;
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
  PlatformReport deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = PlatformReportBuilder();
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
