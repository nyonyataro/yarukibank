-- ヤルキバンク (Yarukibank) Row Level Security Policies
-- セキュリティポリシーを設定してデータアクセスを制御

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE check_ins ENABLE ROW LEVEL SECURITY;
ALTER TABLE referees ENABLE ROW LEVEL SECURITY;
ALTER TABLE penalty_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_settings ENABLE ROW LEVEL SECURITY;

-- Profiles table policies
-- ユーザーは自分のプロフィールのみ閲覧・更新可能
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Goals table policies  
-- ユーザーは自分の目標のみ閲覧・操作可能
CREATE POLICY "Users can view own goals" ON goals
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own goals" ON goals
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own goals" ON goals
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own goals" ON goals
    FOR DELETE USING (auth.uid() = user_id);

-- レフェリーは承認した目標を閲覧可能 (Phase 2)
CREATE POLICY "Referees can view assigned goals" ON goals
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM referees r 
            WHERE r.goal_id = goals.id 
            AND r.referee_user_id = auth.uid() 
            AND r.status = 'accepted'
        )
    );

-- Check-ins table policies
-- ユーザーは自分のチェックインのみ閲覧・操作可能
CREATE POLICY "Users can view own check_ins" ON check_ins
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own check_ins" ON check_ins
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own check_ins" ON check_ins
    FOR UPDATE USING (auth.uid() = user_id);

-- レフェリーは承認権限のあるチェックインを閲覧・更新可能 (Phase 2)
CREATE POLICY "Referees can view assigned check_ins" ON check_ins
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM referees r 
            JOIN goals g ON r.goal_id = g.id
            WHERE g.id = check_ins.goal_id 
            AND r.referee_user_id = auth.uid() 
            AND r.status = 'accepted'
        )
    );

CREATE POLICY "Referees can update assigned check_ins" ON check_ins
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM referees r 
            JOIN goals g ON r.goal_id = g.id
            WHERE g.id = check_ins.goal_id 
            AND r.referee_user_id = auth.uid() 
            AND r.status = 'accepted'
        )
    );

-- Referees table policies (Phase 2)
-- 目標の所有者はレフェリーを管理可能
CREATE POLICY "Goal owners can manage referees" ON referees
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM goals g 
            WHERE g.id = referees.goal_id 
            AND g.user_id = auth.uid()
        )
    );

-- レフェリーは自分に関連する招待を閲覧・更新可能
CREATE POLICY "Referees can view own invitations" ON referees
    FOR SELECT USING (referee_user_id = auth.uid());

CREATE POLICY "Referees can update own invitations" ON referees
    FOR UPDATE USING (referee_user_id = auth.uid());

-- Penalty payments table policies (Phase 2)
-- ユーザーは自分の決済履歴のみ閲覧可能
CREATE POLICY "Users can view own penalty payments" ON penalty_payments
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own penalty payments" ON penalty_payments
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Notification settings table policies
-- ユーザーは自分の通知設定のみ閲覧・操作可能
CREATE POLICY "Users can view own notification settings" ON notification_settings
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own notification settings" ON notification_settings
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own notification settings" ON notification_settings
    FOR UPDATE USING (auth.uid() = user_id);

-- 関数: プロフィール自動作成
-- 新規ユーザー登録時に自動でプロフィールと通知設定を作成
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, nickname, email_notifications)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', true);
  
  INSERT INTO public.notification_settings (user_id)
  VALUES (new.id);
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- トリガー: 新規ユーザー作成時にプロフィールを自動生成
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();