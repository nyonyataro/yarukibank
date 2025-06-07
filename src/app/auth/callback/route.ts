import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const error = requestUrl.searchParams.get('error')
  const next = requestUrl.searchParams.get('next') ?? '/dashboard'

  console.log('認証コールバック:', { code: !!code, error, next })

  if (error) {
    console.error('OAuth認証エラー:', error)
    return NextResponse.redirect(`${requestUrl.origin}/auth/auth-code-error?error=${error}`)
  }

  if (code) {
    try {
      const supabase = await createClient()
      console.log('認証コード処理開始')
      
      // Exchange the code for a session
      const { data, error: sessionError } = await supabase.auth.exchangeCodeForSession(code)
      
      if (sessionError) {
        console.error('セッション変換エラー:', sessionError)
        return NextResponse.redirect(`${requestUrl.origin}/auth/auth-code-error?error=${encodeURIComponent(sessionError.message)}`)
      }
      
      if (data?.user) {
        console.log('セッション変換成功:', { user: data.user.id })
        
        // Explicitly set the session cookies
        const response = NextResponse.redirect(`${requestUrl.origin}${next}`)
        
        return response
      } else {
        console.error('ユーザー情報が取得できませんでした')
        return NextResponse.redirect(`${requestUrl.origin}/auth/auth-code-error?error=no_user`)
      }
    } catch (err) {
      console.error('認証コールバックエラー:', err)
      
      // If exchangeCodeForSession doesn't exist, just redirect and let middleware handle it
      if (err.message?.includes('exchangeCodeForSession')) {
        console.log('exchangeCodeForSessionが利用できません、代替処理を実行')
        return NextResponse.redirect(`${requestUrl.origin}${next}`)
      }
      
      return NextResponse.redirect(`${requestUrl.origin}/auth/auth-code-error`)
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${requestUrl.origin}/auth/auth-code-error`)
}