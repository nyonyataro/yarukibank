'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MainLayout } from '@/components/layout/main-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CalendarIcon } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { cn } from '@/lib/utils'

const goalSchema = z.object({
  title: z.string().min(1, '目標タイトルを入力してください').max(100, '100文字以内で入力してください'),
  description: z.string().optional(),
  category: z.string().min(1, 'カテゴリーを選択してください'),
  start_date: z.date({
    required_error: '開始日を選択してください',
  }),
  end_date: z.date({
    required_error: '終了日を選択してください',
  }),
  penalty_amount: z.number().min(500, '罰金額は500円以上で設定してください').max(50000, '罰金額は50,000円以下で設定してください'),
  check_in_frequency: z.string().min(1, 'チェックイン頻度を選択してください'),
}).refine((data) => data.end_date > data.start_date, {
  message: '終了日は開始日より後の日付を選択してください',
  path: ['end_date'],
})

type GoalFormData = z.infer<typeof goalSchema>

const categories = [
  { value: 'diet', label: 'ダイエット' },
  { value: 'exercise', label: '運動' },
  { value: 'study', label: '学習' },
  { value: 'work', label: '仕事' },
  { value: 'hobby', label: '趣味' },
  { value: 'health', label: '健康' },
  { value: 'other', label: 'その他' },
]

const frequencies = [
  { value: 'daily', label: '毎日' },
  { value: 'weekly', label: '週次' },
  { value: 'monthly', label: '月次' },
]

export default function NewGoalPage() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm<GoalFormData>({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      start_date: new Date(),
      penalty_amount: 1000,
    },
  })

  const onSubmit = async (data: GoalFormData) => {
    try {
      setLoading(true)

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        toast.error('ログインが必要です')
        router.push('/login')
        return
      }

      const { error } = await supabase
        .from('goals')
        .insert({
          user_id: user.id,
          title: data.title,
          description: data.description || null,
          category: data.category,
          start_date: data.start_date.toISOString().split('T')[0],
          end_date: data.end_date.toISOString().split('T')[0],
          penalty_amount: data.penalty_amount,
          check_in_frequency: data.check_in_frequency,
          status: 'active',
        })

      if (error) {
        console.error('Error creating goal:', error)
        toast.error('目標の作成に失敗しました')
        return
      }

      toast.success('目標を作成しました！')
      router.push('/goals')
    } catch (error) {
      console.error('Error:', error)
      toast.error('目標の作成に失敗しました')
    } finally {
      setLoading(false)
    }
  }

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">新しい目標を作成</h1>
          <p className="text-gray-600 mt-2">あなたの達成したい目標を設定しましょう</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>目標の詳細</CardTitle>
            <CardDescription>
              目標の内容、期間、罰金額を設定してください
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">目標タイトル *</Label>
                <Input
                  id="title"
                  placeholder="例: 10kg減量する"
                  {...register('title')}
                />
                {errors.title && (
                  <p className="text-sm text-red-500">{errors.title.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">詳細説明</Label>
                <Textarea
                  id="description"
                  placeholder="目標の詳細や達成条件を記入してください（任意）"
                  rows={3}
                  {...register('description')}
                />
              </div>

              <div className="space-y-2">
                <Label>カテゴリー *</Label>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="カテゴリーを選択" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.category && (
                  <p className="text-sm text-red-500">{errors.category.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>開始日 *</Label>
                  <Controller
                    name="start_date"
                    control={control}
                    render={({ field }) => (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              'w-full justify-start text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, 'PPP', { locale: ja })
                            ) : (
                              <span>日付を選択</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    )}
                  />
                  {errors.start_date && (
                    <p className="text-sm text-red-500">{errors.start_date.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>終了日 *</Label>
                  <Controller
                    name="end_date"
                    control={control}
                    render={({ field }) => (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              'w-full justify-start text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, 'PPP', { locale: ja })
                            ) : (
                              <span>日付を選択</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    )}
                  />
                  {errors.end_date && (
                    <p className="text-sm text-red-500">{errors.end_date.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="penalty_amount">罰金額 *</Label>
                <Input
                  id="penalty_amount"
                  type="number"
                  min={500}
                  max={50000}
                  step={500}
                  placeholder="1000"
                  {...register('penalty_amount', { valueAsNumber: true })}
                />
                <p className="text-sm text-gray-500">
                  500円〜50,000円の範囲で設定してください
                </p>
                {errors.penalty_amount && (
                  <p className="text-sm text-red-500">{errors.penalty_amount.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>チェックイン頻度 *</Label>
                <Controller
                  name="check_in_frequency"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="チェックイン頻度を選択" />
                      </SelectTrigger>
                      <SelectContent>
                        {frequencies.map((frequency) => (
                          <SelectItem key={frequency.value} value={frequency.value}>
                            {frequency.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.check_in_frequency && (
                  <p className="text-sm text-red-500">{errors.check_in_frequency.message}</p>
                )}
              </div>

              <div className="flex gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => router.back()}
                >
                  キャンセル
                </Button>
                <Button type="submit" className="flex-1" disabled={loading}>
                  {loading ? '作成中...' : '目標を作成'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}