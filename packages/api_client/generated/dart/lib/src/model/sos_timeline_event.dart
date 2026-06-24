//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'sos_timeline_event.g.dart';

/// SosTimelineEvent
///
/// Properties:
/// * [eventType] 
/// * [occurredAt] 
/// * [actorUserId] 
/// * [notes] 
/// * [escalationLevel] 
@BuiltValue()
abstract class SosTimelineEvent implements Built<SosTimelineEvent, SosTimelineEventBuilder> {
  @BuiltValueField(wireName: r'event_type')
  SosTimelineEventEventTypeEnum get eventType;
  // enum eventTypeEnum {  OPENED,  ACKNOWLEDGED,  ESCALATED,  ASSIGNED,  STARTED,  RESOLVED,  CLOSED,  };

  @BuiltValueField(wireName: r'occurred_at')
  DateTime get occurredAt;

  @BuiltValueField(wireName: r'actor_user_id')
  String? get actorUserId;

  @BuiltValueField(wireName: r'notes')
  String? get notes;

  @BuiltValueField(wireName: r'escalation_level')
  int? get escalationLevel;

  SosTimelineEvent._();

  factory SosTimelineEvent([void updates(SosTimelineEventBuilder b)]) = _$SosTimelineEvent;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(SosTimelineEventBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<SosTimelineEvent> get serializer => _$SosTimelineEventSerializer();
}

class _$SosTimelineEventSerializer implements PrimitiveSerializer<SosTimelineEvent> {
  @override
  final Iterable<Type> types = const [SosTimelineEvent, _$SosTimelineEvent];

  @override
  final String wireName = r'SosTimelineEvent';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    SosTimelineEvent object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'event_type';
    yield serializers.serialize(
      object.eventType,
      specifiedType: const FullType(SosTimelineEventEventTypeEnum),
    );
    yield r'occurred_at';
    yield serializers.serialize(
      object.occurredAt,
      specifiedType: const FullType(DateTime),
    );
    if (object.actorUserId != null) {
      yield r'actor_user_id';
      yield serializers.serialize(
        object.actorUserId,
        specifiedType: const FullType(String),
      );
    }
    if (object.notes != null) {
      yield r'notes';
      yield serializers.serialize(
        object.notes,
        specifiedType: const FullType(String),
      );
    }
    if (object.escalationLevel != null) {
      yield r'escalation_level';
      yield serializers.serialize(
        object.escalationLevel,
        specifiedType: const FullType(int),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    SosTimelineEvent object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required SosTimelineEventBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'event_type':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(SosTimelineEventEventTypeEnum),
          ) as SosTimelineEventEventTypeEnum;
          result.eventType = valueDes;
          break;
        case r'occurred_at':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DateTime),
          ) as DateTime;
          result.occurredAt = valueDes;
          break;
        case r'actor_user_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.actorUserId = valueDes;
          break;
        case r'notes':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.notes = valueDes;
          break;
        case r'escalation_level':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.escalationLevel = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  SosTimelineEvent deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = SosTimelineEventBuilder();
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

class SosTimelineEventEventTypeEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'OPENED')
  static const SosTimelineEventEventTypeEnum OPENED = _$sosTimelineEventEventTypeEnum_OPENED;
  @BuiltValueEnumConst(wireName: r'ACKNOWLEDGED')
  static const SosTimelineEventEventTypeEnum ACKNOWLEDGED = _$sosTimelineEventEventTypeEnum_ACKNOWLEDGED;
  @BuiltValueEnumConst(wireName: r'ESCALATED')
  static const SosTimelineEventEventTypeEnum ESCALATED = _$sosTimelineEventEventTypeEnum_ESCALATED;
  @BuiltValueEnumConst(wireName: r'ASSIGNED')
  static const SosTimelineEventEventTypeEnum ASSIGNED = _$sosTimelineEventEventTypeEnum_ASSIGNED;
  @BuiltValueEnumConst(wireName: r'STARTED')
  static const SosTimelineEventEventTypeEnum STARTED = _$sosTimelineEventEventTypeEnum_STARTED;
  @BuiltValueEnumConst(wireName: r'RESOLVED')
  static const SosTimelineEventEventTypeEnum RESOLVED = _$sosTimelineEventEventTypeEnum_RESOLVED;
  @BuiltValueEnumConst(wireName: r'CLOSED')
  static const SosTimelineEventEventTypeEnum CLOSED = _$sosTimelineEventEventTypeEnum_CLOSED;

  static Serializer<SosTimelineEventEventTypeEnum> get serializer => _$sosTimelineEventEventTypeEnumSerializer;

  const SosTimelineEventEventTypeEnum._(String name): super(name);

  static BuiltSet<SosTimelineEventEventTypeEnum> get values => _$sosTimelineEventEventTypeEnumValues;
  static SosTimelineEventEventTypeEnum valueOf(String name) => _$sosTimelineEventEventTypeEnumValueOf(name);
}

