
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

