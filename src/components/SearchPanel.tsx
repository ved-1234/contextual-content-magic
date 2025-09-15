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
    <div className="w-full lg:w-80 bg-panel border-r lg:border-r border-border h-full lg:h-screen overflow-y-auto">
      {/* Header */}
      <div className="p-3 lg:p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-foreground text-sm lg:text-base">Smart Find & Replace</h2>
          <Button variant="ghost" size="sm" className="lg:inline-flex hidden">
            <History className="h-4 w-4" />
          </Button>
        </div>
        
        {/* AI Toggle - Hidden on mobile (shown in header) */}
        <Button
          variant={isAiEnabled ? "default" : "outline"}
          size="sm"
          onClick={onToggleAi}
          className={`hidden lg:inline-flex ${isAiEnabled ? "bg-gradient-ai text-ai-foreground" : ""}`}
        >
          <Sparkles className="h-4 w-4 mr-2" />
          AI Context
        </Button>
      </div>

      {/* Search Input */}
      <div className="p-3 lg:p-4 space-y-3">
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
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <Badge variant="secondary" className="bg-success-light text-success">
              {matchCount} matches found
            </Badge>
            <Button 
              variant="outline" 
              size="sm"
              onClick={onFindAll}
              className="w-full sm:w-auto"
            >
              Find All
            </Button>
          </div>
        )}
      </div>

      <Separator />

      {/* Filters */}
      <div className="p-3 lg:p-4">
        <div className="flex items-center mb-3">
          <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Filters</span>
        </div>
        
        <div className="grid grid-cols-1 gap-2">
          <Button variant="ghost" size="sm" className="w-full justify-start text-xs lg:text-sm">
            Rich Text Content
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start text-xs lg:text-sm">
            Metadata Fields
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start text-xs lg:text-sm">
            Link Text & URLs
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start text-xs lg:text-sm">
            Table Content
          </Button>
        </div>
      </div>

      <Separator />

      {/* Actions */}
      <div className="p-3 lg:p-4 space-y-3">
        <Button 
          className="w-full bg-gradient-primary text-primary-foreground text-sm lg:text-base" 
          onClick={onReplaceAll}
          disabled={!searchTerm || !replaceTerm}
        >
          Replace All
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full text-sm lg:text-base"
          disabled={!searchTerm}
        >
          Preview Changes
        </Button>
      </div>
    </div>
  );
};

export default SearchPanel;