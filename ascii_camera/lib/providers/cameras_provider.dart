import 'package:camera/camera.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'cameras_provider.g.dart';

@riverpod
List<CameraDescription> cameras(CamerasRef ref) {
  throw Exception("Not initialized");
}
