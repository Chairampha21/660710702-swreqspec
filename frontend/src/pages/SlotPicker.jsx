import { useEffect, useMemo, useState } from 'react'

import { api } from '../api/client.js'

const packageOptions = [
  { code: 'basic', label: 'แพ็กเกจพื้นฐาน' },
  { code: 'premium', label: 'แพ็กเกจพรีเมียม' },
]

function formatSlotTime(value) {
  return value ? value.slice(0, 5) : value
}

export default function SlotPicker({ initialDate = new Date().toISOString().slice(0, 10), initialPackage = 'basic' }) {
  const [dateFrom, setDateFrom] = useState(initialDate)
  const [selectedPackage, setSelectedPackage] = useState(initialPackage)
  const [slots, setSlots] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function loadSlots() {
      setLoading(true)
      setError('')

      try {
        const response = await api.getSlots({ dateFrom, packageCode: selectedPackage })
        const nextSlots = Array.isArray(response) ? response : response?.slots ?? []
        if (active) setSlots(nextSlots)
      } catch (err) {
        if (active) {
          setSlots([])
          setError('ไม่สามารถโหลดช่วงเวลาได้ในขณะนี้')
        }
      } finally {
        if (active) setLoading(false)
      }
    }

    loadSlots()
    return () => {
      active = false
    }
  }, [dateFrom, selectedPackage])

  const summaryText = useMemo(() => {
    if (loading) return 'กำลังโหลดช่วงเวลาว่าง...'
    if (error) return error
    if (slots.length === 0) return 'ไม่มีช่วงเวลาในวันที่เลือก'
    return `พบช่วงเวลา ${slots.length} รายการ`
  }, [loading, error, slots])

  return (
    <section className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <p className="text-sm font-medium uppercase tracking-[0.12em] text-teal-700">เลือกแพ็กเกจและเวลา</p>
        <h2 className="mt-2 text-2xl font-bold text-slate-900">จองคิวตรวจสุขภาพ</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">วันที่เริ่มต้น</span>
          <input
            type="date"
            value={dateFrom}
            onChange={(event) => setDateFrom(event.target.value)}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-800 outline-none ring-0 focus:border-teal-600"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">แพ็กเกจ</span>
          <select
            aria-label="แพ็กเกจ"
            value={selectedPackage}
            onChange={(event) => setSelectedPackage(event.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-800 outline-none ring-0 focus:border-teal-600"
          >
            {packageOptions.map((option) => (
              <option key={option.code} value={option.code}>
                {option.label}
              </option>
            ))}
          </select>

          <div className="mt-3 flex flex-wrap gap-2">
            {packageOptions.map((option) => (
              <button
                key={option.code}
                type="button"
                aria-pressed={selectedPackage === option.code}
                onClick={() => setSelectedPackage(option.code)}
                className={[
                  'rounded-full border px-3 py-2 text-sm font-medium transition',
                  selectedPackage === option.code
                    ? 'border-teal-700 bg-teal-700 text-white'
                    : 'border-slate-300 bg-white text-slate-700 hover:border-teal-500 hover:text-teal-700',
                ].join(' ')}
              >
                {option.label}
              </button>
            ))}
          </div>
        </label>
      </div>

      <div className="mt-6 rounded-xl bg-slate-50 p-3 text-sm text-slate-600">{summaryText}</div>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {slots.map((slot) => (
          <button
            key={`${slot.slot_date}-${slot.start_time}-${slot.package_code}`}
            type="button"
            className="rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-teal-400 hover:bg-teal-50"
          >
            <div className="flex items-center justify-between">
              <span className="text-base font-semibold text-slate-900">{slot.slot_date}</span>
              <span className="rounded-full bg-teal-100 px-2 py-1 text-xs font-medium text-teal-800">
                เหลือ {slot.remaining} ที่
              </span>
            </div>
            <div className="mt-2 text-sm text-slate-600">เวลา: {formatSlotTime(slot.start_time)}</div>
            <div className="mt-1 text-xs uppercase tracking-wide text-slate-500">{slot.package_code}</div>
          </button>
        ))}
      </div>
    </section>
  )
}
