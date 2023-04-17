---
layout: post
---
## Overview

In `Qt`, the resource system makes the use of runtime files platform-independent. It does this in at least two ways:

1) Avoiding the use of user-specific path names (e.g. /home/robby/Documents)

2) Avoiding filesystem-specific path conventions (e.g. Windows C:\Documents\ vs Linux /usr/bin/ls)

Resources are local files that are brought in at runtime. Examples are `qml` files, media files, and meshes among other things. `C++` source and header files are not considered resources as they are compiled. 

## How to use

The project’s `.pro` file points the build system at a `qrc` (`Qt` resource collection) file with something like this:

```bash
# within the .pro file, point the build system at the
# .qrc file via the RESOURCES variable
RESOURCES += resources.qrc
```

A `qrc` file is `XML`. It specifies `main.qml` as well as other files like media. A `qrc` file might look something like this:

```xml
<RCC>
    <qresource prefix="/">
        <file>main.qml</file>
        <file>images/denmark.jpg</file>
        <file>images/finland.jpg</file>
        <file>images/iceland.jpg</file>
        <file>images/norway.jpg</file>
        <file>images/sweden.jpg</file>
    </qresource>
</RCC>
```

This will then make resources available elsewhere in the code. For example `main.cpp` might look like this: 

```cpp
#include <QGuiApplication>
#include <QQuickView>

int main( int argc, char** argv ) {
    QGuiApplication app( argc, argv );
    QQuickView view;

		// Here we can access main.qml with this syntax:
    view.setSource(QUrl("qrc:main.qml"));
    view.show();

    return app.exec();
}
```

And elsewhere (in another source file):

```cpp
MyModel::MyModel(QObject *parent) :
    QAbstractListModel(parent)
{
// and here we can access them too
    m_data
        << Data("Denmark", "qrc:images/denmark.jpg", 5.6)
        << Data("Sweden", "qrc:images/sweden.jpg", 9.6)
        << Data("Iceland", "qrc:images/iceland.jpg", 0.3)
        << Data("Norway", "qrc:images/norway.jpg", 5.1)
        << Data("Finland", "qrc:images/finland.jpg", 5.4);

    QTimer *growthTimer = new QTimer(this);
    connect(growthTimer, &QTimer::timeout, this, &MyModel::growPopulation);
    growthTimer->start(2000);
}
```

## Summary

The `Qt` resource systems allows filesystem-independent installations of projects. The steps involved are 

1) tell the build system about the `qrc` file in the .pro file 

2) specify resources in the `qrc` file and 

3) access the resources in the code via the syntax `“qrc:<resource>”`