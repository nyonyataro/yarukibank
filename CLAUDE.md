ヤルキバンクの要件定義書（Supabase版）を更新します。
## 0.前提条件
回答は必ず日本語を用いてください

## 1. プロダクト概要

### 1.1 ビジョン
「他者の目」と「金銭的コミットメント」を活用し、ユーザーの目標達成を支援する日本向けコミットメントサービス

### 1.2 コアバリュー
- **社会的プレッシャー**：レフェリーの存在による適度な緊張感
- **損失回避**：罰金による行動変容の促進
- **習慣化支援**：継続的なフォローアップ

## 2. 機能要件

### 2.1 ユーザー管理
- **会員登録/ログイン**
  - Supabase Auth（Google OAuth）
  - プロフィール設定（ニックネーム、アバター）
  - アカウント設定（メール通知設定等）

### 2.2 目標設定機能
- **目標の作成**
  - タイトル（例：10kg痩せる）
  - 詳細説明
  - 期間設定（開始日・終了日）
  - 達成条件の明確化
  - カテゴリー選択（ダイエット、学習、運動など）
  
- **コミットメント設定**
  - 罰金額の設定（500円〜50,000円）
  - チェックイン頻度（毎日/週次/月次）
  - 罰金発生条件

### 2.3 レフェリー機能
- **レフェリー選択**
  - 自己承認モード
  - 他者承認モード（メール招待）
  - レフェリーの権限設定
  
- **承認プロセス**
  - 証拠提出（写真、数値入力、テキスト）
  - レフェリーによる承認/却下
  - 異議申し立て機能

### 2.4 進捗管理
- **ダッシュボード**
  - 現在の目標一覧
  - 達成率表示
  - カレンダービュー
  - 直近のチェックイン履歴
  
- **チェックイン機能**
  - 進捗報告フォーム
  - 証拠アップロード
  - コメント追加

### 2.5 通知機能
- **メール通知**
  - チェックインリマインダー
  - 締切アラート
  - 承認要求（レフェリー向け）
  - 達成/未達成通知

### 2.6 レポート機能
- **個人統計**
  - 達成率推移グラフ
  - カテゴリー別成績
  - 連続達成日数
  
- **週次/月次サマリー**
  - 進捗レポート自動生成
  - モチベーショナルメッセージ

### 2.7 決済機能（Phase 2）
- **Stripe連携**
  - クレジットカード登録
  - 自動引き落とし
  - 決済履歴
  
- **罰金配分**
  - 慈善団体への寄付
  - アンチチャリティ
  - 友人への送金
  - サービス内プール

## 3. 非機能要件

### 3.1 セキュリティ
- Supabase Row Level Security (RLS)
- Supabase Auth による認証
- 環境変数による秘密情報管理
- CSRFトークン保護

### 3.2 パフォーマンス
- Server Componentsによる高速レンダリング
- Supabase Realtime（リアルタイム更新）
- 画像最適化（Next.js Image）
- Edge Functionsの活用

### 3.3 ユーザビリティ
- レスポンシブデザイン
- ダークモード対応（shadcn/ui）
- アクセシビリティ（WCAG 2.1 AA準拠）
- 日本語UI

## 4. 技術スタック

### 4.1 フロントエンド/バックエンド
- **Next.js 15**（App Router）
- **TypeScript**
- **Tailwind CSS** + **shadcn/ui**
- **React Hook Form**（フォーム管理）
- **Zod**（バリデーション）

### 4.2 データベース・認証
- **Supabase**
  - PostgreSQL（データベース）
  - Auth（認証・認可）
  - Storage（画像保存）
  - Realtime（リアルタイム機能）
  - Edge Functions（サーバーレス関数）

### 4.3 UI コンポーネント（shadcn/ui）
- Button, Card, Dialog, Form
- Table, Tabs, Toast
- Calendar, Chart
- Alert, Avatar, Badge
- Select, Input, Textarea

### 4.4 インフラ・ホスティング
- **Vercel**（ホスティング）
- **Resend**（メール送信）

### 4.5 その他
- **@tanstack/react-query**（データフェッチング）
- **Recharts**（グラフ表示）
- **React Email**（メールテンプレート）
- **date-fns**（日付処理）
- **supabase mcpサーバー**（supabaseにまつわる設定をMCPサーバーを経由して自律的に実施）

## 5. MVP開発フェーズ

### Phase 1（2-3ヶ月）- コア機能
1. **認証システム**
   - Supabase Auth（Google OAuth）
   - ユーザープロフィール

2. **目標管理**
   - 目標のCRUD操作
   - 自己承認モードのみ
   - チェックイン機能

3. **基本的なダッシュボード**
   - 目標一覧（Card, Table）
   - 進捗表示（Progress, Badge）
   - シンプルな統計（Chart）

4. **通知**
   - 基本的なメール通知

### Phase 2（2-3ヶ月）- 拡張機能
1. **Stripe決済統合**
   - カード登録
   - 罰金の自動徴収
   - 決済履歴

2. **レフェリー機能**
   - 他者招待
   - 承認フロー

3. **罰金配分機能**
   - 寄付先選択
   - 配分処理

4. **高度なレポート**
   - 詳細な統計
   - エクスポート機能

### Phase 3（将来）- 成長機能
1. **LINE連携**
2. **モバイルアプリ（React Native）**
3. **ソーシャル機能**
4. **AIコーチング**
5. **広告システム**

## 6. Supabaseデータベース設計

```sql
-- ユーザープロフィール
create table profiles (
  id uuid references auth.users primary key,
  nickname text,
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 目標
create table goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  title text not null,
  description text,
  category text,
  start_date date not null,
  end_date date not null,
  penalty_amount integer not null,
  check_in_frequency text not null, -- 'daily', 'weekly', 'monthly'
  status text default 'active', -- 'active', 'completed', 'failed'
  created_at timestamptz default now()
);

-- チェックイン
create table check_ins (
  id uuid primary key default gen_random_uuid(),
  goal_id uuid references goals(id),
  user_id uuid references profiles(id),
  checked_at timestamptz default now(),
  evidence_type text, -- 'photo', 'number', 'text'
  evidence_data jsonb,
  status text default 'pending', -- 'pending', 'approved', 'rejected'
  notes text
);

-- レフェリー（Phase 2）
create table referees (
  id uuid primary key default gen_random_uuid(),
  goal_id uuid references goals(id),
  referee_email text not null,
  status text default 'pending', -- 'pending', 'accepted', 'declined'
  created_at timestamptz default now()
);
```

### Row Level Security (RLS) ポリシー例
```sql
-- ユーザーは自分のプロフィールのみ更新可能
create policy "Users can update own profile" on profiles
  for update using (auth.uid() = id);

-- ユーザーは自分の目標のみ閲覧・更新可能
create policy "Users can view own goals" on goals
  for select using (auth.uid() = user_id);
```

## 7. 画面構成とshadcn/uiコンポーネント

### Phase 1で実装する画面
1. **ランディングページ**
   - Hero section（Button, Card）
   - Features（Card, Icons）

2. **ログイン/サインアップ**
   - Form, Input, Button
   - Google OAuth Button

3. **ダッシュボード**
   - Tabs（アクティブ/完了/失敗）
   - Card（目標カード）
   - Progress（進捗バー）
   - Badge（ステータス表示）

4. **目標作成/編集**
   - Form, Input, Textarea
   - Select（カテゴリー）
   - Calendar（日付選択）
   - Dialog（確認モーダル）

5. **目標詳細**
   - Card（目標情報）
   - Table（チェックイン履歴）
   - Button（チェックインボタン）
   - Chart（進捗グラフ）

6. **チェックイン**
   - Dialog/Sheet
   - Form, Textarea
   - FileUpload（証拠アップロード）

7. **プロフィール設定**
   - Form, Input
   - Avatar
   - Switch（通知設定）

