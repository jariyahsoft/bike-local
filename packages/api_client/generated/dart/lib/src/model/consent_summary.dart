//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:bike_local_generated_api_client/src/model/consent_type.dart';
import 'package:bike_local_generated_api_client/src/model/gps_consent_scope.dart';
import 'package:bike_local_generated_api_client/src/model/consent_status.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'consent_summary.g.dart';

/// ConsentSummary
///
/// Properties:
/// * [type]
/// * [status]
/// * [versionCode]
/// * [purpose]
/// * [grantedAt]
/// * [gpsScope]
@BuiltValue()
abstract class ConsentSummary implements Built<ConsentSummary, ConsentSummaryBuilder> {
  @BuiltValueField(wireName: r'type')
  ConsentType get type;
  // enum typeEnum {  TERMS,  PRIVACY,  GPS,  MARKETING,  };

  @BuiltValueField(wireName: r'status')
  ConsentStatus get status;
  // enum statusEnum {  GRANTED,  DENIED,  REVOKED,  };

  @BuiltValueField(wireName: r'version_code')
  String get versionCode;

  @BuiltValueField(wireName: r'purpose')
  String get purpose;

  @BuiltValueField(wireName: r'granted_at')
  DateTime get grantedAt;

  @BuiltValueField(wireName: r'gps_scope')
  GpsConsentScope? get gpsScope;
  // enum gpsScopeEnum {  FOREGROUND_ONLY,  BACKGROUND_ALLOWED,  };

  ConsentSummary._();

  factory ConsentSummary([void updates(ConsentSummaryBuilder b)]) = _$ConsentSummary;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(ConsentSummaryBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<ConsentSummary> get serializer => _$ConsentSummarySerializer();
}

class _$ConsentSummarySerializer implements PrimitiveSerializer<ConsentSummary> {
  @override
  final Iterable<Type> types = const [ConsentSummary, _$ConsentSummary];

  @override
  final String wireName = r'ConsentSummary';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    ConsentSummary object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'type';
    yield serializers.serialize(
      object.type,
      specifiedType: const FullType(ConsentType),
    );
    yield r'status';
    yield serializers.serialize(
      object.status,
      specifiedType: const FullType(ConsentStatus),
    );
    yield r'version_code';
    yield serializers.serialize(
      object.versionCode,
      specifiedType: const FullType(String),
    );
    yield r'purpose';
    yield serializers.serialize(
      object.purpose,
      specifiedType: const FullType(String),
    );
    yield r'granted_at';
    yield serializers.serialize(
      object.grantedAt,
      specifiedType: const FullType(DateTime),
    );
    if (object.gpsScope != null) {
      yield r'gps_scope';
      yield serializers.serialize(
        object.gpsScope,
        specifiedType: const FullType(GpsConsentScope),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    ConsentSummary object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required ConsentSummaryBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'type':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(ConsentType),
          ) as ConsentType;
          result.type = valueDes;
          break;
        case r'status':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(ConsentStatus),
          ) as ConsentStatus;
          result.status = valueDes;
          break;
        case r'version_code':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.versionCode = valueDes;
          break;
        case r'purpose':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.purpose = valueDes;
          break;
        case r'granted_at':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DateTime),
          ) as DateTime;
          result.grantedAt = valueDes;
          break;
        case r'gps_scope':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(GpsConsentScope),
          ) as GpsConsentScope;
          result.gpsScope = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  ConsentSummary deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = ConsentSummaryBuilder();
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
