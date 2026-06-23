//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'availability_check_request.g.dart';

/// AvailabilityCheckRequest
///
/// Properties:
/// * [assetIds]
/// * [startAt]
/// * [endAt]
/// * [reserve] - When true, create transaction-safe booking hold blocks if available.
/// * [referenceId] - Booking or hold reference used on availability blocks.
@BuiltValue()
abstract class AvailabilityCheckRequest implements Built<AvailabilityCheckRequest, AvailabilityCheckRequestBuilder> {
  @BuiltValueField(wireName: r'asset_ids')
  BuiltList<String> get assetIds;

  @BuiltValueField(wireName: r'start_at')
  DateTime get startAt;

  @BuiltValueField(wireName: r'end_at')
  DateTime get endAt;

  /// When true, create transaction-safe booking hold blocks if available.
  @BuiltValueField(wireName: r'reserve')
  bool? get reserve;

  /// Booking or hold reference used on availability blocks.
  @BuiltValueField(wireName: r'reference_id')
  String? get referenceId;

  AvailabilityCheckRequest._();

  factory AvailabilityCheckRequest([void updates(AvailabilityCheckRequestBuilder b)]) = _$AvailabilityCheckRequest;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(AvailabilityCheckRequestBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<AvailabilityCheckRequest> get serializer => _$AvailabilityCheckRequestSerializer();
}

class _$AvailabilityCheckRequestSerializer implements PrimitiveSerializer<AvailabilityCheckRequest> {
  @override
  final Iterable<Type> types = const [AvailabilityCheckRequest, _$AvailabilityCheckRequest];

  @override
  final String wireName = r'AvailabilityCheckRequest';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    AvailabilityCheckRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'asset_ids';
    yield serializers.serialize(
      object.assetIds,
      specifiedType: const FullType(BuiltList, [FullType(String)]),
    );
    yield r'start_at';
    yield serializers.serialize(
      object.startAt,
      specifiedType: const FullType(DateTime),
    );
    yield r'end_at';
    yield serializers.serialize(
      object.endAt,
      specifiedType: const FullType(DateTime),
    );
    if (object.reserve != null) {
      yield r'reserve';
      yield serializers.serialize(
        object.reserve,
        specifiedType: const FullType(bool),
      );
    }
    if (object.referenceId != null) {
      yield r'reference_id';
      yield serializers.serialize(
        object.referenceId,
        specifiedType: const FullType(String),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    AvailabilityCheckRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required AvailabilityCheckRequestBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'asset_ids':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BuiltList, [FullType(String)]),
          ) as BuiltList<String>;
          result.assetIds.replace(valueDes);
          break;
        case r'start_at':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DateTime),
          ) as DateTime;
          result.startAt = valueDes;
          break;
        case r'end_at':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DateTime),
          ) as DateTime;
          result.endAt = valueDes;
          break;
        case r'reserve':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(bool),
          ) as bool;
          result.reserve = valueDes;
          break;
        case r'reference_id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.referenceId = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  AvailabilityCheckRequest deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = AvailabilityCheckRequestBuilder();
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
