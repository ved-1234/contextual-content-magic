import { Sparkles, AlertTriangle, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BrandkitSuggestion {
  id: string;
  originalTerm: string;
  suggestedTerm: string;
  reason: string;
  confidence: number;
  category: 'brand-name' | 'terminology' | 'style' | 'compliance';
  locations: {
    entryTitle: string;
    field: string;
    occurrences: number;
  }[];
}

interface BrandkitSuggestionsProps {
  suggestions: BrandkitSuggestion[];
  onAcceptSuggestion: (id: string) => void;
  onRejectSuggestion: (id: string) => void;
  onAcceptAll: () => void;
}

const BrandkitSuggestions = ({ 
  suggestions, 
  onAcceptSuggestion, 
  onRejectSuggestion, 
  onAcceptAll 
}: BrandkitSuggestionsProps) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'brand-name': return 'bg-primary text-primary-foreground';
      case 'terminology': return 'bg-ai text-ai-foreground';
      case 'style': return 'bg-warning text-warning-foreground';
      case 'compliance': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'brand-name': return <Sparkles className="h-4 w-4" />;
      case 'compliance': return <AlertTriangle className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="w-full lg:w-96 bg-panel border-l lg:border-l border-border h-full lg:h-screen overflow-y-auto">
      {/* Header */}
      <div className="p-3 lg:p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 lg:h-5 lg:w-5 text-ai" />
            <h2 className="font-semibold text-foreground text-sm lg:text-base">Brandkit AI</h2>
          </div>
          {suggestions.length > 0 && (
            <Button 
              size="sm" 
              onClick={onAcceptAll}
              className="bg-gradient-ai text-ai-foreground text-xs lg:text-sm"
            >
              Accept All
            </Button>
          )}
        </div>
        <p className="text-xs lg:text-sm text-muted-foreground">
          Smart suggestions to maintain brand consistency
        </p>
      </div>

      {/* Suggestions List */}
      <div className="p-3 lg:p-4 space-y-3 lg:space-y-4">
        {suggestions.map((suggestion) => (
          <Card key={suggestion.id} className="p-3 lg:p-4 shadow-soft">
            <div className="space-y-2 lg:space-y-3">
              {/* Category Badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <Badge className={getCategoryColor(suggestion.category)}>
                  {getCategoryIcon(suggestion.category)}
                  <span className="ml-1 capitalize text-xs">
                    {suggestion.category.replace('-', ' ')}
                  </span>
                </Badge>
                <Badge variant="outline" className="text-xs w-fit">
                  {Math.round(suggestion.confidence * 100)}% confidence
                </Badge>
              </div>

              {/* Term Replacement Preview */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row items-center justify-center py-2 gap-2">
                  <span className="px-2 lg:px-3 py-1 bg-destructive/10 text-destructive rounded-md font-mono text-xs lg:text-sm break-all">
                    {suggestion.originalTerm}
                  </span>
                  <ArrowRight className="h-3 w-3 lg:h-4 lg:w-4 text-muted-foreground flex-shrink-0" />
                  <span className="px-2 lg:px-3 py-1 bg-success/10 text-success rounded-md font-mono text-xs lg:text-sm break-all">
                    {suggestion.suggestedTerm}
                  </span>
                </div>
                
                <p className="text-xs lg:text-sm text-muted-foreground text-center">
                  {suggestion.reason}
                </p>
              </div>

              {/* Affected Locations */}
              <div>
                <p className="text-xs font-medium text-foreground mb-2">
                  Found in {suggestion.locations.length} locations:
                </p>
                <div className="space-y-1">
                  {suggestion.locations.slice(0, 3).map((location, index) => (
                    <div key={index} className="flex items-center justify-between text-xs gap-2">
                      <span className="text-muted-foreground truncate min-w-0">
                        {location.entryTitle} • {location.field}
                      </span>
                      <Badge variant="outline" className="text-xs flex-shrink-0">
                        {location.occurrences}x
                      </Badge>
                    </div>
                  ))}
                  {suggestion.locations.length > 3 && (
                    <p className="text-xs text-muted-foreground">
                      +{suggestion.locations.length - 3} more locations
                    </p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onRejectSuggestion(suggestion.id)}
                  className="flex-1 text-xs"
                >
                  Ignore
                </Button>
                <Button
                  size="sm"
                  onClick={() => onAcceptSuggestion(suggestion.id)}
                  className="flex-1 bg-gradient-ai text-ai-foreground text-xs"
                >
                  Apply
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {suggestions.length === 0 && (
          <div className="text-center py-6 lg:py-8">
            <Sparkles className="h-8 w-8 lg:h-12 lg:w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-base lg:text-lg font-medium text-foreground mb-2">All Clear!</h3>
            <p className="text-xs lg:text-sm text-muted-foreground px-4">
              Your content follows all brandkit guidelines. 
              Run a search to get AI-powered suggestions.
            </p>
          </div>
        )}
      </div>

      {/* Brandkit Rules Summary */}
      <div className="p-3 lg:p-4 border-t border-border">
        <h3 className="text-sm font-medium text-foreground mb-3">Active Rules</h3>
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Brand names</span>
            <Badge variant="outline" className="text-xs">12 rules</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Style guide</span>
            <Badge variant="outline" className="text-xs">8 rules</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Compliance</span>
            <Badge variant="outline" className="text-xs">5 rules</Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandkitSuggestions;