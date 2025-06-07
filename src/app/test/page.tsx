import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CheckCircle, Target, Calendar, Coins } from 'lucide-react'

export default function TestPage() {
  return (
    <div className="container mx-auto p-8 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🎉 ヤルキバンク テスト画面
        </h1>
        <p className="text-lg text-gray-600">
          すべてのコンポーネントが正常に動作しています！
        </p>
      </div>

      <Alert>
        <CheckCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>セットアップ完了！</strong> Next.js 15 + shadcn/ui + TypeScript の環境構築が正常に完了しました。
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span>目標カード</span>
              </CardTitle>
              <Badge variant="default">アクティブ</Badge>
            </div>
            <CardDescription>
              これは目標管理カードのサンプルです
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>2024/6/7 - 2024/12/31</span>
              </div>
              <div className="flex items-center space-x-1">
                <Coins className="w-4 h-4" />
                <span>¥10,000</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>進捗</span>
                <span>65%</span>
              </div>
              <Progress value={65} className="h-2" />
            </div>
            <Button className="w-full">詳細を見る</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>統計情報</CardTitle>
            <CardDescription>
              あなたの目標達成状況
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">3</div>
                <div className="text-sm text-gray-600">アクティブ</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">12</div>
                <div className="text-sm text-gray-600">達成済み</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">2</div>
                <div className="text-sm text-gray-600">失敗</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">80%</div>
                <div className="text-sm text-gray-600">達成率</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>機能テスト</CardTitle>
            <CardDescription>
              各種コンポーネントの動作確認
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">デフォルト</Badge>
              <Badge variant="secondary">セカンダリ</Badge>
              <Badge variant="outline">アウトライン</Badge>
              <Badge variant="destructive">エラー</Badge>
            </div>
            <div className="space-y-2">
              <Button className="w-full">プライマリボタン</Button>
              <Button variant="outline" className="w-full">アウトラインボタン</Button>
              <Button variant="secondary" className="w-full">セカンダリボタン</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>🚀 次のステップ</CardTitle>
          <CardDescription>
            Supabaseを設定してアプリケーションを完成させましょう
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold">1. Supabaseプロジェクト作成</h4>
              <p className="text-sm text-gray-600">
                supabase.com でプロジェクトを作成し、URL・APIキーを取得
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">2. データベーススキーマ実行</h4>
              <p className="text-sm text-gray-600">
                supabase/schema.sql をSQL Editorで実行
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">3. 環境変数設定</h4>
              <p className="text-sm text-gray-600">
                .env.local にSupabaseの認証情報を設定
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">4. Google OAuth設定</h4>
              <p className="text-sm text-gray-600">
                Google Cloud Console でOAuth設定を完了
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}