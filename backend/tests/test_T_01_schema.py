import importlib.util
from pathlib import Path

from sqlalchemy import inspect

from app.db.models import Base
from app.db.session import create_engine


migration_path = Path(__file__).resolve().parents[1] / "app" / "db" / "migrations" / "001_init.py"
spec = importlib.util.spec_from_file_location("migration_001_init", migration_path)
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)
upgrade = module.upgrade


def test_T_01_schema_and_migration_build_required_tables():
    engine = create_engine("sqlite:///:memory:")

    upgrade(engine)

    inspector = inspect(engine)
    tables = inspector.get_table_names()

    assert "slots" in tables
    assert "bookings" in tables
    assert "audit_logs" in tables

    slots_cols = {col["name"] for col in inspector.get_columns("slots")}
    bookings_cols = {col["name"] for col in inspector.get_columns("bookings")}
    audit_cols = {col["name"] for col in inspector.get_columns("audit_logs")}

    assert {"slot_date", "start_time", "package_code", "capacity", "remaining"}.issubset(slots_cols)
    assert {"hn", "slot_id", "booking_date", "queue_no", "status", "created_at"}.issubset(bookings_cols)
    assert {"actor_id", "action", "hn", "accessed_at"}.issubset(audit_cols)
    assert "national_id" not in bookings_cols

    assert Base.metadata.tables["slots"].name == "slots"
    assert Base.metadata.tables["bookings"].name == "bookings"
    assert Base.metadata.tables["audit_logs"].name == "audit_logs"
