---
layout: post
---
# Overview
This is an example workflow for bringing in a 3d model from external software. 
- First an asset is acquired from Mixamo, 
- Second the asset is conditioned by `balsam` tool
- Third the asset is added to the project via its `qrc` file.

The code is available here: https://github.com/rnickles/rigged_animated_3d_model_tutorial

## Acquire a 3D model on Mixamo

Adobe’s Mixamo offers a large, free library of pre-made 3D characters, animations, and motions that can be customized and downloaded for use in games, films, and other 3D projects. 

To keep things relatively simple I went with the X Bot doing the ‘silly dancing’ animation:

<image src="/assets/images/Untitled(3).png" width="450" /> 

Download the `.fbx` file with the default settings:

<image src="/assets/images/Untitled(4).png" width="450" /> 

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

## Add the Asset to the Project
Next, add all the generated files into `assets.qrc` . `assets.qrc` should now look like this:

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