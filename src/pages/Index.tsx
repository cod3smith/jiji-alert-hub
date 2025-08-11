import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Shield, Users, AlertTriangle, TreePine, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { PublicMapView } from "@/components/PublicMapView";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-forest/5">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-forest rounded-lg flex items-center justify-center">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Jihadharini</h1>
              <p className="text-sm text-muted-foreground">Flood Early Warning & Eco-Restoration Platform</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Button asChild>
              <Link to="/admin">Admin Portal</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/auth">Sign In</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6 bg-forest text-forest-foreground">
            Protecting Rural Kenyan Communities
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Early Warning System for 
            <span className="text-transparent bg-gradient-water bg-clip-text"> Flood Safety</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Empowering communities across Kenya with real-time flood alerts, 
            peer-to-peer communication, and environmental restoration initiatives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link to="/admin">
                <Shield className="w-5 h-5 mr-2" />
                Admin Dashboard
              </Link>
            </Button>
            <Button variant="outline" size="lg">
              <Users className="w-5 h-5 mr-2" />
              Community Portal
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="shadow-warm border-forest/20">
            <CardHeader>
              <AlertTriangle className="w-12 h-12 text-destructive mb-4" />
              <CardTitle>Flood Early Warning</CardTitle>
              <CardDescription>
                Real-time alerts and monitoring for flood-prone areas across Kenya
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Weather-based predictions</li>
                <li>• Community reporting</li>
                <li>• Multi-language support</li>
                <li>• Offline functionality</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-warm border-primary/20">
            <CardHeader>
              <Users className="w-12 h-12 text-primary mb-4" />
              <CardTitle>Community Network</CardTitle>
              <CardDescription>
                Peer-to-peer mesh networking for reliable communication
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Works without internet</li>
                <li>• Community leaders network</li>
                <li>• Trust score system</li>
                <li>• Local language support</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-warm border-forest/20">
            <CardHeader>
              <TreePine className="w-12 h-12 text-forest mb-4" />
              <CardTitle>Eco-Restoration</CardTitle>
              <CardDescription>
                Environmental initiatives and community-driven projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Tree planting campaigns</li>
                <li>• Waste management</li>
                <li>• Riverbank protection</li>
                <li>• Progress tracking</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Public Map */}
      <section className="container mx-auto px-4 py-16">
        <PublicMapView />
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/50 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Globe className="w-5 h-5 text-primary" />
            <span className="font-semibold text-foreground">Jihadharini Platform</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Building resilient communities through technology and environmental stewardship
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
