# RTM: จองคิวตรวจสุขภาพ (Booking)
อ้างอิง: spec.md SPEC-BKG-001 Draft v2 | tasks.md | test-cases.md
สร้างด้วย /verify เมื่อ 2569-10-07 | test: 5 ผ่าน 1 ไม่ผ่าน | frontend: 1 ผ่าน

## 1. ตามรอยไปข้างหน้า (requirement ไป โค้ด ไป test)
| ID | AC | task | โค้ด (ไฟล์: ฟังก์ชัน) | test (ผล) | สถานะ |
|---|---|---|---|---|---|
| FR-BKG-01 | AC-BKG-05 (ตรวจเฉพาะ p95) | T-02 เสร็จ | [backend/app/slots/router.py](../../backend/app/slots/router.py): `get_slots`; [backend/app/slots/service.py](../../backend/app/slots/service.py): `list_available_slots` | `test_AC_BKG_05` ผ่าน แต่ทดสอบ 200 คำขอแบบต่อเนื่อง ไม่ใช่ผู้ใช้พร้อมกัน และไม่ตรวจครบเรื่อง 30 วัน/การแสดงจำนวนที่นั่ง | ช่องโหว่ |
| FR-BKG-02 | AC-BKG-02 | T-04 พร้อมทำ | ยังไม่มีโค้ด | ยังไม่มี test | ยังไม่ถึง |
| FR-BKG-03 | AC-BKG-03 | T-05, T-11, T-12 พร้อมทำ | ยังไม่มีโค้ดเสนอช่วงใกล้เคียงหรือหน้าจอยืนยัน | ยังไม่มี test | ยังไม่ถึง |
| FR-BKG-04 | AC-BKG-01 | T-03 เสร็จ, T-06 รอ Q-02 | [backend/app/booking/service.py](../../backend/app/booking/service.py): `create_booking`; [backend/app/booking/router.py](../../backend/app/booking/router.py): `create_booking` | `test_AC_BKG_01` และ `test_TC_BKG_01_1_successful_booking` ผ่าน แต่ไม่ assert หมายเลขคิวเพราะรอ Q-02; ไม่พบโค้ดส่งคำขอแจ้งเตือน; `test_TC_BKG_01_2_slot_filled_before_confirmation` ไม่ผ่าน | ช่องโหว่ |
| FR-BKG-05 | AC-BKG-04 | T-07 พร้อมทำ | ยังไม่มีโค้ดคิวส่งซ้ำหรือหน้าจอผลการจอง | ยังไม่มี test | ยังไม่ถึง |
| FR-BKG-06 | ไม่มี AC ที่ตรวจ requirement นี้ | T-02 เสร็จในส่วนกรอง package, T-10 พร้อมทำ | [backend/app/slots/service.py](../../backend/app/slots/service.py): `list_available_slots` กรอง `package_code`; ยังไม่มีหน้าจอเปลี่ยนแพ็กเกจ | ไม่มี test ตรวจการเปลี่ยนแพ็กเกจ | ช่องโหว่ |
| NFR-PERF-01 | AC-BKG-05 | T-02 เสร็จ | [backend/app/slots/router.py](../../backend/app/slots/router.py): `get_slots` | `test_AC_BKG_05` ผ่าน แต่ไม่จำลองผู้ใช้พร้อมกัน 200 คนจริง | ช่องโหว่ |
| NFR-SEC-01 | ไม่มี AC | ไม่มี task ที่เสร็จ | ไม่พบการบังคับ TLS 1.2 ขึ้นไปในโค้ดที่มี | ไม่มี test | ยังไม่ถึง |
| NFR-REL-02 | AC-BKG-04 | T-07 พร้อมทำ | ไม่พบโค้ดส่งซ้ำ | ไม่มี test | ยังไม่ถึง |
| NFR-USE-01 | ไม่มี AC | ไม่มี task ที่ตรวจ usability | ไม่พบการทดสอบผู้ใช้ 10 คน/เกณฑ์ 8 ใน 10 คน | ไม่มี test | ช่องโหว่ |
| CON-TECH-01 | ไม่มี AC ตรง ๆ | T-01 เสร็จ | [backend/app/config.py](../../backend/app/config.py): `DATABASE_URL`; [backend/app/db/session.py](../../backend/app/db/session.py): `engine` | `test_T01_tables_created` ผ่านบน SQLite ไม่ใช่ PostgreSQL | ช่องโหว่ |
| DOM-PDPA-01 | AC-BKG-06 | T-08 พร้อมทำ | มีโมเดล `AuditLog` ใน [backend/app/db/models.py](../../backend/app/db/models.py) แต่ไม่มีโค้ดบันทึก audit log | ไม่มี test | ยังไม่ถึง |
| IF-IDP-01 | ไม่มี AC ตรง ๆ | T-03 เสร็จ | [backend/app/auth/idp.py](../../backend/app/auth/idp.py): `get_verified_hn`; ถูกใช้โดย POST/DELETE bookings | `test_TC_BKG_01_3_unverified_booking` skipped; ไม่มี test ที่ผ่านตรวจ 401 | ช่องโหว่ |
| IF-HIS-01 | ไม่มี AC ตรง ๆ | T-01 เสร็จ, T-09 พร้อมทำ | โมเดล bookings มี `hn` และไม่มีคอลัมน์ `national_id`; ยังไม่มี HIS lookup | `test_T01_no_national_id` ผ่าน แต่ไม่มี test/โค้ด HIS lookup | ยังไม่ถึง |
| IF-NOT-01 | AC-BKG-04 | T-07 พร้อมทำ | ไม่พบโค้ดวางงานแจ้งเตือนแบบ asynchronous | ไม่มี test | ยังไม่ถึง |

## 2. ตามรอยย้อนกลับ (โค้ด ไป requirement)
| โค้ด (ไฟล์: ฟังก์ชัน หรือ endpoint) | อ้าง ID | ตรงกับข้อความใน spec ไหม | หมายเหตุ |
|---|---|---|---|
| [backend/app/auth/idp.py](../../backend/app/auth/idp.py): `get_verified_hn` | IF-IDP-01 | ตรงบางส่วน | ตรวจ token จำลองและคืน HN ก่อนเข้าถึง endpoint แต่ยังไม่มี test ที่ผ่านยืนยันพฤติกรรมปฏิเสธ |
| [backend/app/slots/router.py](../../backend/app/slots/router.py): GET `/slots` `get_slots` | FR-BKG-01, FR-BKG-06 | ไม่ตรงครบ | มีช่วงเวลาว่างและ remaining กับ package filter แต่ service จำกัดช่วงเป็น 14 วัน และไม่มี UI เปลี่ยนแพ็กเกจ |
| [backend/app/slots/service.py](../../backend/app/slots/service.py): `list_available_slots` | FR-BKG-01, FR-BKG-06 | ไม่ตรง | `DAYS_AHEAD = 14` ขัดกับ 30 วันใน FR-BKG-01 |
| [backend/app/booking/router.py](../../backend/app/booking/router.py): POST `/bookings` `create_booking` | FR-BKG-04, IF-IDP-01 | ไม่ตรงครบ | บันทึก/คืน response และตรวจ auth แต่ไม่ส่งคำขอแจ้งเตือน; รับและ log `national_id` โดยไม่จำเป็น |
| [backend/app/booking/router.py](../../backend/app/booking/router.py): DELETE `/bookings/{booking_id}` `cancel_booking` | ไม่มี; UC-02 | ไม่ตรง | ฟังก์ชันยกเลิกอยู่ใน Out of scope (UC-02) |
| [backend/app/booking/service.py](../../backend/app/booking/service.py): `next_queue_no` | Q-02, FR-BKG-04 | ไม่ตรง | กำหนดรูปแบบ `A001` และ reset รายวันทั้งที่ Q-02 ยังไม่มีคำตอบ |
| [backend/app/booking/service.py](../../backend/app/booking/service.py): `create_booking` | FR-BKG-04, FR-BKG-03 | ไม่ตรง | ตรวจ `remaining < 0` ทำให้ช่วงที่เหลือ 0 ยังจองได้และอาจติดลบ; ไม่มีข้อเสนอ 3 ช่วงเมื่อเต็ม |
| [backend/app/booking/service.py](../../backend/app/booking/service.py): `cancel_booking` | ไม่มี; UC-02 | ไม่ตรง | ยกเลิกและคืนที่นั่งเป็นพฤติกรรม Out of scope |
| [backend/app/db/models.py](../../backend/app/db/models.py): `Slot`, `Booking`, `AuditLog` | CON-TECH-01, DOM-PDPA-01, IF-HIS-01, FR-BKG-04 | ตรงบางส่วน | มีโครงสร้างตารางและไม่เก็บ national_id ใน bookings แต่ AuditLog ไม่ถูกใช้งาน และ queue_no ถูกใช้ก่อน Q-02 ตอบ |
| [backend/app/db/migrations/001_init.py](../../backend/app/db/migrations/001_init.py): `upgrade` | CON-TECH-01, DOM-PDPA-01, IF-HIS-01 | ตรงบางส่วน | สร้างตารางได้ แต่ไม่บังคับว่า engine ต้องเป็น PostgreSQL |
| [backend/app/config.py](../../backend/app/config.py): `DATABASE_URL` | CON-TECH-01 | ไม่ตรงในค่าเริ่มต้น | ค่าเริ่มต้นเป็น SQLite แม้ระบบจริงกำหนด PostgreSQL; ต้องพึ่ง environment ภายนอก |
| [backend/app/main.py](../../backend/app/main.py): `lifespan`, app setup | CON-TECH-01, DOM-PDPA-01 | ไม่ตรงครบ | สร้างตารางอัตโนมัติแต่ไม่มี audit middleware และไม่ใช้ migration `upgrade` โดยตรง |
| [frontend/src/api/client.js](../../frontend/src/api/client.js): `getSlots`, `createBooking` | FR-BKG-01, FR-BKG-03, FR-BKG-04 | ยังไม่ครบ | มี client API ตามสัญญาบางส่วน แต่ไม่มีหน้าใช้งานและไม่รองรับ error/nearby choices ตามแผน |
| [frontend/src/App.jsx](../../frontend/src/App.jsx): `App` | ไม่มี task ที่เสร็จ | ไม่ตรงความครบของแผน | เป็นเพียงโครงเริ่มต้น ยังไม่มี SlotPicker, ConfirmBooking หรือ BookingResult |

## 3. ข้อค้นพบ
ชนิด: AC ไม่มี test / test อ่อน / โค้ดไม่มี FR / FR ไม่มี AC / เดา Q-xx / ละเมิด Constraint / ตัวเลขไม่ตรง spec / อ้าง ID ผิดเรื่อง
ทีมตัดสิน: แก้โค้ด / แก้ spec / เพิ่ม Q-xx / ไม่ใช่ปัญหา (พร้อมเหตุผล 1 บรรทัด)

| F-ID | ชนิด | อยู่ที่ | ขัดกับ | รายละเอียด | ทีมตัดสิน |
|---|---|---|---|---|---|
| F-001 | ตัวเลขไม่ตรง spec | `backend/app/slots/service.py`: `DAYS_AHEAD = 14` | FR-BKG-01 | spec กำหนดให้แสดงช่วงเวลาที่ว่างภายใน 30 วันข้างหน้า แต่โค้ดค้นหาเพียง 14 วัน | |
| F-002 | โค้ดไม่มี FR / test อ่อน | `backend/app/booking/service.py`: `create_booking` | FR-BKG-03, AC-BKG-01-2 | เงื่อนไข `remaining < 0` อนุญาตให้จองเมื่อ remaining เป็น 0; test ที่ใช้ได้จึงได้ 201 แทน 409 และไม่ตรวจ nearby choices | |
| F-003 | เดา Q-xx | `backend/app/booking/service.py`: `next_queue_no` | Q-02, FR-BKG-04 | โค้ดเลือกใช้รูปแบบ `A001` และ reset รายวัน ทั้งที่ Q-02 ยังไม่ได้คำตอบ; plan ระบุว่ายังไม่สร้างส่วนนี้ | |
| F-004 | ละเมิด Constraint | `backend/app/booking/router.py`: `BookingRequest`, `create_booking` log | IF-HIS-01 | request รับ `national_id` และ log ค่า `national_id` ทั้งที่ constraint กำหนดให้ค้นผ่าน HIS แล้วอ้างอิงด้วย HN และไม่เก็บเลขบัตรประชาชน | |
| F-005 | โค้ดไม่มี FR | `backend/app/booking/router.py`: DELETE `/bookings/{booking_id}` และ `cancel_booking` | Out of scope UC-02 | เพิ่มความสามารถยกเลิก/คืนที่นั่ง ทั้งที่ spec ระบุยกเลิกและเลื่อนคิวเป็น Out of scope | |
| F-006 | FR ไม่มี AC | `spec.md` FR-BKG-06 | FR-BKG-06 | ไม่มี AC ที่ตรวจการเปลี่ยนแพ็กเกจและคำนวณช่วงเวลาว่างใหม่ แม้มี task และโค้ดกรอง package บางส่วน | |
| F-007 | test อ่อน | `backend/tests/test_AC_BKG_05.py`: `test_AC_BKG_05` | NFR-PERF-01 | test ทำคำขอ 200 ครั้งแบบต่อเนื่อง ไม่ใช่ผู้ใช้พร้อมกัน 200 คนตาม requirement จึงยืนยัน concurrency ไม่ได้ | |
| F-008 | AC ไม่มี test / test อ่อน | `backend/tests/test_AC_BKG_01.py` | IF-IDP-01, AC-BKG-01 | test กรณีไม่ยืนยันตัวตนถูก skip และ test ปกติไม่ตรวจ queue response เพราะ Q-02; ส่วนส่งคำขอแจ้งเตือนก็ไม่มี test | |
| F-009 | ละเมิด Constraint | `backend/app/config.py`: ค่าเริ่มต้น `sqlite:///./dev.db` | CON-TECH-01 | ระบบจริงกำหนด PostgreSQL แต่ค่าเริ่มต้นของ application เป็น SQLite และไม่มีการบังคับค่าฐานข้อมูลที่ตรง constraint | |
| F-010 | โค้ดไม่มี FR | `backend/app/db/models.py`: `AuditLog`; `backend/app/main.py` | DOM-PDPA-01 | มีตาราง audit_logs แต่ไม่มีการสร้าง audit log เมื่อเข้าถึงข้อมูล และไม่มีการเก็บผู้เข้าถึง เวลา รหัสผู้รับบริการจริง | |
| F-011 | โค้ดไม่มี FR | `backend/app/booking/router.py`, `backend/app/booking/service.py` | FR-BKG-02 | ไม่มีการตรวจว่าผู้รับบริการมีคิวที่ยังไม่ได้ใช้ในวันเดียวกัน และไม่มีการคืนหมายเลขคิวเดิม | |
| F-012 | โค้ดไม่มี FR | ทั้งระบบ | FR-BKG-05, IF-NOT-01, NFR-REL-02 | ไม่พบ notification queue, asynchronous send หรือ retry ภายใน 5 นาทีเมื่อการแจ้งเตือนล้มเหลว | |
| F-013 | โค้ดไม่มี FR | `frontend/src/App.jsx` | FR-BKG-03, FR-BKG-04, FR-BKG-05, FR-BKG-06 | หน้าจอยังเป็นโครงเริ่มต้น ไม่มีหน้าจอยืนยัน ผลการจอง ตัวเลือกใกล้เคียง หรือการคำนวณใหม่ตามแพ็กเกจ | |
| F-014 | ยังไม่มีการตรวจตาม requirement | `spec.md`, `tasks.md` | NFR-SEC-01, NFR-USE-01 | ไม่มี task/test/implementation ที่ตรวจ TLS 1.2 ขึ้นไป หรือ usability 8 ใน 10 คนภายใน 3 นาที | |

## 4. แก้แล้ว
| F-ID | แก้อย่างไร | รู้ได้อย่างไร |
|---|---|---|
