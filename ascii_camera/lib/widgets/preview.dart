import 'package:ascii_camera/extensions/context_extensions.dart';
import 'package:ascii_camera/providers/camera_controller_provider.dart';
import 'package:camera/camera.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

const densityString =
    " .'`^\",:;Il!i><~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@\$";

class Preview extends HookConsumerWidget {
  const Preview({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final colorGrid = useState<List<List<Color>>>([]);
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
          data: (controller) {
            if (controller.value.isStreamingImages) {
              print("stopImageStream");
              controller.stopImageStream();
            }

            print("startImageStream");
            controller.startImageStream((image) {
              print("${image.height} x ${image.width}");
              for (final plane in image.planes) {
                final rows = List.generate(image.height, (index) {
                  final start = index * plane.bytesPerRow;
                  final end = start + plane.bytesPerRow;
                  return plane.bytes.sublist(start, end);
                });

                final rowPixelColors = rows.map((row) {
                  return List.generate(image.width, (index) {
                    final start = index * 4;
                    final end = start + 4;
                    final values = row.sublist(start, end);
                    return Color.fromARGB(
                        values[3], values[0], values[1], values[2]);
                  });
                }).toList();

                // print("first row: ${rows.first.length}");
                // print("first row: ${rows.first.sublist(0, 4)}");
                // print(
                //     "first rowPixelColors: ${rowPixelColors.first.first.computeLuminance()}");
                print("setting grid");
                colorGrid.value = rowPixelColors;
              }
            });
            if (colorGrid.value.isNotEmpty) {
              print("got grid");
              return Column(
                children: [
                  for (final row in colorGrid.value)
                    Row(
                      children: [
                        for (final color in row)
                          Container(
                            color: color,
                            height: 1,
                            width: 1,
                          ),
                      ],
                    ),
                ],
              );
            }
            return CameraPreview(
              controller,
            );
          },
        ),
      ),
    );
  }
}
