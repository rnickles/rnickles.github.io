---
layout: post
---
# Qt and rigged 3D models

## Overview

One way to bring a 3d animated character into a program is to use a rigged 3D model. I will discuss a workflow where an animated 3D model is downloaded from mixamo (this isn’t a tutorial about animation or blender) and then processed into a form usable within a Qt program. 

1) download an animated character from mixamo

2) use balsam tool to convert the .fbx into a QML component, and associated assets

3) Note on project structure

4) use the 3D model in a scene

## Setup the project

The first thing to do is setup the project. Within Qt Creator create a new Qt Quick Application:

![Untitled](Qt%20and%20rigged%203D%20models%20d6c7962fa7ea436abb7999967eaac578/Untitled.png)

As far as project configuration goes, we’ll use the default options of a `qmake` project with a 6.2 minimum version of `Qt` and a build kit of `Qt 6.4.0 GCC 64-bit`. 

The next thing to do is add a couple new resource files. A `.qrc` file is a file that lists the resources that are embedded in a Qt application or library and is used to manage these resources during runtime.

![Untitled](Qt%20and%20rigged%203D%20models%20d6c7962fa7ea436abb7999967eaac578/Untitled%201.png)

Call these `qml.qrc` and `assets.qrc`. 

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

In the end, the .pro file should look like this:

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

Add `main.qml` to `qml.qrc`(Add Prefix `‘/’` and Add Files `‘main.qml’`). `qml.qrc` should look like this:

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

When compiled and run, the program should look like this:

![Untitled](Qt%20and%20rigged%203D%20models%20d6c7962fa7ea436abb7999967eaac578/Untitled%202.png)

## Acquire a 3D model on Mixamo

Adobe’s Mixamo offers a large, free library of pre-made 3D characters, animations, and motions that can be customized and downloaded for use in games, films, and other 3D projects. 

To keep things relatively simple I went with the X Bot doing the ‘silly dancing’ animation:

![Untitled](Qt%20and%20rigged%203D%20models%20d6c7962fa7ea436abb7999967eaac578/Untitled%203.png)

Download the `.fbx` file with the default settings:

![Untitled](Qt%20and%20rigged%203D%20models%20d6c7962fa7ea436abb7999967eaac578/Untitled%204.png)

## Convert the `.fbx` file

An `.fbx` file can contain 3D models, animations, textures, and other data related to a 3D scene. A 3D model created in one software application can be exported as an `.fbx` file and imported into another application without losing important information about the model, such as the materials or animation data. 

In our case, we are using the `.fbx` file format to go between Mixamo and Qt. 

First create a directory called `XBot` in the `3dModels` directory:

```bash
rigged_animated_3d_model_tutorial/3dModels$ mkdir XBot
```

Within the `XBot` directory run `balsam` tool on the acquired `.fbx` file. Balsam tool conditions 3d assets into a format usable within QML code. For ease of use, I renamed the fbx file `xbot_silly_dancing.fbx`. Make sure to use the correct version of Balsam tool.

```bash
rigged_animated_3d_model_tutorial/3dModels/XBot$ ~/Qt/6.4.0/gcc_64/bin/balsam ~/Downloads/xbot_silly_dancing.fbx
```

This should output a .qml file and some corresponding .mesh and .qad files:

```bash
generated file:  "/home/robby/Projects/qt_projects/rigged_animated_3d_model_tutorial/3dModels/XBot/Xbot_silly_dancing.qml"
generated file:  "/home/robby/Projects/qt_projects/rigged_animated_3d_model_tutorial/3dModels/XBot/meshes/beta_Surface.mesh"
generated file:  "/home/robby/Projects/qt_projects/rigged_animated_3d_model_tutorial/3dModels/XBot/meshes/beta_Joints.mesh"
generated file:  "/home/robby/Projects/qt_projects/rigged_animated_3d_model_tutorial/3dModels/XBot/animations/mixamorig_Spine1_rotation.qad"
generated file:  "/home/robby/Projects/qt_projects/rigged_animated_3d_model_tutorial/3dModels/XBot/animations/mixamorig_Spine2_rotation.qad"
generated file:  "/home/robby/Projects/qt_projects/rigged_animated_3d_model_tutorial/3dModels/XBot/animations/mixamorig_LeftForeArm_rotation.qad"
generated file:  "/home/robby/Projects/qt_projects/rigged_animated_3d_model_tutorial/3dModels/XBot/animations/mixamorig_LeftArm_rotation.qad"
generated file:  "/home/robby/Projects/qt_projects/rigged_animated_3d_model_tutorial/3dModels/XBot/animations/mixamorig_Head_rotation.qad"
generated file:  "/home/robby/Projects/qt_projects/rigged_animated_3d_model_tutorial/3dModels/XBot/animations/mixamorig_RightHand_rotation.qad"
generated file:  "/home/robby/Projects/qt_projects/rigged_animated_3d_model_tutorial/3dModels/XBot/animations/mixamorig_RightLeg_rotation.qad"
generated file:  "/home/robby/Projects/qt_projects/rigged_animated_3d_model_tutorial/3dModels/XBot/animations/mixamorig_RightForeArm_rotation.qad"
generated file:  "/home/robby/Projects/qt_projects/rigged_animated_3d_model_tutorial/3dModels/XBot/animations/mixamorig_LeftFoot_rotation.qad"
generated file:  "/home/robby/Projects/qt_projects/rigged_animated_3d_model_tutorial/3dModels/XBot/animations/mixamorig_Spine_rotation.qad"
generated file:  "/home/robby/Projects/qt_projects/rigged_animated_3d_model_tutorial/3dModels/XBot/animations/mixamorig_LeftUpLeg_rotation.qad"
generated file:  "/home/robby/Projects/qt_projects/rigged_animated_3d_model_tutorial/3dModels/XBot/animations/mixamorig_LeftHand_rotation.qad"
generated file:  "/home/robby/Projects/qt_projects/rigged_animated_3d_model_tutorial/3dModels/XBot/animations/mixamorig_RightShoulder_rotation.qad"
generated file:  "/home/robby/Projects/qt_projects/rigged_animated_3d_model_tutorial/3dModels/XBot/animations/mixamorig_LeftShoulder_rotation.qad"
generated file:  "/home/robby/Projects/qt_projects/rigged_animated_3d_model_tutorial/3dModels/XBot/animations/mixamorig_RightFoot_rotation.qad"
generated file:  "/home/robby/Projects/qt_projects/rigged_animated_3d_model_tutorial/3dModels/XBot/animations/mixamorig_LeftLeg_rotation.qad"
generated file:  "/home/robby/Projects/qt_projects/rigged_animated_3d_model_tutorial/3dModels/XBot/animations/mixamorig_RightArm_rotation.qad"
generated file:  "/home/robby/Projects/qt_projects/rigged_animated_3d_model_tutorial/3dModels/XBot/animations/mixamorig_RightUpLeg_rotation.qad"
generated file:  "/home/robby/Projects/qt_projects/rigged_animated_3d_model_tutorial/3dModels/XBot/animations/mixamorig_RightToeBase_rotation.qad"
generated file:  "/home/robby/Projects/qt_projects/rigged_animated_3d_model_tutorial/3dModels/XBot/animations/mixamorig_Hips_position.qad"
generated file:  "/home/robby/Projects/qt_projects/rigged_animated_3d_model_tutorial/3dModels/XBot/animations/mixamorig_Hips_rotation.qad"
generated file:  "/home/robby/Projects/qt_projects/rigged_animated_3d_model_tutorial/3dModels/XBot/animations/mixamorig_Neck_rotation.qad"
generated file:  "/home/robby/Projects/qt_projects/rigged_animated_3d_model_tutorial/3dModels/XBot/animations/mixamorig_LeftToeBase_rotation.qad"
```

Next, add all the generated files into `assets.qrc` . assets.qrc should now look like this:

```xml
<RCC>
    <qresource prefix="/">
        <file>3dModels/XBot/Xbot_silly_dancing.qml</file>
        <file>3dModels/XBot/meshes/beta_Joints.mesh</file>
        <file>3dModels/XBot/meshes/beta_Surface.mesh</file>
        <file>3dModels/XBot/animations/mixamorig_LeftToeBase_rotation.qad</file>
        <file>3dModels/XBot/animations/mixamorig_Neck_rotation.qad</file>
        <file>3dModels/XBot/animations/mixamorig_Hips_rotation.qad</file>
        <file>3dModels/XBot/animations/mixamorig_Hips_position.qad</file>
        <file>3dModels/XBot/animations/mixamorig_RightToeBase_rotation.qad</file>
        <file>3dModels/XBot/animations/mixamorig_RightUpLeg_rotation.qad</file>
        <file>3dModels/XBot/animations/mixamorig_RightArm_rotation.qad</file>
        <file>3dModels/XBot/animations/mixamorig_LeftLeg_rotation.qad</file>
        <file>3dModels/XBot/animations/mixamorig_RightFoot_rotation.qad</file>
        <file>3dModels/XBot/animations/mixamorig_LeftShoulder_rotation.qad</file>
        <file>3dModels/XBot/animations/mixamorig_RightShoulder_rotation.qad</file>
        <file>3dModels/XBot/animations/mixamorig_LeftHand_rotation.qad</file>
        <file>3dModels/XBot/animations/mixamorig_LeftUpLeg_rotation.qad</file>
        <file>3dModels/XBot/animations/mixamorig_Spine_rotation.qad</file>
        <file>3dModels/XBot/animations/mixamorig_LeftFoot_rotation.qad</file>
        <file>3dModels/XBot/animations/mixamorig_RightForeArm_rotation.qad</file>
        <file>3dModels/XBot/animations/mixamorig_RightLeg_rotation.qad</file>
        <file>3dModels/XBot/animations/mixamorig_RightHand_rotation.qad</file>
        <file>3dModels/XBot/animations/mixamorig_Head_rotation.qad</file>
        <file>3dModels/XBot/animations/mixamorig_LeftArm_rotation.qad</file>
        <file>3dModels/XBot/animations/mixamorig_LeftForeArm_rotation.qad</file>
        <file>3dModels/XBot/animations/mixamorig_Spine2_rotation.qad</file>
        <file>3dModels/XBot/animations/mixamorig_Spine1_rotation.qad</file>
    </qresource>
</RCC>
```

## Put the model in the code!

First, we will need the base (2d)  module and the 3d module:

```xml
import QtQuick
import QtQuick3D
```

Next, import our 3d asset:

```xml
import "3dModels/XBot”
```

Build the window and components that will hold the scene that will render the 3d model:

```xml
Window {
    width: 640
    height: 480
    visible: true
    title: qsTr("Hello World")

    Rectangle {
        anchors.fill: parent
        visible: true
        color: 'black'

        View3D {
            anchors.fill: parent

            // Spatial items
            PerspectiveCamera {
                id: mainCamera
                z: 350
                y: 175
            }
            DirectionalLight {
                visible: true
                eulerRotation.x: -30
                castsShadow: true
            }
            Xbot_silly_dancing {

            }
        }
    }
}
```

This will create a small window with a the title “hello world.” Within the window we place a 2d rectangle and within this rectangle we place the `View3D`. 

In Qt Quick 3D, `View3D`is a `QML` type that represents a 3D view for displaying and interacting with 3D scenes. It is used as the root item of a `QML` file that defines a 3D scene and provides a canvas for rendering the scene.

In order for the user to see the model, we need to define a camera and supply a light. Finally, we simply use the `qml` file generated by balsam tool as if it were a component. In our case, that file is `XBot_silly_dancing.qml`.

The program should look like this:

![Untitled](Qt%20and%20rigged%203D%20models%20d6c7962fa7ea436abb7999967eaac578/Untitled%205.png)