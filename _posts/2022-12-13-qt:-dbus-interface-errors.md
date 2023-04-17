---
layout: post
---
# Qt DBus errors: “GLib-GIO-CRITICAL” and “Unable to find method”
## Backstory
`DBus` in `Qt` is [quirky](https://bugreports.qt.io/browse/QTBUG-108822)

## Problem

I received a couple errors when trying to access a `Qt DBus` service from external programs. 

For instance, this python program:

```python
import pydbus

bus = pydbus.SessionBus()
proxy = bus.get("org.veki.ui.DBusAgent", '/')
d = "1.5 2.0 3.1"
print(proxy.receiveMediaPipeData(d))
```

would return the error:

```bash
(process:35600): GLib-GIO-CRITICAL **: 17:28:39.935: g_dbus_connection_call_sync_internal: assertion 'interface_name != NULL && g_dbus_is_interface_name (interface_name)' failed
Traceback (most recent call last):
File "[dbusmessage.py](http://dbusmessage.py/)", line 6, in <module>
print(proxy.receiveMediaPipeData(d))
File "/home/robby/Projects/mp_env/lib/python3.8/site-packages/pydbus/proxy_method.py", line 72, in **call**
ret = instance._bus.con.call_sync(
AttributeError: 'NoneType' object has no attribute 'unpack'
```

and the `Qt` tool `QDBusViewer` would show:

```bash
Unable to find method receiveMediaPipeData on path / in interface local.veki-demo-qt5.DBusAgent
```

## Context

I setup a `DBus` service under the name `org.veki.ui.DBusAgent` in `Qt`:

```cpp
QDBusConnection::sessionBus().registerService(SERVICE_NAME)
```

And registered an object:

```cpp
QDBusConnection::sessionBus().registerObject("/",&dbusagent, QDBusConnection::ExportAllSlots);
```

When I attempted to access this service from other programs, they would have trouble finding the service. 

## Fix

After some tinkering I discovered that by default the interface’s name would be the project’s `.pro` file name. So for instance a project with `project.pro` would translate to an interface named `local.project.Object_class`. This wouldn’t cause problems for `Qt6` but breaks `DBus` in `Qt 5`. Curious.

One way to fix this is to use the overloaded `registerObject()` method:

```cpp
bool QDBusConnection::registerObject(const QString &path, const QString &interface, QObject *object, QDBusConnection::RegisterOptions options = ExportAdaptors)
```

and specify the interface’s name. So now when registering the object, the code looks like this:

```cpp
QDBusConnection::sessionBus().registerObject("/", "my.interface",&dbusagent, QDBusConnection::ExportAllSlots);
```

Now the external programs have no problem finding and accessing the `DBus` service.