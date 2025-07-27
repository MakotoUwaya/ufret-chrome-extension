# 技術コンテキスト

## 開発環境

### 必要なツール

- **Node.js**: v14 以上（推奨 v18.12.1）
- **Yarn**: v1.22.19 推奨
- **Chrome/Chromium**: 拡張機能テスト用
- **Firefox**: クロスブラウザテスト用（オプション）

### 開発サーバー起動

```bash
yarn install  # 依存関係インストール
yarn dev      # 開発サーバー起動
yarn build    # プロダクションビルド
```

## ファイル構造

```
src/
├── manifest.ts                 # 拡張機能マニフェスト定義
├── background/
│   └── index.ts               # バックグラウンドサービスワーカー
├── content/
│   ├── index.tsx              # メインコンテンツスクリプト
│   ├── Content.tsx            # React UIコンポーネント
│   └── features/counter/      # サンプル機能（削除予定）
├── popup/
│   ├── Popup.tsx              # ポップアップUI（設定画面）
│   └── popup.html             # ポップアップHTML
├── options/
│   ├── Options.tsx            # オプションページ
│   └── options.html           # オプションHTML
├── shared/
│   ├── types/setting.ts       # 設定型定義
│   └── utils/                 # 共通ユーティリティ
└── app/
    ├── store.ts               # Redux store設定
    └── proxyStore.ts          # Chrome拡張用Redux設定
```

## ビルド設定

### Vite 設定 (`vite.config.ts`)

- **@crxjs/vite-plugin**: Chrome 拡張機能ビルド
- **Hot Module Replacement**: 開発時のライブリロード
- **TypeScript**: 型チェックとトランスパイル
- **React**: JSX/TSX 処理

### マニフェスト設定

```typescript
// src/manifest.ts
{
  manifest_version: 3,
  name: 'U-Fret utility',
  content_scripts: [{
    matches: ['https://www.ufret.jp/*'],
    js: ['src/content/index.tsx']
  }],
  permissions: ['storage', 'tabs', 'activeTab', 'declarativeContent'],
  host_permissions: ['<all_urls>']
}
```

## 依存関係

### コア依存関係

```json
{
  "@eduardoac-skimlinks/webext-redux": "3.0.1-release-candidate",
  "@extend-chrome/storage": "1.5.0",
  "@reduxjs/toolkit": "1.8.4",
  "react": "18.2.0",
  "react-redux": "7.2.8",
  "webextension-polyfill": "0.9.0"
}
```

### UI 依存関係

```json
{
  "@emotion/react": "11.10.6",
  "@emotion/styled": "11.10.6",
  "@mui/material": "5.11.11",
  "@mui/icons-material": "5.11.11",
  "@fontsource/roboto": "4.5.8"
}
```

### 開発依存関係

```json
{
  "@crxjs/vite-plugin": "1.0.13",
  "@vitejs/plugin-react": "1.3.2",
  "typescript": "4.7.4",
  "vite": "3.2.11",
  "eslint": "8.17.0",
  "prettier": "2.7.1",
  "jest": "28.1.3"
}
```

## コード品質管理

### ESLint 設定 (`.eslintrc.json`)

```json
{
  "extends": ["eslint:recommended", "react-app", "react-app/jest", "prettier"],
  "plugins": ["simple-import-sort", "react-hooks"],
  "rules": {
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error"
  }
}
```

**重要**: `eslint-plugin-import` は明示的にインストールしない

- `eslint-config-react-app` が既に `eslint-plugin-import` を提供
- 明示的にインストールすると競合エラーが発生
- plugins 配列に `"import"` を含めない

### 開発ワークフロー

```bash
yarn lint              # ESLint + Prettier チェック
yarn format            # 自動フォーマット
yarn test              # Jest テスト実行
git cim "fix: message"  # Conventional Commits形式でコミット
```

### Pre-commit フック

- **nano-staged**: ステージされたファイルのみリント
- **simple-git-hooks**: Git フック管理
- **commitlint**: Conventional Commits チェック

### ESLint トラブルシューティング

#### プラグイン重複エラー

```
ESLint couldn't determine the plugin "import" uniquely
```

**解決方法**:

1. `yarn remove eslint-plugin-import`
2. `.eslintrc.json` の plugins から `"import"` を削除
3. `eslint-config-react-app` が既に提供するため不要

#### プラグイン未インストールエラー

```
ESLint couldn't find the plugin "eslint-plugin-import"
```

**解決方法**: 上記の重複エラー解決方法と同じ

- 明示的なインストールではなく、設定から削除が正解

## Chrome 拡張機能固有の制約

### Manifest V3 制約

- **Service Worker**: バックグラウンドスクリプトの実行環境
- **Content Security Policy**: インラインスクリプト制限
- **Dynamic Import**: 制限された動的インポート
- **Host Permissions**: 明示的なホスト権限要求

### Storage API 制約

```typescript
// 同期ストレージ使用（Chrome同期）
const bucket = getBucket<MySettings>('my_ufret_settings', 'sync');

// 非同期アクセス必須
const settings = await bucket.get();
await bucket.set({ selectedScoreKey: newValue });
```

### Content Script 制約

- **DOM Access**: 完全な DOM 操作可能
- **Isolated World**: ページ JavaScript から分離
- **Chrome API Access**: 制限された API 使用

## テスト設定

### Jest 設定 (`jest.config.js`)

```javascript
{
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapping: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  }
}
```

### Testing Library

- **@testing-library/react**: React コンポーネントテスト
- **@testing-library/jest-dom**: DOM matcher 拡張
- **jest-chrome**: Chrome API モック

## デプロイ戦略

### Chrome Web Store

1. `yarn build`でビルド
2. `dist/`フォルダを zip 化
3. Chrome Web Store Developer Dashboard にアップロード

### Firefox Add-ons

1. `yarn build`でビルド
2. `yarn firefox-build`で Firefox 用ビルド
3. `dist_firefox/`フォルダを使用

### 開発環境での読み込み

```bash
# Chrome
chrome://extensions → Developer mode → Load unpacked → dist/

# Firefox
about:debugging → This Firefox → Load Temporary Add-on → dist_firefox/
```

## セキュリティ考慮事項

### Content Security Policy

- インラインスクリプト禁止
- 外部リソース読み込み制限
- eval()関数使用禁止

### 権限管理

- 最小権限の原則
- host_permissions の具体的な指定推奨
- 不要な権限の削除

### データ保護

- ユーザー設定データの暗号化（必要に応じて）
- ローカルストレージの適切な使用
- 外部 API との通信なし（現在）

## パフォーマンス最適化

### Bundle Size

- Tree Shaking 有効
- 不要な依存関係の除外
- Dynamic Import 活用

### Runtime Performance

- DOM 操作の最小化
- イベントリスナーの適切な管理
- メモリリーク防止
