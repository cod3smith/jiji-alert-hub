import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { 
  Home, 
  Users, 
  AlertTriangle, 
  FileText, 
  TreePine, 
  Wifi, 
  Settings,
  Map,
  Activity,
  Globe
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

const navigationItems = [
  { title: "Dashboard", url: "/admin", icon: Home },
  { title: "Alerts", url: "/admin/alerts", icon: AlertTriangle },
  { title: "Reports", url: "/admin/reports", icon: FileText },
  { title: "Projects", url: "/admin/projects", icon: TreePine },
  { title: "Users", url: "/admin/users", icon: Users },
  { title: "Disbursements", url: "/admin/disbursements", icon: Activity },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/admin") {
      return location.pathname === "/admin" || location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const getNavClassName = (path: string) => {
    return isActive(path) 
      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
      : "hover:bg-sidebar-accent/50";
  };

  return (
    <Sidebar className={state === "collapsed" ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent>
        {/* Logo Section */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-forest rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            {state !== "collapsed" && (
              <div>
                <h2 className="font-semibold text-sidebar-foreground">Jihadharini</h2>
                <p className="text-xs text-sidebar-foreground/70">Admin Portal</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={getNavClassName(item.url)}
                    >
                      <item.icon className="w-4 h-4" />
                      {state !== "collapsed" && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Status Indicator */}
        <div className="mt-auto p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            {state !== "collapsed" && (
              <span className="text-xs text-sidebar-foreground/70">System Online</span>
            )}
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}