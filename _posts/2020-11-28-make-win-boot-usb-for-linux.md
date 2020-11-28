---
layout: post
date: 2020-11-28
title: Linuxでwindows10用のBoot USBを作成する
tags: [Linux, ArchLinux, Windows10, BootUSB]
excerpt : Linuxでwindows10用のBoot USBを作成しようとしたら躓いたのでメモとして残しておく
---

何もしていないのにWindows10が起動しなくなりました…。

再インストールのためにddコマンドを使用してBootUSBを作成しようとしたらうまくいかなかったのでメモとして残しておきます。

もしかしたらMacOSでも同じ手順で作成できるカモ。  

## 必要なもの
- 6G以上のUSBメモリ
- Windows10のインストールメディア([ここ](https://www.microsoft.com/ja-jp/software-download/windows10ISO)からDL)

## 手順

### USBメモリをフォーマット
#### USBメモリのパスを特定
USB挿入前後をlsblkコマンドで確認し、USBメモリの場所を特定しましょう。

今回の場合であると、8GのsdcがUSBメモリであることが特定できました。

##### USB挿入前
```
$ lsblk
NAME   MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
loop0    7:0    0   5.6G  0 loop /mnt/iso
sda      8:0    0 238.5G  0 disk 
├─sda1   8:1    0   512M  0 part /boot
└─sda2   8:2    0   238G  0 part /
sdb      8:16   0  14.9G  0 disk 
├─sdb1   8:17   0   512M  0 part 
└─sdb2   8:18   0  14.4G  0 part
```

##### USB挿入後
```
$ lsblk 
NAME   MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
sda      8:0    0 238.5G  0 disk 
├─sda1   8:1    0   512M  0 part /boot
└─sda2   8:2    0   238G  0 part /
sdb      8:16   0  14.9G  0 disk 
├─sdb1   8:17   0   512M  0 part 
└─sdb2   8:18   0  14.4G  0 part 
sdc      8:32   1   7.5G  0 disk ★
```

#### fdiskコマンドを用いてフォーマット
```
$ sudo fdisk /dev/sdc

fdisk (util-linux 2.34) へようこそ。
ここで設定した内容は、書き込みコマンドを実行するまでメモリのみに保持されます。
書き込みコマンドを使用する際は、注意して実行してください。


コマンド (m でヘルプ): o
新しい DOS ディスクラベルを作成しました。識別子は 0xa0f01bb6 です。

コマンド (m でヘルプ): n
パーティションタイプ
   p   基本パーティション (0 プライマリ, 0 拡張, 4 空き)
   e   拡張領域 (論理パーティションが入ります)
選択 (既定値 p): p
パーティション番号 (1-4, 既定値 1): 1
最初のセクタ (2048-15618047, 既定値 2048): 
最終セクタ, +/-セクタ番号 または +/-サイズ{K,M,G,T,P} (2048-15618047, 既定値 15618047): 

新しいパーティション 1 をタイプ Linux、サイズ 7.5 GiB で作成しました。

コマンド (m でヘルプ): t
パーティション 1 を選択
16 進数コード (L で利用可能なコードを一覧表示します): 7
パーティションのタイプを 'Linux' から 'HPFS/NTFS/exFAT' に変更しました。

コマンド (m でヘルプ): a
パーティション 1 を選択
パーティション 1 の起動フラグを有効にしました。

コマンド (m でヘルプ): w
パーティション情報が変更されました。
ioctl() を呼び出してパーティション情報を再読み込みします。
ディスクを同期しています。
```

#### USBメモリをフォーマット
```
$ sudo mkfs -t vfat /dev/sdc1
```

### ISOの中身をコピー
#### ISO, USBメモリをマウント
- マウント用のディレクトリを作成
  ```
  $ mkdir -p mnt/iso mnt/usb
  ```

- ISOをマウント
  ```
  $ sudo mount -t udf,iso9660 -o ro,loop Win10_20H2_Japanese_x64.iso mnt/iso
  ```

- USBをマウント
  ```
  $ sudo mount -t vfat /dev/sdc1 mnt/usbs
  ```

#### コピーを実行
```
sudo cp -r mnt/iso/* mnt/usb
```

### マウントを解除 & 不要なディレクトリの削除
```
$ sudo umount -R mnt
$ rm -rf mnt
```

## 終わり
後はパソコンにUSBを挿してBootDeviceに指定するだけ。
