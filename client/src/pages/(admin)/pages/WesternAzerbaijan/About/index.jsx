import React, { useState, useEffect } from 'react'
import { Save, Plus, Trash2, Loader2, AlertCircle, CheckCircle2, Upload } from 'lucide-react'
import { getWesternAbout, updateWesternAbout } from './services/westernAboutService'
import { uploadFile } from '../../../../../services/uploadService'

const WesternAzerbaijanAbout = () => {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState({})
  const [message, setMessage] = useState({ type: '', text: '' })
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    photos: [],
    overview: [],
    stats: {
      historicalArea: '',
      regionsCount: 0,
      keyRegions: [],
      culturalSites: 0,
      languages: [],
      notableMonuments: []
    },
    timeline: [],
    culture: {
      literature: [],
      music: [],
      architecture: []
    },
    references: []
  })

  // Form helpers
  const handleInputChange = (e, section, index, field, subSection) => {
    const { name, value } = e.target

    if (section === 'main') {
      setFormData(prev => ({ ...prev, [name]: value }))
    } else if (section === 'overview') {
      const newOverview = [...formData.overview]
      newOverview[index] = value
      setFormData(prev => ({ ...prev, overview: newOverview }))
    } else if (section === 'photos') {
      const newPhotos = [...formData.photos]
      newPhotos[index] = value
      setFormData(prev => ({ ...prev, photos: newPhotos }))
    } else if (section === 'stats') {
      if (Array.isArray(formData.stats[field])) {
        // Handle array fields in stats (keyRegions, languages, notableMonuments)
        const newArray = [...formData.stats[field]]
        newArray[index] = value
        setFormData(prev => ({
          ...prev,
          stats: { ...prev.stats, [field]: newArray }
        }))
      } else {
        // Handle simple fields in stats (historicalArea, regionsCount, culturalSites)
        setFormData(prev => ({
          ...prev,
          stats: { ...prev.stats, [name]: value }
        }))
      }
    } else if (section === 'timeline') {
      const newTimeline = [...formData.timeline]
      newTimeline[index][field] = value
      setFormData(prev => ({ ...prev, timeline: newTimeline }))
    } else if (section === 'culture') {
      const newCultureArray = [...formData.culture[subSection]]
      newCultureArray[index] = value
      setFormData(prev => ({
        ...prev,
        culture: { ...prev.culture, [subSection]: newCultureArray }
      }))
    } else if (section === 'references') {
      const newReferences = [...formData.references]
      newReferences[index][field] = value
      setFormData(prev => ({ ...prev, references: newReferences }))
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
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Fayl yüklənərkən xəta: ' + error.message })
    } finally {
      setUploading(prev => ({ ...prev, [uploadKey]: false }))
    }
  }

  const addItem = (section, field, subSection) => {
    if (section === 'overview') {
      setFormData(prev => ({ ...prev, overview: [...prev.overview, ''] }))
    } else if (section === 'photos') {
      setFormData(prev => ({ ...prev, photos: [...prev.photos, ''] }))
    } else if (section === 'stats') {
      // Add item to array fields in stats
      setFormData(prev => ({
        ...prev,
        stats: { ...prev.stats, [field]: [...prev.stats[field], ''] }
      }))
    } else if (section === 'timeline') {
      setFormData(prev => ({ ...prev, timeline: [...prev.timeline, { year: '', event: '' }] }))
    } else if (section === 'culture') {
      setFormData(prev => ({
        ...prev,
        culture: { ...prev.culture, [subSection]: [...prev.culture[subSection], ''] }
      }))
    } else if (section === 'references') {
      setFormData(prev => ({ ...prev, references: [...prev.references, { label: '', url: '' }] }))
    }
  }

  const removeItem = (section, index, field, subSection) => {
    if (section === 'overview') {
      setFormData(prev => ({ ...prev, overview: prev.overview.filter((_, i) => i !== index) }))
    } else if (section === 'photos') {
      setFormData(prev => ({ ...prev, photos: prev.photos.filter((_, i) => i !== index) }))
    } else if (section === 'stats') {
      setFormData(prev => ({
        ...prev,
        stats: { ...prev.stats, [field]: prev.stats[field].filter((_, i) => i !== index) }
      }))
    } else if (section === 'timeline') {
      setFormData(prev => ({ ...prev, timeline: prev.timeline.filter((_, i) => i !== index) }))
    } else if (section === 'culture') {
      setFormData(prev => ({
        ...prev,
        culture: { ...prev.culture, [subSection]: prev.culture[subSection].filter((_, i) => i !== index) }
      }))
    } else if (section === 'references') {
      setFormData(prev => ({ ...prev, references: prev.references.filter((_, i) => i !== index) }))
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getWesternAbout()
        if (response.data) {
          // Merge with default structure to ensure all fields exist
          setFormData(prev => ({
            ...prev,
            ...response.data,
            stats: { ...prev.stats, ...(response.data.stats || {}) },
            culture: { ...prev.culture, ...(response.data.culture || {}) }
          }))
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
      await updateWesternAbout(formData)
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
          <h1 className="text-2xl font-bold text-gray-900">Qərbi Azərbaycan - Haqqında</h1>
          <p className="text-gray-500 text-sm mt-1">Qərbi Azərbaycan haqqında məlumatları idarə edin</p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Yadda Saxla
        </button>
      </div>

      {message.text && (
        <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
          message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {message.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          {message.text}
        </div>
      )}

      <div className="space-y-6">
        {/* Main Info */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Əsas Məlumatlar</h2>
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Başlıq</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={(e) => handleInputChange(e, 'main')}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Alt Başlıq</label>
              <input
                type="text"
                name="subtitle"
                value={formData.subtitle}
                onChange={(e) => handleInputChange(e, 'main')}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Overview */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Ümumi Baxış (Paraqraflar)</h2>
            <button
              onClick={() => addItem('overview')}
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1 font-medium"
            >
              <Plus className="w-4 h-4" /> Əlavə et
            </button>
          </div>
          <div className="space-y-3">
            {formData.overview.map((text, index) => (
              <div key={index} className="flex gap-2">
                <textarea
                  value={text}
                  onChange={(e) => handleInputChange(e, 'overview', index)}
                  rows={3}
                  placeholder="Paraqraf mətni..."
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <button
                  onClick={() => removeItem('overview', index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors h-fit"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            {formData.overview.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">Hələ heç bir məlumat əlavə edilməyib</p>
            )}
          </div>
        </div>

        {/* Photos */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Fotoşəkillər</h2>
            <button
              onClick={() => addItem('photos')}
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1 font-medium"
            >
              <Plus className="w-4 h-4" /> Əlavə et
            </button>
          </div>
          <div className="space-y-3">
            {formData.photos.map((photo, index) => (
              <div key={index} className="flex gap-4 items-start bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="w-32 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200 relative group">
                  {photo ? (
                    <img src={photo} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <Upload className="w-6 h-6" />
                    </div>
                  )}
                  {uploading[`photos-${index}`] && (
                    <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
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
                      className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-blue-500 text-sm focus:ring-1 focus:ring-blue-500"
                    />
                    <button
                      onClick={() => removeItem('photos', index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
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
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
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
              <p className="text-sm text-gray-500 text-center py-4">Hələ heç bir şəkil əlavə edilməyib</p>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Statistikalar</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tarixi Ərazi (km²)</label>
              <input
                type="text"
                name="historicalArea"
                value={formData.stats.historicalArea}
                onChange={(e) => handleInputChange(e, 'stats')}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bölgə Sayı</label>
              <input
                type="number"
                name="regionsCount"
                value={formData.stats.regionsCount}
                onChange={(e) => handleInputChange(e, 'stats')}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mədəni Abidə Sayı</label>
              <input
                type="number"
                name="culturalSites"
                value={formData.stats.culturalSites}
                onChange={(e) => handleInputChange(e, 'stats')}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="space-y-6">
            {/* Key Regions */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">Əsas Bölgələr</label>
                <button onClick={() => addItem('stats', 'keyRegions')} className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1 font-medium"><Plus className="w-3 h-3"/> Əlavə et</button>
              </div>
              <div className="space-y-2">
                {formData.stats.keyRegions.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleInputChange(e, 'stats', index, 'keyRegions')}
                      className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-gray-900 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                    <button onClick={() => removeItem('stats', index, 'keyRegions')} className="text-red-500 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">Dillər</label>
                <button onClick={() => addItem('stats', 'languages')} className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1 font-medium"><Plus className="w-3 h-3"/> Əlavə et</button>
              </div>
              <div className="space-y-2">
                {formData.stats.languages.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleInputChange(e, 'stats', index, 'languages')}
                      className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-gray-900 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                    <button onClick={() => removeItem('stats', index, 'languages')} className="text-red-500 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
            </div>

            {/* Notable Monuments */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">Məşhur Abidələr</label>
                <button onClick={() => addItem('stats', 'notableMonuments')} className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1 font-medium"><Plus className="w-3 h-3"/> Əlavə et</button>
              </div>
              <div className="space-y-2">
                {formData.stats.notableMonuments.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleInputChange(e, 'stats', index, 'notableMonuments')}
                      className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-gray-900 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                    <button onClick={() => removeItem('stats', index, 'notableMonuments')} className="text-red-500 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Tarixçə (Timeline)</h2>
            <button
              onClick={() => addItem('timeline')}
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1 font-medium"
            >
              <Plus className="w-4 h-4" /> Əlavə et
            </button>
          </div>
          <div className="space-y-3">
            {formData.timeline.map((item, index) => (
              <div key={index} className="flex gap-4">
                <input
                  type="text"
                  value={item.year}
                  onChange={(e) => handleInputChange(e, 'timeline', index, 'year')}
                  placeholder="İl"
                  className="w-32 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={item.event}
                  onChange={(e) => handleInputChange(e, 'timeline', index, 'event')}
                  placeholder="Hadisə"
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <button
                  onClick={() => removeItem('timeline', index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            {formData.timeline.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">Hələ heç bir tarixçə əlavə edilməyib</p>
            )}
          </div>
        </div>

        {/* Culture */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Mədəniyyət</h2>
          
          <div className="space-y-6">
            {/* Literature */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">Ədəbiyyat</label>
                <button onClick={() => addItem('culture', null, 'literature')} className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1 font-medium"><Plus className="w-3 h-3"/> Əlavə et</button>
              </div>
              <div className="space-y-2">
                {formData.culture.literature.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleInputChange(e, 'culture', index, null, 'literature')}
                      className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-gray-900 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                    <button onClick={() => removeItem('culture', index, null, 'literature')} className="text-red-500 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
            </div>

            {/* Music */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">Musiqi</label>
                <button onClick={() => addItem('culture', null, 'music')} className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1 font-medium"><Plus className="w-3 h-3"/> Əlavə et</button>
              </div>
              <div className="space-y-2">
                {formData.culture.music.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleInputChange(e, 'culture', index, null, 'music')}
                      className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-gray-900 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                    <button onClick={() => removeItem('culture', index, null, 'music')} className="text-red-500 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
            </div>

            {/* Architecture */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">Memarlıq</label>
                <button onClick={() => addItem('culture', null, 'architecture')} className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1 font-medium"><Plus className="w-3 h-3"/> Əlavə et</button>
              </div>
              <div className="space-y-2">
                {formData.culture.architecture.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleInputChange(e, 'culture', index, null, 'architecture')}
                      className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-gray-900 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                    <button onClick={() => removeItem('culture', index, null, 'architecture')} className="text-red-500 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* References */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">İstinadlar</h2>
            <button
              onClick={() => addItem('references')}
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1 font-medium"
            >
              <Plus className="w-4 h-4" /> Əlavə et
            </button>
          </div>
          <div className="space-y-3">
            {formData.references.map((item, index) => (
              <div key={index} className="flex gap-4">
                <input
                  type="text"
                  value={item.label}
                  onChange={(e) => handleInputChange(e, 'references', index, 'label')}
                  placeholder="Ad"
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={item.url}
                  onChange={(e) => handleInputChange(e, 'references', index, 'url')}
                  placeholder="URL"
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <button
                  onClick={() => removeItem('references', index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            {formData.references.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">Hələ heç bir istinad əlavə edilməyib</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WesternAzerbaijanAbout
