'use client'

import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function AuthCodeError() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <AlertCircle className="w-12 h-12 text-red-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-red-700">認証エラー</CardTitle>
          <CardDescription>
            認証中にエラーが発生しました
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-700">
                エラー詳細: {error}
              </p>
            </div>
          )}
          <p className="text-gray-600 text-sm text-center">
            もう一度ログインをお試しください。問題が続く場合は、しばらく待ってから再度お試しください。
          </p>
          <div className="space-y-2">
            <Button asChild className="w-full">
              <Link href="/login">
                再度ログインする
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/">
                ホームに戻る
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}