---
layout: post
---
## Put the model in the code!

The code is available [here]( https://github.com/rnickles/rigged_animated_3d_model_tutorial)


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

In Qt Quick 3D, `View3D`is a `QML` type that represents a 3D view for displaying and interacting with 3D scenes. It defines a 3D scene and provides a canvas for rendering the scene.

In order for the user to see the model, we need to define a camera and supply a light. Finally, we use the `qml` file generated by balsam tool as if it were a component. In our case, that file is `XBot_silly_dancing.qml`.

The program should display XBot doing a silly dance:

<image src="/assets/images/Untitled(5).png" width="450" /> 