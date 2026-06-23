//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'gps_consent_scope.g.dart';

class GpsConsentScope extends EnumClass {

  @BuiltValueEnumConst(wireName: r'FOREGROUND_ONLY')
  static const GpsConsentScope FOREGROUND_ONLY = _$FOREGROUND_ONLY;
  @BuiltValueEnumConst(wireName: r'BACKGROUND_ALLOWED')
  static const GpsConsentScope BACKGROUND_ALLOWED = _$BACKGROUND_ALLOWED;

  static Serializer<GpsConsentScope> get serializer => _$gpsConsentScopeSerializer;

  const GpsConsentScope._(String name): super(name);

  static BuiltSet<GpsConsentScope> get values => _$values;
  static GpsConsentScope valueOf(String name) => _$valueOf(name);
}

/// Optionally, enum_class can generate a mixin to go with your enum for use
/// with Angular. It exposes your enum constants as getters. So, if you mix it
/// in to your Dart component class, the values become available to the
/// corresponding Angular template.
///
/// Trigger mixin generation by writing a line like this one next to your enum.
abstract class GpsConsentScopeMixin = Object with _$GpsConsentScopeMixin;
