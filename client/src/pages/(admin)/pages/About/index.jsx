import React, { useState, useEffect } from 'react'
import { Save, Plus, Trash2, Loader2, AlertCircle, CheckCircle2, Upload, X } from 'lucide-react'
import { getAbout, updateAbout } from './services/aboutService'
import { uploadFile } from '../../../../services/uploadService'

const About = () => {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState({})
  const [message, setMessage] = useState({ type: '', text: '' })
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    label: 'HAQQIMIZDA',
    mission: '',
    vision: '',
    photos: [],
    bullets: [],
    stats: [],
    team: [],
    cta: { text: '', href: '' }
  })

  // Form helpers
  const handleInputChange = (e, section, index, field) => {
    const { name, value } = e.target

    if (section === 'main') {
      setFormData(prev => ({ ...prev, [name]: value }))
    } else if (section === 'cta') {
      setFormData(prev => ({ ...prev, cta: { ...prev.cta, [name]: value } }))
    } else if (section === 'stats') {
      const newStats = [...formData.stats]
      newStats[index][field] = value
      setFormData(prev => ({ ...prev, stats: newStats }))
    } else if (section === 'team') {
      const newTeam = [...formData.team]
      newTeam[index][field] = value
      setFormData(prev => ({ ...prev, team: newTeam }))
    } else if (section === 'bullets') {
      const newBullets = [...formData.bullets]
      newBullets[index] = value
      setFormData(prev => ({ ...prev, bullets: newBullets }))
    } else if (section === 'photos') {
      const newPhotos = [...formData.photos]
      newPhotos[index] = value
      setFormData(prev => ({ ...prev, photos: newPhotos }))
    }
  }

  const handleFileUpload = async (e, section, index) => {
    const file = e.target.files[0]
    if (!file) return

    const uploadKey = `${section}-${index}`
    setUploading(prev => ({ ...prev, [uploadKey]: true }))
    setMessage({ type: '', text: '' })

    try {
      const url = await uploadFile(file)
      
      if (section === 'photos') {
        const newPhotos = [...formData.photos]
        newPhotos[index] = url
        setFormData(prev => ({ ...prev, photos: newPhotos }))
      } else if (section === 'team') {
        const newTeam = [...formData.team]
        newTeam[index].avatar = url
        setFormData(prev => ({ ...prev, team: newTeam }))
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Fayl yüklənərkən xəta: ' + error.message })
    } finally {
      setUploading(prev => ({ ...prev, [uploadKey]: false }))
    }
  }

  const addItem = (section) => {
    if (section === 'stats') {
      setFormData(prev => ({ ...prev, stats: [...prev.stats, { label: '', value: 0 }] }))
    } else if (section === 'team') {
      setFormData(prev => ({ ...prev, team: [...prev.team, { name: '', role: '', avatar: '' }] }))
    } else if (section === 'bullets') {
      setFormData(prev => ({ ...prev, bullets: [...prev.bullets, ''] }))
    } else if (section === 'photos') {
      setFormData(prev => ({ ...prev, photos: [...prev.photos, ''] }))
    }
  }

  const removeItem = (section, index) => {
    if (section === 'stats') {
      setFormData(prev => ({ ...prev, stats: prev.stats.filter((_, i) => i !== index) }))
    } else if (section === 'team') {
      setFormData(prev => ({ ...prev, team: prev.team.filter((_, i) => i !== index) }))
    } else if (section === 'bullets') {
      setFormData(prev => ({ ...prev, bullets: prev.bullets.filter((_, i) => i !== index) }))
    } else if (section === 'photos') {
      setFormData(prev => ({ ...prev, photos: prev.photos.filter((_, i) => i !== index) }))
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAbout()
        if (response.data) {
          setFormData({
            title: response.data.title || '',
            desc: response.data.desc || '',
            label: response.data.label || 'HAQQIMIZDA',
            mission: response.data.mission || '',
            vision: response.data.vision || '',
            photos: response.data.photos || [],
            bullets: response.data.bullets || [],
            stats: response.data.stats || [],
            team: response.data.team || [],
            cta: response.data.cta || { text: '', href: '' }
          })
        }
      } catch (error) {
        setMessage({ type: 'error', text: error.message })
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMessage({ type: '', text: '' })

    try {
      await updateAbout(formData)
      setMessage({ type: 'success', text: 'Məlumatlar uğurla yadda saxlanıldı' })
    } catch (error) {
      setMessage({ type: 'error', text: error.message })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto pb-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Haqqımızda Səhifəsi</h1>
          <p className="text-slate-400 text-sm mt-1">Saytın haqqımızda səhifəsinin məzmununu idarə edin</p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Yadda Saxla
        </button>
      </div>

      {message.text && (
        <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
          message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
        }`}>
          {message.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          {message.text}
        </div>
      )}

      <div className="space-y-6">
        {/* Main Info */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Əsas Məlumatlar</h2>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Etiket (Label)</label>
                <input
                  type="text"
                  name="label"
                  value={formData.label}
                  onChange={(e) => handleInputChange(e, 'main')}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Başlıq</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange(e, 'main')}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Açıqlama</label>
              <textarea
                name="desc"
                value={formData.desc}
                onChange={(e) => handleInputChange(e, 'main')}
                rows={4}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Missiya</label>
                <textarea
                  name="mission"
                  value={formData.mission}
                  onChange={(e) => handleInputChange(e, 'main')}
                  rows={3}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Vizyon</label>
                <textarea
                  name="vision"
                  value={formData.vision}
                  onChange={(e) => handleInputChange(e, 'main')}
                  rows={3}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Photos */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Fotoşəkillər</h2>
            <button
              onClick={() => addItem('photos')}
              className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> Əlavə et
            </button>
          </div>
          <div className="space-y-3">
            {formData.photos.map((photo, index) => (
              <div key={index} className="flex gap-4 items-start bg-slate-950 p-4 rounded-lg border border-slate-800">
                <div className="w-32 h-20 bg-slate-900 rounded-lg overflow-hidden flex-shrink-0 border border-slate-800 relative group">
                  {photo ? (
                    <img src={photo} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-600">
                      <Upload className="w-6 h-6" />
                    </div>
                  )}
                  {uploading[`photos-${index}`] && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={photo}
                      onChange={(e) => handleInputChange(e, 'photos', index)}
                      placeholder="Şəkil URL və ya yükləyin"
                      className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 text-sm"
                    />
                    <button
                      onClick={() => removeItem('photos', index)}
                      className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div>
                    <input
                      type="file"
                      id={`photo-upload-${index}`}
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'photos', index)}
                      disabled={uploading[`photos-${index}`]}
                    />
                    <label
                      htmlFor={`photo-upload-${index}`}
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm cursor-pointer transition-colors ${
                        uploading[`photos-${index}`]
                          ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                          : 'bg-blue-600/10 text-blue-400 hover:bg-blue-600/20'
                      }`}
                    >
                      <Upload className="w-4 h-4" />
                      {photo ? 'Şəkli Dəyiş' : 'Şəkil Yüklə'}
                    </label>
                  </div>
                </div>
              </div>
            ))}
            {formData.photos.length === 0 && (
              <p className="text-sm text-slate-500 text-center py-4">Hələ heç bir şəkil əlavə edilməyib</p>
            )}
          </div>
        </div>

        {/* Bullets */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Maddələr (Bullets)</h2>
            <button
              onClick={() => addItem('bullets')}
              className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> Əlavə et
            </button>
          </div>
          <div className="space-y-3">
            {formData.bullets.map((bullet, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={bullet}
                  onChange={(e) => handleInputChange(e, 'bullets', index)}
                  placeholder="Maddə mətni"
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={() => removeItem('bullets', index)}
                  className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            {formData.bullets.length === 0 && (
              <p className="text-sm text-slate-500 text-center py-4">Hələ heç bir maddə əlavə edilməyib</p>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Statistikalar</h2>
            <button
              onClick={() => addItem('stats')}
              className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> Əlavə et
            </button>
          </div>
          <div className="space-y-3">
            {formData.stats.map((stat, index) => (
              <div key={index} className="flex gap-4">
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => handleInputChange(e, 'stats', index, 'label')}
                  placeholder="Etiket"
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                />
                <input
                  type="number"
                  value={stat.value}
                  onChange={(e) => handleInputChange(e, 'stats', index, 'value')}
                  placeholder="Dəyər"
                  className="w-32 bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={() => removeItem('stats', index)}
                  className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            {formData.stats.length === 0 && (
              <p className="text-sm text-slate-500 text-center py-4">Hələ heç bir statistika əlavə edilməyib</p>
            )}
          </div>
        </div>

        {/* Team */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Komanda Üzvləri</h2>
            <button
              onClick={() => addItem('team')}
              className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> Əlavə et
            </button>
          </div>
          <div className="space-y-4">
            {formData.team.map((member, index) => (
              <div key={index} className="bg-slate-950/50 p-4 rounded-lg border border-slate-800/50">
                <div className="flex justify-end mb-2">
                  <button
                    onClick={() => removeItem('team', index)}
                    className="text-red-400 hover:text-red-300 text-sm flex items-center gap-1"
                  >
                    <Trash2 className="w-4 h-4" /> Sil
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Ad Soyad</label>
                    <input
                      type="text"
                      value={member.name}
                      onChange={(e) => handleInputChange(e, 'team', index, 'name')}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Vəzifə</label>
                    <input
                      type="text"
                      value={member.role}
                      onChange={(e) => handleInputChange(e, 'team', index, 'role')}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Avatar</label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          value={member.avatar}
                          onChange={(e) => handleInputChange(e, 'team', index, 'avatar')}
                          placeholder="URL"
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-blue-500 pr-8"
                        />
                        {uploading[`team-${index}`] && (
                          <div className="absolute right-2 top-1.5">
                            <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                          </div>
                        )}
                      </div>
                      <input
                        type="file"
                        id={`team-upload-${index}`}
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, 'team', index)}
                        disabled={uploading[`team-${index}`]}
                      />
                      <label
                        htmlFor={`team-upload-${index}`}
                        className={`p-1.5 rounded-lg cursor-pointer transition-colors flex-shrink-0 ${
                          uploading[`team-${index}`]
                            ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                            : 'bg-blue-600/10 text-blue-400 hover:bg-blue-600/20'
                        }`}
                        title="Şəkil Yüklə"
                      >
                        <Upload className="w-4 h-4" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {formData.team.length === 0 && (
              <p className="text-sm text-slate-500 text-center py-4">Hələ heç bir komanda üzvü əlavə edilməyib</p>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">CTA (Çağırış Butonu)</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Buton Mətni</label>
              <input
                type="text"
                name="text"
                value={formData.cta.text}
                onChange={(e) => handleInputChange(e, 'cta')}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Yönləndirmə Linki</label>
              <input
                type="text"
                name="href"
                value={formData.cta.href}
                onChange={(e) => handleInputChange(e, 'cta')}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
