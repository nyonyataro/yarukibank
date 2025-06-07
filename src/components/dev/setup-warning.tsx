'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertTriangle, Database, Key } from 'lucide-react'

export function SetupWarning() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-6 h-6 text-amber-500" />
            <CardTitle className="text-xl">開発環境のセットアップが必要です</CardTitle>
          </div>
          <CardDescription>
            Supabaseの設定を完了してアプリケーションを使用してください
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <Database className="h-4 w-4" />
            <AlertDescription>
              現在、Supabaseの環境変数が設定されていません。
              アプリケーションを使用するには、以下の手順を完了してください。
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">1. Supabaseプロジェクトの作成</h3>
              <p className="text-gray-600 text-sm">
                <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Supabase
                </a>でアカウントを作成し、新しいプロジェクトを作成してください。
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">2. データベースの設定</h3>
              <p className="text-gray-600 text-sm">
                プロジェクトルートの <code className="bg-gray-100 px-1 py-0.5 rounded">supabase/schema.sql</code> ファイルを
                Supabaseの SQL Editor で実行してください。
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">3. 環境変数の設定</h3>
              <p className="text-gray-600 text-sm mb-2">
                <code className="bg-gray-100 px-1 py-0.5 rounded">.env.local</code> ファイルを以下の内容で更新してください：
              </p>
              <pre className="bg-gray-900 text-green-400 p-3 rounded text-xs overflow-x-auto">
{`NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key`}
              </pre>
            </div>

            <div className="border-l-4 border-indigo-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">4. Google OAuth の設定</h3>
              <p className="text-gray-600 text-sm">
                Google Cloud Console でOAuthクライアントを作成し、
                Supabaseの Authentication > Providers で Google を有効にしてください。
              </p>
            </div>
          </div>

          <Alert>
            <Key className="h-4 w-4" />
            <AlertDescription>
              詳細なセットアップ手順は、プロジェクトルートの 
              <code className="bg-gray-100 px-1 py-0.5 rounded ml-1">SUPABASE_SETUP.md</code> 
              ファイルを参照してください。
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}