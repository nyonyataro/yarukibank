'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckInDialog } from '@/components/check-ins/check-in-dialog'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { Target } from 'lucide-react'

interface Goal {
  id: string
  title: string
  description: string | null
  category: string
  start_date: string
  end_date: string
  penalty_amount: number
  check_in_frequency: string
  status: 'active' | 'completed' | 'failed'
  created_at: string
}

interface RecentGoalsProps {
  goals: Goal[]
}

const categoryLabels: Record<string, string> = {
  diet: 'ダイエット',
  exercise: '運動',
  study: '学習',
  work: '仕事',
  hobby: '趣味',
  health: '健康',
  other: 'その他',
}

export function RecentGoals({ goals }: RecentGoalsProps) {
  const [quickCheckInGoal, setQuickCheckInGoal] = useState<string | null>(null)

  return (
    <Card>
      <CardHeader>
        <CardTitle>今日のチェックイン</CardTitle>
        <CardDescription>アクティブな目標への進捗報告</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {goals.length === 0 ? (
          <div className="text-center py-8">
            <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              アクティブな目標がありません
            </h3>
            <p className="text-gray-600 mb-4">
              新しい目標を作成して、達成に向けて行動を開始しましょう
            </p>
            <Button asChild>
              <Link href="/goals">
                目標を作成する
              </Link>
            </Button>
          </div>
        ) : (
          <>
            {goals.map((goal) => (
              <div key={goal.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium">{goal.title}</h3>
                  <p className="text-sm text-gray-600">
                    {format(new Date(goal.end_date), 'M月d日まで', { locale: ja })}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="default">
                    {categoryLabels[goal.category] || goal.category}
                  </Badge>
                  <Badge variant="outline">
                    ¥{goal.penalty_amount.toLocaleString()}
                  </Badge>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => setQuickCheckInGoal(goal.id)}
                  >
                    チェックイン
                  </Button>
                </div>
              </div>
            ))}
            
            <div className="pt-4 text-center">
              <Button asChild variant="outline" size="sm">
                <Link href="/goals">目標を管理する</Link>
              </Button>
            </div>
          </>
        )}
      </CardContent>

      {quickCheckInGoal && (
        <CheckInDialog
          goalId={quickCheckInGoal}
          open={!!quickCheckInGoal}
          onOpenChange={() => setQuickCheckInGoal(null)}
          onSuccess={() => {
            window.location.reload()
            setQuickCheckInGoal(null)
          }}
        />
      )}
    </Card>
  )
}