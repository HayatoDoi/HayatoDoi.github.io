---
layout: post
date: 2023-03-27
title: LinuxカーネルをビルドしてQEMU上で動かす
tags: [Linuxカーネル, ビルド, QEMU]
excerpt: LinuxカーネルをビルドしてQEMU上で動かしてみた
---

Linuxカーネルの勉強のために、LinuxカーネルをビルドしてQEMU上で動かしてみたときのメモです。

## 準備物
- ビルドマシン(x64 / Ubuntu Server 20.04 LTS)

## ビルド手順
### 必要なパッケージのインストール
```bash
sudo apt update
sudo apt install make gcc g++ flex bison libelf-dev libssl-dev libncurses-dev unzip bzip2
```

### Linuxカーネルのビルド
Linuxカーネルは以下のレポジトリで開発されている。
<https://git.kernel.org/pub/scm/linux/kernel/git/next/linux-next.git>

執筆時点で最新の `v6.2` をビルドする方法は以下の通り。
```bash
cd /tmp
git clone https://git.kernel.org/pub/scm/linux/kernel/git/next/linux-next.git/ --depth 1 -b v6.2
cd linux-next
make x86_64_defconfig ARCH=x86
make -j $(nproc)
```

ビルドすると `arch/x86/boot/bzImage` は生成される。

### ルートファイルシステムのビルド
ルートファイルシステムとは、Linuxにおける `/` から始まるファイルシステムのことで、Linuxカーネルの起動後に必要なファイル群が配置されています。必要なOSSを1つずつ持ってきてルートファイルシステムを作成することもできますが、buildrootを使用し一括インストールをした。他にもyoctoなどが有名らしい。

執筆時点で最新の `2022.02.11` をビルドする方法は以下の通り。
```bash
cd /tmp
git clone git://git.buildroot.net/buildroot --depth 1 -b 2022.02.11
cd buildroot
make menuconfig
make -j $(nproc)
```

make menuconfig を実行すると、設定画面が出るので以下の項目を選択した。
- Target options → Target Architecture → x86_64 を選択
- Filesystem images → ext2/3/4 root filesystem  → ext4 を選択


## QEMUの起動
### QEMUのインストール
```bash
sudo apt install qemu-system qemu-system-common qemu-utils
```

### ビルドしたLinuxの起動
```bash
cd /tmp
qemu-system-x86_64 -boot c -m 2048M -kernel ./linux-next/arch/x86/boot/bzImage -hda ./buildroot/output/images/rootfs.ext4 -append "root=/dev/sda rw console=ttyS0,115200 acpi=off nokaslr" -serial stdio -display none
```

起動したLinuxを終了する時はkillコマンドを使用する
```bash
pkill -KILL -f qemu-system-x86_64
```
