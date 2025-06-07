# ヤルキバンク - Supabase セットアップガイド

## ✅ MCPサーバーによる自動設定完了

MCPサーバーを使用して、以下の設定が自動的に完了しました：

### 🎯 完了済み設定
- ✅ **Supabaseプロジェクト**: `yarukibank` (ID: uemoedkvtmrbpiylgpvd)
- ✅ **データベーススキーマ**: 全テーブル作成済み
- ✅ **Row Level Security**: セキュリティポリシー設定済み
- ✅ **環境変数**: `.env.local`に設定済み
- ✅ **TypeScript型定義**: 最新のスキーマに対応

### 📊 作成済みデータベーステーブル
- `profiles` - ユーザープロフィール
- `goals` - 目標管理
- `check_ins` - チェックイン履歴
- `notification_settings` - 通知設定
- `referees` - レフェリー機能（Phase 2）
- `penalty_payments` - 罰金処理（Phase 2）

## 🔐 Google OAuth設定（手動設定が必要）

MCPサーバーで設定できない部分のみ、以下の手順で設定してください：

### Step 1: Google Cloud Console設定
1. [Google Cloud Console](https://console.cloud.google.com/) にアクセス
2. 新しいプロジェクトを作成または既存のプロジェクトを選択
3. 「APIとサービス」→「ライブラリ」→「Google+ API」を有効化

### Step 2: OAuth同意画面の設定
1. 「APIとサービス」→「OAuth同意画面」
2. 「外部」ユーザータイプを選択
3. 必要情報を入力：
   - アプリ名: `ヤルキバンク`
   - ユーザーサポートメール: あなたのメールアドレス
   - デベロッパーの連絡先情報: あなたのメールアドレス

### Step 3: OAuth認証情報の作成
1. 「APIとサービス」→「認証情報」
2. 「認証情報を作成」→「OAuthクライアントID」
3. 「ウェブアプリケーション」を選択
4. 承認済みのリダイレクトURIを追加：
   ```
   https://uemoedkvtmrbpiylgpvd.supabase.co/auth/v1/callback
   ```
5. クライアントIDとクライアントシークレットを記録

### Step 4: Supabaseでの設定
1. [Supabaseダッシュボード](https://supabase.com/dashboard) でプロジェクト「yarukibank」を開く
2. 「Authentication」→「Providers」
3. 「Google」を見つけて「Configure」をクリック
4. Googleプロバイダーを有効化
5. Google Cloud ConsoleのクライアントIDとクライアントシークレットを入力
6. 設定を保存

### Step 5: 環境変数の更新
`.env.local`ファイルのGoogle OAuth設定を更新：
```env
# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
```

## 🧪 セットアップの確認

### 1. 開発サーバーの起動
```bash
npm run dev
```

### 2. 認証のテスト
1. http://localhost:3001 にアクセス
2. 「ログイン」をクリック
3. 「Googleでログイン」を試行
4. 正常にログインできることを確認

### 3. データベースの確認
1. Supabaseダッシュボードの「Table Editor」を確認
2. ログイン後に`profiles`テーブルにユーザー情報が作成されることを確認
3. `notification_settings`テーブルも自動作成されることを確認

## 🔧 追加設定（オプション）

### サービスロールキーの取得（Phase 2用）
1. Supabaseダッシュボードの「Settings」→「API」
2. `service_role` `secret`キーをコピー
3. `.env.local`の`SUPABASE_SERVICE_ROLE_KEY`を更新

### メール設定（Phase 2用）
1. 「Authentication」→「Email Templates」
2. 各種メールテンプレートをカスタマイズ：
   - サインアップ確認
   - パスワードリセット
   - ユーザー招待など

## 🛡️ セキュリティチェックリスト

- [x] RLSポリシーが全テーブルで有効
- [x] 環境変数が適切に設定
- [ ] Google OAuthの設定完了
- [x] データベースアクセスがRLSで制限
- [x] 自動プロフィール作成が動作

## 🚀 準備完了！

上記の設定が完了すれば、ヤルキバンクアプリケーションが完全に動作します。

### 利用可能な機能
- ✅ Google認証
- ✅ ユーザープロフィール管理
- ✅ 目標の作成・編集・削除
- ✅ チェックイン機能
- ✅ ダッシュボード表示
- ✅ 進捗管理

### 次のステップ（Phase 2）
- 💳 Stripe決済統合
- 👥 レフェリー機能
- 📧 メール通知システム
- 📊 高度なレポート機能

何か問題が発生した場合は、[Supabaseドキュメント](https://supabase.com/docs)を参照するか、プロジェクトのログを確認してください。