
CREATE TABLE public.analytics_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_name TEXT NOT NULL,
  page_path TEXT,
  page_title TEXT,
  source TEXT,
  medium TEXT,
  campaign TEXT,
  referrer TEXT,
  device_type TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert analytics events"
  ON public.analytics_events
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read analytics events"
  ON public.analytics_events
  FOR SELECT
  TO authenticated
  USING (true);

CREATE INDEX idx_analytics_events_name ON public.analytics_events (event_name);
CREATE INDEX idx_analytics_events_created ON public.analytics_events (created_at DESC);
CREATE INDEX idx_analytics_events_name_created ON public.analytics_events (event_name, created_at DESC);
