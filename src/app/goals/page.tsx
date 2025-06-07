'use client'

import { useState, useEffect } from 'react'
import { MainLayout } from '@/components/layout/main-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { Plus, Target, Calendar, Coins } from 'lucide-react'
import { CheckInDialog } from '@/components/check-ins/check-in-dialog'

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

const categoryLabels: Record<string, string> = {
  diet: 'ダイエット',
  exercise: '運動',
  study: '学習',
  work: '仕事',
  hobby: '趣味',
  health: '健康',
  other: 'その他',
}

const frequencyLabels: Record<string, string> = {
  daily: '毎日',
  weekly: '週次',
  monthly: '月次',
}

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('active')
  const [quickCheckInGoal, setQuickCheckInGoal] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    fetchGoals()
  }, [])

  const fetchGoals = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        toast.error('ログインが必要です')
        return
      }

      const { data, error } = await supabase
        .from('goals')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching goals:', error)
        toast.error('目標の取得に失敗しました')
        return
      }

      setGoals(data || [])
    } catch (error) {
      console.error('Error:', error)
      toast.error('目標の取得に失敗しました')
    } finally {
      setLoading(false)
    }
  }

  const getGoalsByStatus = (status: string) => {
    return goals.filter(goal => goal.status === status)
  }

  const getProgressPercentage = (goal: Goal) => {
    const now = new Date()
    const start = new Date(goal.start_date)
    const end = new Date(goal.end_date)
    
    if (now < start) return 0
    if (now > end) return 100
    
    const total = end.getTime() - start.getTime()
    const elapsed = now.getTime() - start.getTime()
    
    return Math.round((elapsed / total) * 100)
  }

  const getDaysRemaining = (goal: Goal) => {
    const now = new Date()
    const end = new Date(goal.end_date)
    const diffTime = end.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    return diffDays > 0 ? diffDays : 0
  }

  const GoalCard = ({ goal }: { goal: Goal }) => {
    const progress = getProgressPercentage(goal)
    const daysRemaining = getDaysRemaining(goal)
    
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg">{goal.title}</CardTitle>
              {goal.description && (
                <CardDescription className="mt-1">
                  {goal.description}
                </CardDescription>
              )}
            </div>
            <div className="flex flex-col items-end space-y-2">
              <Badge variant="secondary">
                {categoryLabels[goal.category] || goal.category}
              </Badge>
              <Badge variant="outline" className="text-xs">
                <Coins className="w-3 h-3 mr-1" />
                ¥{goal.penalty_amount.toLocaleString()}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {format(new Date(goal.start_date), 'M/d', { locale: ja })} - {format(new Date(goal.end_date), 'M/d', { locale: ja })}
            </div>
            <div>
              {frequencyLabels[goal.check_in_frequency]}チェックイン
            </div>
          </div>
          
          {goal.status === 'active' && (
            <>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>進捗</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  残り {daysRemaining} 日
                </span>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => setQuickCheckInGoal(goal.id)}
                  >
                    チェックイン
                  </Button>
                  <Button asChild size="sm" variant="outline">
                    <Link href={`/goals/${goal.id}`}>
                      詳細
                    </Link>
                  </Button>
                </div>
              </div>
            </>
          )}
          
          {goal.status === 'completed' && (
            <div className="flex items-center justify-between">
              <Badge variant="default" className="bg-green-500">
                達成済み
              </Badge>
              <Button asChild size="sm" variant="outline">
                <Link href={`/goals/${goal.id}`}>
                  詳細を見る
                </Link>
              </Button>
            </div>
          )}
          
          {goal.status === 'failed' && (
            <div className="flex items-center justify-between">
              <Badge variant="destructive">
                失敗
              </Badge>
              <Button asChild size="sm" variant="outline">
                <Link href={`/goals/${goal.id}`}>
                  詳細を見る
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  if (loading) {
    return (
      <MainLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">目標一覧</h1>
            <Button asChild>
              <Link href="/goals/new">
                <Plus className="w-4 h-4 mr-2" />
                新しい目標
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-100 rounded w-2/3"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-100 rounded"></div>
                    <div className="h-2 bg-gray-100 rounded"></div>
                    <div className="h-8 bg-gray-100 rounded"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">目標管理</h1>
            <p className="text-gray-600 mt-2">目標の作成・編集・履歴確認</p>
          </div>
          <Button asChild>
            <Link href="/goals/new">
              <Plus className="w-4 h-4 mr-2" />
              新しい目標
            </Link>
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              アクティブ ({getGoalsByStatus('active').length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              達成済み ({getGoalsByStatus('completed').length})
            </TabsTrigger>
            <TabsTrigger value="failed">
              失敗 ({getGoalsByStatus('failed').length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6">
            {getGoalsByStatus('active').length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Target className="w-12 h-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    アクティブな目標がありません
                  </h3>
                  <p className="text-gray-600 text-center mb-6">
                    新しい目標を作成して、達成に向けて行動を開始しましょう
                  </p>
                  <Button asChild>
                    <Link href="/goals/new">
                      <Plus className="w-4 h-4 mr-2" />
                      最初の目標を作成
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getGoalsByStatus('active').map((goal) => (
                  <GoalCard key={goal.id} goal={goal} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            {getGoalsByStatus('completed').length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    達成した目標がありません
                  </h3>
                  <p className="text-gray-600 text-center">
                    目標を達成すると、ここに表示されます
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getGoalsByStatus('completed').map((goal) => (
                  <GoalCard key={goal.id} goal={goal} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="failed" className="space-y-6">
            {getGoalsByStatus('failed').length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    失敗した目標がありません
                  </h3>
                  <p className="text-gray-600 text-center">
                    失敗した目標があると、ここに表示されます
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getGoalsByStatus('failed').map((goal) => (
                  <GoalCard key={goal.id} goal={goal} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {quickCheckInGoal && (
        <CheckInDialog
          goalId={quickCheckInGoal}
          open={!!quickCheckInGoal}
          onOpenChange={() => setQuickCheckInGoal(null)}
          onSuccess={() => {
            fetchGoals()
            setQuickCheckInGoal(null)
          }}
        />
      )}
    </MainLayout>
  )
}