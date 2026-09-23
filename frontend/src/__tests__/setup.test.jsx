// test ตรวจว่าโครงหน้าจอพร้อมใช้ (ไม่ใช่ test ของ AC ใด)
import { render, screen } from '@testing-library/react'
import App from '../App.jsx'

test('หน้าแสดง slot picker และให้เลือกแพ็กเกจได้', () => {
  render(<App />)
  expect(screen.getByText('จองคิวตรวจสุขภาพ')).toBeTruthy()
  expect(screen.getByLabelText('แพ็กเกจ')).toBeTruthy()
})
