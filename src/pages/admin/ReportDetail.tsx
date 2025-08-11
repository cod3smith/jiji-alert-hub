import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, CheckCircle, XCircle, MapPin, Calendar, User, Tag, Image, Video, Mic } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { LoadingCard } from '@/components/ui/loading-spinner';

interface Report {
  id: string;
  title: string;
  category: string;
  description: string;
  location: string;
  status: 'pending' | 'approved' | 'rejected' | 'flagged';
  priority: number;
  tags: string[];
  media_urls: string[];
  audio_url: string;
  created_at: string;
  updated_at: string;
  submitted_by: string;
  reviewed_by: string;
  review_notes: string;
  coordinates: any;
}

export default function ReportDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      fetchReport();
    }
  }, [id]);

  const fetchReport = async () => {
    try {
      const { data, error } = await supabase
        .from('community_reports')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setReport(data);
    } catch (error: any) {
      toast({
        title: "Error fetching report",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateReportStatus = async (status: 'approved' | 'rejected', notes: string = '') => {
    try {
      const { error } = await supabase
        .from('community_reports')
        .update({
          status,
          review_notes: notes,
          reviewed_by: 'current-user-id' // Replace with actual user ID
        })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: `Report ${status}`,
        description: `The report has been ${status} successfully.`,
      });

      fetchReport(); // Refresh the data
    } catch (error: any) {
      toast({
        title: "Error updating report",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      approved: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    };
    return colors[status as keyof typeof colors];
  };

  const getPriorityColor = (priority: number) => {
    if (priority >= 4) return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    if (priority >= 3) return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
    if (priority >= 2) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
  };

  const getPriorityLabel = (priority: number) => {
    if (priority >= 4) return 'Critical';
    if (priority >= 3) return 'High';
    if (priority >= 2) return 'Medium';
    return 'Low';
  };

  if (loading) {
    return <LoadingCard title="Loading report details..." />;
  }

  if (!report) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-2">Report not found</h2>
        <p className="text-muted-foreground mb-4">The report you're looking for doesn't exist.</p>
        <Button onClick={() => navigate('/admin/reports')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Reports
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={() => navigate('/admin/reports')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{report.title}</h1>
            <p className="text-muted-foreground">
              {report.category} • Submitted {new Date(report.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          {report.status === 'pending' && (
            <>
              <Button onClick={() => updateReportStatus('approved')} className="bg-green-600 hover:bg-green-700">
                <CheckCircle className="mr-2 h-4 w-4" />
                Approve
              </Button>
              <Button onClick={() => updateReportStatus('rejected')} variant="destructive">
                <XCircle className="mr-2 h-4 w-4" />
                Reject
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="h-5 w-5 rounded-full bg-blue-500" />
              <div>
                <p className="text-sm font-medium">Status</p>
                <Badge className={getStatusColor(report.status)}>
                  {report.status.toUpperCase()}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Tag className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm font-medium">Priority</p>
                <Badge className={getPriorityColor(report.priority)}>
                  {getPriorityLabel(report.priority)}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm font-medium">Location</p>
                <p className="text-sm text-muted-foreground">{report.location}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm font-medium">Category</p>
                <p className="text-sm text-muted-foreground">{report.category}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="media">Media ({(report.media_urls?.length || 0) + (report.audio_url ? 1 : 0)})</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
          <TabsTrigger value="review">Review</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Report Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{report.description}</p>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {report.tags?.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  )) || <p className="text-muted-foreground">No tags assigned</p>}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">Report Submitted</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(report.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  {report.updated_at !== report.created_at && (
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium">Last Updated</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(report.updated_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="media">
          <div className="space-y-4">
            {/* Images and Videos */}
            {report.media_urls && report.media_urls.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Image className="mr-2 h-5 w-5" />
                    Visual Media
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {report.media_urls.map((url, index) => (
                      <div key={index} className="border rounded-lg overflow-hidden">
                        {url.includes('.mp4') || url.includes('.mov') ? (
                          <video controls className="w-full h-48 object-cover">
                            <source src={url} type="video/mp4" />
                          </video>
                        ) : (
                          <img src={url} alt={`Media ${index + 1}`} className="w-full h-48 object-cover" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Audio */}
            {report.audio_url && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mic className="mr-2 h-5 w-5" />
                    Audio Recording
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <audio controls className="w-full">
                    <source src={report.audio_url} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </CardContent>
              </Card>
            )}

            {(!report.media_urls || report.media_urls.length === 0) && !report.audio_url && (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">No media files attached to this report.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="location">
          <Card>
            <CardHeader>
              <CardTitle>Location Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-1">Address</p>
                  <p className="text-sm text-muted-foreground">{report.location}</p>
                </div>
                {report.coordinates && (
                  <div>
                    <p className="text-sm font-medium mb-1">Coordinates</p>
                    <pre className="bg-muted p-2 rounded text-xs">
                      {JSON.stringify(report.coordinates, null, 2)}
                    </pre>
                  </div>
                )}
                <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Map view would be displayed here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="review">
          <Card>
            <CardHeader>
              <CardTitle>Review Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-1">Status</p>
                  <Badge className={getStatusColor(report.status)}>
                    {report.status.toUpperCase()}
                  </Badge>
                </div>
                {report.reviewed_by && (
                  <div>
                    <p className="text-sm font-medium mb-1">Reviewed By</p>
                    <p className="text-sm text-muted-foreground">{report.reviewed_by}</p>
                  </div>
                )}
                {report.review_notes && (
                  <div>
                    <p className="text-sm font-medium mb-1">Review Notes</p>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{report.review_notes}</p>
                  </div>
                )}
                {report.status === 'pending' && (
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground mb-2">This report is awaiting review. Use the approve/reject buttons above to update its status.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}