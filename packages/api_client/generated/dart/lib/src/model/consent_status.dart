//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'consent_status.g.dart';

class ConsentStatus extends EnumClass {

  @BuiltValueEnumConst(wireName: r'GRANTED')
  static const ConsentStatus GRANTED = _$GRANTED;
  @BuiltValueEnumConst(wireName: r'DENIED')
  static const ConsentStatus DENIED = _$DENIED;
  @BuiltValueEnumConst(wireName: r'REVOKED')
  static const ConsentStatus REVOKED = _$REVOKED;

  static Serializer<ConsentStatus> get serializer => _$consentStatusSerializer;

  const ConsentStatus._(String name): super(name);

  static BuiltSet<ConsentStatus> get values => _$values;
  static ConsentStatus valueOf(String name) => _$valueOf(name);
}

/// Optionally, enum_class can generate a mixin to go with your enum for use
/// with Angular. It exposes your enum constants as getters. So, if you mix it
/// in to your Dart component class, the values become available to the
/// corresponding Angular template.
///
/// Trigger mixin generation by writing a line like this one next to your enum.
abstract class ConsentStatusMixin = Object with _$ConsentStatusMixin;
