//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'update_asset_request.g.dart';

/// UpdateAssetRequest
///
/// Properties:
/// * [status]
/// * [basePrice]
/// * [depositAmount]
/// * [version]
@BuiltValue()
abstract class UpdateAssetRequest implements Built<UpdateAssetRequest, UpdateAssetRequestBuilder> {
  @BuiltValueField(wireName: r'status')
  String? get status;

  @BuiltValueField(wireName: r'base_price')
  int? get basePrice;

  @BuiltValueField(wireName: r'deposit_amount')
  int? get depositAmount;

  @BuiltValueField(wireName: r'version')
  int get version;

  UpdateAssetRequest._();

  factory UpdateAssetRequest([void updates(UpdateAssetRequestBuilder b)]) = _$UpdateAssetRequest;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(UpdateAssetRequestBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<UpdateAssetRequest> get serializer => _$UpdateAssetRequestSerializer();
}

class _$UpdateAssetRequestSerializer implements PrimitiveSerializer<UpdateAssetRequest> {
  @override
  final Iterable<Type> types = const [UpdateAssetRequest, _$UpdateAssetRequest];

  @override
  final String wireName = r'UpdateAssetRequest';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    UpdateAssetRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    if (object.status != null) {
      yield r'status';
      yield serializers.serialize(
        object.status,
        specifiedType: const FullType(String),
      );
    }
    if (object.basePrice != null) {
      yield r'base_price';
      yield serializers.serialize(
        object.basePrice,
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
    yield r'version';
    yield serializers.serialize(
      object.version,
      specifiedType: const FullType(int),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    UpdateAssetRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required UpdateAssetRequestBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'status':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.status = valueDes;
          break;
        case r'base_price':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.basePrice = valueDes;
          break;
        case r'deposit_amount':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.depositAmount = valueDes;
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
  UpdateAssetRequest deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = UpdateAssetRequestBuilder();
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
