### ConoHa Advent Calendar 2016 12日目

##### 初めてのこのは♪
　ConohaでVPNを借りてみたという記事です。

##### なんでConohaなのか。
 VPSを借りようとしてる人は、どこのVPSを借りようか迷うと思います。私がConohaを選んだ理由をまとめて見ました。

###### 公式キャラがかわいい!!
 [Twiter](https://twitter.com/MikumoConoHa)で絡んでみたり、定期的に[このはブログ](https://www.conoha.jp/conohadocs/blog)を見てたりと…とても癒やされますよ…じゅるり…  
　定期的にこのはちゃんの壁紙が配布されていて[ダウンロード](https://www.conoha.jp/conohadocs/)するとしあわせになれる♥ 

###### ポイントでサーバを借りる。
 Conohaポイントで支払うため、引き落としが怖くない！しかも最近ConoHaカードなるものが出てきたらしく…もっと便利になりますね。[Conohaショップ](http://conoha.shop/?pid=110463419)と[Amazon](http://amzn.asia/1SBC3bF)で購入できるそうです。  
<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">「ConoHaカード」の発売が開始されたよ！従来のクレジットカード・チャージ払いに加え「ConoHaカード」での支払いが可能に！<br>さらに、発売記念キャンペーンで上坂すみれさんの直筆サイン色紙が5名様に当たる！要チェックだね☆<a href="https://t.co/nYP5jKm7c3">https://t.co/nYP5jKm7c3</a> <a href="https://t.co/t6oSvSfoWG">pic.twitter.com/t6oSvSfoWG</a></p>&mdash; 美雲このは (@MikumoConoHa) <a href="https://twitter.com/MikumoConoHa/status/806367938320232452">2016年12月7日</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
かっ…かわいい///  

###### 選べるOSがたくさんある。
Cent Ubuntu Debian FreeBSD Fedora OpenSUSE Arch NetBSD OpenBSDとたくさんあって良いのですよ。
![http://nononono.net/file/ConoHaAdventCalendar20161201.png](http://nononono.net/file/ConoHaAdventCalendar20161201.png)

##### 借りてみる。
今回は、自宅においてあるこのブログをConohaに移行してみようと思います。  
###### サーバの作成
アカウント作成後初めてログインすると、このようなページが出てきます。![http://nononono.net/file/ConoHaAdventCalendar20161202.png](http://nononono.net/file/ConoHaAdventCalendar20161202.png)
ここでぽちぽちとスペックを選びます。スペックを上げ過ぎるとお値段が高くなるので注意してください。  
私の場合、ブログ投稿直後の10分間に3アクセスぐらいなので(悲しい)次のスペックを選びました。

- タイプ VPS
- リージョン 東京(シンガポールとアメリカは高い…)
- メモリ 1GB
- イメージタイプ OS
- OS ArchLinux
- バージョン 最新のやつ
- ディスク容量 SSD50GB

これで、基本料金900円でした。もう少しスペックあげたら別のアプリケーションも動かせるのでは？と言われるかもしれませんが、その時はもうひとつVPS借りるということで。

あとは、サーバの設定です。  
rootパスワードを設定して。  
自動バックアップを無効にします。有効にすると+300円なので自動でGoogleドライブにアップロードするプログラムでも動かしておこうかなと…  
接続許可ポートはすべて許可にします。細かい設定は自分のFirewallでします。  
SSHKeyは使用しないにしました。あとで設定を変えるということで…。  
ネームタグは好きな名前で。  
設定を確認したあと、追加をクリックして完成です。
![http://nononono.net/file/ConoHaAdventCalendar20161204.png](http://nononono.net/file/ConoHaAdventCalendar20161204.png)

###### サーバに接続
ネームタグをクリックして、詳細情報を確認すると自分のサーバのIPアドレスが確認出来ます。
![http://nononono.net/file/ConoHaAdventCalendar20161205.png](http://nononono.net/file/ConoHaAdventCalendar20161205.png)
このIPアドレスに、先ほど作成したrootのパスワードで接続します。  
![http://nononono.net/file/ConoHaAdventCalendar20161206.png](http://nononono.net/file/ConoHaAdventCalendar20161206.png)

セキュリティ上rootでログインできるのは危ないため、アカウントを作成し、rootログインを禁止します。(#は1行コメント)
```
# ユーザ作成
useradd <<new user name>>
# パスワードの設定
passwd <<new user name>>
# rootログインの禁止
echo "PermitRootLogin no" >> /etc/ssh/ssh_config
# sshの再起動
systemctl restart sshd.service
```
設定を反映させた後ログアウトしてしまうと、設定を失敗してしまうので、別のターミナルを開いて確認するのがおすすめです。  

最後に、パッケージのアップデートをします。  
```
# パッケージのアップデート
pacman -Syu
```

##### webサービスを建てる
今回はblog用のサーバなので、webサービスをインストールします。  
インストールするサービスはnginxです。  
```
# nginxのインストール
pacman -S nginx
# nginxの起動
systemctl start nginx
# 起動時に起動するように設定
systemctl enable nginx
```
これで、ブラウザで自分のIPアドレスを叩いてWellcome to nginx!と表示されたら、成功です。
![http://nononono.net/file/ConoHaAdventCalendar20161207.png](http://nononono.net/file/ConoHaAdventCalendar20161207.png)

あとは、ブログを動かすだけなんですが…まだ完成してなくて…。  
どの言語で実装するかも決まってないので早く決めないとなぁ…