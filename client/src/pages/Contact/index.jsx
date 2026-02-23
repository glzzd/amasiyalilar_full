import React from 'react'
import { MapPin, Phone, Mail, Clock, Globe2 } from 'lucide-react'
import contact from '../../mockDatas/contact.json'

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 pb-24">
      <div className="container mx-auto px-6 pt-12">
        <div className="max-w-3xl mb-12">
          <h1 className="text-5xl md:text-6xl font-black mb-4 text-gray-900 tracking-tight leading-[0.95]">
            {contact.title}
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
            {contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <MapPin size={20} className="text-blue-600" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-gray-900 mb-1">Ünvan</h2>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {contact.address.line1}
                    <br />
                    {contact.address.street}
                    <br />
                    {contact.address.city}, {contact.address.country} {contact.address.postalCode}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 mt-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                      <Phone size={18} className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wide mb-1">
                        Telefon
                      </h3>
                      <ul className="space-y-1 text-sm text-gray-700">
                        {contact.phones.map((p) => (
                          <li key={p.label}>
                            <span className="font-medium">{p.label}:</span> {p.number}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                      <Mail size={18} className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wide mb-1">
                        E-poçt
                      </h3>
                      <ul className="space-y-1 text-sm text-gray-700">
                        {contact.emails.map((e) => (
                          <li key={e.address}>
                            <span className="font-medium">{e.label}:</span> {e.address}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Clock size={20} className="text-blue-600" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-gray-900 mb-2">İş saatları</h2>
                  <ul className="space-y-1 text-sm text-gray-700">
                    {contact.working_hours.map((wh) => (
                      <li key={wh.days} className="flex justify-between gap-4">
                        <span>{wh.days}</span>
                        <span className="font-medium">{wh.hours}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Globe2 size={20} className="text-blue-600" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-gray-900 mb-2">Sosial şəbəkələr</h2>
                  <ul className="space-y-1 text-sm text-blue-700">
                    <li>
                      <a href={contact.social.facebook} className="hover:underline">
                        Facebook
                      </a>
                    </li>
                    <li>
                      <a href={contact.social.instagram} className="hover:underline">
                        Instagram
                      </a>
                    </li>
                    <li>
                      <a href={contact.social.youtube} className="hover:underline">
                        YouTube
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl border border-dashed border-gray-200 p-6">
              <h2 className="text-sm font-semibold text-gray-900 mb-2">Xəritə haqqında</h2>
              <p className="text-sm text-gray-600 mb-3">
                {contact.map.note}
              </p>
              <p className="text-xs text-gray-400">
                Koordinatlar: {contact.map.lat}, {contact.map.lng}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
