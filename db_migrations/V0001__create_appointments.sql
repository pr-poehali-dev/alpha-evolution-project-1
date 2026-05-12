CREATE TABLE appointments (
    id SERIAL PRIMARY KEY,
    name TEXT,
    phone TEXT NOT NULL,
    service TEXT,
    slot_time TIMESTAMP NOT NULL,
    comment TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_appointments_slot_time ON appointments(slot_time);
