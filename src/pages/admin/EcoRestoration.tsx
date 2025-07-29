import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TreePine, 
  Users, 
  Target, 
  TrendingUp,
  Calendar,
  MapPin,
  Star,
  Droplets,
  Recycle,
  Leaf,
  Plus,
  Eye
} from "lucide-react";

export default function EcoRestorationPage() {
  const initiatives = [
    {
      id: 1,
      title: "Mangrove Restoration - Lake Victoria",
      type: "Mangrove Planting",
      region: "Lake Victoria Basin",
      status: "Active",
      progress: 68,
      target: 1000,
      completed: 680,
      volunteers: 45,
      leader: "Sarah Otieno",
      startDate: "2024-01-01",
      endDate: "2024-06-30",
      priority: "High"
    },
    {
      id: 2,
      title: "Community Tree Planting",
      type: "Tree Planting",
      region: "Kisumu County",
      status: "Active", 
      progress: 82,
      target: 500,
      completed: 410,
      volunteers: 28,
      leader: "James Wanjiku",
      startDate: "2024-02-01",
      endDate: "2024-04-30",
      priority: "Medium"
    },
    {
      id: 3,
      title: "Riverbank Cleanup - Nyanza",
      type: "Cleanup",
      region: "Nyanza Region",
      status: "Completed",
      progress: 100,
      target: 5,
      completed: 5,
      volunteers: 67,
      leader: "Mary Akinyi",
      startDate: "2024-01-15",
      endDate: "2024-01-31",
      priority: "High"
    },
    {
      id: 4,
      title: "Wetland Conservation",
      type: "Conservation",
      region: "Migori County",
      status: "Planning",
      progress: 15,
      target: 200,
      completed: 30,
      volunteers: 12,
      leader: "Peter Ochieng",
      startDate: "2024-03-01",
      endDate: "2024-08-31",
      priority: "Medium"
    }
  ];

  const suggestions = [
    {
      id: 1,
      title: "Bamboo Cultivation Program",
      region: "Siaya County",
      impact: "High",
      description: "Fast-growing bamboo to prevent soil erosion and provide sustainable income",
      estimatedCost: "$2,500",
      duration: "6 months",
      benefits: ["Erosion Control", "Carbon Sequestration", "Income Generation"]
    },
    {
      id: 2,
      title: "Urban Green Corridors",
      region: "Kisumu Central",
      impact: "Medium",
      description: "Create green pathways connecting parks and reducing urban heat",
      estimatedCost: "$4,200",
      duration: "8 months",
      benefits: ["Air Quality", "Urban Cooling", "Biodiversity"]
    },
    {
      id: 3,
      title: "Drip Irrigation Demonstration",
      region: "Nyanza Region",
      impact: "High",
      description: "Water-efficient irrigation to support climate-resilient agriculture",
      estimatedCost: "$1,800",
      duration: "4 months",
      benefits: ["Water Conservation", "Crop Yield", "Drought Resilience"]
    }
  ];

  const getStatusBadge = (status: string) => {
    const colors = {
      'Active': 'bg-success text-success-foreground',
      'Completed': 'bg-primary text-primary-foreground',
      'Planning': 'bg-warning text-warning-foreground',
      'On Hold': 'bg-muted text-muted-foreground'
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

  const getImpactBadge = (impact: string) => {
    const colors = {
      'High': 'bg-success text-success-foreground',
      'Medium': 'bg-warning text-warning-foreground',
      'Low': 'bg-info text-info-foreground'
    };
    return <Badge className={colors[impact as keyof typeof colors]}>{impact}</Badge>;
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      'Tree Planting': TreePine,
      'Mangrove Planting': Leaf,
      'Cleanup': Recycle,
      'Conservation': Droplets
    };
    const Icon = icons[type as keyof typeof icons] || TreePine;
    return <Icon className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <TreePine className="h-8 w-8 text-success" />
            Eco-Restoration Panel
          </h1>
          <p className="text-muted-foreground mt-2">
            Track environmental projects and promote community conservation efforts
          </p>
        </div>
        
        <Button className="bg-success text-success-foreground">
          <Plus className="h-4 w-4 mr-2" />
          New Initiative
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-warm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Projects</p>
                <p className="text-2xl font-bold text-success">12</p>
              </div>
              <TreePine className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-warm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Trees Planted</p>
                <p className="text-2xl font-bold">3,847</p>
              </div>
              <Leaf className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-warm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Volunteers</p>
                <p className="text-2xl font-bold">187</p>
              </div>
              <Users className="h-8 w-8 text-info" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-warm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">CO2 Offset (tons)</p>
                <p className="text-2xl font-bold">145</p>
              </div>
              <TrendingUp className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="projects" className="space-y-4">
        <TabsList>
          <TabsTrigger value="projects">Active Projects</TabsTrigger>
          <TabsTrigger value="suggestions">AI Suggestions</TabsTrigger>
          <TabsTrigger value="volunteers">Volunteer Management</TabsTrigger>
        </TabsList>

        <TabsContent value="projects">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {initiatives.map((initiative) => (
              <Card key={initiative.id} className="shadow-warm">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(initiative.type)}
                      <div>
                        <CardTitle className="text-lg">{initiative.title}</CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3" />
                          {initiative.region}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {getStatusBadge(initiative.status)}
                      {getPriorityBadge(initiative.priority)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Progress */}
                  <div>
                    <div className="flex justify-between items-center text-sm mb-2">
                      <span>Progress</span>
                      <span className="font-medium">{initiative.completed}/{initiative.target}</span>
                    </div>
                    <Progress value={initiative.progress} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {initiative.progress}% complete
                    </p>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Project Leader</p>
                      <p className="font-medium flex items-center gap-1">
                        <Star className="h-3 w-3 text-warning" />
                        {initiative.leader}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Volunteers</p>
                      <p className="font-medium flex items-center gap-1">
                        <Users className="h-3 w-3 text-info" />
                        {initiative.volunteers}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Start Date</p>
                      <p className="font-medium flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        {new Date(initiative.startDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">End Date</p>
                      <p className="font-medium flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        {new Date(initiative.endDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-3 w-3 mr-1" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Edit Project
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="suggestions">
          <div className="space-y-4">
            <Card className="shadow-warm">
              <CardHeader>
                <CardTitle>AI-Powered Initiative Suggestions</CardTitle>
                <CardDescription>
                  Recommendations based on regional climate data and community needs
                </CardDescription>
              </CardHeader>
            </Card>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {suggestions.map((suggestion) => (
                <Card key={suggestion.id} className="shadow-warm">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{suggestion.title}</CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3" />
                          {suggestion.region}
                        </CardDescription>
                      </div>
                      {getImpactBadge(suggestion.impact)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Est. Cost</p>
                        <p className="font-medium">{suggestion.estimatedCost}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Duration</p>
                        <p className="font-medium">{suggestion.duration}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Key Benefits</p>
                      <div className="flex flex-wrap gap-1">
                        {suggestion.benefits.map((benefit, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        Start Project
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="volunteers">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-warm">
              <CardHeader>
                <CardTitle>Top Volunteer Leaders</CardTitle>
                <CardDescription>Community members leading eco-restoration efforts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Sarah Otieno", projects: 3, hours: 42, rating: 4.9 },
                    { name: "James Wanjiku", projects: 2, hours: 38, rating: 4.8 },
                    { name: "Mary Akinyi", projects: 4, hours: 55, rating: 4.7 },
                    { name: "Peter Ochieng", projects: 1, hours: 28, rating: 4.6 }
                  ].map((volunteer, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div>
                        <p className="font-medium">{volunteer.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {volunteer.projects} projects • {volunteer.hours} hours
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-warning fill-current" />
                          <span className="font-medium">{volunteer.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-warm">
              <CardHeader>
                <CardTitle>Resource Needs</CardTitle>
                <CardDescription>Current resource requirements across projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { item: "Tree Seedlings", needed: 500, available: 320, priority: "High" },
                    { item: "Garden Tools", needed: 25, available: 18, priority: "Medium" },
                    { item: "Water Containers", needed: 15, available: 12, priority: "Low" },
                    { item: "Transport Vehicles", needed: 3, available: 1, priority: "High" }
                  ].map((resource, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{resource.item}</span>
                        {getPriorityBadge(resource.priority)}
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Available: {resource.available}</span>
                        <span>Needed: {resource.needed}</span>
                      </div>
                      <Progress 
                        value={(resource.available / resource.needed) * 100} 
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}