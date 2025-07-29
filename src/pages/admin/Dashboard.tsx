import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  AlertTriangle, 
  TreePine, 
  Wifi, 
  MapPin, 
  Activity,
  TrendingUp,
  Clock,
  Shield,
  Droplets
} from "lucide-react";

export default function Dashboard() {
  const statsCards = [
    {
      title: "Registered Users",
      value: "2,847",
      change: "+12%",
      icon: Users,
      description: "Active community members",
      color: "text-primary"
    },
    {
      title: "Offline Users",
      value: "156",
      change: "-5%",
      icon: Wifi,
      description: "Users currently offline",
      color: "text-warning"
    },
    {
      title: "Alerts Sent (24h)",
      value: "43",
      change: "+23%",
      icon: AlertTriangle,
      description: "Flood warnings distributed",
      color: "text-destructive"
    },
    {
      title: "Tree Planting Actions",
      value: "38",
      change: "+8%",
      icon: TreePine,
      description: "This week's eco-actions",
      color: "text-success"
    }
  ];

  const recentAlerts = [
    { id: 1, location: "Kisumu County", type: "Flood Warning", severity: "High", time: "2 hours ago" },
    { id: 2, location: "Nyanza Region", type: "Heavy Rainfall", severity: "Medium", time: "4 hours ago" },
    { id: 3, location: "Lake Victoria Basin", type: "Water Level", severity: "Low", time: "6 hours ago" }
  ];

  const hazardReports = [
    { location: "Kisumu", issue: "4 blocked drains", priority: "High" },
    { location: "Migori", issue: "Riverbank erosion", priority: "Medium" },
    { location: "Siaya", issue: "Waste accumulation", priority: "High" }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-2">
          Real-time monitoring of flood warnings and eco-restoration activities
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat, index) => (
          <Card key={index} className="shadow-warm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-1 text-xs">
                <span className={stat.change.startsWith('+') ? 'text-success' : 'text-warning'}>
                  {stat.change}
                </span>
                <span className="text-muted-foreground">from last week</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Real-time Flood Alert Map */}
        <Card className="lg:col-span-2 shadow-warm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Real-time Flood Alert Map
            </CardTitle>
            <CardDescription>
              Live monitoring of flood-prone areas across Kenya
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-water rounded-lg flex items-center justify-center border-2 border-dashed border-accent">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-accent-foreground mx-auto mb-2" />
                <p className="text-accent-foreground font-medium">Interactive Map</p>
                <p className="text-sm text-accent-foreground/70">Real-time flood monitoring visualization</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="destructive">High Risk: 3 areas</Badge>
              <Badge className="bg-warning text-warning-foreground">Medium Risk: 8 areas</Badge>
              <Badge className="bg-success text-success-foreground">Low Risk: 15 areas</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card className="shadow-warm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Recent Alerts
            </CardTitle>
            <CardDescription>Latest flood warnings and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium text-sm">{alert.location}</p>
                    <p className="text-xs text-muted-foreground">{alert.type}</p>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant={alert.severity === 'High' ? 'destructive' : 
                              alert.severity === 'Medium' ? 'secondary' : 'outline'}
                      className="text-xs"
                    >
                      {alert.severity}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Alerts
            </Button>
          </CardContent>
        </Card>

        {/* Hazard Reports Summary */}
        <Card className="shadow-warm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-warning" />
              Hazard Reports
            </CardTitle>
            <CardDescription>Community-reported environmental issues</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {hazardReports.map((report, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium text-sm">{report.location}</p>
                    <p className="text-xs text-muted-foreground">{report.issue}</p>
                  </div>
                  <Badge 
                    variant={report.priority === 'High' ? 'destructive' : 'secondary'}
                    className="text-xs"
                  >
                    {report.priority}
                  </Badge>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Reports
            </Button>
          </CardContent>
        </Card>
      </div>

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
              <span className="text-2xl font-bold text-success">98.5%</span>
              <Badge className="bg-success text-success-foreground">Healthy</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Last sync: 2 min ago</p>
          </CardContent>
        </Card>

        <Card className="shadow-warm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Wifi className="h-4 w-4 text-info" />
              Peer Mesh Nodes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-info">247</span>
              <Badge className="bg-info text-info-foreground">Active</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">12 new connections</p>
          </CardContent>
        </Card>

        <Card className="shadow-warm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Droplets className="h-4 w-4 text-primary" />
              Weather API
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-primary">Online</span>
              <Badge className="bg-primary text-primary-foreground">Connected</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Updated 5 min ago</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}