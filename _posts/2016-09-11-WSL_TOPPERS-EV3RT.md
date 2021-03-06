---
layout: post
date: 2016-09-11
title: Bash on Ubuntu on Windowsを使ってTOPPERS/EV3RTの開発環境構築する
tags: [Bash on Ubuntu on Windows, TOPPERS/EV3RT]
excerpt : TOPPERS/EV3RTとは、LEGO Mindstorms EV3用の開発プラットフォームです。簡単なC言語でLEGOで作ったものを動かすことが出来てとても楽しいです。公式サイトによると、WindowsではCygwinを使ってLinux環境を作っていくようです。ですが、今回は最近話題のBash on Ubuntu on Windowsを使って環境を構築してみました。

---

## TOPPERS/EV3RTとは  
TOPPERS/EV3RTとは、LEGO Mindstorms EV3用の開発プラットフォームです。  
簡単なC言語でLEGOで作ったものを動かすことが出来てとても楽しいです。  
## Windowsで環境構築するために。  
[公式サイト](http://dev.toppers.jp/trac_user/ev3pf/wiki/DevEnv)によると、WindowsではCygwinを使ってLinux環境を作っていくようです。
ですが、今回は最近話題のBash on Ubuntu on Windowsを使って環境を構築してみました。  
## インストール方法
### Bash on Ubuntu on Windowsをインストールする
まず、Bash on Ubuntu on Windowsをインストールします。  
これは、ネットにたくさん情報が転がっているのでここで紹介する必要はないでしょう。  
参考URL  
- [Bash on Ubuntu on Windowsをインストールしてみよう！](http://qiita.com/Aruneko/items/c79810b0b015bebf30bb)  
- [Bash on Ubuntu on Windowsとは？ そのインストールと使い方](http://www.buildinsider.net/enterprise/bashonwindows/01)  

### 必要なパッケージのインストール  
[公式サイト](http://dev.toppers.jp/trac_user/ev3pf/wiki/DevEnvWin)によると、必要なパッケージは次の通りみたいです。  
`gcc-core（バージョン4.9.0-1以降 `  
`make（バージョン（4.0-2）以降)`  
`diffutils（バージョン（3.3-2）以降)`  
`perl（バージョン（5.22.1）以降）`  
gcc-coreとは、Cygwin用のgccですので、今回は普通のgccで問題ありません。  
Windowsキーを押して検索画面を出した後、「Bash on Ubuntu on Windows」と入力してBash on Ubuntu on Windowsを起動します。  
![Bash on Ubuntu on Windowsの起動](/img/WSL_TOPPERS-EV3RT/01.jpg)
Bash on Ubuntu on Windowsを起動後、次のコマンドでパッケージをインストールしてください。  
`sudo add-apt-repository ppa:terry.guo/gcc-arm-embedded`  
`sudo apt-get update`  
`sudo apt-get install gcc-arm-none-eabi`  
`sudo apt-get install make`  
`sudo apt-get install diffutils`  
`sudo apt-get install perl`  

### EV3RTパッケージのインストール  
公式の[ダウンロードページ](http://dev.toppers.jp/trac_user/ev3pf/wiki/Download)からパッケージをダウンロードしインストールします。(2016年9月11日時点では、β6-2)<Font color="red">※ブラウザでダウンロードしないこと</font>  
公式サイトから最新版のurlをコピーして、Bash on Ubuntu on Windows で次のコマンドを入力してください。  
`wget <コピーしたurl>`  
> 私がインストールしたときはこのようになりました。(バージョン β6-2)  
> `wget http://www.toppers.jp/download.cgi/ev3rt-beta6-2-release.zip`  

ダウンロードしたファイルを解凍します。  
`unzip <ダウンロードしたファイル名>`  
ファイルを開きます。  
`cd <解凍されたファイル>`  
hrp2.tar.xzを解凍します。  
`tar xvf hrp2.tar.xz`  
cfgをビルドします。  
`cd hrp2/cfg`  
`make`  
環境変数を変更します。  
`export LC_ALL=en_US.UTF-8`
  
### サンプルをコンパイルしてみよう！
<ダウンロードしたファイル名\>/hrp2/sdk/workspaceに移動します。  
`make app=helloev3`  
と入力し、次のように出たら成功です。  
![成功例](/img/WSL_TOPPERS-EV3RT/02.jpg)  
  
## エラー  
コンパイル時に次のようなエラーが出た。  
```
/root/tmp/ev3rt-beta6-2-release/hrp2/sdk/workspace# make app=helloev3
rm -rf /root/tmp/ev3rt-beta6-2-release/hrp2/sdk/workspace/.././OBJ/
perl: warning: Setting locale failed.
perl: warning: Please check that your locale settings:
        LANGUAGE = (unset),
        LC_ALL = (unset),
        LANG = "ja_JP.UTF-8"
    are supported and installed on your system.
perl: warning: Falling back to the standard locale ("C").
perl: warning: Setting locale failed.
perl: warning: Please check that your locale settings:
        LANGUAGE = (unset),
        LC_ALL = (unset),
        LANG = "ja_JP.UTF-8"...(続く)
```
環境変数がセットされていないみたいだ。  
`export LC_ALL=en_US.UTF-8`と入力して解決した。  

