# test ของ T-03: จองคิวสำเร็จ
# AC-BKG-01 (FR-BKG-04)
import pytest

from app.db.models import Booking
from tests.conftest import AUTH


def test_AC_BKG_01(client, make_slot):
    """AC-BKG-01: ยืนยันตัวตนแล้ว และช่วง 09.00 น. มีที่นั่งว่าง จองแล้วต้องสำเร็จ"""
    slot = make_slot(start="09:00", remaining=1)

    res = client.post("/bookings", json={"slot_id": slot.id}, headers=AUTH)

    assert res.status_code == 201


def test_TC_BKG_01_1_successful_booking(client, db, make_slot):
    # Given: ยืนยันตัวตนแล้ว และช่วง 09.00 น. มีที่นั่งว่าง 1 ที่
    slot = make_slot(start="09:00", remaining=1)

    # When: ยืนยันการจอง
    res = client.post("/bookings", json={"slot_id": slot.id}, headers=AUTH)

    # Then: บันทึกสำเร็จ
    assert res.status_code == 201
    booking = db.query(Booking).filter_by(slot_id=slot.id).one()
    assert booking.hn == "0001234"
    # Then: แสดงหมายเลขคิว (รอ Q-02)
    # ยังไม่ตรวจหมายเลขคิวเพราะรอ Q-02
    # Then: ที่นั่งว่างของช่วงนั้นเป็น 0
    db.refresh(slot)
    assert slot.remaining == 0


def test_TC_BKG_01_2_slot_filled_before_confirmation(client, db, make_slot):
    # Given: ยืนยันตัวตนแล้ว ช่วง 09.00 น. มีที่นั่งว่าง 1 ที่ และผู้ใช้อีกคนยืนยันช่วงนี้ก่อน
    slot = make_slot(start="09:00", remaining=1)
    first_res = client.post(
        "/bookings",
        json={"slot_id": slot.id},
        headers={"Authorization": "Bearer verified:0005678"},
    )
    assert first_res.status_code == 201

    # When: ผู้ใช้ยืนยันการจองช่วง 09.00 น.
    res = client.post("/bookings", json={"slot_id": slot.id}, headers=AUTH)

    # Then: แจ้ง "ช่วงเวลาเต็ม"
    assert res.status_code == 409
    assert res.json()["detail"] == "ช่วงเวลาเต็ม"
    # Then: แสดง 3 ช่วงที่ว่างและใกล้ 09.00 น. ที่สุดภายในวันเดียวกันและวันถัดไป
    # ยังไม่ตรวจรายการช่วงเวลาว่าง เพราะ API contract ไม่ได้ระบุชื่อฟิลด์ผลลัพธ์
    # Then: ไม่มีรายการจองซ้อนเกิดขึ้น
    assert db.query(Booking).filter_by(slot_id=slot.id).count() == 1


def test_TC_BKG_01_3_unverified_booking(client, make_slot):
    # Given: ยังไม่ได้รับผลยืนยันตัวตน และช่วง 09.00 น. มีที่นั่งว่าง 1 ที่
    slot = make_slot(start="09:00", remaining=1)

    # When: ยืนยันการจอง
    client.post("/bookings", json={"slot_id": slot.id})

    # Then: spec ไม่ได้บอกว่าต้องตอบสนองอย่างไรเมื่อยังไม่ได้รับผลยืนยันตัวตน
    pytest.skip("spec ไม่ได้บอกผลลัพธ์ของกรณียังไม่ได้รับผลยืนยันตัวตน")
