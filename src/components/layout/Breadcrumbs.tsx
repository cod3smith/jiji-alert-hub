import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

const pathMap: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/users': 'User Management',
  '/admin/alerts': 'Flood Alerts',
  '/admin/reports': 'Community Reports',
  '/admin/eco-restoration': 'Eco-Restoration',
  '/admin/connectivity': 'Connectivity',
  '/admin/settings': 'Settings'
};

export function Breadcrumbs() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  const breadcrumbItems: BreadcrumbItem[] = [];
  let currentPath = '';

  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const label = pathMap[currentPath] || segment.charAt(0).toUpperCase() + segment.slice(1);
    
    breadcrumbItems.push({
      label,
      href: index === pathSegments.length - 1 ? undefined : currentPath
    });
  });

  if (breadcrumbItems.length <= 1) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/admin" className="flex items-center gap-1">
              <Home className="h-4 w-4" />
              Home
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        
        {breadcrumbItems.slice(1).map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {item.href ? (
                <BreadcrumbLink asChild>
                  <Link to={item.href}>{item.label}</Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}