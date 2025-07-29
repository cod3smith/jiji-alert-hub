import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Settings as SettingsIcon, 
  Globe, 
  Shield, 
  Key,
  Save,
  Users,
  Bell,
  Database,
  Smartphone,
  Languages,
  UserCheck,
  AlertTriangle
} from "lucide-react";

export default function SettingsPage() {
  const languages = [
    { code: 'en', name: 'English', status: 'Complete', progress: 100 },
    { code: 'sw', name: 'Kiswahili', status: 'Complete', progress: 100 },
    { code: 'luo', name: 'Luo (Dholuo)', status: 'In Progress', progress: 85 },
    { code: 'ki', name: 'Kikuyu (Gikuyu)', status: 'In Progress', progress: 72 },
    { code: 'so', name: 'Somali', status: 'Planned', progress: 35 },
    { code: 'kam', name: 'Kamba', status: 'Planned', progress: 28 }
  ];

  const adminRoles = [
    {
      role: 'Super Admin',
      users: 2,
      permissions: ['All System Access', 'User Management', 'System Configuration'],
      description: 'Full system access and administrative privileges'
    },
    {
      role: 'Environmental Officer',
      users: 8,
      permissions: ['Flood Alerts', 'Eco-Restoration', 'Community Reports'],
      description: 'Manage environmental monitoring and restoration projects'
    },
    {
      role: 'Community Coordinator',
      users: 15,
      permissions: ['User Management', 'Community Reports', 'Basic Analytics'],
      description: 'Coordinate with local communities and manage user accounts'
    },
    {
      role: 'Data Analyst',
      users: 5,
      permissions: ['Analytics Access', 'Report Generation', 'Data Export'],
      description: 'Access to analytics and reporting features only'
    }
  ];

  const getLanguageStatusBadge = (status: string) => {
    const colors = {
      'Complete': 'bg-success text-success-foreground',
      'In Progress': 'bg-warning text-warning-foreground',
      'Planned': 'bg-info text-info-foreground'
    };
    return <Badge className={colors[status as keyof typeof colors]}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <SettingsIcon className="h-8 w-8 text-primary" />
          Settings & Configuration
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage system settings, localization, and administrative access
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="localization">Localization</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          {/* System Configuration */}
          <Card className="shadow-warm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                System Configuration
              </CardTitle>
              <CardDescription>Core system settings and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="system-name">System Name</Label>
                  <Input id="system-name" value="Jihadharini Platform" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Default Timezone</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="eat">East Africa Time (EAT)</SelectItem>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="cat">Central Africa Time (CAT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="default-language">Default Language</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="sw">Kiswahili</SelectItem>
                      <SelectItem value="luo">Luo (Dholuo)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-users">Max Concurrent Users</Label>
                  <Input id="max-users" type="number" value="10000" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="system-description">System Description</Label>
                <Textarea 
                  id="system-description" 
                  value="Flood early warning and eco-restoration platform for rural Kenyan communities"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="shadow-warm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-warning" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Configure system-wide notification settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Send email alerts for critical events</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">SMS Alerts</p>
                    <p className="text-sm text-muted-foreground">Send SMS for flood warnings</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-muted-foreground">Mobile app push notifications</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Admin Digest</p>
                    <p className="text-sm text-muted-foreground">Daily summary emails for administrators</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button className="bg-primary text-primary-foreground">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="localization" className="space-y-6">
          {/* Language Management */}
          <Card className="shadow-warm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Languages className="h-5 w-5 text-info" />
                Language Translation Management
              </CardTitle>
              <CardDescription>
                Manage translations for local Kenyan languages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {languages.map((language, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border bg-muted/20">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="font-medium">{language.name}</p>
                        <p className="text-sm text-muted-foreground">Code: {language.code}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">{language.progress}% Complete</p>
                        <div className="w-20 bg-muted rounded-full h-2 mt-1">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{width: `${language.progress}%`}}
                          ></div>
                        </div>
                      </div>
                      
                      {getLanguageStatusBadge(language.status)}
                      
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 rounded-lg bg-info/10 border border-info/20">
                <div className="flex items-start gap-2">
                  <Globe className="h-5 w-5 text-info mt-0.5" />
                  <div>
                    <p className="font-medium text-info">Translation Priority</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Focus on completing Luo and Kikuyu translations as these are widely spoken in the target regions.
                      Consider involving local community leaders for cultural accuracy.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Regional Settings */}
          <Card className="shadow-warm">
            <CardHeader>
              <CardTitle>Regional Preferences</CardTitle>
              <CardDescription>Configure region-specific settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date-format">Date Format</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dd/mm/yyyy">DD/MM/YYYY (Kenya Standard)</SelectItem>
                      <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="yyyy-mm-dd">YYYY-MM-DD (ISO)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="number-format">Number Format</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1,234.56">1,234.56 (Western)</SelectItem>
                      <SelectItem value="1 234,56">1 234,56 (European)</SelectItem>
                      <SelectItem value="1.234,56">1.234,56 (German)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="currency">Default Currency</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kes">Kenyan Shilling (KES)</SelectItem>
                      <SelectItem value="usd">US Dollar (USD)</SelectItem>
                      <SelectItem value="eur">Euro (EUR)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="measurement">Measurement System</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select system" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="metric">Metric (km, kg, °C)</SelectItem>
                      <SelectItem value="imperial">Imperial (miles, lbs, °F)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-6">
          {/* Admin Roles */}
          <Card className="shadow-warm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Admin Roles & Permissions
              </CardTitle>
              <CardDescription>Manage user roles and access levels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {adminRoles.map((role, index) => (
                  <div key={index} className="p-4 rounded-lg border bg-muted/20">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{role.role}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{role.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">
                          <Users className="h-3 w-3 mr-1" />
                          {role.users} users
                        </Badge>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-2">Permissions:</p>
                      <div className="flex flex-wrap gap-1">
                        {role.permissions.map((permission, permIndex) => (
                          <Badge key={permIndex} variant="secondary" className="text-xs">
                            {permission}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button className="w-full mt-4" variant="outline">
                <UserCheck className="h-4 w-4 mr-2" />
                Create New Role
              </Button>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="shadow-warm">
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure authentication and security policies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Session Timeout</p>
                    <p className="text-sm text-muted-foreground">Auto-logout after inactivity</p>
                  </div>
                  <Select>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                      <SelectItem value="480">8 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Password Complexity</p>
                    <p className="text-sm text-muted-foreground">Enforce strong password requirements</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Login Attempt Limit</p>
                    <p className="text-sm text-muted-foreground">Block accounts after failed attempts</p>
                  </div>
                  <Select>
                    <SelectTrigger className="w-20">
                      <SelectValue placeholder="5" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          {/* API Keys */}
          <Card className="shadow-warm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5 text-warning" />
                Integration Keys
              </CardTitle>
              <CardDescription>Manage external service API keys and configurations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="p-4 rounded-lg border bg-muted/20">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Weather API Service</h4>
                    <Badge className="bg-success text-success-foreground">Connected</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Real-time weather data for flood predictions
                  </p>
                  <div className="space-y-2">
                    <Label htmlFor="weather-api">API Key</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="weather-api" 
                        type="password" 
                        value="sk-••••••••••••••••••••••••••••••••" 
                        readOnly 
                      />
                      <Button variant="outline" size="sm">Update</Button>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 rounded-lg border bg-muted/20">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">SMS Gateway</h4>
                    <Badge className="bg-success text-success-foreground">Connected</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Send SMS alerts to community members
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="sms-api">API Key</Label>
                      <div className="flex gap-2">
                        <Input 
                          id="sms-api" 
                          type="password" 
                          value="••••••••••••••••••••••••••••••••" 
                          readOnly 
                        />
                        <Button variant="outline" size="sm">Update</Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sms-sender">Sender ID</Label>
                      <Input id="sms-sender" value="JIHADHARINI" />
                    </div>
                  </div>
                </div>
                
                <div className="p-4 rounded-lg border bg-muted/20">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Satellite Imagery API</h4>
                    <Badge variant="secondary">Not Connected</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Satellite data for environmental monitoring
                  </p>
                  <div className="space-y-2">
                    <Label htmlFor="satellite-api">API Key</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="satellite-api" 
                        placeholder="Enter your satellite imagery API key" 
                      />
                      <Button variant="outline" size="sm">Connect</Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                  <div>
                    <p className="font-medium text-warning">Security Notice</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      API keys are encrypted and stored securely. Never share these credentials or include them in client-side code.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Supabase Configuration */}
          <Card className="shadow-warm">
            <CardHeader>
              <CardTitle>Supabase Configuration</CardTitle>
              <CardDescription>Database and backend service settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="supabase-url">Project URL</Label>
                  <Input 
                    id="supabase-url" 
                    value="https://qqyortugaoboxdfrwdwa.supabase.co" 
                    readOnly 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supabase-key">Public Anon Key</Label>
                  <Input 
                    id="supabase-key" 
                    type="password" 
                    value="eyJhbGciOiJIUzI1NiIsInR5••••••••••••••••••••••••••••••••" 
                    readOnly 
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-success/10 border border-success/20">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="font-medium text-success">Database Connected</span>
                </div>
                <span className="text-sm text-muted-foreground">Last ping: 2 seconds ago</span>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button className="bg-primary text-primary-foreground">
              <Save className="h-4 w-4 mr-2" />
              Save Integration Settings
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}