'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { toast } from 'sonner'
import { User } from '@supabase/supabase-js'

const profileSchema = z.object({
  nickname: z.string().min(1, 'ニックネームは必須です').max(50, 'ニックネームは50文字以内で入力してください'),
  email: z.string().email('有効なメールアドレスを入力してください'),
})

type ProfileFormData = z.infer<typeof profileSchema>

interface ProfileFormProps {
  initialData: any
  user: User
}

export function ProfileForm({ initialData, user }: ProfileFormProps) {
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      nickname: initialData?.nickname || user.user_metadata?.full_name || '',
      email: initialData?.email || user.email || '',
    },
  })

  const onSubmit = async (data: ProfileFormData) => {
    try {
      setLoading(true)

      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          nickname: data.nickname,
          email: data.email,
          updated_at: new Date().toISOString(),
        })

      if (error) throw error

      toast.success('プロフィールを更新しました')
    } catch (error) {
      console.error('プロフィール更新エラー:', error)
      toast.error('プロフィールの更新に失敗しました')
    } finally {
      setLoading(false)
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>基本情報</CardTitle>
        <CardDescription>
          プロフィール情報を編集できます
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src={user.user_metadata?.avatar_url} />
            <AvatarFallback className="text-lg">
              {getInitials(form.watch('nickname') || user.email || 'U')}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm text-gray-600">プロフィール画像</p>
            <Button variant="outline" size="sm" disabled>
              画像を変更（準備中）
            </Button>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="nickname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ニックネーム</FormLabel>
                  <FormControl>
                    <Input placeholder="ニックネームを入力" {...field} />
                  </FormControl>
                  <FormDescription>
                    他のユーザーに表示される名前です
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>メールアドレス</FormLabel>
                  <FormControl>
                    <Input placeholder="メールアドレスを入力" {...field} disabled />
                  </FormControl>
                  <FormDescription>
                    通知やアカウント情報の送信に使用されます（変更不可）
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={loading}>
              {loading ? '更新中...' : 'プロフィールを更新'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}