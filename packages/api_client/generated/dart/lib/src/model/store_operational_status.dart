//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'store_operational_status.g.dart';

class StoreOperationalStatus extends EnumClass {

  @BuiltValueEnumConst(wireName: r'DRAFT')
  static const StoreOperationalStatus DRAFT = _$DRAFT;
  @BuiltValueEnumConst(wireName: r'ACTIVE')
  static const StoreOperationalStatus ACTIVE = _$ACTIVE;
  @BuiltValueEnumConst(wireName: r'INACTIVE')
  static const StoreOperationalStatus INACTIVE = _$INACTIVE;
  @BuiltValueEnumConst(wireName: r'SUSPENDED')
  static const StoreOperationalStatus SUSPENDED = _$SUSPENDED;
  @BuiltValueEnumConst(wireName: r'CLOSED')
  static const StoreOperationalStatus CLOSED = _$CLOSED;

  static Serializer<StoreOperationalStatus> get serializer => _$storeOperationalStatusSerializer;

  const StoreOperationalStatus._(String name): super(name);

  static BuiltSet<StoreOperationalStatus> get values => _$values;
  static StoreOperationalStatus valueOf(String name) => _$valueOf(name);
}

/// Optionally, enum_class can generate a mixin to go with your enum for use
/// with Angular. It exposes your enum constants as getters. So, if you mix it
/// in to your Dart component class, the values become available to the
/// corresponding Angular template.
///
/// Trigger mixin generation by writing a line like this one next to your enum.
abstract class StoreOperationalStatusMixin = Object with _$StoreOperationalStatusMixin;
