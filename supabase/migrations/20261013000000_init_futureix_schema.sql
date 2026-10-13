-- =========================================================================
-- FUTUREIX DIGITAL SERVICES PLATFORM - PRODUCTION DATABASE MIGRATION
-- Compatible with PostgreSQL 15+ / Supabase
-- =========================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USER ROLES & PROFILES
CREATE TYPE user_role_type AS ENUM ('admin', 'sales', 'viewer');

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role user_role_type NOT NULL DEFAULT 'sales',
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. SERVICE CATEGORIES
CREATE TABLE IF NOT EXISTS service_categories (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title_en TEXT NOT NULL,
    title_hi TEXT NOT NULL,
    tagline_en TEXT NOT NULL,
    tagline_hi TEXT NOT NULL,
    description_en TEXT NOT NULL,
    description_hi TEXT NOT NULL,
    starting_price NUMERIC(12, 2) NOT NULL,
    typical_max_price NUMERIC(12, 2) NOT NULL,
    icon_name TEXT NOT NULL,
    billing_type TEXT NOT NULL DEFAULT 'one_time',
    typical_timeline_en TEXT NOT NULL,
    typical_timeline_hi TEXT NOT NULL,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. MASTER PRICING ITEMS
CREATE TYPE billing_freq_type AS ENUM ('one_time', 'monthly', 'per_unit', 'custom');

CREATE TABLE IF NOT EXISTS pricing_items (
    id TEXT PRIMARY KEY,
    category_id TEXT NOT NULL REFERENCES service_categories(id) ON DELETE CASCADE,
    name_en TEXT NOT NULL,
    name_hi TEXT NOT NULL,
    description_en TEXT NOT NULL,
    description_hi TEXT NOT NULL,
    min_price NUMERIC(12, 2) NOT NULL,
    max_price NUMERIC(12, 2) NOT NULL,
    billing_type billing_freq_type NOT NULL DEFAULT 'one_time',
    is_optional BOOLEAN NOT NULL DEFAULT false,
    included_in_base BOOLEAN NOT NULL DEFAULT false,
    active BOOLEAN NOT NULL DEFAULT true,
    last_updated TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_pricing_category ON pricing_items(category_id);
CREATE INDEX idx_pricing_active ON pricing_items(active);

-- 4. PRE-ENGINEERED PACKAGES
CREATE TABLE IF NOT EXISTS packages (
    id TEXT PRIMARY KEY,
    name_en TEXT NOT NULL,
    name_hi TEXT NOT NULL,
    tagline_en TEXT NOT NULL,
    tagline_hi TEXT NOT NULL,
    min_price NUMERIC(12, 2) NOT NULL,
    max_price NUMERIC(12, 2) NOT NULL,
    billing_type billing_freq_type NOT NULL DEFAULT 'one_time',
    popular BOOLEAN NOT NULL DEFAULT false,
    features_en JSONB NOT NULL DEFAULT '[]'::jsonb,
    features_hi JSONB NOT NULL DEFAULT '[]'::jsonb,
    ideal_for_en TEXT NOT NULL,
    ideal_for_hi TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. CUSTOMERS
CREATE TABLE IF NOT EXISTS customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_name TEXT NOT NULL,
    contact_person TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    city TEXT,
    industry TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_customer_email ON customers(email);

-- 6. PUBLIC INBOUND ENQUIRIES
CREATE TYPE enquiry_status_type AS ENUM ('new', 'contacted', 'quoted', 'closed');

CREATE TABLE IF NOT EXISTS enquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reference_id TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    business_name TEXT,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    city TEXT,
    service_category TEXT NOT NULL,
    budget_range TEXT NOT NULL,
    timeline TEXT NOT NULL,
    description TEXT,
    preferred_language TEXT NOT NULL DEFAULT 'en',
    status enquiry_status_type NOT NULL DEFAULT 'new',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_enquiries_status ON enquiries(status);
CREATE INDEX idx_enquiries_ref ON enquiries(reference_id);

-- 7. COMMERCIAL QUOTATIONS
CREATE TYPE quote_status_type AS ENUM ('draft', 'sent', 'approved', 'rejected', 'expired');

CREATE TABLE IF NOT EXISTS quotes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quote_number TEXT UNIQUE NOT NULL,
    customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
    project_name TEXT NOT NULL,
    assigned_member TEXT NOT NULL,
    language TEXT NOT NULL DEFAULT 'en',
    status quote_status_type NOT NULL DEFAULT 'draft',
    valid_until TIMESTAMPTZ NOT NULL,
    state_snapshot JSONB NOT NULL,
    calculation_snapshot JSONB NOT NULL,
    version INT NOT NULL DEFAULT 1,
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_quotes_status ON quotes(status);
CREATE INDEX idx_quotes_number ON quotes(quote_number);

-- 8. QUOTE AUDIT LOGS
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quote_id UUID REFERENCES quotes(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    notes TEXT,
    changed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. SITE SETTINGS
CREATE TABLE IF NOT EXISTS site_settings (
    id INT PRIMARY KEY DEFAULT 1,
    agency_name TEXT NOT NULL DEFAULT 'FUTUREIX',
    website TEXT NOT NULL DEFAULT 'https://futureix.in',
    primary_phone TEXT NOT NULL DEFAULT '+91 95091 09332',
    whatsapp_number TEXT NOT NULL DEFAULT '919509109332',
    primary_email TEXT NOT NULL DEFAULT 'hello@futureix.in',
    address TEXT NOT NULL DEFAULT 'Jaipur, Rajasthan, India',
    gst_rate NUMERIC(5, 2) NOT NULL DEFAULT 18.00,
    gstin TEXT NOT NULL DEFAULT '08AAAAF9876Q1Z5',
    max_sales_discount NUMERIC(5, 2) NOT NULL DEFAULT 15.00,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT single_row CHECK (id = 1)
);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- Anonymous public can create enquiries
CREATE POLICY "Public can insert enquiries" ON enquiries
    FOR INSERT WITH CHECK (true);

-- Authenticated staff can read/manage enquiries
CREATE POLICY "Staff can view enquiries" ON enquiries
    FOR SELECT USING (auth.role() = 'authenticated');

-- Public can view active pricing items
CREATE POLICY "Public can view active pricing" ON pricing_items
    FOR SELECT USING (active = true);

-- Only Admin can update pricing items
CREATE POLICY "Only Admin can edit pricing" ON pricing_items
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin'
        )
    );
