import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Wifi, 
  WifiOff, 
  Activity, 
  Server,
  MapPin,
  Clock,
  TrendingUp,
  TrendingDown,
  Globe,
  Smartphone
} from "lucide-react";

export default function ConnectivityPage() {
  const meshNodes = [
    {
      id: 1,
      name: "Kisumu Central Hub",
      type: "Primary",
      status: "Online",
      location: "Kisumu County",
      connections: 15,
      uptime: 99.2,
      lastSeen: "2 minutes ago",
      dataTransferred: "2.4 GB",
      signal: 92
    },
    {
      id: 2,
      name: "Nyanza Bridge Node",
      type: "Secondary",
      status: "Online",
      location: "Nyanza Region",
      connections: 8,
      uptime: 97.8,
      lastSeen: "5 minutes ago",
      dataTransferred: "1.8 GB",
      signal: 87
    },
    {
      id: 3,
      name: "Migori Community Node",
      type: "Community",
      status: "Offline",
      location: "Migori County",
      connections: 0,
      uptime: 94.1,
      lastSeen: "2 hours ago",
      dataTransferred: "1.2 GB",
      signal: 0
    },
    {
      id: 4,
      name: "Siaya Village Node",
      type: "Community",
      status: "Online",
      location: "Siaya County",
      connections: 12,
      uptime: 98.5,
      lastSeen: "1 minute ago",
      dataTransferred: "3.1 GB",
      signal: 89
    },
    {
      id: 5,
      name: "Lake Victoria Station",
      type: "Primary",
      status: "Degraded",
      location: "Lake Victoria",
      connections: 6,
      uptime: 85.3,
      lastSeen: "15 minutes ago",
      dataTransferred: "890 MB",
      signal: 45
    }
  ];

  const offlineCommunities = [
    {
      name: "Rural Migori",
      lastOnline: "2 hours ago",
      estimatedUsers: 45,
      priority: "High",
      reason: "Hardware Failure"
    },
    {
      name: "Remote Siaya",
      lastOnline: "6 hours ago",
      estimatedUsers: 23,
      priority: "Medium",
      reason: "Power Outage"
    },
    {
      name: "Fishing Village",
      lastOnline: "1 day ago",
      estimatedUsers: 12,
      priority: "Low",
      reason: "Network Congestion"
    }
  ];

  const getStatusBadge = (status: string) => {
    const colors = {
      'Online': 'bg-success text-success-foreground',
      'Offline': 'bg-destructive text-destructive-foreground',
      'Degraded': 'bg-warning text-warning-foreground'
    };
    return <Badge className={colors[status as keyof typeof colors]}>{status}</Badge>;
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      'Primary': 'bg-primary text-primary-foreground',
      'Secondary': 'bg-info text-info-foreground',
      'Community': 'bg-secondary text-secondary-foreground'
    };
    return <Badge className={colors[type as keyof typeof colors]}>{type}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      'High': 'bg-destructive text-destructive-foreground',
      'Medium': 'bg-warning text-warning-foreground',
      'Low': 'bg-info text-info-foreground'
    };
    return <Badge className={colors[priority as keyof typeof colors]}>{priority}</Badge>;
  };

  const getSignalIcon = (signal: number) => {
    if (signal === 0) return <WifiOff className="h-4 w-4 text-destructive" />;
    if (signal < 50) return <Wifi className="h-4 w-4 text-warning" />;
    return <Wifi className="h-4 w-4 text-success" />;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <Wifi className="h-8 w-8 text-info" />
          Data Sync & Connectivity Health
        </h1>
        <p className="text-muted-foreground mt-2">
          Monitor peer-to-peer mesh network and community connectivity status
        </p>
      </div>

      {/* Network Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-warm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Nodes</p>
                <p className="text-2xl font-bold">247</p>
                <div className="flex items-center gap-1 text-xs mt-1">
                  <TrendingUp className="h-3 w-3 text-success" />
                  <span className="text-success">+12</span>
                  <span className="text-muted-foreground">this week</span>
                </div>
              </div>
              <Server className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-warm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Online Nodes</p>
                <p className="text-2xl font-bold text-success">231</p>
                <p className="text-xs text-muted-foreground mt-1">93.5% uptime</p>
              </div>
              <Wifi className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-warm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Offline Communities</p>
                <p className="text-2xl font-bold text-destructive">16</p>
                <div className="flex items-center gap-1 text-xs mt-1">
                  <TrendingDown className="h-3 w-3 text-destructive" />
                  <span className="text-destructive">-3</span>
                  <span className="text-muted-foreground">from yesterday</span>
                </div>
              </div>
              <WifiOff className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-warm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Sync Rate</p>
                <p className="text-2xl font-bold text-info">89.2%</p>
                <p className="text-xs text-muted-foreground mt-1">Average today</p>
              </div>
              <Activity className="h-8 w-8 text-info" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mesh Network Nodes */}
        <Card className="shadow-warm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5 text-primary" />
              Peer-to-Peer Mesh Network
            </CardTitle>
            <CardDescription>Monitor individual mesh network nodes and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {meshNodes.map((node) => (
                <div key={node.id} className="p-4 rounded-lg border bg-muted/20">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium">{node.name}</h4>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3" />
                        {node.location}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {getTypeBadge(node.type)}
                      {getStatusBadge(node.status)}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Connections</p>
                      <p className="font-medium flex items-center gap-1">
                        <Globe className="h-3 w-3" />
                        {node.connections}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Signal Strength</p>
                      <p className="font-medium flex items-center gap-1">
                        {getSignalIcon(node.signal)}
                        {node.signal}%
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Uptime</p>
                      <p className="font-medium">{node.uptime}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Data Transferred</p>
                      <p className="font-medium">{node.dataTransferred}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Last seen: {node.lastSeen}
                    </div>
                    <div className="w-16">
                      <Progress value={node.uptime} className="h-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Connectivity Analytics */}
        <div className="space-y-6">
          {/* Device Sync Rate Graph */}
          <Card className="shadow-warm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-info" />
                Device Sync Rate Over Time
              </CardTitle>
              <CardDescription>24-hour synchronization performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-48 bg-gradient-water rounded-lg flex items-center justify-center border-2 border-dashed border-accent">
                <div className="text-center">
                  <Activity className="h-12 w-12 text-accent-foreground mx-auto mb-2" />
                  <p className="text-accent-foreground font-medium">Sync Rate Chart</p>
                  <p className="text-sm text-accent-foreground/70">Real-time synchronization metrics</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-success">94.2%</p>
                  <p className="text-xs text-muted-foreground">Average Sync</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-info">2.3s</p>
                  <p className="text-xs text-muted-foreground">Avg Response</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-warning">12</p>
                  <p className="text-xs text-muted-foreground">Failed Syncs</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Offline Communities */}
          <Card className="shadow-warm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <WifiOff className="h-5 w-5 text-destructive" />
                Offline Communities Report
              </CardTitle>
              <CardDescription>Communities currently without connectivity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {offlineCommunities.map((community, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                    <div>
                      <p className="font-medium">{community.name}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <Smartphone className="h-3 w-3" />
                        <span>{community.estimatedUsers} users</span>
                        <span>•</span>
                        <Clock className="h-3 w-3" />
                        <span>{community.lastOnline}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Reason: {community.reason}
                      </p>
                    </div>
                    <div className="text-right">
                      {getPriorityBadge(community.priority)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-3 rounded-lg bg-muted/50">
                <div className="flex items-center justify-between text-sm">
                  <span>Total Affected Users</span>
                  <span className="font-medium">80 users offline</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-1">
                  <span>Estimated Recovery Time</span>
                  <span className="font-medium text-warning">2-4 hours</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Network Health Summary */}
      <Card className="shadow-warm">
        <CardHeader>
          <CardTitle>Network Health Summary</CardTitle>
          <CardDescription>Overall mesh network performance and recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <span className="font-medium">Excellent Health</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Network operating at optimal capacity with minimal issues
              </p>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span>Primary Nodes</span>
                  <span className="font-medium">100% Online</span>
                </div>
                <div className="flex justify-between">
                  <span>Secondary Nodes</span>
                  <span className="font-medium">98% Online</span>
                </div>
                <div className="flex justify-between">
                  <span>Community Nodes</span>
                  <span className="font-medium">91% Online</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-warning rounded-full"></div>
                <span className="font-medium">Minor Issues</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Some degraded connections affecting remote areas
              </p>
              <ul className="text-xs space-y-1 text-muted-foreground">
                <li>• Lake Victoria Station needs maintenance</li>
                <li>• 3 communities experiencing intermittent connectivity</li>
                <li>• Weather affecting signal quality</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-info rounded-full"></div>
                <span className="font-medium">Recommendations</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Suggested actions to improve network performance
              </p>
              <ul className="text-xs space-y-1 text-muted-foreground">
                <li>• Deploy backup power systems for rural nodes</li>
                <li>• Schedule maintenance for degraded stations</li>
                <li>• Increase mesh density in problem areas</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}