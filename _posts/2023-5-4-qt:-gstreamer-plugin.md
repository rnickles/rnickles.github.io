# Qt 6 GStreamer plugin example

This [example](https://gitlab.freedesktop.org/gstreamer/gstreamer/-/tree/1.22.0/subprojects/gst-plugins-good/tests/examples/qt6/qmlsink) given in the source code of GStreamer shows how a custom GStreamer pipeline can be constructed that exposes a GStreamer sink in the qml. 

## Install GStreamer

To get it working, you need a version of GStreamer ≥ 1.20.3:

```bash
 git clone https://gitlab.freedesktop.org/gstreamer/gstreamer.git
```

Next tell `meson` to prepare the build and specify the build should go to `/opt/gstreamer` in order to avoid conflict with any system-wide GStreamer installations:

```bash
meson setup --prefix=/opt/gstreamer builddir
```

Build GStreamer:

```bash
ninja -C builddir/
```

With privileges, install GStreamer to `/opt/gstreamer`:

```bash
sudo ninja install -C builddir/
```

### Sanity checks:

```bash
$ /opt/gstreamer/bin/gst-inspect-1.0 --version
gst-inspect-1.0 version 1.23.0
GStreamer 1.20.3
Unknown package origin
```

and:

```bash
$ /opt/gstreamer/bin/gst-inspect-1.0 qmlglsink
Factory Details:
  Rank                     none (0)
  Long-name                Qt Video Sink
  Klass                    Sink/Video
  Description              A video sink that renders to a QQuickItem
  Author                   Matthew Waters <matthew@centricular.com>
  Documentation            https://gstreamer.freedesktop.org/documentation/qmlgl/qmlglsink.html

Plugin Details:
  Name                     qmlgl
  Description              Qt gl plugin
  Filename                 /usr/lib/x86_64-linux-gnu/gstreamer-1.0/libgstqmlgl.so
  Version                  1.20.3
  License                  LGPL
  Source module            gst-plugins-good
  Documentation            https://gstreamer.freedesktop.org/documentation/qmlgl/
  Source release date      2022-06-15
  Binary package           GStreamer Good Plugins (Ubuntu)
  Origin URL               https://launchpad.net/distros/ubuntu/+source/gst-plugins-good1.0
```

## Integrate with Qt 6.4

Grab a copy of the [example](https://gitlab.freedesktop.org/gstreamer/gstreamer/-/tree/1.22.0/subprojects/gst-plugins-good/tests/examples/qt6/qmlsink). 

Modify the .pro file so that `qmake` knows where the custom GStreamer installation is:

```xml
INCLUDEPATH += /opt/gstreamer/include/gstreamer-1.0 \
               /opt/gstreamer/lib/x86_64-linux-gnu/gstreamer-1.0/include
LIBS += -L/opt/gstreamer/lib/x86_64-linux-gnu -lgstreamer-1.0 \
        -lgstapp-1.0 -lgstvideo-1.0 -lgstbase-1.0 \
        -lgstpbutils-1.0 -lgstaudio-1.0
```

Also, remove the line `INCLUDEPATH += ../lib` from the .pro file.

- The directory`/opt/gstreamer/include/gstreamer-1.0` contains the GStreamer header files for the core GStreamer framework
- `/opt/gstreamer/lib/x86_64-linux-gnu/gstreamer-1.0/include` contains the header files for GStreamer plugins
- `/opt/gstreamer/lib/x86_64-linux-gnu` contains the GStreamer libraries needed to link the Qt project with the GStreamer framework and its plugins.

The libraries needed for linking are:

- `libgstreamer-1.0.so`: The core GStreamer library.
- `libgstapp-1.0.so`: The GStreamer application development library.
- `libgstvideo-1.0.so`: The GStreamer video processing library.
- `libgstbase-1.0.so`: The GStreamer base library.
- `libgstpbutils-1.0.so`: The GStreamer plug-in base utility library.
- `libgstaudio-1.0.so`: The GStreamer audio processing library.

## Done!

If you’re using Qt Creator all that’s left is to hit play.