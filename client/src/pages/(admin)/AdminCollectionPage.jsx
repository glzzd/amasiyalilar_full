import React from 'react'
import { useParams } from 'react-router-dom'

const collections = {
  'about-us': {
    title: 'Haqqımızda',
    jsonFile: 'aboutUs.json'
  },
  'about-west': {
    title: 'Qərbi Azərbaycan haqqında',
    jsonFile: 'aboutWesternAzerbaijan.json'
  },
  contact: {
    title: 'Əlaqə məlumatları',
    jsonFile: 'contact.json'
  },
  menu: {
    title: 'Sayt menyusu',
    jsonFile: 'allMenu.json'
  },
  news: {
    title: 'Xəbərlər',
    jsonFile: 'allNews.json'
  },
  documentaries: {
    title: 'Sənədli filmlər',
    jsonFile: 'allDocumentaries.json'
  },
  videos: {
    title: 'Videolar',
    jsonFile: 'allVideos.json'
  },
  musics: {
    title: 'Musiqilər',
    jsonFile: 'allMusics.json'
  },
  martyrs: {
    title: 'Şəhidlər',
    jsonFile: 'allMartyrs.json'
  },
  veterans: {
    title: 'Qazilər',
    jsonFile: 'allVeterans.json'
  },
  heroes: {
    title: 'Qəhrəmanlar',
    jsonFile: 'allHeroes.json'
  },
  districts: {
    title: 'Rayonlar',
    jsonFile: 'allDistricts.json'
  },
  counties: {
    title: 'Mahallar',
    jsonFile: 'allCounties.json'
  },
  city: {
    title: 'Şəhər',
    jsonFile: 'city.json'
  },
  area: {
    title: 'Ərazi məlumatları',
    jsonFile: 'area.json'
  },
  locus: {
    title: 'Mahallar',
    jsonFile: 'allLocus.json'
  },
  villages: {
    title: 'Kəndlər',
    jsonFile: 'allVillages.json'
  },
  'our-intellectuals': {
    title: 'Qərbi Azərbaycan ziyalıları',
    jsonFile: 'ourIntellectuals.json'
  },
  monuments: {
    title: 'Abidələr',
    jsonFile: 'allMonuments.json'
  },
  library: {
    title: 'Kitabxana',
    jsonFile: 'library.json'
  },
  officers: {
    title: 'Vəzifəli şəxslər',
    jsonFile: 'allOfficers.json'
  },
  authors: {
    title: 'Yazıçı və şairlər',
    jsonFile: 'allAuthors.json'
  },
  'doctors-and-teachers': {
    title: 'Həkim və müəllimlər',
    jsonFile: 'allDoctorsAndTeachers.json'
  },
  athletes: {
    title: 'İdmançılar',
    jsonFile: 'allAthletes.json'
  },
  business: {
    title: 'İş adamları',
    jsonFile: 'allBusiness.json'
  },
  abroads: {
    title: 'Xaricdə yaşayanlar',
    jsonFile: 'AllAbroads.json'
  }
}

const AdminCollectionPage = () => {
  const { collectionId } = useParams()

  const meta = collections[collectionId]

  if (!meta) {
    return (
      <div className="space-y-3">
        <h1 className="text-lg font-semibold">Kolleksiya tapılmadı</h1>
        <p className="text-sm text-slate-300">
          Bu URL üçün uyğun mock data faylı təyin olunmayıb.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-semibold">{meta.title}</h1>
        <p className="text-sm text-slate-300">
          Bu bölmə üçün məlumatlar
          <span className="font-mono text-slate-100"> {meta.jsonFile} </span>
          faylında saxlanılır.
        </p>
      </div>

      <div className="rounded-lg border border-dashed border-slate-700 bg-slate-900/40 p-4 text-sm text-slate-300">
        <p>
          Burada gələcəkdə yeni məlumat əlavə etmək, mövcud qeydləri redaktə etmək və silmək üçün
          admin formaları olacaq. Hazırda bu səhifə yalnız uyğun mock data faylını və bölmə adını
          göstərən placeholder kimi fəaliyyət göstərir.
        </p>
        <p className="mt-2">
          Məsələn, bu bölmədə
          <span className="font-mono text-slate-100"> {meta.jsonFile} </span>
          faylına uyğun olaraq &quot;yeni xəbər əlavə et&quot; və ya &quot;mövcud xəbəri
          redaktə et&quot; funksiyaları əlavə edilə bilər.
        </p>
      </div>
    </div>
  )
}

export default AdminCollectionPage

