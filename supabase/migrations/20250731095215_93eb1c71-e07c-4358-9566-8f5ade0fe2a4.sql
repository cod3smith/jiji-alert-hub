-- Create enum types for the platform
CREATE TYPE public.alert_type AS ENUM ('flood', 'drought', 'storm', 'wildfire');
CREATE TYPE public.alert_severity AS ENUM ('low', 'moderate', 'high', 'critical');
CREATE TYPE public.alert_status AS ENUM ('active', 'resolved', 'cancelled');
CREATE TYPE public.report_status AS ENUM ('pending', 'approved', 'rejected', 'flagged');
CREATE TYPE public.project_status AS ENUM ('planning', 'active', 'completed', 'suspended');
CREATE TYPE public.user_role AS ENUM ('admin', 'analyst', 'community_leader', 'community_member');

-- Profiles table for user management
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  role user_role DEFAULT 'community_member',
  location TEXT,
  organization TEXT,
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Climate alerts table
CREATE TABLE public.climate_alerts (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  alert_type alert_type NOT NULL,
  severity alert_severity NOT NULL,
  status alert_status DEFAULT 'active',
  affected_regions TEXT[],
  coordinates JSONB, -- {lat, lng, radius}
  sensor_data JSONB,
  created_by UUID REFERENCES public.profiles(id),
  expires_at TIMESTAMP WITH TIME ZONE,
  resolved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Community reports table
CREATE TABLE public.community_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL, -- 'flood_damage', 'drought_impact', 'infrastructure', etc.
  status report_status DEFAULT 'pending',
  location TEXT,
  coordinates JSONB, -- {lat, lng}
  media_urls TEXT[], -- URLs to Supabase Storage files
  audio_url TEXT,
  submitted_by UUID REFERENCES public.profiles(id),
  reviewed_by UUID REFERENCES public.profiles(id),
  review_notes TEXT,
  priority INTEGER DEFAULT 1,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Eco-restoration projects table
CREATE TABLE public.eco_projects (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  project_type TEXT NOT NULL, -- 'tree_planting', 'mangrove_restoration', 'soil_conservation', etc.
  status project_status DEFAULT 'planning',
  location TEXT,
  coordinates JSONB,
  target_metrics JSONB, -- {trees_target: 1000, area_hectares: 50, etc.}
  current_metrics JSONB, -- {trees_planted: 250, area_restored: 12.5, etc.}
  green_credits_allocated INTEGER DEFAULT 0,
  green_credits_distributed INTEGER DEFAULT 0,
  start_date DATE,
  end_date DATE,
  managed_by UUID REFERENCES public.profiles(id),
  participants UUID[], -- Array of user IDs
  funding_goal DECIMAL(10,2),
  funding_raised DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Green credits and rewards tracking
CREATE TABLE public.green_credits (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id),
  project_id UUID REFERENCES public.eco_projects(id),
  credits_earned INTEGER NOT NULL,
  activity_type TEXT NOT NULL, -- 'tree_planting', 'data_collection', 'community_reporting', etc.
  activity_description TEXT,
  verification_status TEXT DEFAULT 'pending', -- 'pending', 'verified', 'rejected'
  verified_by UUID REFERENCES public.profiles(id),
  payout_amount DECIMAL(10,2),
  payout_method TEXT, -- 'mpesa', 'bank', 'tokens'
  payout_reference TEXT,
  payout_status TEXT DEFAULT 'pending', -- 'pending', 'processed', 'failed'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Funding and donations tracking
CREATE TABLE public.funding (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  donor_name TEXT,
  donor_email TEXT,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'KES',
  project_id UUID REFERENCES public.eco_projects(id),
  purpose TEXT, -- 'project_funding', 'green_credits', 'operations'
  payment_method TEXT,
  payment_reference TEXT,
  status TEXT DEFAULT 'pending', -- 'pending', 'completed', 'failed'
  is_anonymous BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- System settings and configuration
CREATE TABLE public.system_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  setting_key TEXT NOT NULL UNIQUE,
  setting_value JSONB NOT NULL,
  description TEXT,
  updated_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.climate_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.eco_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.green_credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.funding ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can manage all profiles" ON public.profiles FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- RLS Policies for climate alerts
CREATE POLICY "Everyone can view climate alerts" ON public.climate_alerts FOR SELECT USING (true);
CREATE POLICY "Analysts and admins can manage alerts" ON public.climate_alerts FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'analyst'))
);

-- RLS Policies for community reports
CREATE POLICY "Everyone can view approved reports" ON public.community_reports FOR SELECT USING (
  status = 'approved' OR 
  submitted_by = auth.uid() OR
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'analyst'))
);
CREATE POLICY "Users can create reports" ON public.community_reports FOR INSERT WITH CHECK (submitted_by = auth.uid());
CREATE POLICY "Users can update own reports" ON public.community_reports FOR UPDATE USING (submitted_by = auth.uid());
CREATE POLICY "Admins can manage all reports" ON public.community_reports FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'analyst'))
);

-- RLS Policies for eco projects
CREATE POLICY "Everyone can view active projects" ON public.eco_projects FOR SELECT USING (true);
CREATE POLICY "Community leaders and admins can manage projects" ON public.eco_projects FOR ALL USING (
  managed_by = auth.uid() OR
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'community_leader'))
);

-- RLS Policies for green credits
CREATE POLICY "Users can view own credits" ON public.green_credits FOR SELECT USING (
  user_id = auth.uid() OR
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'community_leader'))
);
CREATE POLICY "Community leaders can award credits" ON public.green_credits FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'community_leader'))
);

-- RLS Policies for funding
CREATE POLICY "Admins can view all funding" ON public.funding FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Anyone can donate" ON public.funding FOR INSERT WITH CHECK (true);

-- RLS Policies for system settings
CREATE POLICY "Admins can manage settings" ON public.system_settings FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Create storage buckets for media files
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('community-reports', 'community-reports', true),
  ('project-media', 'project-media', true),
  ('avatars', 'avatars', true);

-- Storage policies for community reports
CREATE POLICY "Anyone can view community report media" ON storage.objects FOR SELECT USING (bucket_id = 'community-reports');
CREATE POLICY "Authenticated users can upload community report media" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'community-reports' AND auth.uid() IS NOT NULL
);

-- Storage policies for project media
CREATE POLICY "Anyone can view project media" ON storage.objects FOR SELECT USING (bucket_id = 'project-media');
CREATE POLICY "Community leaders can upload project media" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'project-media' AND 
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'community_leader'))
);

-- Storage policies for avatars
CREATE POLICY "Anyone can view avatars" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
CREATE POLICY "Users can upload own avatar" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Enable realtime for key tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.climate_alerts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.community_reports;
ALTER PUBLICATION supabase_realtime ADD TABLE public.eco_projects;
ALTER PUBLICATION supabase_realtime ADD TABLE public.green_credits;

-- Create functions for automatic profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id, 
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'community_member')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for automatic profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers to all tables
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_climate_alerts_updated_at BEFORE UPDATE ON public.climate_alerts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_community_reports_updated_at BEFORE UPDATE ON public.community_reports FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_eco_projects_updated_at BEFORE UPDATE ON public.eco_projects FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_green_credits_updated_at BEFORE UPDATE ON public.green_credits FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_funding_updated_at BEFORE UPDATE ON public.funding FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_system_settings_updated_at BEFORE UPDATE ON public.system_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();