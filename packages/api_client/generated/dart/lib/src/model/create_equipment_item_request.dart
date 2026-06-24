//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'create_equipment_item_request.g.dart';

/// CreateEquipmentItemRequest
///
/// Properties:
/// * [storeId] 
/// * [branchId] 
/// * [name] 
/// * [rentalMode] 
/// * [priceAmount] - Integer minor units only.
/// * [depositAmount] - Integer minor units only.
/// * [currency] 
@BuiltValue()
abstract class CreateEquipmentItemRequest implements Built<CreateEquipmentItemRequest, CreateEquipmentItemRequestBuilder> {
  @BuiltValueField(wireName: r'store_id')
  String get storeId;

  @BuiltValueField(wireName: r'branch_id')
  String? get branchId;

  @BuiltValueField(wireName: r'name')
  String get name;

  @BuiltValueField(wireName: r'rental_mode')
  CreateEquipmentItemRequestRentalModeEnum get rentalMode;
  // enum rentalModeEnum {  SEPARATE,  BUNDLED,  PACKAGE_INCLUDED,  DEPOSIT_REQUIRED,  };

  /// Integer minor units only.
  @BuiltValueField(wireName: r'price_amount')
  int? get priceAmount;

  /// Integer minor units only.
  @BuiltValueField(wireName: r'deposit_amount')
  int? get depositAmount;

  @BuiltValueField(wireName: r'currency')
  String? get currency;

  CreateEquipmentItemRequest._();

  factory CreateEquipmentItemRequest([void updates(CreateEquipmentItemRequestBuilder b)]) = _$CreateEquipmentItemRequest;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(CreateEquipmentItemRequestBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<CreateEquipmentItemRequest> get serializer => _$CreateEquipmentItemRequestSerializer();
}

class _$CreateEquipmentItemRequestSerializer implements PrimitiveSerializer<CreateEquipmentItemRequest> {
  @override
  final Iterable<Type> types = const [CreateEquipmentItemRequest, _$CreateEquipmentItemRequest];

  @override
  final String wireName = r'CreateEquipmentItemRequest';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    CreateEquipmentItemRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'store_id';
    yield serializers.serialize(
      object.storeId,
      specifiedType: const FullType(String),
    );
    if (object.branchId != null) {
      yield r'branch_id';
      yield serializers.serialize(
        object.branchId,
        specifiedType: const FullType(String),
      );
    }
    yield r'name';
    yield serializers.serialize(
      object.name,
      specifiedType: const FullType(String),
    );
    yield r'rental_mode';
    yield serializers.serialize(
      object.rentalMode,
      specifiedType: const FullType(CreateEquipmentItemRequestRentalModeEnum),
    );
    if (object.priceAmount != null) {
      yield r'price_amount';
      yield serializers.serialize(
        object.priceAmount,
        specifiedType: const FullType(int),
      );
    }
    if (object.depositAmount != null) {
      yield r'deposit_amount';
      yield serializers.serialize(
        object.depositAmount,
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
  }

  @override
  Object serialize(
    Serializers serializers,
    CreateEquipmentItemRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required CreateEquipmentItemRequestBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'store_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.storeId = valueDes;
          break;
        case r'branch_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.branchId = valueDes;
          break;
        case r'name':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.name = valueDes;
          break;
        case r'rental_mode':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(CreateEquipmentItemRequestRentalModeEnum),
          ) as CreateEquipmentItemRequestRentalModeEnum;
          result.rentalMode = valueDes;
          break;
        case r'price_amount':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.priceAmount = valueDes;
          break;
        case r'deposit_amount':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.depositAmount = valueDes;
          break;
        case r'currency':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.currency = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  CreateEquipmentItemRequest deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = CreateEquipmentItemRequestBuilder();
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

class CreateEquipmentItemRequestRentalModeEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'SEPARATE')
  static const CreateEquipmentItemRequestRentalModeEnum SEPARATE = _$createEquipmentItemRequestRentalModeEnum_SEPARATE;
  @BuiltValueEnumConst(wireName: r'BUNDLED')
  static const CreateEquipmentItemRequestRentalModeEnum BUNDLED = _$createEquipmentItemRequestRentalModeEnum_BUNDLED;
  @BuiltValueEnumConst(wireName: r'PACKAGE_INCLUDED')
  static const CreateEquipmentItemRequestRentalModeEnum PACKAGE_INCLUDED = _$createEquipmentItemRequestRentalModeEnum_PACKAGE_INCLUDED;
  @BuiltValueEnumConst(wireName: r'DEPOSIT_REQUIRED')
  static const CreateEquipmentItemRequestRentalModeEnum DEPOSIT_REQUIRED = _$createEquipmentItemRequestRentalModeEnum_DEPOSIT_REQUIRED;

  static Serializer<CreateEquipmentItemRequestRentalModeEnum> get serializer => _$createEquipmentItemRequestRentalModeEnumSerializer;

  const CreateEquipmentItemRequestRentalModeEnum._(String name): super(name);

  static BuiltSet<CreateEquipmentItemRequestRentalModeEnum> get values => _$createEquipmentItemRequestRentalModeEnumValues;
  static CreateEquipmentItemRequestRentalModeEnum valueOf(String name) => _$createEquipmentItemRequestRentalModeEnumValueOf(name);
}

