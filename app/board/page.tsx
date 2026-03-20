'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Heart, Send, User } from 'lucide-react'
import PageWrapper from '@/components/PageWrapper'

type TagType = '質問' | '情報共有' | '雑談' | '緊急'

interface Post {
  id: number
  author: string
  tag: TagType
  content: string
  likes: number
  likedByMe: boolean
  date: string
}

const tagColors: Record<TagType, string> = {
  質問: 'bg-blue-100 text-blue-700',
  情報共有: 'bg-green-100 text-green-700',
  雑談: 'bg-gray-100 text-gray-600',
  緊急: 'bg-red-100 text-red-600',
}

const initialPosts: Post[] = [
  { id: 1, author: 'たろう', tag: '質問', content: 'アルゴリズム演習の第3回の課題ってもう提出しましたか？締め切りが明日なのでちょっと焦っています…', likes: 5, likedByMe: false, date: '10分前' },
  { id: 2, author: '匿名', tag: '情報共有', content: '図書館の4階に新しい自習室ができたみたいです！席数も多くてWi-Fiも速いので試験勉強におすすめです。', likes: 12, likedByMe: false, date: '1時間前' },
  { id: 3, author: 'はなこ', tag: '緊急', content: '明日の2限「データベース論」の教室が変更になりました。3号館A棟→2号館B棟です。先生からメールも来ているはずです！', likes: 23, likedByMe: false, date: '2時間前' },
  { id: 4, author: '匿名', tag: '雑談', content: '学食のカレー最近スパイシーになった気がするのは自分だけ？以前より辛くなったと思う', likes: 8, likedByMe: false, date: '3時間前' },
  { id: 5, author: 'けんじ', tag: '情報共有', content: 'プログラミング基礎のサンプルコードをGitHubにまとめました。困っている人がいたら参考にしてください（URLは問い合わせください）', likes: 15, likedByMe: false, date: '昨日' },
]

const tags: TagType[] = ['質問', '情報共有', '雑談', '緊急']

export default function BoardPage() {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [author, setAuthor] = useState('')
  const [tag, setTag] = useState<TagType>('雑談')
  const [content, setContent] = useState('')

  const handleSubmit = () => {
    if (!content.trim()) return
    const newPost: Post = {
      id: Date.now(),
      author: author.trim() || '匿名',
      tag,
      content: content.trim(),
      likes: 0,
      likedByMe: false,
      date: 'たった今',
    }
    setPosts([newPost, ...posts])
    setContent('')
    setAuthor('')
  }

  const handleLike = (id: number) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, likes: p.likedByMe ? p.likes - 1 : p.likes + 1, likedByMe: !p.likedByMe }
          : p
      )
    )
  }

  return (
    <PageWrapper>
      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-[#dbeafe] rounded-xl flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-[#1e40af]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">掲示板</h1>
            <p className="text-sm text-gray-500">学科内の情報共有・質問スペース</p>
          </div>
        </div>

        {/* Post form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
          <h2 className="text-sm font-bold text-gray-700 mb-3">新しい投稿</h2>
          <div className="flex gap-3 mb-3">
            <div className="flex-1">
              <input
                type="text"
                placeholder="名前（省略で匿名）"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/20"
              />
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {tags.map((t) => (
                <button
                  key={t}
                  onClick={() => setTag(t)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                    tag === t
                      ? 'bg-[#1e40af] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <textarea
            placeholder="内容を入力..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm h-24 resize-none focus:outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/20"
          />
          <div className="flex justify-end mt-2">
            <button
              onClick={handleSubmit}
              disabled={!content.trim()}
              className="flex items-center gap-1.5 px-5 py-2 bg-[#1e40af] text-white text-sm font-semibold rounded-xl hover:bg-[#1e3a8a] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              投稿する
            </button>
          </div>
        </div>

        {/* Posts list */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {posts.map((post) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, y: -12, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="w-7 h-7 bg-[#dbeafe] rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-3.5 h-3.5 text-[#1e40af]" />
                    </div>
                    <span className="text-sm font-semibold text-gray-800">{post.author}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${tagColors[post.tag]}`}>
                      {post.tag}
                    </span>
                    <span className="text-xs text-gray-400">{post.date}</span>
                  </div>
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-xl transition-colors flex-shrink-0 ${
                      post.likedByMe
                        ? 'bg-red-50 text-red-500'
                        : 'bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-400'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${post.likedByMe ? 'fill-current' : ''}`} />
                    {post.likes}
                  </button>
                </div>
                <p className="mt-2 text-sm text-gray-700 leading-relaxed">{post.content}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>
    </PageWrapper>
  )
}
