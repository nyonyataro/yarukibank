import { MainLayout } from '@/components/layout/main-layout'
import { GoalDetail } from '@/components/goals/goal-detail'
import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'

interface GoalPageProps {
  params: {
    id: string
  }
}

export default async function GoalPage({ params }: GoalPageProps) {
  const supabase = await createClient()
  
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  
  if (userError || !user) {
    redirect('/login')
  }

  const { data: goal, error: goalError } = await supabase
    .from('goals')
    .select('*')
    .eq('id', params.id)
    .eq('user_id', user.id)
    .single()

  if (goalError || !goal) {
    notFound()
  }

  const { data: checkIns } = await supabase
    .from('check_ins')
    .select('*')
    .eq('goal_id', params.id)
    .order('checked_at', { ascending: false })

  return (
    <MainLayout>
      <GoalDetail goal={goal} checkIns={checkIns || []} />
    </MainLayout>
  )
}