import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Target, Users, CreditCard, TrendingUp } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            <span className="text-blue-600">ヤルキバンク</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-4">
            目標達成をサポートする
            <br />
            コミットメントサービス
          </p>
          <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
            「他者の目」と「金銭的コミットメント」を活用して、
            <br />
            あなたの目標達成を強力にサポートします
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-3">
              <Link href="/login">今すぐ始める</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-3">
              <Link href="#features">詳しく見る</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            なぜヤルキバンクなのか？
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            科学的根拠に基づいた仕組みで、あなたの目標達成をサポートします
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="text-center border-2 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl">明確な目標設定</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                期間・条件・罰金額を設定して、
                曖昧な目標を具体的な行動に変換
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center border-2 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-xl">社会的プレッシャー</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                レフェリーの存在により、
                一人では挫折しがちな目標も継続できる
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center border-2 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-red-600" />
              </div>
              <CardTitle className="text-xl">損失回避の原理</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                罰金システムにより、
                「失うかもしれない」という心理で行動を促進
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center border-2 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <CardTitle className="text-xl">進捗の可視化</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                チェックイン機能とレポートで、
                あなたの成長を数値で実感
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              使い方はとても簡単
            </h2>
            <p className="text-lg text-gray-600">
              3つのステップで目標達成への道のりが始まります
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold mb-4">目標を設定</h3>
              <p className="text-gray-600">
                達成したい目標、期間、罰金額を設定します。
                明確な条件を決めることが成功の鍵です。
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold mb-4">進捗を報告</h3>
              <p className="text-gray-600">
                定期的にチェックインして進捗を報告。
                証拠となる写真や数値も一緒に提出できます。
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-purple-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold mb-4">目標を達成</h3>
              <p className="text-gray-600">
                継続的な取り組みで目標を達成！
                達成できなかった場合は約束の罰金が発生します。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            今すぐ目標達成を始めましょう
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            無料でアカウントを作成して、あなたの最初の目標を設定してみてください
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-3">
            <Link href="/login">無料で始める</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">ヤルキバンク</h3>
          <p className="text-gray-400 mb-6">
            目標達成をサポートするコミットメントサービス
          </p>
          <div className="flex justify-center space-x-6">
            <Link href="/privacy" className="text-gray-400 hover:text-white">
              プライバシーポリシー
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white">
              利用規約
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-white">
              お問い合わせ
            </Link>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800">
            <p className="text-gray-500">
              © 2024 ヤルキバンク. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}