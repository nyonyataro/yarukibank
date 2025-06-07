import { MainLayout } from '@/components/layout/main-layout'
import { DashboardStats } from '@/components/dashboard/dashboard-stats'
import { RecentGoals } from '@/components/dashboard/recent-goals'
import { RecentCheckIns } from '@/components/dashboard/recent-check-ins'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Plus } from 'lucide-react'

export default async function DashboardPage() {
  const supabase = await createClient()
  
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    redirect('/login')
  }

  // 統計データの取得
  const { data: goals } = await supabase
    .from('goals')
    .select('*')
    .eq('user_id', user.id)

  const { data: checkIns } = await supabase
    .from('check_ins')
    .select('*')
    .eq('user_id', user.id)
    .order('checked_at', { ascending: false })
    .limit(5)

  const activeGoals = goals?.filter(g => g.status === 'active') || []
  const completedGoals = goals?.filter(g => g.status === 'completed') || []
  const failedGoals = goals?.filter(g => g.status === 'failed') || []
  const totalPenalty = failedGoals.reduce((sum, goal) => sum + goal.penalty_amount, 0)
  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">ダッシュボード</h1>
            <p className="text-gray-600 mt-2">あなたの目標の進捗状況を確認しましょう</p>
          </div>
          <Button asChild>
            <Link href="/goals/new">
              <Plus className="w-4 h-4 mr-2" />
              新しい目標を作成
            </Link>
          </Button>
        </div>

        <DashboardStats
          activeGoals={activeGoals.length}
          completedGoals={completedGoals.length}
          failedGoals={failedGoals.length}
          totalPenalty={totalPenalty}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentGoals goals={activeGoals.slice(0, 3)} />
          <RecentCheckIns checkIns={checkIns || []} />
        </div>
      </div>
    </MainLayout>
  )
}