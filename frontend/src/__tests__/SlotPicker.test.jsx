import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, expect, test, vi } from 'vitest'

import SlotPicker from '../pages/SlotPicker.jsx'
import { api } from '../api/client.js'

vi.mock('../api/client.js', () => ({
  api: { getSlots: vi.fn() },
}))

beforeEach(() => {
  api.getSlots.mockResolvedValue([
    { id: 1, slot_date: '2026-09-23', start_time: '09:00:00', package_code: 'basic', remaining: 2 },
    { id: 2, slot_date: '2026-09-23', start_time: '10:30:00', package_code: 'basic', remaining: 1 },
  ])
})

test('แสดงแพ็กเกจและโหลดช่วงเวลาว่างจาก API', async () => {
  render(<SlotPicker initialDate="2026-09-23" initialPackage="basic" />)

  expect(screen.getByText('จองคิวตรวจสุขภาพ')).toBeTruthy()
  expect(screen.getByRole('button', { name: 'แพ็กเกจพื้นฐาน' })).toBeTruthy()

  await waitFor(() => {
    expect(api.getSlots).toHaveBeenCalledWith({ dateFrom: '2026-09-23', packageCode: 'basic' })
  })

  await waitFor(() => {
    expect(screen.getByText('เวลา: 09:00')).toBeTruthy()
    expect(screen.getByText('เวลา: 10:30')).toBeTruthy()
  })
})

test('เมื่อเปลี่ยนแพ็กเกจจะเรียก API ใหม่', async () => {
  render(<SlotPicker initialDate="2026-09-23" initialPackage="basic" />)

  fireEvent.click(screen.getByRole('button', { name: 'แพ็กเกจพรีเมียม' }))

  await waitFor(() => {
    expect(api.getSlots).toHaveBeenLastCalledWith({ dateFrom: '2026-09-23', packageCode: 'premium' })
  })
})

test('สามารถเลือกแพ็กเกจจาก dropdown ได้', async () => {
  render(<SlotPicker initialDate="2026-09-23" initialPackage="basic" />)

  fireEvent.change(screen.getByLabelText('แพ็กเกจ'), { target: { value: 'premium' } })

  await waitFor(() => {
    expect(api.getSlots).toHaveBeenLastCalledWith({ dateFrom: '2026-09-23', packageCode: 'premium' })
  })
})
