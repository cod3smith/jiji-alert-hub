import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, MapPin, Droplets, TreePine } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface MapItem {
  id: string;
  title: string;
  type: 'alert' | 'project' | 'report';
  severity?: string;
  status: string;
  location: string;
  coordinates?: any;
}

export function PublicMapView() {
  const [mapItems, setMapItems] = useState<MapItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMapData();
  }, []);

  const fetchMapData = async () => {
    try {
      // Fetch alerts
      const { data: alerts } = await supabase
        .from('climate_alerts')
        .select('id, title, severity, status, affected_regions, coordinates')
        .eq('status', 'active');

      // Fetch approved reports
      const { data: reports } = await supabase
        .from('community_reports')
        .select('id, title, status, location, coordinates')
        .eq('status', 'approved');

      // Fetch active projects
      const { data: projects } = await supabase
        .from('eco_projects')
        .select('id, name, status, location, coordinates')
        .in('status', ['active', 'planning']);

      const combinedData: MapItem[] = [
        ...(alerts || []).map(alert => ({
          id: alert.id,
          title: alert.title,
          type: 'alert' as const,
          severity: alert.severity,
          status: alert.status,
          location: alert.affected_regions?.[0] || 'Unknown',
          coordinates: alert.coordinates
        })),
        ...(reports || []).map(report => ({
          id: report.id,
          title: report.title,
          type: 'report' as const,
          status: report.status,
          location: report.location,
          coordinates: report.coordinates
        })),
        ...(projects || []).map(project => ({
          id: project.id,
          title: project.name,
          type: 'project' as const,
          status: project.status,
          location: project.location,
          coordinates: project.coordinates
        }))
      ];

      setMapItems(combinedData);
    } catch (error) {
      console.error('Error fetching map data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'alert': return AlertTriangle;
      case 'report': return MapPin;
      case 'project': return TreePine;
      default: return MapPin;
    }
  };

  const getTypeColor = (type: string, severity?: string) => {
    if (type === 'alert') {
      switch (severity) {
        case 'extreme': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
        case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
        case 'moderate': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
        default: return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      }
    }
    if (type === 'project') return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
  };

  if (loading) {
    return (
      <div className="w-full h-96 bg-muted rounded-lg animate-pulse flex items-center justify-center">
        <p className="text-muted-foreground">Loading map data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Community Alert & Project Map
          </CardTitle>
          <CardDescription>
            Real-time view of active alerts, community reports, and eco-restoration projects across Kenya
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full h-96 bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
            {/* Map placeholder - in a real implementation, this would be an actual map */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-blue-50 to-green-100">
              <div className="w-full h-full relative">
                {/* Map markers */}
                {mapItems.slice(0, 8).map((item, index) => {
                  const Icon = getTypeIcon(item.type);
                  return (
                    <div
                      key={item.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform"
                      style={{
                        left: `${20 + (index % 4) * 20}%`,
                        top: `${25 + Math.floor(index / 4) * 25}%`
                      }}
                    >
                      <div className="bg-white rounded-full p-2 shadow-lg border-2 border-white">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="z-10 text-center bg-white/90 backdrop-blur-sm p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Interactive map showing {mapItems.length} active items</p>
              <p className="text-xs text-muted-foreground mt-1">
                🌊 Alerts • 📍 Reports • 🌱 Projects
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Legend and Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Active Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mapItems.filter(item => item.type === 'alert').slice(0, 3).map(alert => (
                <div key={alert.id} className="flex items-center justify-between">
                  <span className="text-sm truncate">{alert.title}</span>
                  <Badge className={getTypeColor('alert', alert.severity)}>
                    {alert.severity}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-500" />
              Recent Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mapItems.filter(item => item.type === 'report').slice(0, 3).map(report => (
                <div key={report.id} className="flex items-center justify-between">
                  <span className="text-sm truncate">{report.title}</span>
                  <Badge className={getTypeColor('report')}>
                    {report.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TreePine className="h-5 w-5 text-green-500" />
              Active Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mapItems.filter(item => item.type === 'project').slice(0, 3).map(project => (
                <div key={project.id} className="flex items-center justify-between">
                  <span className="text-sm truncate">{project.title}</span>
                  <Badge className={getTypeColor('project')}>
                    {project.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}