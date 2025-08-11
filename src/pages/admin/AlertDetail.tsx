import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Edit, Archive, MapPin, Calendar, Clock, Users, AlertTriangle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { LoadingCard } from '@/components/ui/loading-spinner';

interface Alert {
  id: string;
  title: string;
  alert_type: 'flood' | 'drought' | 'storm' | 'wildfire';
  severity: 'low' | 'moderate' | 'high' | 'extreme' | 'critical';
  affected_regions: string[];
  status: 'active' | 'resolved' | 'monitoring' | 'cancelled';
  description: string;
  created_at: string;
  updated_at: string;
  expires_at: string | null;
  coordinates: any;
  sensor_data: any;
}

export default function AlertDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [alert, setAlert] = useState<Alert | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      fetchAlert();
    }
  }, [id]);

  const fetchAlert = async () => {
    try {
      const { data, error } = await supabase
        .from('climate_alerts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setAlert(data);
    } catch (error: any) {
      toast({
        title: "Error fetching alert",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    const colors = {
      low: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      moderate: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
      high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      extreme: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
    };
    return colors[severity as keyof typeof colors];
  };

  const getStatusColor = (status: string) => {
    const colors = {
      active: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      monitoring: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      resolved: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
    };
    return colors[status as keyof typeof colors];
  };

  const getAlertTypeIcon = (type: string) => {
    return type === 'flood' ? '🌊' : '🏜️';
  };

  if (loading) {
    return <LoadingCard title="Loading alert details..." />;
  }

  if (!alert) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-2">Alert not found</h2>
        <p className="text-muted-foreground mb-4">The alert you're looking for doesn't exist.</p>
        <Button onClick={() => navigate('/admin/alerts')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Alerts
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={() => navigate('/admin/alerts')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-2xl">{getAlertTypeIcon(alert.alert_type)}</span>
              <h1 className="text-2xl font-bold">{alert.title}</h1>
            </div>
            <p className="text-muted-foreground">
              {alert.alert_type === 'flood' ? 'Flood Alert' : 'Drought Alert'} • 
              Created {new Date(alert.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button variant="outline">
            <Archive className="mr-2 h-4 w-4" />
            Archive
          </Button>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-sm font-medium">Severity</p>
                <Badge className={getSeverityColor(alert.severity)}>
                  {alert.severity.toUpperCase()}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="h-5 w-5 rounded-full bg-green-500" />
              <div>
                <p className="text-sm font-medium">Status</p>
                <Badge className={getStatusColor(alert.status)}>
                  {alert.status.toUpperCase()}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Affected Regions</p>
                <p className="text-sm text-muted-foreground">{alert.affected_regions?.length || 0} regions</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm font-medium">Duration</p>
                <p className="text-sm text-muted-foreground">
                  {Math.ceil((new Date().getTime() - new Date(alert.created_at).getTime()) / (1000 * 60 * 60 * 24))} days
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="regions">Affected Regions</TabsTrigger>
          <TabsTrigger value="sensor-data">Sensor Data</TabsTrigger>
          <TabsTrigger value="response">Response Actions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Alert Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">{alert.description}</p>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">Alert Created</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(alert.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">Last Updated</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(alert.updated_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  {alert.expires_at && (
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium">Expires</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(alert.expires_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    Send SMS Alert
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MapPin className="mr-2 h-4 w-4" />
                    View on Map
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Update
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="regions">
          <Card>
            <CardHeader>
              <CardTitle>Affected Regions</CardTitle>
              <CardDescription>Areas currently under {alert.alert_type} alert</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                {alert.affected_regions?.map((region, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 border rounded">
                    <MapPin className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium">{region}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sensor-data">
          <Card>
            <CardHeader>
              <CardTitle>Sensor Data</CardTitle>
              <CardDescription>Environmental measurements and readings</CardDescription>
            </CardHeader>
            <CardContent>
              {alert.sensor_data ? (
                <pre className="bg-muted p-4 rounded text-xs overflow-auto">
                  {JSON.stringify(alert.sensor_data, null, 2)}
                </pre>
              ) : (
                <p className="text-muted-foreground">No sensor data available for this alert.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="response">
          <Card>
            <CardHeader>
              <CardTitle>Response Actions</CardTitle>
              <CardDescription>Actions taken in response to this alert</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">Community leaders notified</p>
                    <p className="text-xs text-muted-foreground">Automatic notification sent to all regional coordinators</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">Emergency services alerted</p>
                    <p className="text-xs text-muted-foreground">Local emergency response teams have been informed</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">Resource deployment pending</p>
                    <p className="text-xs text-muted-foreground">Waiting for confirmation from field teams</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}