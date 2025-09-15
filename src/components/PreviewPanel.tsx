import { CheckCircle, XCircle, AlertCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface PreviewMatch {
  id: string;
  type: 'text' | 'link' | 'metadata' | 'table';
  contentType: string;
  entryTitle: string;
  field: string;
  beforeText: string;
  afterText: string;
  context: string;
  confidence?: number;
  isAiSuggestion?: boolean;
  brandkitCompliant?: boolean;
}

interface PreviewPanelProps {
  matches: PreviewMatch[];
  onAcceptMatch: (id: string) => void;
  onRejectMatch: (id: string) => void;
  onAcceptAll: () => void;
}

const PreviewPanel = ({ matches, onAcceptMatch, onRejectMatch, onAcceptAll }: PreviewPanelProps) => {
  const acceptedCount = matches.filter(m => m.confidence && m.confidence > 0.8).length;
  
  return (
    <div className="flex-1 bg-background overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur border-b border-border p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Preview Changes</h3>
            <p className="text-sm text-muted-foreground">
              {matches.length} replacements across {new Set(matches.map(m => m.entryTitle)).size} entries
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="bg-success-light text-success">
              {acceptedCount} high confidence
            </Badge>
            <Button onClick={onAcceptAll} className="bg-gradient-primary text-primary-foreground">
              Accept All
            </Button>
          </div>
        </div>
      </div>

      {/* Matches List */}
      <div className="p-4 space-y-4">
        {matches.map((match) => (
          <Card key={match.id} className="p-4 shadow-soft hover:shadow-medium transition-smooth">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-xs">
                    {match.contentType}
                  </Badge>
                  <span className="text-sm font-medium text-foreground">
                    {match.entryTitle}
                  </span>
                  {match.type === 'link' && (
                    <ExternalLink className="h-3 w-3 text-muted-foreground" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground mb-2">
                  Field: <span className="font-mono">{match.field}</span>
                </p>
              </div>

              <div className="flex items-center gap-2">
                {match.isAiSuggestion && (
                  <Badge className="bg-gradient-ai text-ai-foreground text-xs">
                    AI Enhanced
                  </Badge>
                )}
                {match.brandkitCompliant && (
                  <CheckCircle className="h-4 w-4 text-success" />
                )}
                {match.confidence && (
                  <Badge 
                    variant={match.confidence > 0.8 ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {Math.round(match.confidence * 100)}%
                  </Badge>
                )}
              </div>
            </div>

            {/* Before/After Preview */}
            <div className="space-y-3">
              <div>
                <p className="text-xs font-medium text-destructive mb-1">Before:</p>
                <div className="p-3 bg-destructive/5 border border-destructive/20 rounded-md text-sm">
                  <span className="text-muted-foreground">{match.context.split(match.beforeText)[0]}</span>
                  <span className="bg-destructive/20 text-destructive px-1 rounded">
                    {match.beforeText}
                  </span>
                  <span className="text-muted-foreground">{match.context.split(match.beforeText)[1]}</span>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-success mb-1">After:</p>
                <div className="p-3 bg-success-light border border-success/20 rounded-md text-sm">
                  <span className="text-muted-foreground">{match.context.split(match.beforeText)[0]}</span>
                  <span className="bg-success/20 text-success px-1 rounded">
                    {match.afterText}
                  </span>
                  <span className="text-muted-foreground">{match.context.split(match.beforeText)[1]}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onRejectMatch(match.id)}
                className="text-destructive border-destructive/20 hover:bg-destructive/5"
              >
                <XCircle className="h-4 w-4 mr-2" />
                Reject
              </Button>
              <Button
                size="sm"
                onClick={() => onAcceptMatch(match.id)}
                className="bg-success text-success-foreground hover:bg-success/90"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Accept
              </Button>
            </div>
          </Card>
        ))}

        {matches.length === 0 && (
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No matches found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or enabling AI context for smarter matching.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewPanel;