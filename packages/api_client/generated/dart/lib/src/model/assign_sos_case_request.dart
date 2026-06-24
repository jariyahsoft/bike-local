//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'assign_sos_case_request.g.dart';

/// AssignSosCaseRequest
///
/// Properties:
/// * [assignedStaffUserId] 
/// * [notes] 
@BuiltValue()
abstract class AssignSosCaseRequest implements Built<AssignSosCaseRequest, AssignSosCaseRequestBuilder> {
  @BuiltValueField(wireName: r'assigned_staff_user_id')
  String get assignedStaffUserId;

  @BuiltValueField(wireName: r'notes')
  String? get notes;

  AssignSosCaseRequest._();

  factory AssignSosCaseRequest([void updates(AssignSosCaseRequestBuilder b)]) = _$AssignSosCaseRequest;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(AssignSosCaseRequestBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<AssignSosCaseRequest> get serializer => _$AssignSosCaseRequestSerializer();
}

class _$AssignSosCaseRequestSerializer implements PrimitiveSerializer<AssignSosCaseRequest> {
  @override
  final Iterable<Type> types = const [AssignSosCaseRequest, _$AssignSosCaseRequest];

  @override
  final String wireName = r'AssignSosCaseRequest';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    AssignSosCaseRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'assigned_staff_user_id';
    yield serializers.serialize(
      object.assignedStaffUserId,
      specifiedType: const FullType(String),
    );
    if (object.notes != null) {
      yield r'notes';
      yield serializers.serialize(
        object.notes,
        specifiedType: const FullType(String),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    AssignSosCaseRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required AssignSosCaseRequestBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'assigned_staff_user_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.assignedStaffUserId = valueDes;
          break;
        case r'notes':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.notes = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  AssignSosCaseRequest deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = AssignSosCaseRequestBuilder();
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

