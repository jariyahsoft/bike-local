//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'handover_request.g.dart';

/// HandoverRequest
///
/// Properties:
/// * [staffUserId] 
/// * [qrBookingToken] 
/// * [checklistImageRefs] 
/// * [conditionNotes] 
/// * [equipmentConfirmed] 
/// * [existingDamageNotes] 
/// * [version] 
@BuiltValue()
abstract class HandoverRequest implements Built<HandoverRequest, HandoverRequestBuilder> {
  @BuiltValueField(wireName: r'staff_user_id')
  String get staffUserId;

  @BuiltValueField(wireName: r'qr_booking_token')
  String get qrBookingToken;

  @BuiltValueField(wireName: r'checklist_image_refs')
  BuiltList<String> get checklistImageRefs;

  @BuiltValueField(wireName: r'condition_notes')
  String get conditionNotes;

  @BuiltValueField(wireName: r'equipment_confirmed')
  bool get equipmentConfirmed;

  @BuiltValueField(wireName: r'existing_damage_notes')
  String? get existingDamageNotes;

  @BuiltValueField(wireName: r'version')
  int get version;

  HandoverRequest._();

  factory HandoverRequest([void updates(HandoverRequestBuilder b)]) = _$HandoverRequest;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(HandoverRequestBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<HandoverRequest> get serializer => _$HandoverRequestSerializer();
}

class _$HandoverRequestSerializer implements PrimitiveSerializer<HandoverRequest> {
  @override
  final Iterable<Type> types = const [HandoverRequest, _$HandoverRequest];

  @override
  final String wireName = r'HandoverRequest';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    HandoverRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'staff_user_id';
    yield serializers.serialize(
      object.staffUserId,
      specifiedType: const FullType(String),
    );
    yield r'qr_booking_token';
    yield serializers.serialize(
      object.qrBookingToken,
      specifiedType: const FullType(String),
    );
    yield r'checklist_image_refs';
    yield serializers.serialize(
      object.checklistImageRefs,
      specifiedType: const FullType(BuiltList, [FullType(String)]),
    );
    yield r'condition_notes';
    yield serializers.serialize(
      object.conditionNotes,
      specifiedType: const FullType(String),
    );
    yield r'equipment_confirmed';
    yield serializers.serialize(
      object.equipmentConfirmed,
      specifiedType: const FullType(bool),
    );
    if (object.existingDamageNotes != null) {
      yield r'existing_damage_notes';
      yield serializers.serialize(
        object.existingDamageNotes,
        specifiedType: const FullType(String),
      );
    }
    yield r'version';
    yield serializers.serialize(
      object.version,
      specifiedType: const FullType(int),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    HandoverRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required HandoverRequestBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'staff_user_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.staffUserId = valueDes;
          break;
        case r'qr_booking_token':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.qrBookingToken = valueDes;
          break;
        case r'checklist_image_refs':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BuiltList, [FullType(String)]),
          ) as BuiltList<String>;
          result.checklistImageRefs.replace(valueDes);
          break;
        case r'condition_notes':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.conditionNotes = valueDes;
          break;
        case r'equipment_confirmed':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(bool),
          ) as bool;
          result.equipmentConfirmed = valueDes;
          break;
        case r'existing_damage_notes':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.existingDamageNotes = valueDes;
          break;
        case r'version':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.version = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  HandoverRequest deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = HandoverRequestBuilder();
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

