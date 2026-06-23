//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'store_approval_status.g.dart';

class StoreApprovalStatus extends EnumClass {

  @BuiltValueEnumConst(wireName: r'DRAFT')
  static const StoreApprovalStatus DRAFT = _$DRAFT;
  @BuiltValueEnumConst(wireName: r'SUBMITTED')
  static const StoreApprovalStatus SUBMITTED = _$SUBMITTED;
  @BuiltValueEnumConst(wireName: r'UNDER_REVIEW')
  static const StoreApprovalStatus UNDER_REVIEW = _$UNDER_REVIEW;
  @BuiltValueEnumConst(wireName: r'REVISION_REQUIRED')
  static const StoreApprovalStatus REVISION_REQUIRED = _$REVISION_REQUIRED;
  @BuiltValueEnumConst(wireName: r'APPROVED')
  static const StoreApprovalStatus APPROVED = _$APPROVED;
  @BuiltValueEnumConst(wireName: r'REJECTED')
  static const StoreApprovalStatus REJECTED = _$REJECTED;
  @BuiltValueEnumConst(wireName: r'SUSPENDED')
  static const StoreApprovalStatus SUSPENDED = _$SUSPENDED;
  @BuiltValueEnumConst(wireName: r'CLOSED')
  static const StoreApprovalStatus CLOSED = _$CLOSED;

  static Serializer<StoreApprovalStatus> get serializer => _$storeApprovalStatusSerializer;

  const StoreApprovalStatus._(String name): super(name);

  static BuiltSet<StoreApprovalStatus> get values => _$values;
  static StoreApprovalStatus valueOf(String name) => _$valueOf(name);
}

/// Optionally, enum_class can generate a mixin to go with your enum for use
/// with Angular. It exposes your enum constants as getters. So, if you mix it
/// in to your Dart component class, the values become available to the
/// corresponding Angular template.
///
/// Trigger mixin generation by writing a line like this one next to your enum.
abstract class StoreApprovalStatusMixin = Object with _$StoreApprovalStatusMixin;
