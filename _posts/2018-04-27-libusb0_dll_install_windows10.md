---
layout: post
date: 2018-04-27
title: windows10にlibusb0.dllをインストールする
tags: [libusb0.dll, install, windows10, Zadig]
excerpt : libusb0.dllがなくて困ったのでメモとして残しておきます。
private : true

---

## 公式ページ
githubのwikiに書いてありますね。
- <https://github.com/libusb/libusb/wiki/Windows>
Zadigを使うみたいですね。

## Zadigでlibusb0.dllをインストールする

### Zadigをダウンロード
<http://zadig.akeo.ie/>にアクセスしてダウンロードリンクからダウンロードします。

### libusb0.dllをインストールする
1. Zadig.exeを起動すると次のような画面が表示されます。
  ![/img/libusb0_dll_install_windows10/ZadingTop.jpg](/img/libusb0_dll_install_windows10/ZadingTop.jpg)

2. デフォルトではWinUSBが選択されていますので、libusb-win32(vX.X.X.X)を選択します。
  ![/img/libusb0_dll_install_windows10/select_libusb-win32.jpg](/img/libusb0_dll_install_windows10/select_libusb-win32.jpg)

3. Install WCID Driverをクリックしてインストールします

4. The driver was installed successfully. と表示されたら終了です。
  ![/img/libusb0_dll_install_windows10/installed_succesfully.jpg](/img/libusb0_dll_install_windows10/installed_successfully.jpg)

## 感想
この方法を教えてくれた友人にめっちゃ感謝。