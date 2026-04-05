-- ============================================================
-- ARTIST_NAME Website — Supabase Schema
-- Run this entire file in the Supabase SQL Editor
-- ============================================================

-- 1. ENQUIRIES
create table if not exists enquiries (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz default now(),
  name          text not null,
  email         text not null,
  phone         text,
  enquiry_type  text not null,
  message       text not null,
  is_read       boolean default false
);

-- 2. GALLERY PAINTINGS
create table if not exists gallery_paintings (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz default now(),
  title         text not null,
  medium        text not null,
  size          text not null,
  price         text not null,
  category      text not null,
  image_url     text,
  display_order integer default 0,
  is_visible    boolean default true
);

-- 3. SHOP PRODUCTS
create table if not exists shop_products (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz default now(),
  name          text not null,
  medium        text not null,
  size          text not null,
  price         text not null,
  image_url     text,
  is_sold       boolean default false,
  is_visible    boolean default true,
  display_order integer default 0
);

-- 4. SITE SETTINGS (key/value store)
create table if not exists site_settings (
  key        text primary key,
  value      text,
  updated_at timestamptz default now()
);

-- Seed initial settings
insert into site_settings (key, value) values
  ('artist_name', 'Radha Rani'),
  ('artist_photo_url', ''),
  ('artist_bio_1', 'I am a passionate Indian artist specializing in watercolor and acrylic paintings. My work draws inspiration from nature, emotions, and the vibrant colors of Indian culture.'),
  ('artist_bio_2', 'With over 10 years of experience, I conduct workshops for beginners and intermediate artists — both online and in-person — helping students discover their creative voice.'),
  ('paintings_count', '200+'),
  ('students_count', '1500+'),
  ('workshops_count', '80+')
on conflict (key) do nothing;

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table enquiries enable row level security;
alter table gallery_paintings enable row level security;
alter table shop_products enable row level security;
alter table site_settings enable row level security;

-- Enquiries: anyone can insert, only logged-in admin can read/update
create policy "Public can submit enquiries"
  on enquiries for insert to anon with check (true);

create policy "Admin reads enquiries"
  on enquiries for select to authenticated using (true);

create policy "Admin updates enquiries"
  on enquiries for update to authenticated using (true);

-- Gallery: anyone can read visible paintings, admin manages all
create policy "Public reads visible paintings"
  on gallery_paintings for select to anon
  using (is_visible = true);

create policy "Admin full access gallery"
  on gallery_paintings for all to authenticated using (true);

-- Shop: anyone can read visible products, admin manages all
create policy "Public reads visible products"
  on shop_products for select to anon
  using (is_visible = true);

create policy "Admin full access shop"
  on shop_products for all to authenticated using (true);

-- Settings: anyone can read, admin can write
create policy "Public reads settings"
  on site_settings for select to anon using (true);

create policy "Admin manages settings"
  on site_settings for all to authenticated using (true);

-- ============================================================
-- STORAGE BUCKETS
-- Create these manually in Supabase Dashboard > Storage:
--   Bucket name: "artist-photo"  — Public: YES
--   Bucket name: "gallery"       — Public: YES
--   Bucket name: "shop"          — Public: YES
-- ============================================================
