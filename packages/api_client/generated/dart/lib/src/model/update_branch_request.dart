//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:built_value/json_object.dart';
import 'package:bike_local_generated_api_client/src/model/temporary_closure.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'update_branch_request.g.dart';

/// UpdateBranchRequest
///
/// Properties:
/// * [name] 
/// * [phone] 
/// * [openingHours] 
/// * [status] 
/// * [temporaryClosure] 
/// * [version] 
@BuiltValue()
abstract class UpdateBranchRequest implements Built<UpdateBranchRequest, UpdateBranchRequestBuilder> {
  @BuiltValueField(wireName: r'name')
  String? get name;

  @BuiltValueField(wireName: r'phone')
  String? get phone;

  @BuiltValueField(wireName: r'opening_hours')
  BuiltMap<String, JsonObject?>? get openingHours;

  @BuiltValueField(wireName: r'status')
  UpdateBranchRequestStatusEnum? get status;
  // enum statusEnum {  ACTIVE,  TEMPORARILY_CLOSED,  INACTIVE,  };

  @BuiltValueField(wireName: r'temporary_closure')
  TemporaryClosure? get temporaryClosure;

  @BuiltValueField(wireName: r'version')
  int get version;

  UpdateBranchRequest._();

  factory UpdateBranchRequest([void updates(UpdateBranchRequestBuilder b)]) = _$UpdateBranchRequest;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(UpdateBranchRequestBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<UpdateBranchRequest> get serializer => _$UpdateBranchRequestSerializer();
}

class _$UpdateBranchRequestSerializer implements PrimitiveSerializer<UpdateBranchRequest> {
  @override
  final Iterable<Type> types = const [UpdateBranchRequest, _$UpdateBranchRequest];

  @override
  final String wireName = r'UpdateBranchRequest';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    UpdateBranchRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    if (object.name != null) {
      yield r'name';
      yield serializers.serialize(
        object.name,
        specifiedType: const FullType(String),
      );
    }
    if (object.phone != null) {
      yield r'phone';
      yield serializers.serialize(
        object.phone,
        specifiedType: const FullType(String),
      );
    }
    if (object.openingHours != null) {
      yield r'opening_hours';
      yield serializers.serialize(
        object.openingHours,
        specifiedType: const FullType(BuiltMap, [FullType(String), FullType.nullable(JsonObject)]),
      );
    }
    if (object.status != null) {
      yield r'status';
      yield serializers.serialize(
        object.status,
        specifiedType: const FullType(UpdateBranchRequestStatusEnum),
      );
    }
    if (object.temporaryClosure != null) {
      yield r'temporary_closure';
      yield serializers.serialize(
        object.temporaryClosure,
        specifiedType: const FullType(TemporaryClosure),
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
    UpdateBranchRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required UpdateBranchRequestBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'name':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.name = valueDes;
          break;
        case r'phone':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.phone = valueDes;
          break;
        case r'opening_hours':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BuiltMap, [FullType(String), FullType.nullable(JsonObject)]),
          ) as BuiltMap<String, JsonObject?>;
          result.openingHours.replace(valueDes);
          break;
        case r'status':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(UpdateBranchRequestStatusEnum),
          ) as UpdateBranchRequestStatusEnum;
          result.status = valueDes;
          break;
        case r'temporary_closure':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(TemporaryClosure),
          ) as TemporaryClosure;
          result.temporaryClosure.replace(valueDes);
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
  UpdateBranchRequest deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = UpdateBranchRequestBuilder();
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

class UpdateBranchRequestStatusEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'ACTIVE')
  static const UpdateBranchRequestStatusEnum ACTIVE = _$updateBranchRequestStatusEnum_ACTIVE;
  @BuiltValueEnumConst(wireName: r'TEMPORARILY_CLOSED')
  static const UpdateBranchRequestStatusEnum TEMPORARILY_CLOSED = _$updateBranchRequestStatusEnum_TEMPORARILY_CLOSED;
  @BuiltValueEnumConst(wireName: r'INACTIVE')
  static const UpdateBranchRequestStatusEnum INACTIVE = _$updateBranchRequestStatusEnum_INACTIVE;

  static Serializer<UpdateBranchRequestStatusEnum> get serializer => _$updateBranchRequestStatusEnumSerializer;

  const UpdateBranchRequestStatusEnum._(String name): super(name);

  static BuiltSet<UpdateBranchRequestStatusEnum> get values => _$updateBranchRequestStatusEnumValues;
  static UpdateBranchRequestStatusEnum valueOf(String name) => _$updateBranchRequestStatusEnumValueOf(name);
}

