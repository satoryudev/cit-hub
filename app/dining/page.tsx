'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { UtensilsCrossed, Clock, Flame } from 'lucide-react'
import PageWrapper from '@/components/PageWrapper'

type Category = '全て' | '定食' | '麺類' | '丼・カレー' | '軽食' | 'デザート'

interface MenuItem {
  id: number
  name: string
  price: number
  category: Exclude<Category, '全て'>
  kcal: number
  available: boolean
  img: string
}

const menuItems: MenuItem[] = [
  { id: 1, name: '日替わり定食A', price: 420, category: '定食', kcal: 650, available: true, img: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=70' },
  { id: 2, name: '日替わり定食B', price: 480, category: '定食', kcal: 720, available: true, img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=70' },
  { id: 3, name: 'ラーメン', price: 390, category: '麺類', kcal: 580, available: true, img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=70' },
  { id: 4, name: 'うどん', price: 350, category: '麺類', kcal: 460, available: true, img: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400&q=70' },
  { id: 5, name: 'カレーライス', price: 360, category: '丼・カレー', kcal: 690, available: true, img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=70' },
  { id: 6, name: '親子丼', price: 400, category: '丼・カレー', kcal: 630, available: false, img: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&q=70' },
  { id: 7, name: 'おにぎりセット', price: 280, category: '軽食', kcal: 380, available: true, img: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&q=70' },
  { id: 8, name: 'サンドウィッチ', price: 320, category: '軽食', kcal: 420, available: true, img: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&q=70' },
  { id: 9, name: 'プリン', price: 180, category: 'デザート', kcal: 200, available: true, img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=70' },
  { id: 10, name: 'ソフトクリーム', price: 150, category: 'デザート', kcal: 160, available: false, img: 'https://images.unsplash.com/photo-1612203985729-70726954388c?w=400&q=70' },
]

const categories: Category[] = ['全て', '定食', '麺類', '丼・カレー', '軽食', 'デザート']

export default function DiningPage() {
  const [selected, setSelected] = useState<Category>('全て')

  const filtered = selected === '全て' ? menuItems : menuItems.filter((m) => m.category === selected)

  return (
    <PageWrapper>
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-[#dbeafe] rounded-xl flex items-center justify-center">
            <UtensilsCrossed className="w-5 h-5 text-[#1e40af]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">学食メニュー</h1>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> 本日の提供メニュー
            </p>
          </div>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelected(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selected === cat
                  ? 'bg-[#1e40af] text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-[#3b82f6] hover:text-[#1e40af]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden ${
                !item.available ? 'opacity-50' : ''
              }`}
            >
              <div className="relative h-36 overflow-hidden">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                {!item.available && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-white text-sm font-bold bg-black/60 px-3 py-1 rounded-full">売切れ</span>
                  </div>
                )}
                <span className="absolute top-2 right-2 bg-white/90 text-[#1e40af] text-xs px-2 py-0.5 rounded-full font-medium">
                  {item.category}
                </span>
              </div>
              <div className="p-3">
                <p className="font-semibold text-gray-800 text-sm mb-1">{item.name}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[#1e40af] font-bold text-base">¥{item.price}</span>
                  <span className="text-xs text-gray-400 flex items-center gap-0.5">
                    <Flame className="w-3 h-3" />
                    {item.kcal}kcal
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </PageWrapper>
  )
}
