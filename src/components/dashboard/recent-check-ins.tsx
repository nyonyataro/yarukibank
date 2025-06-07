'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { format, formatDistanceToNow } from 'date-fns'
import { ja } from 'date-fns/locale'
import { Clock } from 'lucide-react'

interface CheckIn {
  id: string
  goal_id: string
  user_id: string
  checked_at: string
  evidence_type: string | null
  evidence_data: any
  status: 'pending' | 'approved' | 'rejected'
  notes: string | null
  created_at: string
}

interface Goal {
  id: string
  title: string
}

interface RecentCheckInsProps {
  checkIns: CheckIn[]
}

export function RecentCheckIns({ checkIns }: RecentCheckInsProps) {
  const [goalsMap, setGoalsMap] = useState<Record<string, Goal>>({})
  const supabase = createClient()

  useEffect(() => {
    const fetchGoals = async () => {
      if (checkIns.length === 0) return

      const goalIds = [...new Set(checkIns.map(ci => ci.goal_id))]
      const { data: goals } = await supabase
        .from('goals')
        .select('id, title')
        .in('id', goalIds)

      if (goals) {
        const map = goals.reduce((acc, goal) => {
          acc[goal.id] = goal
          return acc
        }, {} as Record<string, Goal>)
        setGoalsMap(map)
      }
    }

    fetchGoals()
  }, [checkIns, supabase])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-500'
      case 'rejected':
        return 'bg-red-500'
      default:
        return 'bg-yellow-500'
    }
  }

  const getEvidenceText = (checkIn: CheckIn) => {
    if (!checkIn.evidence_data) return 'チェックイン完了'
    
    if (checkIn.evidence_type === 'number') {
      return `数値: ${checkIn.evidence_data.value}`
    }
    
    if (checkIn.evidence_type === 'text') {
      return checkIn.evidence_data.value || 'テキスト報告'
    }
    
    return 'チェックイン完了'
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>最近のチェックイン</CardTitle>
        <CardDescription>進捗報告の履歴です</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {checkIns.length === 0 ? (
          <div className="text-center py-8">
            <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              チェックイン履歴がありません
            </h3>
            <p className="text-gray-600 mb-4">
              目標を作成して進捗を報告してみましょう
            </p>
            <Button asChild>
              <Link href="/goals/new">
                目標を作成
              </Link>
            </Button>
          </div>
        ) : (
          <>
            {checkIns.map((checkIn) => (
              <div key={checkIn.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                <div className={`w-2 h-2 rounded-full ${getStatusColor(checkIn.status)}`}></div>
                <div className="flex-1">
                  <p className="font-medium">
                    {goalsMap[checkIn.goal_id]?.title || '目標'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {getEvidenceText(checkIn)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(checkIn.checked_at), { 
                      addSuffix: true,
                      locale: ja 
                    })}
                  </p>
                </div>
              </div>
            ))}
            
            <div className="pt-4">
              <Button asChild variant="outline" className="w-full">
                <Link href="/goals">目標を確認する</Link>
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}