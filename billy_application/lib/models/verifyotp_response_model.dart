// ignore_for_file: no_leading_underscores_for_local_identifiers

import 'dart:convert';

VerifyOTPResponseModel verifyOTPResponseJson(String str) =>
    VerifyOTPResponseModel.fromJson(json.decode(str));

class VerifyOTPResponseModel {
  VerifyOTPResponseModel({
    required this.message,
    required this.data,
  });
  late final String message;
  late final Data data;

  VerifyOTPResponseModel.fromJson(Map<String, dynamic> json) {
    message = json['message'];
    data = Data.fromJson(json['data']);
  }

  Map<String, dynamic> toJson() {
    final _data = <String, dynamic>{};

    _data['message'] = message;
    _data['data'] = data;

    return _data;
  }
}

class Data {
  late final String customerName;
  late final String customerEmailID;
  late final bool customerStatus;
  late final int customerContact;
  late final String customerId;
  late final String token;
  late final String? expirdAt;

  Data({
    required this.customerName,
    required this.customerEmailID,
    required this.customerStatus,
    required this.customerContact,
    required this.customerId,
    required this.token,
    this.expirdAt,
  });

  Data.fromJson(Map<String, dynamic> json) {
    customerName = json['customerName'];
    customerEmailID = json['customerEmailID'];
    customerStatus = json['customerStatus'];
    customerContact = json['customerContact'];
    customerId = json['customerId'];
    token = json['token'];
    expirdAt = DateTime.now().add(const Duration(hours: 24)).toString();
  }

  Map<String, dynamic> toJson() {
    final _data = <String, dynamic>{};

    _data['customerName'] = customerName;
    _data['customerEmailID'] = customerEmailID;
    _data['customerStatus'] = customerStatus;
    _data['customerContact'] = customerContact;
    _data['customerId'] = customerId;
    _data['token'] = token;
    _data['expirdAt'] = expirdAt;

    return _data;
  }
}
