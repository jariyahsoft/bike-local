//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

import 'dart:async';

import 'package:built_value/json_object.dart';
import 'package:built_value/serializer.dart';
import 'package:dio/dio.dart';

import 'package:bike_local_generated_api_client/src/api_util.dart';
import 'package:bike_local_generated_api_client/src/model/error_envelope.dart';
import 'package:bike_local_generated_api_client/src/model/list_assets200_response.dart';
import 'package:bike_local_generated_api_client/src/model/list_stores200_response.dart';

class SearchApi {

  final Dio _dio;

  final Serializers _serializers;

  const SearchApi(this._dio, this._serializers);

  /// Search available assets by date/time and filters.
  ///
  ///
  /// Parameters:
  /// * [q]
  /// * [storeId]
  /// * [branchId]
  /// * [startAt]
  /// * [endAt]
  /// * [limit]
  /// * [cursor]
  /// * [xCorrelationId]
  /// * [cancelToken] - A [CancelToken] that can be used to cancel the operation
  /// * [headers] - Can be used to add additional headers to the request
  /// * [extras] - Can be used to add flags to the request
  /// * [validateStatus] - A [ValidateStatus] callback that can be used to determine request success based on the HTTP status of the response
  /// * [onSendProgress] - A [ProgressCallback] that can be used to get the send progress
  /// * [onReceiveProgress] - A [ProgressCallback] that can be used to get the receive progress
  ///
  /// Returns a [Future] containing a [Response] with a [ListAssets200Response] as data
  /// Throws [DioException] if API call or serialization fails
  Future<Response<ListAssets200Response>> searchAssets({
    String? q,
    String? storeId,
    String? branchId,
    DateTime? startAt,
    DateTime? endAt,
    int? limit = 20,
    String? cursor,
    String? xCorrelationId,
    CancelToken? cancelToken,
    Map<String, dynamic>? headers,
    Map<String, dynamic>? extra,
    ValidateStatus? validateStatus,
    ProgressCallback? onSendProgress,
    ProgressCallback? onReceiveProgress,
  }) async {
    final _path = r'/search/assets';
    final _options = Options(
      method: r'GET',
      headers: <String, dynamic>{
        if (xCorrelationId != null) r'X-Correlation-Id': xCorrelationId,
        ...?headers,
      },
      extra: <String, dynamic>{
        'secure': <Map<String, String>>[
          {
            'type': 'apiKey',
            'name': 'appCheck',
            'keyName': 'X-Firebase-AppCheck',
            'where': 'header',
          },{
            'type': 'http',
            'scheme': 'bearer',
            'name': 'bearerAuth',
          },
        ],
        ...?extra,
      },
      validateStatus: validateStatus,
    );

    final _queryParameters = <String, dynamic>{
      if (q != null) r'q': encodeQueryParameter(_serializers, q, const FullType(String)),
      if (storeId != null) r'store_id': encodeQueryParameter(_serializers, storeId, const FullType(String)),
      if (branchId != null) r'branch_id': encodeQueryParameter(_serializers, branchId, const FullType(String)),
      if (startAt != null) r'start_at': encodeQueryParameter(_serializers, startAt, const FullType(DateTime)),
      if (endAt != null) r'end_at': encodeQueryParameter(_serializers, endAt, const FullType(DateTime)),
      if (limit != null) r'limit': encodeQueryParameter(_serializers, limit, const FullType(int)),
      if (cursor != null) r'cursor': encodeQueryParameter(_serializers, cursor, const FullType(String)),
    };

    final _response = await _dio.request<Object>(
      _path,
      options: _options,
      queryParameters: _queryParameters,
      cancelToken: cancelToken,
      onSendProgress: onSendProgress,
      onReceiveProgress: onReceiveProgress,
    );

    ListAssets200Response? _responseData;

    try {
      final rawResponse = _response.data;
      _responseData = rawResponse == null ? null : _serializers.deserialize(
        rawResponse,
        specifiedType: const FullType(ListAssets200Response),
      ) as ListAssets200Response;

    } catch (error, stackTrace) {
      throw DioException(
        requestOptions: _response.requestOptions,
        response: _response,
        type: DioExceptionType.unknown,
        error: error,
        stackTrace: stackTrace,
      );
    }

    return Response<ListAssets200Response>(
      data: _responseData,
      headers: _response.headers,
      isRedirect: _response.isRedirect,
      requestOptions: _response.requestOptions,
      redirects: _response.redirects,
      statusCode: _response.statusCode,
      statusMessage: _response.statusMessage,
      extra: _response.extra,
    );
  }

  /// Search stores by text, location, and filters.
  ///
  ///
  /// Parameters:
  /// * [q]
  /// * [latitude]
  /// * [longitude]
  /// * [limit]
  /// * [cursor]
  /// * [xCorrelationId]
  /// * [cancelToken] - A [CancelToken] that can be used to cancel the operation
  /// * [headers] - Can be used to add additional headers to the request
  /// * [extras] - Can be used to add flags to the request
  /// * [validateStatus] - A [ValidateStatus] callback that can be used to determine request success based on the HTTP status of the response
  /// * [onSendProgress] - A [ProgressCallback] that can be used to get the send progress
  /// * [onReceiveProgress] - A [ProgressCallback] that can be used to get the receive progress
  ///
  /// Returns a [Future] containing a [Response] with a [ListStores200Response] as data
  /// Throws [DioException] if API call or serialization fails
  Future<Response<ListStores200Response>> searchStores({
    String? q,
    num? latitude,
    num? longitude,
    int? limit = 20,
    String? cursor,
    String? xCorrelationId,
    CancelToken? cancelToken,
    Map<String, dynamic>? headers,
    Map<String, dynamic>? extra,
    ValidateStatus? validateStatus,
    ProgressCallback? onSendProgress,
    ProgressCallback? onReceiveProgress,
  }) async {
    final _path = r'/search/stores';
    final _options = Options(
      method: r'GET',
      headers: <String, dynamic>{
        if (xCorrelationId != null) r'X-Correlation-Id': xCorrelationId,
        ...?headers,
      },
      extra: <String, dynamic>{
        'secure': <Map<String, String>>[
          {
            'type': 'apiKey',
            'name': 'appCheck',
            'keyName': 'X-Firebase-AppCheck',
            'where': 'header',
          },{
            'type': 'http',
            'scheme': 'bearer',
            'name': 'bearerAuth',
          },
        ],
        ...?extra,
      },
      validateStatus: validateStatus,
    );

    final _queryParameters = <String, dynamic>{
      if (q != null) r'q': encodeQueryParameter(_serializers, q, const FullType(String)),
      if (latitude != null) r'latitude': encodeQueryParameter(_serializers, latitude, const FullType(num)),
      if (longitude != null) r'longitude': encodeQueryParameter(_serializers, longitude, const FullType(num)),
      if (limit != null) r'limit': encodeQueryParameter(_serializers, limit, const FullType(int)),
      if (cursor != null) r'cursor': encodeQueryParameter(_serializers, cursor, const FullType(String)),
    };

    final _response = await _dio.request<Object>(
      _path,
      options: _options,
      queryParameters: _queryParameters,
      cancelToken: cancelToken,
      onSendProgress: onSendProgress,
      onReceiveProgress: onReceiveProgress,
    );

    ListStores200Response? _responseData;

    try {
      final rawResponse = _response.data;
      _responseData = rawResponse == null ? null : _serializers.deserialize(
        rawResponse,
        specifiedType: const FullType(ListStores200Response),
      ) as ListStores200Response;

    } catch (error, stackTrace) {
      throw DioException(
        requestOptions: _response.requestOptions,
        response: _response,
        type: DioExceptionType.unknown,
        error: error,
        stackTrace: stackTrace,
      );
    }

    return Response<ListStores200Response>(
      data: _responseData,
      headers: _response.headers,
      isRedirect: _response.isRedirect,
      requestOptions: _response.requestOptions,
      redirects: _response.redirects,
      statusCode: _response.statusCode,
      statusMessage: _response.statusMessage,
      extra: _response.extra,
    );
  }

}
