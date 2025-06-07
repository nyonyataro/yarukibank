import { MainLayout } from '@/components/layout/main-layout'
import { ProfileForm } from '@/components/profile/profile-form'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function ProfilePage() {
  const supabase = await createClient()
  
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">プロフィール設定</h1>
          <p className="text-gray-600 mt-2">
            アカウント情報を管理してください
          </p>
        </div>

        <ProfileForm initialData={profile} user={user} />
      </div>
    </MainLayout>
  )
}