import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SearchPanel from '@/components/SearchPanel';
import PreviewPanel from '@/components/PreviewPanel';
import BulkOperations from '@/components/BulkOperations';
import BrandkitSuggestions from '@/components/BrandkitSuggestions';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [replaceTerm, setReplaceTerm] = useState('');
  const [isAiEnabled, setIsAiEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState('editor');

  // Mock data for demo
  const mockMatches = [
    {
      id: '1',
      type: 'text' as const,
      contentType: 'Blog Post',
      entryTitle: 'Getting Started with Contentstack CMS',
      field: 'body',
      beforeText: 'Google Workspace',
      afterText: 'Microsoft 365',
      context: 'We recommend using Google Workspace for team collaboration and document management.',
      confidence: 0.95,
      isAiSuggestion: true,
      brandkitCompliant: true
    },
    {
      id: '2',
      type: 'link' as const,
      contentType: 'Landing Page',
      entryTitle: 'Product Features Overview',
      field: 'hero_section',
      beforeText: 'Learn more about Google',
      afterText: 'Learn more about Microsoft',
      context: 'Click here to Learn more about Google and how it can help your business grow.',
      confidence: 0.87,
      isAiSuggestion: false,
      brandkitCompliant: true
    }
  ];

  const mockOperations = [
    {
      id: '1',
      type: 'find-replace' as const,
      title: 'Replace "Google" with "Microsoft" across blog posts',
      status: 'running' as const,
      progress: 65,
      entriesTotal: 150,
      entriesProcessed: 98,
      matchesFound: 45,
      replacementsMade: 28,
      startTime: new Date(Date.now() - 1000 * 60 * 15),
      estimatedCompletion: new Date(Date.now() + 1000 * 60 * 8)
    }
  ];

  const mockSuggestions = [
    {
      id: '1',
      originalTerm: 'CMSX',
      suggestedTerm: 'Contentstack',
      reason: 'Use the full brand name instead of abbreviation',
      confidence: 0.98,
      category: 'brand-name' as const,
      locations: [
        { entryTitle: 'API Documentation', field: 'description', occurrences: 3 },
        { entryTitle: 'Feature Overview', field: 'body', occurrences: 2 }
      ]
    },
    {
      id: '2',
      originalTerm: 'login',
      suggestedTerm: 'sign in',
      reason: 'Preferred terminology per style guide',
      confidence: 0.85,
      category: 'terminology' as const,
      locations: [
        { entryTitle: 'User Guide', field: 'steps', occurrences: 5 }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SF</span>
              </div>
              <h1 className="text-xl font-bold text-gradient-primary">
                Smart Find & Replace
              </h1>
            </div>
            <div className="text-sm text-muted-foreground">
              Contentstack Marketplace App
            </div>
          </div>
        </div>
      </header>

      {/* Main Interface */}
      <div className="flex">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-1">
          {/* Left Sidebar - Always visible */}
          <SearchPanel
            searchTerm={searchTerm}
            replaceTerm={replaceTerm}
            onSearchChange={setSearchTerm}
            onReplaceChange={setReplaceTerm}
            onFindAll={() => console.log('Find all')}
            onReplaceAll={() => console.log('Replace all')}
            matchCount={mockMatches.length}
            isAiEnabled={isAiEnabled}
            onToggleAi={() => setIsAiEnabled(!isAiEnabled)}
          />

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-2 m-4 mb-0">
              <TabsTrigger value="editor">Preview Changes</TabsTrigger>
              <TabsTrigger value="bulk">Bulk Operations</TabsTrigger>
            </TabsList>

            <TabsContent value="editor" className="flex-1 m-0">
              <PreviewPanel
                matches={searchTerm ? mockMatches : []}
                onAcceptMatch={(id) => console.log('Accept:', id)}
                onRejectMatch={(id) => console.log('Reject:', id)}
                onAcceptAll={() => console.log('Accept all')}
              />
            </TabsContent>

            <TabsContent value="bulk" className="flex-1 m-0">
              <BulkOperations
                operations={mockOperations}
                onStartOperation={(type) => console.log('Start:', type)}
                onCancelOperation={(id) => console.log('Cancel:', id)}
                onDownloadReport={(id) => console.log('Download:', id)}
              />
            </TabsContent>
          </div>

          {/* Right Sidebar - Brandkit Suggestions */}
          <BrandkitSuggestions
            suggestions={isAiEnabled ? mockSuggestions : []}
            onAcceptSuggestion={(id) => console.log('Accept suggestion:', id)}
            onRejectSuggestion={(id) => console.log('Reject suggestion:', id)}
            onAcceptAll={() => console.log('Accept all suggestions')}
          />
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
