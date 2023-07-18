import 'package:ascii_camera/extensions/context_extensions.dart';
import 'package:ascii_camera/providers/app_lifecycle_provider.dart';
import 'package:ascii_camera/providers/cameras_provider.dart';
import 'package:ascii_camera/theme/theme.dart';
import 'package:ascii_camera/widgets/preview.dart';
import 'package:camera/camera.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  final cameras = await availableCameras();

  runApp(
    ProviderScope(
      overrides: [
        camerasProvider.overrideWithValue(cameras),
      ],
      child: const MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "ASCII Camera",
      theme: lightThemeData,
      darkTheme: darkThemeData,
      themeMode: ThemeMode.system,
      debugShowCheckedModeBanner: false,
      home: const AsciiCameraApp(),
    );
  }
}

class AsciiCameraApp extends HookConsumerWidget {
  const AsciiCameraApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    useOnAppLifecycleStateChange(
      (prev, curr) => ref.read(appLifecycleProvider.notifier).setState(curr),
    );

    return Scaffold(
      backgroundColor: context.colorScheme.background,
      body: SafeArea(
        minimum: const EdgeInsets.all(16),
        child: OrientationBuilder(
          builder: (context, orientation) {
            const double spacing = 16;

            final toolbarActions = [
              IconButton(
                onPressed: () {},
                icon: Icon(
                  Icons.camera_alt,
                  color: context.colorScheme.onPrimary,
                ),
              ),
              IconButton(
                onPressed: () {},
                icon: Icon(
                  Icons.upload_file,
                  color: context.colorScheme.onPrimary,
                ),
              ),
            ];

            final children = [
              const Expanded(child: Preview()),
              const SizedBox(height: spacing, width: spacing),
              Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(16),
                  color: context.colorScheme.primary,
                ),
                child: orientation == Orientation.portrait
                    ? Row(children: toolbarActions)
                    : Column(children: toolbarActions),
              ),
            ];

            return orientation == Orientation.portrait
                ? Column(children: children)
                : Row(children: children);
          },
        ),
      ),
    );
  }
}
