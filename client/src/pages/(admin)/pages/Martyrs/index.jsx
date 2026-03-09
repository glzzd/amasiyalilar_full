import React, { useState, useEffect } from 'react'
import { Plus, Search, Edit, Trash2, ChevronLeft, ChevronRight, Loader2, Eye } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getAllMartyrs, deleteMartyr } from './services/martyrs.service'
import { formatDate, cn } from '../../../../lib/utils'

const Martyrs = () => {
  const [martyrs, setMartyrs] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [limit] = useState(10)

  useEffect(() => {
    fetchMartyrs()
  }, [page, search])

  const fetchMartyrs = async () => {
    try {
      setLoading(true)
      const response = await getAllMartyrs({
        page,
        limit,
        search
      })
      
      if (response.success) {
        setMartyrs(response.data.martyrs)
        setTotalPages(response.data.totalPages)
        setTotalItems(response.data.total)
      }
    } catch (error) {
      console.error('Error fetching martyrs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Bu şəhid məlumatını silmək istədiyinizə əminsiniz?')) {
      try {
        await deleteMartyr(id)
        fetchMartyrs()
      } catch (error) {
        console.error('Error deleting martyr:', error)
        alert('Silinmə zamanı xəta baş verdi')
      }
    }
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
    setPage(1)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Şəhidlər</h1>
        <Link
          to="create"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Yeni Şəhid Əlavə Et
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Axtarış..."
              value={search}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-medium">
                <th className="p-4 w-16">#</th>
                <th className="p-4">Şəkil</th>
                <th className="p-4">Ad Soyad</th>
                <th className="p-4">Rütbə</th>
                <th className="p-4">Məkan</th>
                <th className="p-4">Doğum Tarixi</th>
                <th className="p-4 text-right">Əməliyyatlar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {loading ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-gray-500">
                    <div className="flex justify-center items-center gap-2">
                      <Loader2 className="animate-spin" size={20} />
                      Yüklənir...
                    </div>
                  </td>
                </tr>
              ) : martyrs.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-gray-500">
                    Məlumat tapılmadı
                  </td>
                </tr>
              ) : (
                martyrs.map((martyr, index) => (
                  <tr key={martyr._id} className="hover:bg-gray-50 transition-colors group">
                    <td className="p-4 text-gray-500">
                      {(page - 1) * limit + index + 1}
                    </td>
                    <td className="p-4">
                      <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden">
                        {martyr.image ? (
                          <img
                            src={martyr.image}
                            alt={martyr.fullName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                            No img
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4 font-medium text-gray-900">
                      {martyr.fullName}
                    </td>
                    <td className="p-4 text-gray-600">
                      {martyr.rank || '-'}
                    </td>
                    <td className="p-4 text-gray-600">
                      {martyr.location || '-'}
                    </td>
                    <td className="p-4 text-gray-600">
                      {formatDate(martyr.birthDate)}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link
                          to={`edit/${martyr._id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Düzəliş et"
                        >
                          <Edit size={18} />
                        </Link>
                        <button
                          onClick={() => handleDelete(martyr._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Sil"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="p-4 border-t border-gray-100 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Cəmi {totalItems} məlumatdan {(page - 1) * limit + 1}-
              {Math.min(page * limit, totalItems)} arası göstərilir
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={cn(
                    "w-9 h-9 rounded-lg text-sm font-medium transition-colors",
                    page === p
                      ? "bg-blue-600 text-white"
                      : "border border-gray-200 hover:bg-gray-50 text-gray-600"
                  )}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Martyrs
