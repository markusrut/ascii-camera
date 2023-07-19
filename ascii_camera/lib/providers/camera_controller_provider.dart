import 'package:ascii_camera/providers/cameras_provider.dart';
import 'package:camera/camera.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'camera_controller_provider.g.dart';

@riverpod
Future<CameraController> cameraController(CameraControllerRef ref) async {
  final cameras = ref.watch(camerasProvider);

  final controller = CameraController(
    cameras.first,
    ResolutionPreset.low,
  );

  ref.onDispose(() {
    controller.dispose();
  });

  await controller.initialize();

  return controller;
}
