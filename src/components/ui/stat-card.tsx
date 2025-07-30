import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: {
    value: string;
    type: "positive" | "negative" | "neutral";
  };
  icon: LucideIcon;
  description?: string;
  trend?: "up" | "down" | "flat";
  className?: string;
}

export function StatCard({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  description,
  trend,
  className 
}: StatCardProps) {
  const getChangeColor = (type: "positive" | "negative" | "neutral") => {
    switch (type) {
      case "positive":
        return "text-success";
      case "negative":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  const getTrendIcon = () => {
    if (trend === "up") return "↗";
    if (trend === "down") return "↘";
    return "→";
  };

  return (
    <Card className={cn("shadow-warm transition-all hover:shadow-lg", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold tracking-tight">{value}</p>
              {trend && (
                <span className="text-xl text-muted-foreground">
                  {getTrendIcon()}
                </span>
              )}
            </div>
            {change && (
              <div className="flex items-center gap-1">
                <Badge 
                  variant="secondary" 
                  className={cn("text-xs", getChangeColor(change.type))}
                >
                  {change.value}
                </Badge>
                <span className="text-xs text-muted-foreground">from last period</span>
              </div>
            )}
            {description && (
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          <div className="p-3 bg-primary/10 rounded-lg">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}