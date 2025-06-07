import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Target, Users, CreditCard, TrendingUp, ArrowRight, CheckCircle } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 sm:py-20 text-center">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-8">
            <CheckCircle className="w-4 h-4 mr-2" />
            科学的根拠に基づく目標達成システム
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              ヤルキバンク
            </span>
            <br className="hidden sm:block" />
            <span className="text-2xl sm:text-3xl lg:text-4xl font-medium text-gray-700">
              で目標を確実に達成
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-6 max-w-3xl mx-auto">
            「他者の目」と「金銭的コミットメント」の力で、
            <br className="hidden sm:block" />
            三日坊主を卒業しましょう
          </p>
          
          <p className="text-base sm:text-lg text-gray-500 mb-10 max-w-2xl mx-auto">
            挫折しがちな目標も、適度なプレッシャーと仕組みがあれば必ず達成できます
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
            <Button asChild size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-200 group">
              <Link href="/login">
                無料で始める
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-3 border-2 hover:bg-gray-50">
              <Link href="#features">
                詳しく見る
              </Link>
            </Button>
          </div>
          
          <div className="mt-12 text-sm text-gray-500">
            すでに <span className="font-medium text-blue-600">1,000人以上</span> が目標を達成しています
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-16 sm:py-20">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
            なぜヤルキバンクなのか？
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            科学的根拠に基づいた仕組みで、あなたの目標達成をサポートします
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-blue-50 to-blue-100/50">
            <CardHeader className="pb-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Target className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <CardTitle className="text-lg sm:text-xl">明確な目標設定</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm sm:text-base">
                期間・条件・罰金額を設定して、曖昧な目標を具体的な行動に変換
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-green-50 to-green-100/50">
            <CardHeader className="pb-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Users className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <CardTitle className="text-lg sm:text-xl">社会的プレッシャー</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm sm:text-base">
                レフェリーの存在により、一人では挫折しがちな目標も継続できる
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-red-50 to-red-100/50">
            <CardHeader className="pb-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <CreditCard className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <CardTitle className="text-lg sm:text-xl">損失回避の原理</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm sm:text-base">
                罰金システムにより、「失うかもしれない」という心理で行動を促進
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-purple-50 to-purple-100/50">
            <CardHeader className="pb-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <TrendingUp className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <CardTitle className="text-lg sm:text-xl">進捗の可視化</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm sm:text-base">
                チェックイン機能とレポートで、あなたの成長を数値で実感
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              使い方はとても簡単
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              3つのステップで目標達成への道のりが始まります
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 max-w-5xl mx-auto">
            <div className="text-center relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto mb-6 shadow-xl">
                1
              </div>
              <div className="hidden sm:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-blue-200 to-green-200 -translate-x-1/2"></div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">目標を設定</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                達成したい目標、期間、罰金額を設定します。明確な条件を決めることが成功の鍵です。
              </p>
            </div>

            <div className="text-center relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto mb-6 shadow-xl">
                2
              </div>
              <div className="hidden sm:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-green-200 to-purple-200 -translate-x-1/2"></div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">進捗を報告</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                定期的にチェックインして進捗を報告。証拠となる写真や数値も一緒に提出できます。
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-2xl flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto mb-6 shadow-xl">
                3
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">目標を達成</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                継続的な取り組みで目標を達成！達成できなかった場合は約束の罰金が発生します。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
            今すぐ目標達成を始めましょう
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            無料でアカウントを作成して、あなたの最初の目標を設定してみてください
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
            <Button asChild size="lg" variant="secondary" className="text-base sm:text-lg px-6 sm:px-8 py-3 shadow-xl hover:shadow-2xl transition-all duration-200 group">
              <Link href="/login">
                無料で始める
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base sm:text-lg px-6 sm:px-8 py-3 border-2 border-white/30 text-white hover:bg-white/10">
              <Link href="#features">
                もう一度見る
              </Link>
            </Button>
          </div>
          <div className="mt-8 text-sm text-blue-200">
            クレジットカード不要・いつでも退会可能
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              ヤルキバンク
            </h3>
            <p className="text-gray-400 mb-6 sm:mb-8 max-w-md mx-auto">
              目標達成をサポートするコミットメントサービス
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mb-8">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm sm:text-base">
                プライバシーポリシー
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm sm:text-base">
                利用規約
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm sm:text-base">
                お問い合わせ
              </Link>
            </div>
            <div className="pt-6 sm:pt-8 border-t border-gray-800">
              <p className="text-gray-500 text-sm">
                © 2024 ヤルキバンク. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}