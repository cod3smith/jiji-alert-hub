import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { DataTable } from "@/components/ui/data-table";
import { StatCard } from "@/components/ui/stat-card";
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
        <StatCard
          title="Total Users"
          value="2,847"
          change={{ value: "+127", type: "positive" }}
          icon={Users}
          description="All registered users"
          trend="up"
        />
        <StatCard
          title="Community Leaders"
          value="142"
          change={{ value: "+8", type: "positive" }}
          icon={Star}
          description="Verified leaders"
          trend="up"
        />
        <StatCard
          title="Online Now"
          value="1,234"
          change={{ value: "43%", type: "positive" }}
          icon={UserCheck}
          description="Currently active"
          trend="up"
        />
        <StatCard
          title="New This Week"
          value="47"
          change={{ value: "+12", type: "positive" }}
          icon={UserPlus}
          description="Recent signups"
          trend="up"
        />
      </div>

      {/* Enhanced User Management */}
      <Card className="shadow-warm">
        <CardHeader>
          <CardTitle>User Directory</CardTitle>
          <CardDescription>Advanced user management with filtering and search</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={users}
            columns={[
              {
                key: "name",
                label: "User",
                sortable: true,
                render: (_, user) => (
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                )
              },
              {
                key: "region",
                label: "Region",
                sortable: true,
                render: (region) => (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    {region}
                  </div>
                )
              },
              {
                key: "role",
                label: "Role",
                sortable: true,
                render: (role) => getRoleBadge(role)
              },
              {
                key: "trustScore",
                label: "Trust Score",
                sortable: true,
                render: (score) => (
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-warning fill-current" />
                    {score}
                  </div>
                )
              },
              {
                key: "status",
                label: "Status",
                sortable: true,
                render: (status) => getStatusBadge(status)
              },
              {
                key: "lastOnline",
                label: "Last Online",
                sortable: true,
                render: (time) => (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {time}
                  </div>
                )
              },
              {
                key: "id",
                label: "Actions",
                render: () => (
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                )
              }
            ]}
            searchPlaceholder="Search users by name or email..."
            filterable={true}
            filterKey="role"
            filterOptions={[
              { label: "Admin", value: "Admin" },
              { label: "Community Leader", value: "Community Leader" },
              { label: "Environmental Officer", value: "Environmental Officer" },
              { label: "Volunteer", value: "Volunteer" },
              { label: "Resident", value: "Resident" }
            ]}
            pageSize={10}
          />
        </CardContent>
      </Card>
    </div>
  );
}