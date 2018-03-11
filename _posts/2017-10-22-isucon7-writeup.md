---
layout: post
date: 2017-10-22
title: ISUCON7 write up
tags: [ISUCON, ISUCON7, write up]
excerpt: 2017年10月22日に開催されたISUCON7にらぃとくんとたわしくんとわたしで参加しました。チーム名は「5000兆円欲しい！」です。

---

10月22日に開催されたISUCON7に [らぃとくん](https://twitter.com/lightnet328)と[たわしくん](https://twitter.com/nCk_cv)とわたしで参加しました。  
チーム名は「5000兆円欲しい！」です。

### 結果。

以下、[ISUCON7 本選出場者決定のお知らせ](http://isucon.net/archives/50956331.html)より引用  

> なお、以下の2チームは最終スコアが上位12チームに含まれていましたがそれぞれ下記の理由により失格となりました。  
> 
> ・闇に飲まれよ  
> 
> 予選終了時スコア: 218,867  
> 理由: 再起動後選択されたサーバにアクセスできなかった。 app3553 で nginx も app も enable されていなかった。  
> 
> ・5000兆円欲しい！  
> 予選終了時スコア: 44,016  
> 理由: 再起動後のチェックにて、アイコン画像が取得できていませんでした。  

つらかったです。

### スコア遷移

> 後日追加します。

### 初期構成
![/img/isucon7/01.jpg](/img/isucon7/01.jpg)

### 行ったこと
- 1. DBに保存してある画像ファイルを静的ファイルとして書き出す。
- 2. DBサーバでもアプリケーションを動かして高速にレスポンスを返せるようにした。
- 3. count(*)を使いDBからレコード数を求めるのではなく、INSERTするたびにRedisのカウンタを回し求めるようにした。

#### 1. DBに保存してある画像ファイルを静的ファイルとして書き出す。
アイコン画像をDBの中にバイナリデータとして格納し呼び出していたため、これを静的なファイルとしてNginxから渡すように変更しました。  
変更箇所は以下3つです。  
1. 初期データを静的なファイルに書き出し  
適当にスクリプトを組んで保存しました。  
  ```python
  import MySQLdb.cursors

  conn = MySQLdb.connect(
    host   = 'db',
    port   = 3306,
    user   = 'isucon',
    passwd = 'isucon',
    db     = 'isubata',
    charset= 'utf8mb4',
    cursorclass= MySQLdb.cursors.DictCursor,
    autocommit = True,
  )
  cur = conn.cursor()
  cur.execute("SET SESSION sql_mode='TRADITIONAL,NO_AUTO_VALUE_ON_ZERO,ONLY_FULL_GROUP_BY'")

  # add HayatoDoi
  i = 0
  while i <= 1000:
    min = str(i);
    max = str(i + 4);
    cur.execute("SELECT * FROM image WHERE id BETWEEN %s AND %s", (min, max,))
    rows = cur.fetchall()
    for row in rows:
      fname = '/home/isucon/isubata/webapp/public/icons/' + row['name']
      print fname
      with open(fname, 'wb') as wfp:
        wfp.write(row['data'])
    i = i + 5
  ```

2. プロフィール更新時に静的なファイルとして保存  
post_profile関数のアイコン画像を保存する部分を健康しました。  

  - 変更前
  ```python
      if avatar_name and avatar_data:
          cur.execute("INSERT INTO image (name, data) VALUES (%s, _binary %s)", (avatar_name, avatar_data))
          cur.execute("UPDATE user SET avatar_icon = %s WHERE id = %s", (avatar_name, user_id))
  ```

  - 変更後
  ```python
      if avatar_name and avatar_data:
          with open('/home/isucon/isubata/webapp/public/icons/' + avatar_name, 'wb') as wfp:
              wfp.write(avatar_data)
          cur.execute("INSERT INTO image (name) VALUES (%s)", (avatar_name,))
          cur.execute("UPDATE user SET avatar_icon = %s WHERE id = %s", (avatar_name, user_id))
  ```

3. Nginxから静的なファイルを呼び出す  
Server03に静的なファイルを保存し、Server01,02はServer03の保存フォルダをマウントし読み出し&書き出しを行えるようにしました。  
  
まとめるとこんな感じの構成です。  
![/img/isucon7/02.jpg](/img/isucon7/02.jpg)  
  
この構成によってスコアが`40000点`まで跳ね上がりましたが、  
その後わたしが`/etc/fstab`の設定を誤り、Server02(App)がお亡くなりになりました。  
![/img/isucon7/03.jpg](/img/isucon7/03.jpg)  
  
ダメもとで運営に問い合わせてみたけどダメでした…。  
![/img/isucon7/04.png](/img/isucon7/04.png)  

#### 2. DBサーバでもアプリケーションを動かして高速にレスポンスを返せるようにした。
Server02(App)がお亡くなりになったことでbenchmarkerからリクエストをさばくことが難しくなり、Server03(DB)にもApp機能機能をもたせることになりました。  
この作業は主に[らぃとくん](https://twitter.com/lightnet328)がやってくれました。感謝です。  
Server03にApp機能をもたせることによって負荷が大きくなるため、Server01にアイコン画像をもたせるようにしました。  
まとめるとこんな感じの構成です。  
![/img/isucon7/05.jpg](/img/isucon7/05.jpg)  

#### 3. count(*)を使いDBからレコード数を求めるのではなく、INSERTするたびにRedisのカウンタを回し求めるようにした。
スロークエリをみていると、count(*)がやたら遅いのでRedisにチャンネルごとのメッセージ数をカウントさせるようにしました。  
この作業は主に[たわしくん](https://twitter.com/nCk_cv)がやってくれました。感謝です。  
こんな感じの構成になりました。  
![/img/isucon7/06.jpg](/img/isucon7/06.jpg)  

### 最終構成
最後にわたしがSFTP自動マウントの設定を忘れていたことにより、再起動後のアイコン画像が取得がうまくいきませんできた。  
![/img/isucon7/07.jpg](/img/isucon7/07.jpg)  

### 感想
今回はチームメンバー二人のエンジニアリング力が高くてとても助けられました。  
わたしがいっぱい足を引っ張っていなければ決勝に…。  
来年こそは決勝進出したいです。  

