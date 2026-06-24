//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'create_inventory_unit_request.g.dart';

/// CreateInventoryUnitRequest
///
/// Properties:
/// * [storeId] 
/// * [branchId] 
/// * [assetId] 
/// * [equipmentItemId] 
@BuiltValue()
abstract class CreateInventoryUnitRequest implements Built<CreateInventoryUnitRequest, CreateInventoryUnitRequestBuilder> {
  @BuiltValueField(wireName: r'store_id')
  String get storeId;

  @BuiltValueField(wireName: r'branch_id')
  String get branchId;

  @BuiltValueField(wireName: r'asset_id')
  String? get assetId;

  @BuiltValueField(wireName: r'equipment_item_id')
  String? get equipmentItemId;

  CreateInventoryUnitRequest._();

  factory CreateInventoryUnitRequest([void updates(CreateInventoryUnitRequestBuilder b)]) = _$CreateInventoryUnitRequest;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(CreateInventoryUnitRequestBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<CreateInventoryUnitRequest> get serializer => _$CreateInventoryUnitRequestSerializer();
}

class _$CreateInventoryUnitRequestSerializer implements PrimitiveSerializer<CreateInventoryUnitRequest> {
  @override
  final Iterable<Type> types = const [CreateInventoryUnitRequest, _$CreateInventoryUnitRequest];

  @override
  final String wireName = r'CreateInventoryUnitRequest';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    CreateInventoryUnitRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'store_id';
    yield serializers.serialize(
      object.storeId,
      specifiedType: const FullType(String),
    );
    yield r'branch_id';
    yield serializers.serialize(
      object.branchId,
      specifiedType: const FullType(String),
    );
    if (object.assetId != null) {
      yield r'asset_id';
      yield serializers.serialize(
        object.assetId,
        specifiedType: const FullType(String),
      );
    }
    if (object.equipmentItemId != null) {
      yield r'equipment_item_id';
      yield serializers.serialize(
        object.equipmentItemId,
        specifiedType: const FullType(String),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    CreateInventoryUnitRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required CreateInventoryUnitRequestBuilder result,
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
        case r'asset_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.assetId = valueDes;
          break;
        case r'equipment_item_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.equipmentItemId = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  CreateInventoryUnitRequest deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = CreateInventoryUnitRequestBuilder();
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

