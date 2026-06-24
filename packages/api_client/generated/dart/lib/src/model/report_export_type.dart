//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'report_export_type.g.dart';

class ReportExportType extends EnumClass {

  @BuiltValueEnumConst(wireName: r'STORE_RENTAL')
  static const ReportExportType STORE_RENTAL = _$STORE_RENTAL;
  @BuiltValueEnumConst(wireName: r'STORE_REVENUE')
  static const ReportExportType STORE_REVENUE = _$STORE_REVENUE;
  @BuiltValueEnumConst(wireName: r'ASSET')
  static const ReportExportType ASSET = _$ASSET;
  @BuiltValueEnumConst(wireName: r'STAFF')
  static const ReportExportType STAFF = _$STAFF;
  @BuiltValueEnumConst(wireName: r'PLATFORM_OVERVIEW')
  static const ReportExportType PLATFORM_OVERVIEW = _$PLATFORM_OVERVIEW;
  @BuiltValueEnumConst(wireName: r'SETTLEMENT')
  static const ReportExportType SETTLEMENT = _$SETTLEMENT;

  static Serializer<ReportExportType> get serializer => _$reportExportTypeSerializer;

  const ReportExportType._(String name): super(name);

  static BuiltSet<ReportExportType> get values => _$values;
  static ReportExportType valueOf(String name) => _$valueOf(name);
}

/// Optionally, enum_class can generate a mixin to go with your enum for use
/// with Angular. It exposes your enum constants as getters. So, if you mix it
/// in to your Dart component class, the values become available to the
/// corresponding Angular template.
///
/// Trigger mixin generation by writing a line like this one next to your enum.
abstract class ReportExportTypeMixin = Object with _$ReportExportTypeMixin;

