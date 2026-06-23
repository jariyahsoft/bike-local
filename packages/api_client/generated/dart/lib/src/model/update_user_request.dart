//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'update_user_request.g.dart';

/// UpdateUserRequest
///
/// Properties:
/// * [displayName] 
/// * [locale] 
/// * [version] 
@BuiltValue()
abstract class UpdateUserRequest implements Built<UpdateUserRequest, UpdateUserRequestBuilder> {
  @BuiltValueField(wireName: r'display_name')
  String? get displayName;

  @BuiltValueField(wireName: r'locale')
  UpdateUserRequestLocaleEnum? get locale;
  // enum localeEnum {  th,  en,  };

  @BuiltValueField(wireName: r'version')
  int get version;

  UpdateUserRequest._();

  factory UpdateUserRequest([void updates(UpdateUserRequestBuilder b)]) = _$UpdateUserRequest;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(UpdateUserRequestBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<UpdateUserRequest> get serializer => _$UpdateUserRequestSerializer();
}

class _$UpdateUserRequestSerializer implements PrimitiveSerializer<UpdateUserRequest> {
  @override
  final Iterable<Type> types = const [UpdateUserRequest, _$UpdateUserRequest];

  @override
  final String wireName = r'UpdateUserRequest';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    UpdateUserRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    if (object.displayName != null) {
      yield r'display_name';
      yield serializers.serialize(
        object.displayName,
        specifiedType: const FullType(String),
      );
    }
    if (object.locale != null) {
      yield r'locale';
      yield serializers.serialize(
        object.locale,
        specifiedType: const FullType(UpdateUserRequestLocaleEnum),
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
    UpdateUserRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required UpdateUserRequestBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'display_name':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.displayName = valueDes;
          break;
        case r'locale':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(UpdateUserRequestLocaleEnum),
          ) as UpdateUserRequestLocaleEnum;
          result.locale = valueDes;
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
  UpdateUserRequest deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = UpdateUserRequestBuilder();
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

class UpdateUserRequestLocaleEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'th')
  static const UpdateUserRequestLocaleEnum th = _$updateUserRequestLocaleEnum_th;
  @BuiltValueEnumConst(wireName: r'en')
  static const UpdateUserRequestLocaleEnum en = _$updateUserRequestLocaleEnum_en;

  static Serializer<UpdateUserRequestLocaleEnum> get serializer => _$updateUserRequestLocaleEnumSerializer;

  const UpdateUserRequestLocaleEnum._(String name): super(name);

  static BuiltSet<UpdateUserRequestLocaleEnum> get values => _$updateUserRequestLocaleEnumValues;
  static UpdateUserRequestLocaleEnum valueOf(String name) => _$updateUserRequestLocaleEnumValueOf(name);
}

