DO $$ 
BEGIN
  IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'url_shortener_db') THEN
    CREATE DATABASE url_shortener_db;
  END IF;
END $$;
