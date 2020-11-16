## プレゼンテーションに向けて [WIP]

---

### 改善🔧

- [ ] `./presentation.js` のコメントアウト部分の修正
    - [ ] Arduinoなり、他のもので動作するようにする
- [ ] `happy` スコアが `0.2` になるようなバグの修正

### 当日のためのリハーサルをする項目🔥
1. `node.js / npm` が動く環境で、 `npm run start:presen` を実行
2. [ローカルサーバー](http://localhost:3000)が開くので、そこにアクセスする
3. 外部からもアクセスできるようにしたいときは、`ngrok`を使う。
    - [インストールの方法](https://qiita.com/taketakekaho/items/b52a7ff840ad970a7a06)
4. `ngrok` を以下のコマンドで起動
    ```
    $ ngrok http --host-header=rewrite 3000
    ```
5. 起動できたら、
    ```
    EXAMPLES:
    ngrok http 80                    # secure public URL for port 80 web server
    ngrok by @inconshreveable                                                                                                                                           (Ctrl+C to quit)

    Session Status                online
    Version                       2.2.4
    Region                        United States (us)
    Web Interface                 http://127.0.0.1:3000
    Forwarding                    http://xxxxxxxx.ngrok.io -> localhost:3000
    Forwarding                    https://xxxxxxxx.ngrok.io -> localhost:3000

    Connections                   ttl     opn     rt1     rt5     p50     p90
                                6       0       0.05    0.02    23.33   25.98
    ```
    以上のような表示が出るので、そのうちの
    ```
    https://xxxxxxxx.ngrok.io
    ```
    が外部からのアクセスができるアドレスになる。
6. （余裕があれば）以上のアドレスをQRコードなどに変換し配布する。
    - ***ただし、これはngrokを立ち上げ直すとURLが変更になるため注意。これが嫌なら何かしらの方法でデプロイする。***
