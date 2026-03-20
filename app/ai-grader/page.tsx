'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, FileText, Sparkles, RefreshCw } from 'lucide-react'
import PageWrapper from '@/components/PageWrapper'

interface Scores {
  logic: number
  writing: number
  originality: number
  references: number
}

function calcScore(text: string): Scores {
  const len = text.length
  const logicKeywords = ['なぜなら', 'したがって', 'つまり', 'よって', '一方で', 'しかし', '考察', '分析', '検討']
  const writingKeywords = ['また', 'さらに', 'まず', '次に', '最後に', '結論', 'すなわち']
  const origKeywords = ['提案', '独自', '新たな', 'アプローチ', '本研究', '本稿', '考える', '思われる']
  const refKeywords = ['参考文献', '引用', '文献', '出典', '研究', '論文', '資料', '[', '(']

  const countKeywords = (keywords: string[]) =>
    keywords.reduce((acc, kw) => acc + (text.includes(kw) ? 1 : 0), 0)

  const lengthScore = Math.min(100, Math.floor((len / 1200) * 70) + 30)

  const logic = Math.min(100, Math.floor(lengthScore * 0.6 + countKeywords(logicKeywords) * 6 + Math.random() * 10))
  const writing = Math.min(100, Math.floor(lengthScore * 0.6 + countKeywords(writingKeywords) * 5 + Math.random() * 10))
  const originality = Math.min(100, Math.floor(countKeywords(origKeywords) * 8 + 40 + Math.random() * 20))
  const references = Math.min(100, Math.floor(countKeywords(refKeywords) * 10 + 30 + Math.random() * 15))

  return { logic, writing, originality, references }
}

function getGrade(total: number) {
  if (total >= 90) return { label: 'S', color: 'text-purple-600' }
  if (total >= 80) return { label: 'A', color: 'text-green-600' }
  if (total >= 70) return { label: 'B', color: 'text-blue-600' }
  if (total >= 60) return { label: 'C', color: 'text-yellow-600' }
  return { label: 'D', color: 'text-red-500' }
}

const criteria = [
  { key: 'logic' as const, label: '論理性', weight: 35 },
  { key: 'writing' as const, label: '文章力', weight: 30 },
  { key: 'originality' as const, label: '独自性', weight: 20 },
  { key: 'references' as const, label: '参考文献', weight: 15 },
]

export default function AIGraderPage() {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [scores, setScores] = useState<Scores | null>(null)

  const handleGrade = async () => {
    if (!text.trim() || text.length < 50) return
    setScores(null)
    setLoading(true)
    const delay = 800 + Math.random() * 700
    await new Promise((r) => setTimeout(r, delay))
    setScores(calcScore(text))
    setLoading(false)
  }

  const handleReset = () => {
    setText('')
    setScores(null)
  }

  const total = scores
    ? Math.round(
        criteria.reduce((acc, c) => acc + scores[c.key] * (c.weight / 100), 0)
      )
    : 0

  const grade = scores ? getGrade(total) : null

  return (
    <PageWrapper>
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-[#dbeafe] rounded-xl flex items-center justify-center">
            <Bot className="w-5 h-5 text-[#1e40af]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">AIレポート採点</h1>
            <p className="text-sm text-gray-500">レポートをAIが自動採点します（模擬）</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-4 h-4 text-gray-500" />
            <label className="text-sm font-semibold text-gray-700">レポート本文を貼り付けてください</label>
          </div>
          <textarea
            className="w-full h-56 border border-gray-200 rounded-xl p-4 text-sm text-gray-700 resize-none focus:outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/20 transition-all"
            placeholder="レポートの本文をここに入力してください（最低50文字）..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={loading}
          />
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-gray-400">{text.length} 文字</span>
            <div className="flex gap-2">
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-4 py-2 text-sm text-gray-500 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                リセット
              </button>
              <button
                onClick={handleGrade}
                disabled={loading || text.length < 50}
                className="flex items-center gap-1.5 px-5 py-2 text-sm font-semibold bg-[#1e40af] text-white rounded-xl hover:bg-[#1e3a8a] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                {loading ? '採点中...' : 'AIで採点'}
              </button>
            </div>
          </div>
        </div>

        {loading && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-3 border-[#3b82f6] border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-gray-500">AIがレポートを分析しています...</p>
          </div>
        )}

        <AnimatePresence>
          {scores && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.35 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
            >
              <h2 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#3b82f6]" />
                採点結果
              </h2>

              {/* Total score */}
              <div className="flex items-center gap-6 mb-6 p-4 bg-[#dbeafe] rounded-xl">
                <div className="text-center">
                  <p className="text-xs text-[#1e40af] font-medium mb-1">総合得点</p>
                  <p className="text-4xl font-bold text-[#1e40af]">{total}</p>
                  <p className="text-xs text-[#1e40af]/70">/ 100</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-[#1e40af] font-medium mb-1">評価</p>
                  <p className={`text-5xl font-black ${grade?.color}`}>{grade?.label}</p>
                </div>
              </div>

              {/* Detail scores */}
              <div className="space-y-4">
                {criteria.map((c) => {
                  const score = scores[c.key]
                  return (
                    <div key={c.key}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">{c.label}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400">比重 {c.weight}%</span>
                          <span className="text-sm font-bold text-gray-800">{score}</span>
                        </div>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${score}%` }}
                          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
                          className="h-full rounded-full bg-gradient-to-r from-[#3b82f6] to-[#1e40af]"
                        />
                      </div>
                    </div>
                  )
                })}
              </div>

              <p className="mt-5 text-xs text-gray-400 text-center">
                ※ これは模擬採点です。実際の評価とは異なります。
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </PageWrapper>
  )
}
