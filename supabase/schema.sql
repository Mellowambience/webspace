-- Webspace DB Schema
-- Run in Supabase SQL editor or via supabase db push

create extension if not exists "uuid-ossp";

-- Users / Profiles
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  display_name text,
  bio text,
  avatar_url text,
  active_template_id uuid,
  is_developer boolean default false,
  stripe_account_id text,
  follower_count int default 0,
  following_count int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Templates
create table if not exists templates (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  description text,
  preview_image_url text,
  price_cents int default 0,
  developer_id uuid references profiles(id) on delete cascade,
  stripe_product_id text,
  published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Content Blocks
create table if not exists content_blocks (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete cascade,
  type text not null,
  position int not null,
  data jsonb default '{}',
  created_at timestamptz default now()
);

-- Template Purchases
create table if not exists template_purchases (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete cascade,
  template_id uuid references templates(id) on delete restrict,
  stripe_payment_intent_id text,
  amount_cents int,
  purchased_at timestamptz default now()
);

-- Follows
create table if not exists follows (
  follower_id uuid references profiles(id) on delete cascade,
  following_id uuid references profiles(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (follower_id, following_id)
);

-- RLS Policies (basic)
alter table profiles enable row level security;
alter table templates enable row level security;
alter table content_blocks enable row level security;
alter table template_purchases enable row level security;
alter table follows enable row level security;

create policy "Public profiles are viewable by everyone" on profiles
  for select using (true);

create policy "Users can update their own profile" on profiles
  for update using (auth.uid() = id);

create policy "Published templates are viewable by everyone" on templates
  for select using (published = true);

create policy "Developers can manage their own templates" on templates
  for all using (auth.uid() = developer_id);
