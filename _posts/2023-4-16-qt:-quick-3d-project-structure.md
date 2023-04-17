---
layout: post
---
# Overview
When using 3d models, the number of assets can increase quickly. In order to keep things organized, I discuss an example project structure for using 3d models in Qt.

The code is available here: https://github.com/rnickles/rigged_animated_3d_model_tutorial


## Setup the project

The first thing to do is setup the project. Within Qt Creator create a new Qt Quick Application:

<image src="/assets/images/Untitled.png" width="450" /> 

As far as project configuration goes, we’ll use the default options of a `qmake` project with a 6.2 minimum version of `Qt` and a build kit of `Qt 6.4.0 GCC 64-bit`. 

The next thing to do is add a couple new resource files. A `.qrc` file is a file that lists the resources that are embedded in a Qt application or library and is used to manage these resources during runtime.

<image src="/assets/images/Untitled(1).png" width="450" /> 

Call these `qml.qrc` and `assets.qrc`. Doing it through Qt Creator will cause it to be automatically added to the `.pro` file.

- `qml.qrc` will contain our `qml` project code
- `assets.qrc` will contain our 3D models which will be rendered. This code is mostly machine-generated.

Next, we’ll need to modify the `.pro` file. The `.pro` file contains information about the application such as its name, version number, and which files are needed to build the application. It also tells the computer which tools to use to build the application and how to link all the files together.

Specify that we are using the `quick` and `quick3D` modules:

```bash
QT += quick quick3d
```

Indicate what our runtime resources are:

```bash
RESOURCES += assets.qrc \
	qml.qrc
```

In the end, the `.pro` file should look like this:

```cpp
QT += quick quick3d

SOURCES += \
        main.cpp

RESOURCES += assets.qrc \
    qml.qrc

# Additional import path used to resolve QML modules in Qt Creator's code model
QML_IMPORT_PATH =

# Additional import path used to resolve QML modules just for Qt Quick Designer
QML_DESIGNER_IMPORT_PATH =

# Default rules for deployment.
qnx: target.path = /tmp/$${TARGET}/bin
else: unix:!android: target.path = /opt/$${TARGET}/bin
!isEmpty(target.path): INSTALLS += target
```

Add `main.qml` to `qml.qrc`. `qml.qrc` should look like this:

```xml
<RCC>
    <qresource prefix="/">
        <file>main.qml</file>
    </qresource>
</RCC>
```

Now modify line 10 of `main.cpp`:

```cpp
const QUrl url(u"qrc:/rigged_animated_3d_model_tutorial/main.qml"_qs);
```

So that it now references the `qrc` file:

```cpp
const QUrl url("qrc:/main.qml");
```

Finally, place a directory called ‘3dModels’ in the root directory of the project. At this point the project file structure should look like this:

```bash
.
├── 3dModels
├── assets.qrc
├── main.cpp
├── main.qml
├── qml.qrc
├── rigged_animated_3d_model_tutorial.pro
└── rigged_animated_3d_model_tutorial.pro.user

1 directory, 6 files
```

When compiled and run, the program should just display a blank white screen with a banner. It should look like this:

<image src="/assets/images/Untitled(2).png" width="450" /> 
