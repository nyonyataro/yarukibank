'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { CheckInDialog } from '@/components/check-ins/check-in-dialog'
import { format, differenceInDays } from 'date-fns'
import { ja } from 'date-fns/locale'
import { Calendar, Coins, ArrowLeft, Plus, Target, Clock } from 'lucide-react'

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

interface GoalDetailProps {
  goal: Goal
  checkIns: CheckIn[]
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

const statusLabels: Record<string, string> = {
  pending: '承認待ち',
  approved: '承認済み',
  rejected: '却下',
}

export function GoalDetail({ goal, checkIns }: GoalDetailProps) {
  const [checkInDialogOpen, setCheckInDialogOpen] = useState(false)
  const router = useRouter()

  const getProgressPercentage = () => {
    const now = new Date()
    const start = new Date(goal.start_date)
    const end = new Date(goal.end_date)
    
    if (now < start) return 0
    if (now > end) return 100
    
    const total = end.getTime() - start.getTime()
    const elapsed = now.getTime() - start.getTime()
    
    return Math.round((elapsed / total) * 100)
  }

  const getDaysRemaining = () => {
    const now = new Date()
    const end = new Date(goal.end_date)
    const diffDays = differenceInDays(end, now)
    
    return diffDays > 0 ? diffDays : 0
  }

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

  const progress = getProgressPercentage()
  const daysRemaining = getDaysRemaining()
  const approvedCheckIns = checkIns.filter(ci => ci.status === 'approved').length
  const totalDays = differenceInDays(new Date(goal.end_date), new Date(goal.start_date))

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          戻る
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{goal.title}</h1>
          <p className="text-gray-600 mt-1">目標の詳細と進捗状況</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* 目標情報 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                目標情報
                <Badge variant={goal.status === 'active' ? 'default' : goal.status === 'completed' ? 'secondary' : 'destructive'}>
                  {goal.status === 'active' && 'アクティブ'}
                  {goal.status === 'completed' && '達成済み'}
                  {goal.status === 'failed' && '失敗'}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {goal.description && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">詳細説明</h4>
                  <p className="text-gray-600">{goal.description}</p>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium">カテゴリー</span>
                    <Badge variant="outline">
                      {categoryLabels[goal.category] || goal.category}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Coins className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium">罰金額</span>
                    <Badge variant="secondary">
                      ¥{goal.penalty_amount.toLocaleString()}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium">チェックイン頻度</span>
                    <Badge variant="outline">
                      {frequencyLabels[goal.check_in_frequency]}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium">開始日</span>
                    <span className="text-sm">
                      {format(new Date(goal.start_date), 'PPP', { locale: ja })}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium">終了日</span>
                    <span className="text-sm">
                      {format(new Date(goal.end_date), 'PPP', { locale: ja })}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">期間</span>
                    <span className="text-sm">
                      {totalDays}日間
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* チェックイン履歴 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                チェックイン履歴
                {goal.status === 'active' && (
                  <Button size="sm" onClick={() => setCheckInDialogOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    チェックイン
                  </Button>
                )}
              </CardTitle>
              <CardDescription>
                進捗報告の履歴を確認できます
              </CardDescription>
            </CardHeader>
            <CardContent>
              {checkIns.length === 0 ? (
                <div className="text-center py-8">
                  <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    チェックイン履歴がありません
                  </h3>
                  <p className="text-gray-600 mb-4">
                    進捗を報告してみましょう
                  </p>
                  {goal.status === 'active' && (
                    <Button onClick={() => setCheckInDialogOpen(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      最初のチェックイン
                    </Button>
                  )}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>日時</TableHead>
                      <TableHead>証拠タイプ</TableHead>
                      <TableHead>ステータス</TableHead>
                      <TableHead>メモ</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {checkIns.map((checkIn) => (
                      <TableRow key={checkIn.id}>
                        <TableCell>
                          {format(new Date(checkIn.checked_at), 'M/d HH:mm', { locale: ja })}
                        </TableCell>
                        <TableCell>
                          {checkIn.evidence_type ? (
                            <Badge variant="outline">
                              {checkIn.evidence_type === 'photo' && '写真'}
                              {checkIn.evidence_type === 'number' && '数値'}
                              {checkIn.evidence_type === 'text' && 'テキスト'}
                            </Badge>
                          ) : (
                            <span className="text-gray-400">なし</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="secondary" 
                            className={getStatusColor(checkIn.status)}
                          >
                            {statusLabels[checkIn.status]}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {checkIn.notes || <span className="text-gray-400">なし</span>}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* 進捗サマリー */}
          <Card>
            <CardHeader>
              <CardTitle>進捗サマリー</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {goal.status === 'active' && (
                <>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>期間進捗</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {daysRemaining}
                    </div>
                    <div className="text-sm text-gray-600">残り日数</div>
                  </div>
                </>
              )}
              
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {approvedCheckIns}
                </div>
                <div className="text-sm text-gray-600">承認済みチェックイン</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {checkIns.length}
                </div>
                <div className="text-sm text-gray-600">総チェックイン数</div>
              </div>
            </CardContent>
          </Card>

          {/* アクション */}
          {goal.status === 'active' && (
            <Card>
              <CardHeader>
                <CardTitle>アクション</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full" 
                  onClick={() => setCheckInDialogOpen(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  進捗を報告
                </Button>
                <Button variant="outline" className="w-full">
                  目標を編集
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <CheckInDialog
        goalId={goal.id}
        open={checkInDialogOpen}
        onOpenChange={setCheckInDialogOpen}
        onSuccess={() => window.location.reload()}
      />
    </div>
  )
}