import React from 'react'
import { LayoutDashboard, Users, FileText, Video, Music, Globe2 } from 'lucide-react'
import { useAdminAuth } from './contexts/useAdminAuth'

const AdminDashboardPage = () => {
  const { user } = useAdminAuth()

  return (
    <div className="py-4">
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/40 px-3 py-1 mb-2">
          <LayoutDashboard size={14} className="text-blue-400" />
          <span className="text-[11px] font-medium uppercase tracking-wide text-blue-200">
            Yönetim Paneli
          </span>
        </div>
        <h1 className="text-xl md:text-2xl font-semibold text-white mb-1">
          Xoş gəlmisiniz
        </h1>
        <p className="text-xs text-slate-400">
          {user?.email
            ? `${user.email} hesabı ilə daxil olmusunuz. Aşağıdan əsas bölmələrə nəzarət edə bilərsiniz.`
            : 'Admin panelə daxil olmusunuz.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <Users size={18} className="text-blue-400" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white mb-1">Amasiyalılar</h2>
            <p className="text-xs text-slate-400">
              Yazıçılar, həkimlər, müəllimlər, idmançılar və digər tanınmış şəxslər.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-green-500/10 flex items-center justify-center">
            <FileText size={18} className="text-green-400" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white mb-1">Mətn və xəbərlər</h2>
            <p className="text-xs text-slate-400">
              Xəbər məqalələri, bioqrafiyalar və digər mətn kontentinin idarə olunması.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center">
            <Video size={18} className="text-purple-400" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white mb-1">Video və media</h2>
            <p className="text-xs text-slate-400">
              Amasiya ilə bağlı videolar, musiqilər və digər media materialları.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center">
            <Music size={18} className="text-amber-400" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white mb-1">Musiqi və mədəniyyət</h2>
            <p className="text-xs text-slate-400">
              Amasiyalı musiqiçilər, əsərlər və mədəni irsə aid materiallar.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center">
            <Globe2 size={18} className="text-cyan-400" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white mb-1">Xaricdə yaşayanlar</h2>
            <p className="text-xs text-slate-400">
              Xaricdə yaşayan Amasiyalılar və onların fəaliyyət sahələri üzrə məlumatlar.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboardPage
