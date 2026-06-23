//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'content_approval_status.g.dart';

class ContentApprovalStatus extends EnumClass {

  @BuiltValueEnumConst(wireName: r'DRAFT')
  static const ContentApprovalStatus DRAFT = _$DRAFT;
  @BuiltValueEnumConst(wireName: r'SUBMITTED')
  static const ContentApprovalStatus SUBMITTED = _$SUBMITTED;
  @BuiltValueEnumConst(wireName: r'UNDER_REVIEW')
  static const ContentApprovalStatus UNDER_REVIEW = _$UNDER_REVIEW;
  @BuiltValueEnumConst(wireName: r'REVISION_REQUIRED')
  static const ContentApprovalStatus REVISION_REQUIRED = _$REVISION_REQUIRED;
  @BuiltValueEnumConst(wireName: r'APPROVED')
  static const ContentApprovalStatus APPROVED = _$APPROVED;
  @BuiltValueEnumConst(wireName: r'REJECTED')
  static const ContentApprovalStatus REJECTED = _$REJECTED;
  @BuiltValueEnumConst(wireName: r'SUSPENDED')
  static const ContentApprovalStatus SUSPENDED = _$SUSPENDED;
  @BuiltValueEnumConst(wireName: r'OUTDATED')
  static const ContentApprovalStatus OUTDATED = _$OUTDATED;

  static Serializer<ContentApprovalStatus> get serializer => _$contentApprovalStatusSerializer;

  const ContentApprovalStatus._(String name): super(name);

  static BuiltSet<ContentApprovalStatus> get values => _$values;
  static ContentApprovalStatus valueOf(String name) => _$valueOf(name);
}

/// Optionally, enum_class can generate a mixin to go with your enum for use
/// with Angular. It exposes your enum constants as getters. So, if you mix it
/// in to your Dart component class, the values become available to the
/// corresponding Angular template.
///
/// Trigger mixin generation by writing a line like this one next to your enum.
abstract class ContentApprovalStatusMixin = Object with _$ContentApprovalStatusMixin;
