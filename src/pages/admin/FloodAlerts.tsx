import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  AlertTriangle, 
  Plus, 
  Activity, 
  CheckCircle, 
  XCircle,
  Clock,
  MapPin,
  Wifi,
  WifiOff,
  Target,
  Send
} from "lucide-react";
import { supabase } from '@/integrations/supabase/client';

export default function FloodAlertsPage() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const { data, error } = await supabase
        .from('climate_alerts')
        .select('*')
        .eq('alert_type', 'flood')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAlerts(data || []);
    } catch (error) {
      console.error('Error fetching flood alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  const mockAlerts = [
    {
      id: 1,
      title: "Severe Flood Warning - Kisumu",
      severity: "High",
      region: "Kisumu County",
      status: "Active",
      triggerSource: "Weather API",
      created: "2 hours ago",
      duration: "Next 12 hours",
      deliverySuccess: 94,
      p2pConfirmation: 87
    },
    {
      id: 2,
      title: "Heavy Rainfall Alert - Nyanza",
      severity: "Medium",
      region: "Nyanza Region",
      status: "Active",
      triggerSource: "Sensor Network",
      created: "4 hours ago",
      duration: "Next 6 hours",
      deliverySuccess: 98,
      p2pConfirmation: 92
    },
    {
      id: 3,
      title: "Water Level Rising - Lake Victoria",
      severity: "Low",
      region: "Lake Victoria Basin",
      status: "Monitoring",
      triggerSource: "Manual Report",
      created: "6 hours ago",
      duration: "Next 24 hours",
      deliverySuccess: 89,
      p2pConfirmation: 78
    }
  ];

  const displayAlerts = alerts.length > 0 ? alerts : mockAlerts;

  const getSeverityBadge = (severity: string) => {
    const colors = {
      'High': 'bg-destructive text-destructive-foreground',
      'Medium': 'bg-warning text-warning-foreground',
      'Low': 'bg-info text-info-foreground'
    };
    return <Badge className={colors[severity as keyof typeof colors]}>{severity}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      'Active': 'bg-destructive text-destructive-foreground',
      'Monitoring': 'bg-warning text-warning-foreground',
      'Resolved': 'bg-success text-success-foreground'
    };
    return <Badge className={colors[status as keyof typeof colors]}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <AlertTriangle className="h-8 w-8 text-destructive" />
            Flood Alerts Management
          </h1>
          <p className="text-muted-foreground mt-2">
            Create, monitor, and manage flood early warning systems
          </p>
        </div>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button className="bg-destructive text-destructive-foreground shadow-alert">
              <Plus className="h-4 w-4 mr-2" />
              Create Alert
            </Button>
          </SheetTrigger>
          <SheetContent className="sm:max-w-md">
            <SheetHeader>
              <SheetTitle>Create Flood Alert</SheetTitle>
              <SheetDescription>
                Issue a new flood warning to affected communities
              </SheetDescription>
            </SheetHeader>
            <div className="space-y-4 mt-6">
              <div>
                <label className="text-sm font-medium">Alert Title</label>
                <Input placeholder="e.g. Severe Flood Warning - Kisumu" />
              </div>
              <div>
                <label className="text-sm font-medium">Severity Level</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - Monitor Situation</SelectItem>
                    <SelectItem value="medium">Medium - Prepare for Action</SelectItem>
                    <SelectItem value="high">High - Immediate Action Required</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Affected Region</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kisumu">Kisumu County</SelectItem>
                    <SelectItem value="nyanza">Nyanza Region</SelectItem>
                    <SelectItem value="migori">Migori County</SelectItem>
                    <SelectItem value="siaya">Siaya County</SelectItem>
                    <SelectItem value="lake-victoria">Lake Victoria Basin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Duration</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Alert duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3h">Next 3 hours</SelectItem>
                    <SelectItem value="6h">Next 6 hours</SelectItem>
                    <SelectItem value="12h">Next 12 hours</SelectItem>
                    <SelectItem value="24h">Next 24 hours</SelectItem>
                    <SelectItem value="48h">Next 48 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Alert Message</label>
                <Textarea 
                  placeholder="Detailed message for community members..."
                  rows={4}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Trigger Source</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select trigger source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weather-api">Weather API</SelectItem>
                    <SelectItem value="sensor-network">Sensor Network</SelectItem>
                    <SelectItem value="manual-report">Manual Report</SelectItem>
                    <SelectItem value="community-input">Community Input</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full bg-destructive text-destructive-foreground">
                <Send className="h-4 w-4 mr-2" />
                Send Alert
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Alert Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-warm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Alerts</p>
                <p className="text-2xl font-bold text-destructive">3</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-warm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Cloud Delivery</p>
                <p className="text-2xl font-bold text-success">96.2%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-warm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">P2P Sync</p>
                <p className="text-2xl font-bold text-info">89.1%</p>
              </div>
              <Wifi className="h-8 w-8 text-info" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-warm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Alerts Today</p>
                <p className="text-2xl font-bold">7</p>
              </div>
              <Activity className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Alerts Table */}
      <Card className="shadow-warm">
        <CardHeader>
          <CardTitle>Active Flood Alerts</CardTitle>
          <CardDescription>Monitor and manage current flood warnings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Alert Details</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Delivery Success</TableHead>
                  <TableHead>P2P Sync</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead className="w-20">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayAlerts.map((alert) => (
                  <TableRow key={alert.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{alert.title}</p>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                          <Target className="h-3 w-3" />
                          {alert.triggerSource}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getSeverityBadge(alert.severity)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        {alert.region}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(alert.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-12 bg-muted rounded-full h-2">
                          <div 
                            className="bg-success h-2 rounded-full" 
                            style={{width: `${alert.deliverySuccess}%`}}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{alert.deliverySuccess}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-12 bg-muted rounded-full h-2">
                          <div 
                            className="bg-info h-2 rounded-full" 
                            style={{width: `${alert.p2pConfirmation}%`}}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{alert.p2pConfirmation}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        {alert.duration}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm" className="text-destructive">
                          Cancel
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Sync Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-warm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wifi className="h-5 w-5 text-success" />
              Delivery Status Overview
            </CardTitle>
            <CardDescription>Real-time alert distribution monitoring</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Cloud Distribution</span>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="font-medium">96.2%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">SMS Gateway</span>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="font-medium">94.8%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Push Notifications</span>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="font-medium">98.1%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">P2P Mesh Network</span>
                <div className="flex items-center gap-2">
                  <WifiOff className="h-4 w-4 text-warning" />
                  <span className="font-medium">89.1%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-warm">
          <CardHeader>
            <CardTitle>Recent Sync Logs</CardTitle>
            <CardDescription>Device and community synchronization history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 rounded bg-muted/50">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="text-sm">Kisumu Hub - Sync Complete</span>
                </div>
                <span className="text-xs text-muted-foreground">2 min ago</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-muted/50">
                <div className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-destructive" />
                  <span className="text-sm">Migori Node - Sync Failed</span>
                </div>
                <span className="text-xs text-muted-foreground">5 min ago</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-muted/50">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="text-sm">Siaya Community - Alert Delivered</span>
                </div>
                <span className="text-xs text-muted-foreground">8 min ago</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-muted/50">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-info" />
                  <span className="text-sm">Nyanza Region - Propagating</span>
                </div>
                <span className="text-xs text-muted-foreground">12 min ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}