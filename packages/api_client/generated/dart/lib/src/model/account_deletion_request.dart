//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'account_deletion_request.g.dart';

/// AccountDeletionRequest
///
/// Properties:
/// * [version]
/// * [reason]
@BuiltValue()
abstract class AccountDeletionRequest implements Built<AccountDeletionRequest, AccountDeletionRequestBuilder> {
  @BuiltValueField(wireName: r'version')
  int get version;

  @BuiltValueField(wireName: r'reason')
  String? get reason;

  AccountDeletionRequest._();

  factory AccountDeletionRequest([void updates(AccountDeletionRequestBuilder b)]) = _$AccountDeletionRequest;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(AccountDeletionRequestBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<AccountDeletionRequest> get serializer => _$AccountDeletionRequestSerializer();
}

class _$AccountDeletionRequestSerializer implements PrimitiveSerializer<AccountDeletionRequest> {
  @override
  final Iterable<Type> types = const [AccountDeletionRequest, _$AccountDeletionRequest];

  @override
  final String wireName = r'AccountDeletionRequest';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    AccountDeletionRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'version';
    yield serializers.serialize(
      object.version,
      specifiedType: const FullType(int),
    );
    if (object.reason != null) {
      yield r'reason';
      yield serializers.serialize(
        object.reason,
        specifiedType: const FullType(String),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    AccountDeletionRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required AccountDeletionRequestBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'version':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.version = valueDes;
          break;
        case r'reason':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.reason = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  AccountDeletionRequest deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = AccountDeletionRequestBuilder();
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
