//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'return_inspection.g.dart';

/// ReturnInspection
///
/// Properties:
/// * [condition]
/// * [imageRefs]
/// * [equipmentComplete]
/// * [damageNotes]
/// * [damageChargeAmount]
/// * [currency]
/// * [decision]
@BuiltValue()
abstract class ReturnInspection implements Built<ReturnInspection, ReturnInspectionBuilder> {
  @BuiltValueField(wireName: r'condition')
  String get condition;

  @BuiltValueField(wireName: r'image_refs')
  BuiltList<String> get imageRefs;

  @BuiltValueField(wireName: r'equipment_complete')
  bool get equipmentComplete;

  @BuiltValueField(wireName: r'damage_notes')
  String? get damageNotes;

  @BuiltValueField(wireName: r'damage_charge_amount')
  int? get damageChargeAmount;

  @BuiltValueField(wireName: r'currency')
  String? get currency;

  @BuiltValueField(wireName: r'decision')
  ReturnInspectionDecisionEnum get decision;
  // enum decisionEnum {  PASS,  DAMAGE_CHARGE,  MAINTENANCE,  DISPUTE,  };

  ReturnInspection._();

  factory ReturnInspection([void updates(ReturnInspectionBuilder b)]) = _$ReturnInspection;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(ReturnInspectionBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<ReturnInspection> get serializer => _$ReturnInspectionSerializer();
}

class _$ReturnInspectionSerializer implements PrimitiveSerializer<ReturnInspection> {
  @override
  final Iterable<Type> types = const [ReturnInspection, _$ReturnInspection];

  @override
  final String wireName = r'ReturnInspection';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    ReturnInspection object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'condition';
    yield serializers.serialize(
      object.condition,
      specifiedType: const FullType(String),
    );
    yield r'image_refs';
    yield serializers.serialize(
      object.imageRefs,
      specifiedType: const FullType(BuiltList, [FullType(String)]),
    );
    yield r'equipment_complete';
    yield serializers.serialize(
      object.equipmentComplete,
      specifiedType: const FullType(bool),
    );
    if (object.damageNotes != null) {
      yield r'damage_notes';
      yield serializers.serialize(
        object.damageNotes,
        specifiedType: const FullType(String),
      );
    }
    if (object.damageChargeAmount != null) {
      yield r'damage_charge_amount';
      yield serializers.serialize(
        object.damageChargeAmount,
        specifiedType: const FullType(int),
      );
    }
    if (object.currency != null) {
      yield r'currency';
      yield serializers.serialize(
        object.currency,
        specifiedType: const FullType(String),
      );
    }
    yield r'decision';
    yield serializers.serialize(
      object.decision,
      specifiedType: const FullType(ReturnInspectionDecisionEnum),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    ReturnInspection object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required ReturnInspectionBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'condition':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.condition = valueDes;
          break;
        case r'image_refs':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BuiltList, [FullType(String)]),
          ) as BuiltList<String>;
          result.imageRefs.replace(valueDes);
          break;
        case r'equipment_complete':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(bool),
          ) as bool;
          result.equipmentComplete = valueDes;
          break;
        case r'damage_notes':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.damageNotes = valueDes;
          break;
        case r'damage_charge_amount':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.damageChargeAmount = valueDes;
          break;
        case r'currency':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.currency = valueDes;
          break;
        case r'decision':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(ReturnInspectionDecisionEnum),
          ) as ReturnInspectionDecisionEnum;
          result.decision = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  ReturnInspection deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = ReturnInspectionBuilder();
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

class ReturnInspectionDecisionEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'PASS')
  static const ReturnInspectionDecisionEnum PASS = _$returnInspectionDecisionEnum_PASS;
  @BuiltValueEnumConst(wireName: r'DAMAGE_CHARGE')
  static const ReturnInspectionDecisionEnum DAMAGE_CHARGE = _$returnInspectionDecisionEnum_DAMAGE_CHARGE;
  @BuiltValueEnumConst(wireName: r'MAINTENANCE')
  static const ReturnInspectionDecisionEnum MAINTENANCE = _$returnInspectionDecisionEnum_MAINTENANCE;
  @BuiltValueEnumConst(wireName: r'DISPUTE')
  static const ReturnInspectionDecisionEnum DISPUTE = _$returnInspectionDecisionEnum_DISPUTE;

  static Serializer<ReturnInspectionDecisionEnum> get serializer => _$returnInspectionDecisionEnumSerializer;

  const ReturnInspectionDecisionEnum._(String name): super(name);

  static BuiltSet<ReturnInspectionDecisionEnum> get values => _$returnInspectionDecisionEnumValues;
  static ReturnInspectionDecisionEnum valueOf(String name) => _$returnInspectionDecisionEnumValueOf(name);
}
