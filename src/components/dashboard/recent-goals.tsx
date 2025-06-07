import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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
  return (
    <Card>
      <CardHeader>
        <CardTitle>現在の目標</CardTitle>
        <CardDescription>進行中の目標の一覧です</CardDescription>
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
              <Link href="/goals/new">
                最初の目標を作成
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
                </div>
              </div>
            ))}
            
            <div className="pt-4">
              <Button asChild variant="outline" className="w-full">
                <Link href="/goals">すべての目標を見る</Link>
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}