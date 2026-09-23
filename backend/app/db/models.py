from datetime import date, datetime, time

from sqlalchemy import Column, Date, DateTime, ForeignKey, Integer, String, Table, Time
from sqlalchemy.orm import declarative_base, relationship

# รองรับ: CON-TECH-01, DOM-PDPA-01, IF-HIS-01
Base = declarative_base()


class Slot(Base):
    __tablename__ = "slots"

    id = Column(Integer, primary_key=True, index=True)
    slot_date = Column(Date, nullable=False, index=True)
    start_time = Column(Time, nullable=False)
    package_code = Column(String(50), nullable=False, index=True)
    capacity = Column(Integer, nullable=False)
    remaining = Column(Integer, nullable=False)

    bookings = relationship("Booking", back_populates="slot")


class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)
    hn = Column(String(50), nullable=False, index=True)
    slot_id = Column(Integer, ForeignKey("slots.id"), nullable=False, index=True)
    booking_date = Column(Date, nullable=False, index=True)
    queue_no = Column(String(50), nullable=True)
    status = Column(String(30), nullable=False, default="confirmed")
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)

    slot = relationship("Slot", back_populates="bookings")


class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, index=True)
    actor_id = Column(String(100), nullable=False)
    action = Column(String(100), nullable=False)
    hn = Column(String(50), nullable=False, index=True)
    accessed_at = Column(DateTime, nullable=False, default=datetime.utcnow)
