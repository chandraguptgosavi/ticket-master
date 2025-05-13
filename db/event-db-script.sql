SET TIME ZONE 'Asia/Calcutta';

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
      FROM pg_type
     WHERE typname = 'ticket_status'
  ) THEN
    CREATE TYPE ticket_status AS ENUM ('available', 'booked');
  END IF;
END
$$;

CREATE TABLE IF NOT EXISTS event (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    date DATE NOT NULL,
    seats INT NOT NULL,
    venue_id INT NOT NULL,
    FOREIGN KEY (venue_id) REFERENCES venue(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS venue (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    capacity INT NOT NULL,
    lat FLOAT NOT NULL,
    long FLOAT NOT NULL
);

CREATE TABLE IF NOT EXISTS ticket (
    id SERIAL PRIMARY KEY,
    price DECIMAL(10, 2) NOT NULL,
    status ticket_status NOT NULL DEFAULT 'available',
    event_id INT NOT NULL,
    booked_at TIMESTAMP,
    booked_by INT,
    FOREIGN KEY (event_id) REFERENCES event(id) ON DELETE CASCADE
);