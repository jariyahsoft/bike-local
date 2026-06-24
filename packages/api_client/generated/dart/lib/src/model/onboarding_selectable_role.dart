//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'onboarding_selectable_role.g.dart';

class OnboardingSelectableRole extends EnumClass {

  @BuiltValueEnumConst(wireName: r'RENTER')
  static const OnboardingSelectableRole RENTER = _$RENTER;
  @BuiltValueEnumConst(wireName: r'STORE_OWNER')
  static const OnboardingSelectableRole STORE_OWNER = _$STORE_OWNER;

  static Serializer<OnboardingSelectableRole> get serializer => _$onboardingSelectableRoleSerializer;

  const OnboardingSelectableRole._(String name): super(name);

  static BuiltSet<OnboardingSelectableRole> get values => _$values;
  static OnboardingSelectableRole valueOf(String name) => _$valueOf(name);
}

/// Optionally, enum_class can generate a mixin to go with your enum for use
/// with Angular. It exposes your enum constants as getters. So, if you mix it
/// in to your Dart component class, the values become available to the
/// corresponding Angular template.
///
/// Trigger mixin generation by writing a line like this one next to your enum.
abstract class OnboardingSelectableRoleMixin = Object with _$OnboardingSelectableRoleMixin;

