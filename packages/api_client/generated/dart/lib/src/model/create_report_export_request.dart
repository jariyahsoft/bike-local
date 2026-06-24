//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:bike_local_generated_api_client/src/model/report_export_format.dart';
import 'package:bike_local_generated_api_client/src/model/report_export_type.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'create_report_export_request.g.dart';

/// CreateReportExportRequest
///
/// Properties:
/// * [type] 
/// * [format] 
@BuiltValue()
abstract class CreateReportExportRequest implements Built<CreateReportExportRequest, CreateReportExportRequestBuilder> {
  @BuiltValueField(wireName: r'type')
  ReportExportType get type;
  // enum typeEnum {  STORE_RENTAL,  STORE_REVENUE,  ASSET,  STAFF,  PLATFORM_OVERVIEW,  SETTLEMENT,  };

  @BuiltValueField(wireName: r'format')
  ReportExportFormat get format;
  // enum formatEnum {  CSV,  XLSX,  };

  CreateReportExportRequest._();

  factory CreateReportExportRequest([void updates(CreateReportExportRequestBuilder b)]) = _$CreateReportExportRequest;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(CreateReportExportRequestBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<CreateReportExportRequest> get serializer => _$CreateReportExportRequestSerializer();
}

class _$CreateReportExportRequestSerializer implements PrimitiveSerializer<CreateReportExportRequest> {
  @override
  final Iterable<Type> types = const [CreateReportExportRequest, _$CreateReportExportRequest];

  @override
  final String wireName = r'CreateReportExportRequest';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    CreateReportExportRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'type';
    yield serializers.serialize(
      object.type,
      specifiedType: const FullType(ReportExportType),
    );
    yield r'format';
    yield serializers.serialize(
      object.format,
      specifiedType: const FullType(ReportExportFormat),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    CreateReportExportRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required CreateReportExportRequestBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'type':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(ReportExportType),
          ) as ReportExportType;
          result.type = valueDes;
          break;
        case r'format':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(ReportExportFormat),
          ) as ReportExportFormat;
          result.format = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  CreateReportExportRequest deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = CreateReportExportRequestBuilder();
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

