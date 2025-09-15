import { FileText, Users, Calendar, TrendingUp, Download, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface BulkOperation {
  id: string;
  type: 'find-replace' | 'brandkit-check' | 'link-validation';
  title: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  entriesTotal: number;
  entriesProcessed: number;
  matchesFound: number;
  replacementsMade: number;
  startTime: Date;
  estimatedCompletion?: Date;
}

interface BulkOperationsProps {
  operations: BulkOperation[];
  onStartOperation: (type: string) => void;
  onCancelOperation: (id: string) => void;
  onDownloadReport: (id: string) => void;
}

const BulkOperations = ({ 
  operations, 
  onStartOperation, 
  onCancelOperation, 
  onDownloadReport 
}: BulkOperationsProps) => {
  const activeOperations = operations.filter(op => op.status === 'running');
  const completedOperations = operations.filter(op => op.status === 'completed');

  return (
    <div className="p-3 lg:p-6 max-w-6xl mx-auto space-y-4 lg:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl lg:text-2xl font-bold text-foreground mb-2">Bulk Operations</h1>
        <p className="text-sm lg:text-base text-muted-foreground">
          Manage large-scale content operations across your entire CMS
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
        <Card className="p-3 lg:p-4 hover:shadow-medium transition-smooth cursor-pointer" 
              onClick={() => onStartOperation('find-replace')}>
          <div className="flex items-center space-x-2 lg:space-x-3">
            <div className="p-2 bg-gradient-primary rounded-lg flex-shrink-0">
              <RefreshCw className="h-4 w-4 lg:h-6 lg:w-6 text-white" />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-foreground text-sm lg:text-base">Bulk Find & Replace</h3>
              <p className="text-xs lg:text-sm text-muted-foreground">Process all entries</p>
            </div>
          </div>
        </Card>

        <Card className="p-3 lg:p-4 hover:shadow-medium transition-smooth cursor-pointer"
              onClick={() => onStartOperation('brandkit-check')}>
          <div className="flex items-center space-x-2 lg:space-x-3">
            <div className="p-2 bg-gradient-ai rounded-lg flex-shrink-0">
              <TrendingUp className="h-4 w-4 lg:h-6 lg:w-6 text-white" />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-foreground text-sm lg:text-base">Brandkit Audit</h3>
              <p className="text-xs lg:text-sm text-muted-foreground">Check compliance</p>
            </div>
          </div>
        </Card>

        <Card className="p-3 lg:p-4 hover:shadow-medium transition-smooth cursor-pointer md:col-span-2 lg:col-span-1"
              onClick={() => onStartOperation('link-validation')}>
          <div className="flex items-center space-x-2 lg:space-x-3">
            <div className="p-2 bg-warning rounded-lg flex-shrink-0">
              <FileText className="h-4 w-4 lg:h-6 lg:w-6 text-white" />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-foreground text-sm lg:text-base">Link Validation</h3>
              <p className="text-xs lg:text-sm text-muted-foreground">Check all links</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Active Operations */}
      {activeOperations.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Active Operations</h2>
          <div className="space-y-4">
            {activeOperations.map((operation) => (
              <Card key={operation.id} className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-foreground">{operation.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      Started {operation.startTime.toLocaleTimeString()}
                      {operation.estimatedCompletion && (
                        <span>• ETA {operation.estimatedCompletion.toLocaleTimeString()}</span>
                      )}
                    </div>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onCancelOperation(operation.id)}
                    className="text-destructive"
                  >
                    Cancel
                  </Button>
                </div>

                <div className="space-y-3">
                  <Progress value={operation.progress} className="h-2" />
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {operation.entriesProcessed} of {operation.entriesTotal} entries
                    </span>
                    <span className="font-medium text-foreground">
                      {operation.progress}% complete
                    </span>
                  </div>

                  <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-warning rounded-full"></div>
                      <span className="text-muted-foreground">
                        {operation.matchesFound} matches
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span className="text-muted-foreground">
                        {operation.replacementsMade} replaced
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Recent Operations */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Recent Operations</h2>
        <div className="space-y-3">
          {completedOperations.slice(0, 5).map((operation) => (
            <Card key={operation.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Badge 
                    variant={operation.status === 'completed' ? 'default' : 'destructive'}
                    className={operation.status === 'completed' ? 'bg-success text-success-foreground' : ''}
                  >
                    {operation.status}
                  </Badge>
                  
                  <div>
                    <h3 className="font-medium text-foreground">{operation.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {operation.replacementsMade} replacements • {operation.startTime.toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-right text-sm">
                    <p className="font-medium text-foreground">{operation.entriesTotal}</p>
                    <p className="text-muted-foreground">entries</p>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDownloadReport(operation.id)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Report
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BulkOperations;