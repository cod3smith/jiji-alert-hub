import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  MoreVertical,
  Star,
  MapPin,
  Clock,
  Shield,
  UserCheck
} from "lucide-react";
import { useState } from "react";

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [regionFilter, setRegionFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");

  const users = [
    {
      id: 1,
      name: "Sarah Otieno",
      email: "sarah.otieno@example.com",
      region: "Kisumu",
      role: "Community Leader",
      lastOnline: "2 hours ago",
      trustScore: 4.8,
      status: "online",
      joinDate: "Jan 2024"
    },
    {
      id: 2,
      name: "James Wanjiku",
      email: "james.w@example.com",
      region: "Nyanza",
      role: "Environmental Officer",
      lastOnline: "5 minutes ago",
      trustScore: 4.9,
      status: "online",
      joinDate: "Feb 2024"
    },
    {
      id: 3,
      name: "Mary Akinyi",
      email: "mary.akinyi@example.com",
      region: "Migori",
      role: "Resident",
      lastOnline: "2 days ago",
      trustScore: 4.2,
      status: "offline",
      joinDate: "Mar 2024"
    },
    {
      id: 4,
      name: "Peter Ochieng",
      email: "peter.o@example.com",
      region: "Siaya",
      role: "Volunteer",
      lastOnline: "1 hour ago",
      trustScore: 4.6,
      status: "online",
      joinDate: "Jan 2024"
    },
    {
      id: 5,
      name: "Grace Mwangi",
      email: "grace.m@example.com",
      region: "Kisumu",
      role: "Admin",
      lastOnline: "Online now",
      trustScore: 5.0,
      status: "online",
      joinDate: "Dec 2023"
    }
  ];

  const getStatusBadge = (status: string) => {
    return status === 'online' 
      ? <Badge className="bg-success text-success-foreground">Online</Badge>
      : <Badge variant="secondary">Offline</Badge>;
  };

  const getRoleBadge = (role: string) => {
    const roleColors = {
      'Admin': 'bg-destructive text-destructive-foreground',
      'Community Leader': 'bg-primary text-primary-foreground',
      'Environmental Officer': 'bg-info text-info-foreground',
      'Volunteer': 'bg-warning text-warning-foreground',
      'Resident': 'bg-secondary text-secondary-foreground'
    };
    return <Badge className={roleColors[role as keyof typeof roleColors] || 'bg-secondary'}>{role}</Badge>;
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = regionFilter === 'all' || user.region === regionFilter;
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRegion && matchesRole;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <Users className="h-8 w-8 text-primary" />
            User Management
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage community members, leaders, and system access
          </p>
        </div>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button className="bg-primary text-primary-foreground">
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Add New User</SheetTitle>
              <SheetDescription>
                Create a new user account for the Jihadharini platform
              </SheetDescription>
            </SheetHeader>
            <div className="space-y-4 mt-6">
              <div>
                <label className="text-sm font-medium">Full Name</label>
                <Input placeholder="Enter full name" />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input type="email" placeholder="Enter email address" />
              </div>
              <div>
                <label className="text-sm font-medium">Region</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kisumu">Kisumu</SelectItem>
                    <SelectItem value="nyanza">Nyanza</SelectItem>
                    <SelectItem value="migori">Migori</SelectItem>
                    <SelectItem value="siaya">Siaya</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Role</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="resident">Resident</SelectItem>
                    <SelectItem value="volunteer">Volunteer</SelectItem>
                    <SelectItem value="community-leader">Community Leader</SelectItem>
                    <SelectItem value="environmental-officer">Environmental Officer</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full">Create User</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-warm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">2,847</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-warm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Community Leaders</p>
                <p className="text-2xl font-bold">142</p>
              </div>
              <Star className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-warm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Online Now</p>
                <p className="text-2xl font-bold">1,234</p>
              </div>
              <UserCheck className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-warm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">New This Week</p>
                <p className="text-2xl font-bold">47</p>
              </div>
              <UserPlus className="h-8 w-8 text-info" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="shadow-warm">
        <CardHeader>
          <CardTitle>User Directory</CardTitle>
          <CardDescription>Search and filter community members</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <Select value={regionFilter} onValueChange={setRegionFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="Kisumu">Kisumu</SelectItem>
                <SelectItem value="Nyanza">Nyanza</SelectItem>
                <SelectItem value="Migori">Migori</SelectItem>
                <SelectItem value="Siaya">Siaya</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Community Leader">Community Leader</SelectItem>
                <SelectItem value="Environmental Officer">Environmental Officer</SelectItem>
                <SelectItem value="Volunteer">Volunteer</SelectItem>
                <SelectItem value="Resident">Resident</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Users Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Trust Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Online</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        {user.region}
                      </div>
                    </TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-warning fill-current" />
                        {user.trustScore}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {user.lastOnline}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredUsers.length} of {users.length} users
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}