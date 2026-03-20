import PageWrapper from "@/components/PageWrapper";
import { BookOpen, Bell, Clock } from "lucide-react";

const schedule = [
  { period: "1限", time: "9:00-10:30", mon: "微積分", tue: "英語", wed: "プログラミング", thu: "物理", fri: "線形代数" },
  { period: "2限", time: "10:40-12:10", mon: "情報理論", tue: "アルゴリズム", wed: "英語", thu: "データベース", fri: "OS概論" },
  { period: "3限", time: "13:00-14:30", mon: "ネットワーク", tue: "微積分", wed: "線形代数", thu: "プログラミング", fri: "英語" },
  { period: "4限", time: "14:40-16:10", mon: "実験", tue: "セミナー", wed: "情報理論", thu: "", fri: "アルゴリズム" },
  { period: "5限", time: "16:20-17:50", mon: "", tue: "OS概論", wed: "", thu: "ネットワーク", fri: "" },
];

const news = [
  { id: 1, date: "2026-03-21", category: "重要", title: "春学期シラバス公開のお知らせ", body: "2026年度春学期のシラバスが学務システムに公開されました。履修登録前に必ずご確認ください。" },
  { id: 2, date: "2026-03-20", category: "就活", title: "企業合同説明会開催（4月10日）", body: "IT企業を中心とした合同説明会を津田沼キャンパスで開催します。事前登録不要、スーツ着用でお越しください。" },
  { id: 3, date: "2026-03-18", category: "施設", title: "図書館 春季長期貸出について", body: "3月25日〜4月7日は春季長期貸出期間です。通常より多くの図書を借りることができます。" },
  { id: 4, date: "2026-03-15", category: "学術", title: "情報工学科 研究発表会のご案内", body: "4年生による卒業研究発表会を3月28日（土）に開催します。在学生の聴講も歓迎します。" },
];

const days = ["月", "火", "水", "木", "金"];

export default function DashboardPage() {
  return (
    <PageWrapper>
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Banner */}
        <div className="relative rounded-2xl overflow-hidden mb-8 h-48 sm:h-64">
          <img
            src="https://images.unsplash.com/photo-1562774053-701939374585?w=1200&q=80"
            alt="キャンパス"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1e40af]/80 to-[#1e3a8a]/40 flex items-center px-8">
            <div className="text-white">
              <p className="text-blue-200 text-sm font-medium mb-1">千葉工業大学 情報工学科</p>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">CIT-Hub</h1>
              <p className="text-blue-100 text-sm">学生ポータルサイトへようこそ</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Timetable */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-[#1e40af]" />
              <h2 className="text-lg font-bold text-gray-800">時間割</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="py-2 pr-3 text-left text-gray-500 font-medium w-20">時限</th>
                    {days.map((d) => (
                      <th key={d} className="py-2 px-2 text-center text-gray-600 font-semibold">{d}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((row) => (
                    <tr key={row.period} className="border-b border-gray-50 last:border-0">
                      <td className="py-3 pr-3">
                        <div className="font-semibold text-[#1e40af]">{row.period}</div>
                        <div className="text-xs text-gray-400">{row.time}</div>
                      </td>
                      {[row.mon, row.tue, row.wed, row.thu, row.fri].map((subject, i) => (
                        <td key={i} className="py-3 px-2 text-center">
                          {subject ? (
                            <span className="inline-block bg-[#dbeafe] text-[#1e40af] text-xs px-2 py-1 rounded-lg font-medium">
                              {subject}
                            </span>
                          ) : (
                            <span className="text-gray-200">—</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* News */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="w-5 h-5 text-[#1e40af]" />
              <h2 className="text-lg font-bold text-gray-800">お知らせ</h2>
            </div>
            <div className="space-y-4">
              {news.map((item) => (
                <div key={item.id} className="border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs bg-[#dbeafe] text-[#1e40af] px-2 py-0.5 rounded-full font-medium">
                      {item.category}
                    </span>
                    <span className="text-xs text-gray-400">{item.date}</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-800 leading-tight mb-1">{item.title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick links */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: BookOpen, label: "学務システム", desc: "履修・成績確認" },
            { icon: Bell, label: "メールチェック", desc: "大学メール" },
            { icon: Clock, label: "図書館", desc: "蔵書検索" },
            { icon: BookOpen, label: "Moodle", desc: "オンライン授業" },
          ].map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3 cursor-pointer hover:border-[#3b82f6] hover:shadow-md transition-all"
            >
              <div className="w-10 h-10 bg-[#dbeafe] rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-[#1e40af]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">{label}</p>
                <p className="text-xs text-gray-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </PageWrapper>
  );
}
