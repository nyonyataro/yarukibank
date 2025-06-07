# Google OAuth Configuration for Yarukibank

## 1. Google Cloud Console Setup

### Step 1: Create a new project in Google Cloud Console
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project named "Yarukibank"
3. Enable the Google+ API

### Step 2: Configure OAuth consent screen
1. Navigate to "APIs & Services" > "OAuth consent screen"
2. Choose "External" user type
3. Fill in the required information:
   - App name: "ヤルキバンク (Yarukibank)"
   - User support email: your email
   - Developer contact information: your email
   - App domain: your production domain
   - Authorized domains: add your domain (e.g., yarukibank.com)

### Step 3: Create OAuth 2.0 credentials
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Choose "Web application"
4. Add authorized redirect URIs:
   - Development: `https://<your-supabase-project-id>.supabase.co/auth/v1/callback`
   - Production: `https://your-domain.com/auth/v1/callback`

## 2. Supabase Configuration

### Step 1: Enable Google provider in Supabase
1. Go to your Supabase project dashboard
2. Navigate to Authentication > Providers
3. Enable Google provider
4. Add your Google OAuth credentials:
   - Client ID: from Google Cloud Console
   - Client Secret: from Google Cloud Console

### Step 2: Configure redirect URLs
Add these URLs to your Supabase project:
- Development: `http://localhost:3000/auth/callback`
- Production: `https://your-domain.com/auth/callback`

### Step 3: Configure email templates (optional)
Customize the email templates in Authentication > Email Templates for:
- Confirmation emails
- Password reset emails
- Magic link emails

## 3. Additional Security Settings

### Email domain restrictions (optional)
If you want to restrict sign-ups to specific domains, configure this in:
Authentication > Settings > Site Settings

### Rate limiting
Configure rate limiting for authentication requests to prevent abuse.

### Session settings
- Session timeout: Configure in Authentication > Settings
- Refresh token rotation: Enable for enhanced security

## 4. Testing

### Test Google OAuth flow:
1. Go to your application
2. Click "Sign in with Google"
3. Complete the OAuth flow
4. Verify user creation in Supabase Auth dashboard
5. Check that profile and notification_settings records are created automatically