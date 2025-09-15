import { Search, Replace, Sparkles, Filter, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface SearchPanelProps {
  searchTerm: string;
  replaceTerm: string;
  onSearchChange: (value: string) => void;
  onReplaceChange: (value: string) => void;
  onFindAll: () => void;
  onReplaceAll: () => void;
  matchCount: number;
  isAiEnabled: boolean;
  onToggleAi: () => void;
}

const SearchPanel = ({ 
  searchTerm, 
  replaceTerm, 
  onSearchChange, 
  onReplaceChange, 
  onFindAll, 
  onReplaceAll,
  matchCount,
  isAiEnabled,
  onToggleAi
}: SearchPanelProps) => {
  return (
    <div className="w-80 bg-panel border-r border-border h-screen overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-foreground">Smart Find & Replace</h2>
          <Button variant="ghost" size="sm">
            <History className="h-4 w-4" />
          </Button>
        </div>
        
        {/* AI Toggle */}
        <Button
          variant={isAiEnabled ? "default" : "outline"}
          size="sm"
          onClick={onToggleAi}
          className={isAiEnabled ? "bg-gradient-ai text-ai-foreground" : ""}
        >
          <Sparkles className="h-4 w-4 mr-2" />
          AI Context
        </Button>
      </div>

      {/* Search Input */}
      <div className="p-4 space-y-3">
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">
            Find
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search in content..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">
            Replace with
          </label>
          <div className="relative">
            <Replace className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Replacement text..."
              value={replaceTerm}
              onChange={(e) => onReplaceChange(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Match Counter */}
        {matchCount > 0 && (
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="bg-success-light text-success">
              {matchCount} matches found
            </Badge>
            <Button 
              variant="outline" 
              size="sm"
              onClick={onFindAll}
            >
              Find All
            </Button>
          </div>
        )}
      </div>

      <Separator />

      {/* Filters */}
      <div className="p-4">
        <div className="flex items-center mb-3">
          <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Filters</span>
        </div>
        
        <div className="space-y-2">
          <Button variant="ghost" size="sm" className="w-full justify-start text-sm">
            Rich Text Content
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start text-sm">
            Metadata Fields
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start text-sm">
            Link Text & URLs
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start text-sm">
            Table Content
          </Button>
        </div>
      </div>

      <Separator />

      {/* Actions */}
      <div className="p-4 space-y-3">
        <Button 
          className="w-full bg-gradient-primary text-primary-foreground" 
          onClick={onReplaceAll}
          disabled={!searchTerm || !replaceTerm}
        >
          Replace All
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full"
          disabled={!searchTerm}
        >
          Preview Changes
        </Button>
      </div>
    </div>
  );
};

export default SearchPanel;