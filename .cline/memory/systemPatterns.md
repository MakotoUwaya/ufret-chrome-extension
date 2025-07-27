# システムアーキテクチャとパターン

## アーキテクチャ概要

Chrome 拡張機能の Manifest V3 アーキテクチャに基づく構成

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Background    │    │  Content Script │    │   Popup UI      │
│  Service Worker │◄──►│  (U-Fret Pages) │    │   (Settings)    │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │ Chrome Storage  │
                    │ (Settings Data) │
                    └─────────────────┘
```

## コンポーネント設計

### 1. Content Script (`src/content/index.tsx`)

**役割**: U-Fret ページに注入されるメインロジック

- 広告除去処理の実行
- キー選択の自動化
- 自動スクロール機能
- React UI コンポーネントの描画

**重要なパターン**:

```typescript
// メイン処理を即座に実行
main();

// DOM操作のリトライパターン
let iconFindLimit = 5;
while (iconFindLimit > 0) {
  var icon = document.getElementById('gn_interstitial_close_icon');
  if (icon) {
    icon.click();
    break;
  }
  setTimeout(() => {
    console.debug('waiting icon');
  }, 500);
  iconFindLimit--;
}
```

### 2. Popup UI (`src/popup/Popup.tsx`)

**役割**: ユーザー設定のインターフェース

- キー設定の変更 UI
- Material-UI 使用
- Chrome Storage API との連携

**設定値**:

```typescript
type MySettings = {
  selectedScoreKey: number; // -9 ~ +2の範囲
};
```

### 3. Storage Pattern

**Chrome Extension Storage API**を使用した設定の永続化

```typescript
const bucket = getBucket<MySettings>('my_ufret_settings', 'sync');
```

## 広告除去パターン

### 対象広告要素

1. **インタースティシャル広告**: `#gn_interstitial_close_icon`
2. **カルーセル広告**: `#carouselExampleIndicators`
3. **ディスプレイ広告群**:
   - `[id^='div-gpt-ad-PC/']`
   - `[id^='cf_async_']`
   - `[id^='google_ads_']`
   - `.adsbygoogle`
   - `.asOverlayAd__wrap`
   - `[id^='google_ads_iframe_']`
   - `.google-auto-placed`

### 除去戦略

1. **クリック除去**: インタースティシャル広告のクローズボタンをクリック
2. **DOM 除去**: 広告コンテナを DOM から削除
3. **セレクタベース**: 複数の広告パターンに対応

## キー自動選択パターン

### 実装フロー

1. ページ内の`keyselect`要素を検索
2. Storage API から設定値を取得
3. 値を設定して change イベントを発火
4. 楽譜表示の更新をトリガー

```typescript
keyselect.value = (
  settings.selectedScoreKey > 0 ? `+${settings.selectedScoreKey}` : settings.selectedScoreKey
).toString();
const event = new Event('change');
keyselect.dispatchEvent(event);
```

## 自動スクロールパターン

### 実装方法

1. `#my-chord-data`要素をクリック（楽譜表示トリガー）
2. `keyselect`要素まで自動スクロール
3. `scrollIntoView()`API を使用

## 技術スタック

### フロントエンド

- **React 18.2.0**: UI 構築
- **TypeScript**: 型安全性
- **Material-UI 5.11.11**: UI コンポーネント
- **Emotion**: CSS-in-JS

### 状態管理

- **Redux Toolkit**: アプリケーション状態管理
- **webext-redux**: Chrome 拡張機能用 Redux
- **@extend-chrome/storage**: Storage API 抽象化

### ビルドツール

- **Vite**: 高速ビルド
- **@crxjs/vite-plugin**: Chrome 拡張機能ビルド
- **TypeScript**: トランスパイル

### 開発ツール

- **ESLint**: コード品質
- **Prettier**: コードフォーマット
- **Jest**: テスティング
- **Testing Library**: React コンポーネントテスト

## セキュリティパターン

### Content Security Policy

```typescript
content_security_policy: {
  extension_pages: "script-src 'self'; object-src 'self'",
}
```

### 権限最小化

```typescript
permissions: ['storage', 'tabs', 'activeTab', 'declarativeContent'];
host_permissions: ['<all_urls>']; // 必要最小限に制限予定
```
