
## 環境
### surface
- windows10
- npm -v: 6.4.1
- yarn -v: 1.13.0
- create-react-native-app  --version: 2.0.2
- expo --version: 2.10.0

### macbook air
- Sierra 10.13.6
- npm -v: 4.0.5
- yarn -v: 1.13.0
- create-react-native-app  --version: 2.0.2
- expo --version: 2.10.1

## 手順
1. react-native or create-react-native-app でサンプル作成
    - create-react-native-appの場合、ネイティブコードを動かすためには作ったアプリをejectする必要がある
        - ejectすると`Error: Cannot find module '../node-haste/DependencyGraph/ModuleResolution'`
            - 正直に`node-haste`を入れてejectすると`Couldn't read app.json`
                - どうやらejectするとapp.json書き換わるようで、転んだ場合はrevertする必要がありそうだ
    - 素直に[公式](https://facebook.github.io/react-native/docs/getting-started.html)見ると、`expo init`してるから試してみる
        - 結果変わらず
    - macで上記を試す
        - 一発成功
    - `react-native run-ios`で動作確認
        - `bundling failed: Error: The resource '/my/workspace/path/index.js' was not found.`
            - どうやらreact-nativeのvupに伴ってentrypointがapp.jsからindex.jsに変わったみたい(だけどejectは対応していない)
            - なのでindex.jsを作成する必要がある[where is index.js after eject in version 2.0.2 ?](https://github.com/react-community/create-react-native-app/issues/771)
2. package install
    - `yarn add rn-apple-healthkit` && `react-native link rn-apple-healthkit`
        []
    - `yarn add react-native-google-fit` && `react-native link react-native-google-fit`
3. 実機orシミュレータで確認
    - ios
        - 実機
            - xcode側のerror `signing for "dTests" requires a development team ...`
                - teamを登録していないって言われているけど、登録済み…
        - シミュレータ
            - moduleが動くことは確認。ただ、データが取得できない(シミュレータ上で値を入力しても空が返る)
    - android
        - 実機
            - androidの最新のSDKのバージョンが変わったため、参照するSDKをv27→v28に変更する必要がある
            - `react-native run-android`ができないと怒られる
                - どうやら`react-native`と`react-native-cli`がglobalに同居してるとだめみたい
                    - 加えて、localにはreact-nativeが必要なよう
                    - `yarn global remove react-native && yarn add react-native`
            - `unable to load script from assets index.android.bundle`
                - runの前にbundleする必要があるらしい[ref](https://stackoverflow.com/questions/44446523/unable-to-load-script-from-assets-index-android-bundle-on-windows). ただし、なくても行ける時がある(！？)
                    - `react-native bundle`
                    - どうやらnodejsが使うportが塞がってると同様のエラーが出るらしい[ref](https://stackoverflow.com/questions/30216417/react-native-port-8081-already-in-use-packager-is-either-not-running-or-not-r)
            - 動いたが、データが取れない。(認証に転んでる？)
                - 調査中
        - シミュレータ
            - 未
