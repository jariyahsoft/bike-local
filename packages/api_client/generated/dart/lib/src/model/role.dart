//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'role.g.dart';

class Role extends EnumClass {

  @BuiltValueEnumConst(wireName: r'RENTER')
  static const Role RENTER = _$RENTER;
  @BuiltValueEnumConst(wireName: r'STORE_OWNER')
  static const Role STORE_OWNER = _$STORE_OWNER;
  @BuiltValueEnumConst(wireName: r'STORE_MANAGER')
  static const Role STORE_MANAGER = _$STORE_MANAGER;
  @BuiltValueEnumConst(wireName: r'STORE_STAFF')
  static const Role STORE_STAFF = _$STORE_STAFF;
  @BuiltValueEnumConst(wireName: r'STORE_ACCOUNTING')
  static const Role STORE_ACCOUNTING = _$STORE_ACCOUNTING;
  @BuiltValueEnumConst(wireName: r'PLATFORM_ADMIN')
  static const Role PLATFORM_ADMIN = _$PLATFORM_ADMIN;
  @BuiltValueEnumConst(wireName: r'PLATFORM_MODERATOR')
  static const Role PLATFORM_MODERATOR = _$PLATFORM_MODERATOR;
  @BuiltValueEnumConst(wireName: r'PLATFORM_SUPPORT')
  static const Role PLATFORM_SUPPORT = _$PLATFORM_SUPPORT;

  static Serializer<Role> get serializer => _$roleSerializer;

  const Role._(String name): super(name);

  static BuiltSet<Role> get values => _$values;
  static Role valueOf(String name) => _$valueOf(name);
}

/// Optionally, enum_class can generate a mixin to go with your enum for use
/// with Angular. It exposes your enum constants as getters. So, if you mix it
/// in to your Dart component class, the values become available to the
/// corresponding Angular template.
///
/// Trigger mixin generation by writing a line like this one next to your enum.
abstract class RoleMixin = Object with _$RoleMixin;
