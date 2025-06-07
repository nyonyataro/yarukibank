'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/client'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'

const checkInSchema = z.object({
  evidence_type: z.enum(['photo', 'number', 'text']).optional(),
  evidence_value: z.string().optional(),
  notes: z.string().optional(),
})

type CheckInFormData = z.infer<typeof checkInSchema>

interface CheckInDialogProps {
  goalId: string
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

const evidenceTypes = [
  { value: 'text', label: 'テキスト報告' },
  { value: 'number', label: '数値データ' },
  { value: 'photo', label: '写真証拠（準備中）' },
]

export function CheckInDialog({ goalId, open, onOpenChange, onSuccess }: CheckInDialogProps) {
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const form = useForm<CheckInFormData>({
    resolver: zodResolver(checkInSchema),
    defaultValues: {
      evidence_type: 'text',
      evidence_value: '',
      notes: '',
    },
  })

  const onSubmit = async (data: CheckInFormData) => {
    try {
      setLoading(true)

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        toast.error('ログインが必要です')
        return
      }

      const evidenceData = data.evidence_value ? {
        type: data.evidence_type,
        value: data.evidence_value,
      } : null

      const { error } = await supabase
        .from('check_ins')
        .insert({
          goal_id: goalId,
          user_id: user.id,
          evidence_type: data.evidence_type || null,
          evidence_data: evidenceData,
          notes: data.notes || null,
          status: 'approved', // Phase 1では自己承認
        })

      if (error) {
        console.error('Error creating check-in:', error)
        toast.error('チェックインの作成に失敗しました')
        return
      }

      toast.success('チェックインを記録しました！')
      form.reset()
      onOpenChange(false)
      onSuccess?.()
    } catch (error) {
      console.error('Error:', error)
      toast.error('チェックインの作成に失敗しました')
    } finally {
      setLoading(false)
    }
  }

  const watchedEvidenceType = form.watch('evidence_type')

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>進捗チェックイン</DialogTitle>
          <DialogDescription>
            今日の進捗を報告してください。証拠や詳細なメモを追加することで、より正確な記録を残せます。
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="evidence_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>証拠の種類</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="証拠の種類を選択" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {evidenceTypes.map((type) => (
                        <SelectItem 
                          key={type.value} 
                          value={type.value}
                          disabled={type.value === 'photo'}
                        >
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    進捗の証拠として提出する内容の種類を選択してください
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {watchedEvidenceType && (
              <FormField
                control={form.control}
                name="evidence_value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {watchedEvidenceType === 'number' && '数値データ'}
                      {watchedEvidenceType === 'text' && 'テキスト報告'}
                      {watchedEvidenceType === 'photo' && '写真アップロード'}
                    </FormLabel>
                    <FormControl>
                      {watchedEvidenceType === 'number' ? (
                        <Input
                          type="number"
                          step="0.1"
                          placeholder="例: 70.5 (体重kg), 30 (運動分数)"
                          {...field}
                        />
                      ) : watchedEvidenceType === 'text' ? (
                        <Textarea
                          placeholder="例: 30分ランニングを完了しました"
                          rows={3}
                          {...field}
                        />
                      ) : (
                        <Input
                          type="file"
                          accept="image/*"
                          disabled
                          placeholder="写真アップロード（準備中）"
                        />
                      )}
                    </FormControl>
                    <FormDescription>
                      {watchedEvidenceType === 'number' && '進捗を示す数値を入力してください'}
                      {watchedEvidenceType === 'text' && '今日の取り組み内容を詳しく記入してください'}
                      {watchedEvidenceType === 'photo' && '写真アップロード機能は準備中です'}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>メモ（任意）</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="感想、気づき、課題などがあれば記入してください"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    今日の振り返りや明日への意気込みなど
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => onOpenChange(false)}
              >
                キャンセル
              </Button>
              <Button type="submit" className="flex-1" disabled={loading}>
                {loading ? 'チェックイン中...' : 'チェックイン'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}