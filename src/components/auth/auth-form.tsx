'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { SetupWarning } from '@/components/dev/setup-warning'

export function AuthForm() {
  const [loading, setLoading] = useState(false)
  
  let supabase
  try {
    supabase = createClient()
  } catch (error) {
    return <SetupWarning />
  }

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true)
      console.log('認証開始:', {
        origin: window.location.origin,
        redirectTo: `${window.location.origin}/auth/callback`
      })
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        toast.error(`ログインに失敗しました: ${error.message}`)
        console.error('OAuth Error:', error)
      } else {
        console.log('OAuth開始成功')
      }
    } catch (error) {
      toast.error(`ログインに失敗しました: ${error.message}`)
      console.error('Catch Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">ヤルキバンク</CardTitle>
        <CardDescription>
          目標達成をサポートするコミットメントサービス
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full"
          size="lg"
        >
          {loading ? 'ログイン中...' : 'Googleでログイン'}
        </Button>
        <p className="text-xs text-muted-foreground text-center">
          ログインすることで、利用規約とプライバシーポリシーに同意したものとみなされます
        </p>
      </CardContent>
    </Card>
  )
}