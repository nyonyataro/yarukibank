import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Target, CheckCircle, XCircle } from 'lucide-react'

interface DashboardStatsProps {
  activeGoals: number
  completedGoals: number
  failedGoals: number
  totalPenalty: number
}

export function DashboardStats({ activeGoals, completedGoals, failedGoals, totalPenalty }: DashboardStatsProps) {
  const totalGoals = activeGoals + completedGoals + failedGoals
  const successRate = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">アクティブな目標</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeGoals}</div>
          <p className="text-xs text-muted-foreground">
            {activeGoals > 0 ? '目標達成に向けて頑張りましょう！' : '新しい目標を作成してみませんか？'}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">達成した目標</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{completedGoals}</div>
          <p className="text-xs text-muted-foreground">
            達成率: {successRate}%
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">失敗した目標</CardTitle>
          <XCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{failedGoals}</div>
          <p className="text-xs text-muted-foreground">
            総罰金額: ¥{totalPenalty.toLocaleString()}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}