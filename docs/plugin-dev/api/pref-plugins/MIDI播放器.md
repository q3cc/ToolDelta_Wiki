# 前置插件：MIDI 播放器

## 介绍

提供了 `.mid` 文件的解析和在租赁服播放 MIDI 文件的功能。

## 获取方式
- 类式插件：
    ```python
    class MyPlugin(Plugin):
        ...
        
        def __init__(self, frame):
            super().__init__(frame)
            self.ListenPreload(self.on_preload)

        def on_preload(self):
            midi = self.GetPluginAPI("MIDI播放器")
    ```

## 接口

## 载入 MIDI 文件 {#load_midi_file}
```python
def load_midi_file(path: str, as_name: str)
```
读取 MIDI 文件并载入到播放器插件中。  
直接载入 MIDI 文件速度较慢。

- 参数：  
    | 参数名 | 类型 | 说明 |
    | --- | --- | --- |
    | **path** | str | MIDI 文件的路径 |
    | **as_name** | str | 载入到播放器插件中的名称，供后续调用 |

## 转换 MIDI 文件为序列文件 {#translate_midi_to_seq_file}
```python
def translate_midi_to_seq_file(path: str, path1: str)
```
将 `path` 的 MIDI 文件转换为序列文件并保存到 `path1` 中，格式为 `.midseq`。
- 参数：
    - **path** (str): MIDI 文件的路径。
    - **path1** (str): 序列文件的路径。

- 参数：  
    | 参数名 | 类型 | 说明 |
    | --- | --- | --- |
    | **path** | str | MIDI 文件的路径。 |
    | **path1** | str | 序列文件的路径。 |

## 读取音乐序列文件 {#load_sound_seq_file}
```python
def load_sound_seq_file(path: str, as_name: str)
```
读取音乐序列文件并载入到播放器插件中。  
载入速度比载入 MIDI 文件更快。

## 对目标播放音乐 {#playsound_at_target}
```python
def playsound_at_target(
    name_or_seq: str | ToolSoundSequence,
    target: str
) -> int
```
创建播放器线程对目标播放音乐，并返回音乐线程的ID，以便使用 `stop_playing()` 停止播放。

- 参数：  
    | 参数名 | 类型 | 说明 |
    | --- | --- | --- |
    | **name_or_seq** | str | 载入到播放器插件中的音乐的名称（`as_name`）或音乐序列。 |
    | **target** | str | 目标选择器，对谁播放音乐。 |

- 返回：
    - **int**: 音乐线程的ID。

## 停止播放音乐 {#stop_playing}
```python
def stop_playing(idc: int) -> bool
```
根据音乐线程的 ID 停止播放音乐。

- 参数：
    - **idc** (int): 音乐线程的ID。

- 返回：
    - **bool**: 是否成功停止播放音乐。

## 阻塞播放音乐 {#playsound_at_target_sync}
```python
def playsound_at_target_sync(
    name_or_seq: str | ToolSoundSequence, target: str
)
```
对目标播放音乐，并阻塞直到音乐播放完毕。

- 参数：  
    | 参数名 | 类型 | 说明 |
    | --- | --- | --- |
    | **name_or_seq** | str | 载入到播放器插件中的音乐的名称（`as_name`）或音乐序列。 |
    | **target** | str | 目标选择器，对谁播放音乐。 |

## 获取一个音乐播放遍历器 {#iter_playsound}
```python
def iter_playsound(self, name_or_seq: str | ToolSoundSequence)
```
对载入的音乐序列进行遍历。

- 参数：
    - **name_or_seq** (str | ...): 载入到播放器插件中的音乐的名称（`as_name`）或音乐序列。

- 返回遍历器：
    - **str, float, float, float**: MC乐器名、音量、音高、距上一个音符的时间。
    可用于 `/playsound` 命令。
