import 'package:flutter/material.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'app_lifecycle_provider.g.dart';

@riverpod
class AppLifecycle extends _$AppLifecycle {
  @override
  AppLifecycleState? build() {
    return null;
  }

  void setState(AppLifecycleState state) {
    this.state = state;
  }
}
