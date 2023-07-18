import 'package:ascii_camera/extensions/context_extensions.dart';
import 'package:ascii_camera/providers/camera_controller_provider.dart';
import 'package:camera/camera.dart';
import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

class Preview extends ConsumerWidget {
  const Preview({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final cameraController = ref.watch(cameraControllerProvider);

    return ClipRRect(
      borderRadius: BorderRadius.circular(16),
      child: Container(
        color: context.colorScheme.primary,
        child: cameraController.when(
          error: (err, st) => Center(
            child: Text(err.toString()),
          ),
          loading: () => const Center(
            child: CircularProgressIndicator(),
          ),
          data: (data) => CameraPreview(data),
        ),
      ),
    );
  }
}
