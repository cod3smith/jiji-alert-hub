import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { MetricsChart } from "@/components/charts/MetricsChart";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, AlertTriangle, Users, Droplets, TreePine, TrendingUp, MapPin, Clock, Wifi, WifiOff, Activity, Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Add a date extension for relative time
declare global {
  interface Date {
    toRelativeString(): string;
  }
}

Date.prototype.toRelativeString = function(): string {
  const now = new Date();
  const diff = Math.floor((now.getTime() - this.getTime()) / 1000);
  
  if (diff < 60) return `${diff} seconds ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  return `${Math.floor(diff / 86400)} days ago`;
};

interface DashboardStats {
  totalUsers: number;
  activeAlerts: number;
  pendingReports: number;
  activeProjects: number;
  onlineUsers: number;
  totalCredits: number;
}

interface ClimateAlert {
  id: string;
  title: string;
  alert_type: string;
  severity: string;
  status: string;
  created_at: string;
  affected_regions: string[];
}

interface RecentReport {
  id: string;
  title: string;
  category: string;
  status: string;
  location: string;
  created_at: string;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeAlerts: 0,
    pendingReports: 0,
    activeProjects: 0,
    onlineUsers: 0,
    totalCredits: 0,
  });
  const [alerts, setAlerts] = useState<ClimateAlert[]>([]);
  const [reports, setReports] = useState<RecentReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { toast } = useToast();

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch stats
      const [usersResult, alertsResult, reportsResult, projectsResult, creditsResult] = await Promise.all([
        supabase.from('profiles').select('id', { count: 'exact' }),
        supabase.from('climate_alerts').select('id', { count: 'exact' }).eq('status', 'active'),
        supabase.from('community_reports').select('id', { count: 'exact' }).eq('status', 'pending'),
        supabase.from('eco_projects').select('id', { count: 'exact' }).eq('status', 'active'),
        supabase.from('green_credits').select('credits_earned').eq('verification_status', 'verified'),
      ]);

      // Fetch recent alerts
      const { data: alertsData } = await supabase
        .from('climate_alerts')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(5);

      // Fetch recent reports
      const { data: reportsData } = await supabase
        .from('community_reports')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(6);

      // Calculate total credits
      const totalCredits = creditsResult.data?.reduce((sum, credit) => sum + credit.credits_earned, 0) || 0;

      setStats({
        totalUsers: usersResult.count || 0,
        activeAlerts: alertsResult.count || 0,
        pendingReports: reportsResult.count || 0,
        activeProjects: projectsResult.count || 0,
        onlineUsers: Math.floor((usersResult.count || 0) * 0.3), // Simulated online users
        totalCredits,
      });

      setAlerts(alertsData || []);
      setReports(reportsData || []);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();

    // Set up real-time subscriptions
    const alertsChannel = supabase
      .channel('dashboard-alerts')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'climate_alerts' },
        () => fetchDashboardData()
      )
      .subscribe();

    const reportsChannel = supabase
      .channel('dashboard-reports')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'community_reports' },
        () => fetchDashboardData()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(alertsChannel);
      supabase.removeChannel(reportsChannel);
    };
  }, []);

  const handleRefresh = () => {
    fetchDashboardData();
    toast({
      title: "Dashboard Refreshed",
      description: "Data has been updated",
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'hsl(var(--destructive))';
      case 'high': return 'hsl(var(--warning))';
      case 'moderate': return 'hsl(var(--info))';
      case 'low': return 'hsl(var(--success))';
      default: return 'hsl(var(--muted))';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'hsl(var(--success))';
      case 'pending': return 'hsl(var(--warning))';
      case 'rejected': return 'hsl(var(--destructive))';
      default: return 'hsl(var(--muted))';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Jihadharini Climate Dashboard</h2>
          <p className="text-muted-foreground">
            Real-time monitoring for early warning and eco-restoration initiatives
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {isOnline ? (
              <Wifi className="h-4 w-4 text-success" />
            ) : (
              <WifiOff className="h-4 w-4 text-destructive" />
            )}
            <span className="text-sm text-muted-foreground">
              {isOnline ? 'Online' : 'Offline'}
            </span>
          </div>
          <Button onClick={handleRefresh} variant="outline" size="sm" disabled={loading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value={loading ? "..." : stats.totalUsers.toLocaleString()}
          description={loading ? "Loading..." : `${stats.onlineUsers} online now`}
          icon={Users}
          trend="up"
        />
        <StatCard
          title="Active Alerts"
          value={loading ? "..." : stats.activeAlerts.toString()}
          description={loading ? "Loading..." : "Climate warnings"}
          icon={AlertTriangle}
          trend={stats.activeAlerts > 0 ? "up" : "down"}
        />
        <StatCard
          title="Pending Reports"
          value={loading ? "..." : stats.pendingReports.toString()}
          description={loading ? "Loading..." : "Awaiting review"}
          icon={MapPin}
          trend="up"
        />
        <StatCard
          title="Green Credits"
          value={loading ? "..." : stats.totalCredits.toLocaleString()}
          description={loading ? "Loading..." : "Total verified credits"}
          icon={TreePine}
          trend="up"
        />
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MetricsChart
          type="area"
          title="Alert Trends"
          description="Climate alerts over time"
          dataKey="alerts"
          color="hsl(var(--destructive))"
        />
        <MetricsChart
          type="line"
          title="User Growth"
          description="Community member registration"
          dataKey="users"
          color="hsl(var(--primary))"
        />
      </div>

      {/* Real-time Monitoring */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Active Climate Alerts */}
        <Card className="shadow-warm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Active Climate Alerts
            </CardTitle>
            <CardDescription>Current warnings and advisories</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-16 bg-muted animate-pulse rounded-lg"></div>
                ))}
              </div>
            ) : alerts.length > 0 ? (
              alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-center justify-between p-3 rounded-lg border"
                  style={{
                    backgroundColor: `${getSeverityColor(alert.severity)}10`,
                    borderColor: `${getSeverityColor(alert.severity)}20`,
                  }}
                >
                  <div className="space-y-1">
                    <p className="font-medium" style={{ color: getSeverityColor(alert.severity) }}>
                      {alert.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {alert.alert_type.charAt(0).toUpperCase() + alert.alert_type.slice(1)} Alert
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{new Date(alert.created_at).toRelativeString()}</span>
                      <MapPin className="h-3 w-3 ml-2" />
                      <span>{alert.affected_regions?.length || 0} regions affected</span>
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    style={{
                      backgroundColor: `${getSeverityColor(alert.severity)}20`,
                      color: getSeverityColor(alert.severity),
                    }}
                  >
                    {alert.severity}
                  </Badge>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                <AlertTriangle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No active alerts</p>
              </div>
            )}

            <Button variant="outline" className="w-full">
              View All Alerts
            </Button>
          </CardContent>
        </Card>

        {/* Recent Community Reports */}
        <Card className="shadow-warm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Recent Community Reports
            </CardTitle>
            <CardDescription>Latest submissions from the field</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-12 bg-muted animate-pulse rounded-lg"></div>
                ))}
              </div>
            ) : reports.length > 0 ? (
              reports.slice(0, 6).map((report) => (
                <div key={report.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{report.title}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{report.location}</span>
                      <Clock className="h-3 w-3 ml-2" />
                      <span>{new Date(report.created_at).toRelativeString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="secondary"
                      style={{
                        backgroundColor: `${getStatusColor(report.status)}20`,
                        color: getStatusColor(report.status),
                      }}
                    >
                      {report.status}
                    </Badge>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No recent reports</p>
              </div>
            )}
            
            <Button variant="outline" className="w-full">
              View All Reports
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Flood Alert Map */}
      <Card className="shadow-warm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Real-time Climate Risk Map
          </CardTitle>
          <CardDescription>
            Live monitoring of climate risks across Kenya
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gradient-water rounded-lg flex items-center justify-center border-2 border-dashed border-accent">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-accent-foreground mx-auto mb-2" />
              <p className="text-accent-foreground font-medium">Interactive Map</p>
              <p className="text-sm text-accent-foreground/70">Real-time climate monitoring visualization</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="destructive">Critical: {stats.activeAlerts} areas</Badge>
            <Badge className="bg-warning text-warning-foreground">High Risk: 8 areas</Badge>
            <Badge className="bg-success text-success-foreground">Normal: 15 areas</Badge>
          </div>
        </CardContent>
      </Card>

      {/* System Health */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-warm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Activity className="h-4 w-4 text-success" />
              Cloud Sync
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-success">
                {isOnline ? "98.5%" : "Offline"}
              </span>
              <Badge className={isOnline ? "bg-success text-success-foreground" : "bg-destructive text-destructive-foreground"}>
                {isOnline ? "Healthy" : "Offline"}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {isOnline ? "Last sync: 2 min ago" : "Connection lost"}
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-warm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Wifi className="h-4 w-4 text-info" />
              Active Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-info">
                {loading ? "..." : stats.activeProjects}
              </span>
              <Badge className="bg-info text-info-foreground">Running</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Eco-restoration projects</p>
          </CardContent>
        </Card>

        <Card className="shadow-warm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Droplets className="h-4 w-4 text-primary" />
              Weather Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-primary">
                {isOnline ? "Live" : "Cached"}
              </span>
              <Badge className={isOnline ? "bg-primary text-primary-foreground" : "bg-warning text-warning-foreground"}>
                {isOnline ? "Connected" : "Offline"}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {isOnline ? "Real-time updates" : "Using cached data"}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}