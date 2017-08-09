### OrangePi PC2が届いたのでレビュー的な何かを。
##### OrangePiとは
　OrangePiとは、手のひらサイズのシングルコンピュータです。OrangePiは有名なRaspberryPiとは違い種類が豊富でSATA2やマイクが載ってるものがあります。  
　値段はRaspberryPiと同じ性能のものが$20ぐらいで安いです(RaspberryPiは$35)。  
　サイズはこんな感じです。
![boughtOPIimg06.png](http://nononono.net/file/boughtOPIimg06.png)
##### OrangePi PC2
　今回買ったのはOrangePi PC2というもので、性能は次の通りです。[参考](http://www.orangepi.org/orangepipc2/)
<table border="1" rules="all">
<tr><td>サポートしてるOS</td><td>Android Ubuntu Debian Rasberian</td></tr>
<tr><td>CPU</td><td>Cortex-A53</td></tr>
<tr><td>GPU</td><td>Mali450 </td></tr>
<tr><td>メモリ</td><td>DDR3 1GB</td></tr>
<tr><td>ストレージ</td><td>SDカード</td></tr>
<tr><td>ネットワーク</td><td>1000Mイーサネット</td></tr>
<tr><td>その他</td><td>マイク</td></tr>
<tr><td></td><td>USB2.0</td></tr>
<tr><td></td><td>カメラインターフェイス</td></tr>
<tr><td></td><td>赤外線受信機(？)</td></tr>
<tr><td></td><td>GPIO 40pin</td></tr>
<tr><td></td><td>イヤホンジャック</td></tr>
</table>
RaspberryPi 3Bより、CPUやメモリの性能は低いですが1000Mイーサネットが付いています。

##### 購入
　[公式サイト](http://www.orangepi.org)から[購入ページ](https://www.aliexpress.com/store/1553371)に飛んで購入しました。  
　$19.98で送料込みで2546円でした。英語のサイトで買い物をしたのは人生で初めてでドキドキしたぁ…  
　後から気が付いたが、ケースや電源ケーブルも買っておけば良かったなぁ～と。

##### 必要なものをそろえる
　必要なものは次の通りです。

* キーボード
* マウス
* HDMIケーブル
* ディスプレイ
* SDカード
* LANケーブル
* DCケーブル(外径4mm 内径1.7 センターピン＋ 5V2A)  

DCケーブルはなかったため、友人からPSPの充電器を借りてテストしました。(買わないとなぁ…)

##### いざ起動!!
　まず、OSのイメージを[公式サイト](http://www.orangepi.org/downloadresources/)からダウンロードしてきます。公式サイトではサポートOSにArchLinuxがないですが人柱ぽっくArchを選んでみました。

　ダウンロードしてきたイメージを解凍して(`xz -dv Arch_Server_PC2_V0_9_1.img.xz`)SDカードに焼き込みました(`dd bs=1m if=Arch_Server_PC2_V0_9_1.img of=/dev/<<sdcard>>`)。

　OrangePi PC2にSDカードを差し起動します。ディスプレイに起動画面が出てきたら成功です～。

　まぁ、なんというか…成功しなかったんですけどね。

　電源のLEDが赤く光っていたため、bootは成功してるかなと思ってとりあえずARPスキャンかけてみたら…なんかおるやんけ！！  
![boughtOPIimg02.png](http://nononono.net/file/boughtOPIimg02.png)


　もしかして…と思い、Nmapかけてみました。これ勝ったなwガハハww
![boughtOPIimg03.png](http://nononono.net/file/boughtOPIimg03.png)

　あとは、sshで繋いであげたらいいのですが…公式サイトの書いてあるのはrootのパスワードだけなのでこれは困ったな…と。(sshdのデフォルトの設定でrootのログインは禁止されているため繋ぐことが出来ず、もしかしてconfig書き換えてあるかなと思って試したけどダメでした。)

　困ったな～と調べてみると[2016/11/15 20時ごろにOrange Pi PC2で動くLinuxイメージが公開されました](http://blog.osakana.net/archives/7594)という記事に次のような記述が。
>ダウンロードページには「user(root), password(orangepi)」と書いてありますが
試したところ「user(orangepi), password(orangepi)」であるようです。

　ユーザー名orangepi パスワードorangepiでログイン出来ました。

　やったね♪
![boughtOPIimg04.png](http://nononono.net/file/boughtOPIimg04.png)

##### 1000Mイーサネットを体感しちゃう♪
　RaspberryPiと違って1000Mイーサネットが搭載されているならどんだけ速いんだい？？ってことで計測してみた。
![boughtOPIimg05.png](http://nononono.net/file/boughtOPIimg05.png)

　RaspberryPiが8ミリ秒の対してOrangePiは2ミリ秒!!  
　4倍ですよ!!いいですね～♪

##### 見た目
Amazonで買った[スペンサー](http://amzn.asia/eErrw49)を付けてみました。タワーにしようか？？
![boughtOPIimg07.png](http://nononono.net/file/boughtOPIimg07.png)

##### 感想
　中国製のボードということで、かなり不安だったのですがちゃんと動いてくれてよかったです。kernelが古かったり、グラフィックドライバがなかったりいろいろ問題が残ってますが満足かなと。  
　RaspberryPiより速いイーサネットが載ってのでNASにするか…VPNserverにするか…localでDNS建てちゃうか…迷っちゃいますね。
