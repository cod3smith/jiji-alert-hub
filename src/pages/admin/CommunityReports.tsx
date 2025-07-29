import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  Eye,
  Flag,
  MapPin,
  Clock,
  Camera,
  AlertCircle,
  CheckCircle,
  X,
  MoreHorizontal
} from "lucide-react";
import { useState } from "react";

export default function CommunityReportsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const reports = [
    {
      id: 1,
      title: "Blocked Drainage System",
      category: "Infrastructure",
      location: "Kisumu Central",
      coordinates: "-0.0917, 34.7680",
      reporter: "Sarah Otieno",
      status: "Under Review",
      priority: "High",
      submittedDate: "2024-01-15",
      description: "Multiple drainage channels blocked with debris causing water accumulation",
      hasPhotos: true,
      flagged: false
    },
    {
      id: 2,
      title: "Riverbank Erosion",
      category: "Environmental",
      location: "Migori County",
      coordinates: "-1.0634, 34.4736",
      reporter: "James Wanjiku",
      status: "Approved",
      priority: "Medium",
      submittedDate: "2024-01-14",
      description: "Severe erosion threatening nearby homesteads during rainy season",
      hasPhotos: true,
      flagged: false
    },
    {
      id: 3,
      title: "Waste Accumulation",
      category: "Sanitation",
      location: "Siaya Town",
      coordinates: "0.0607, 34.2888",
      reporter: "Mary Akinyi",
      status: "Flagged",
      priority: "High",
      submittedDate: "2024-01-13",
      description: "Large waste accumulation blocking water flow in residential area",
      hasPhotos: false,
      flagged: true
    },
    {
      id: 4,
      title: "Tree Planting Opportunity",
      category: "Conservation",
      location: "Nyanza Region",
      coordinates: "-0.4167, 34.5000",
      reporter: "Peter Ochieng",
      status: "Approved",
      priority: "Low",
      submittedDate: "2024-01-12",
      description: "Identified suitable area for community tree planting initiative",
      hasPhotos: true,
      flagged: false
    },
    {
      id: 5,
      title: "Flood Risk Assessment",
      category: "Safety",
      location: "Lake Victoria Shore",
      coordinates: "-0.3471, 34.5553",
      reporter: "Grace Mwangi",
      status: "Under Review",
      priority: "High",
      submittedDate: "2024-01-11",
      description: "Community request for flood risk assessment in vulnerable area",
      hasPhotos: true,
      flagged: false
    }
  ];

  const getStatusBadge = (status: string) => {
    const colors = {
      'Under Review': 'bg-warning text-warning-foreground',
      'Approved': 'bg-success text-success-foreground',
      'Rejected': 'bg-destructive text-destructive-foreground',
      'Flagged': 'bg-destructive text-destructive-foreground'
    };
    return <Badge className={colors[status as keyof typeof colors]}>{status}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      'High': 'bg-destructive text-destructive-foreground',
      'Medium': 'bg-warning text-warning-foreground',
      'Low': 'bg-info text-info-foreground'
    };
    return <Badge className={colors[priority as keyof typeof colors]}>{priority}</Badge>;
  };

  const getCategoryBadge = (category: string) => {
    const colors = {
      'Infrastructure': 'bg-primary text-primary-foreground',
      'Environmental': 'bg-success text-success-foreground',
      'Sanitation': 'bg-warning text-warning-foreground',
      'Conservation': 'bg-info text-info-foreground',
      'Safety': 'bg-destructive text-destructive-foreground'
    };
    return <Badge variant="outline" className={colors[category as keyof typeof colors]}>{category}</Badge>;
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.reporter.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || report.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const exportData = (format: 'csv' | 'json') => {
    // Implementation for data export
    console.log(`Exporting data as ${format}`);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <FileText className="h-8 w-8 text-primary" />
            Community Reports
          </h1>
          <p className="text-muted-foreground mt-2">
            Monitor and moderate environmental reports from community members
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => exportData('csv')}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
          <Button 
            variant="outline" 
            onClick={() => exportData('json')}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export JSON
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-warm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Reports</p>
                <p className="text-2xl font-bold">347</p>
              </div>
              <FileText className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-warm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Under Review</p>
                <p className="text-2xl font-bold">23</p>
              </div>
              <Clock className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-warm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Flagged</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <Flag className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-warm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Week</p>
                <p className="text-2xl font-bold">18</p>
              </div>
              <AlertCircle className="h-8 w-8 text-info" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reports Management */}
      <Card className="shadow-warm">
        <CardHeader>
          <CardTitle>Report Management</CardTitle>
          <CardDescription>View, moderate, and manage community environmental reports</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="table" className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <TabsList>
                <TabsTrigger value="table">Table View</TabsTrigger>
                <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
              </TabsList>
              
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search reports..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
                
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                    <SelectItem value="Environmental">Environmental</SelectItem>
                    <SelectItem value="Sanitation">Sanitation</SelectItem>
                    <SelectItem value="Conservation">Conservation</SelectItem>
                    <SelectItem value="Safety">Safety</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Under Review">Under Review</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                    <SelectItem value="Flagged">Flagged</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value="table">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Reporter</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="w-20">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell>
                          <div className="flex items-start gap-2">
                            <div className="flex-1">
                              <p className="font-medium">{report.title}</p>
                              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                                {report.description}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                {report.hasPhotos && (
                                  <Badge variant="outline" className="text-xs">
                                    <Camera className="h-3 w-3 mr-1" />
                                    Photos
                                  </Badge>
                                )}
                                {report.flagged && (
                                  <Badge variant="destructive" className="text-xs">
                                    <Flag className="h-3 w-3 mr-1" />
                                    Flagged
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getCategoryBadge(report.category)}</TableCell>
                        <TableCell>
                          <div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3 text-muted-foreground" />
                              {report.location}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {report.coordinates}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>{report.reporter}</TableCell>
                        <TableCell>{getPriorityBadge(report.priority)}</TableCell>
                        <TableCell>{getStatusBadge(report.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            {new Date(report.submittedDate).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <CheckCircle className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <X className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="kanban">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                {['Under Review', 'Approved', 'Flagged', 'Rejected'].map((status) => (
                  <Card key={status} className="min-h-96">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium">{status}</CardTitle>
                      <Badge variant="secondary" className="w-fit">
                        {filteredReports.filter(r => r.status === status).length}
                      </Badge>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {filteredReports
                        .filter(report => report.status === status)
                        .map((report) => (
                          <Card key={report.id} className="p-3 cursor-pointer hover:shadow-md transition-shadow">
                            <div className="space-y-2">
                              <p className="font-medium text-sm">{report.title}</p>
                              <div className="flex justify-between items-center">
                                {getCategoryBadge(report.category)}
                                {getPriorityBadge(report.priority)}
                              </div>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <MapPin className="h-3 w-3" />
                                {report.location}
                              </div>
                              <p className="text-xs text-muted-foreground">
                                By {report.reporter}
                              </p>
                              {report.hasPhotos && (
                                <Badge variant="outline" className="text-xs">
                                  <Camera className="h-3 w-3 mr-1" />
                                  Photos
                                </Badge>
                              )}
                            </div>
                          </Card>
                        ))}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredReports.length} of {reports.length} reports
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