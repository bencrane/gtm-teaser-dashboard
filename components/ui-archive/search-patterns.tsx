/**
 * UI Archive - Search Patterns
 * 
 * These are design patterns we may want to use in the future.
 * Not imported anywhere - just saved for reference.
 */

// ============================================
// Pattern 1: Search Field in Filter Panel
// ============================================
// A labeled search input that sits alongside other filters
// Good for: filter panels, sidebar filters, inline search within a section
/*
<div className="space-y-2 ml-auto">
    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        Search
    </label>
    <div className="relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search leads..."
            className="w-64 pl-9 pr-3 py-1.5 rounded-lg bg-secondary border-0 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
    </div>
</div>
*/

// ============================================
// Pattern 2: Centered Search Modal (Command Palette Style)
// ============================================
// A full-screen modal with centered search input
// Good for: quick search, command palette, spotlight-style search
/*
{showSearch && (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
        <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => {
                setShowSearch(false);
                setSearchQuery("");
            }}
        />
        <div className="relative w-full max-w-2xl mx-4">
            <div className="bg-card border border-border rounded-xl shadow-2xl overflow-hidden">
                <div className="flex items-center gap-3 px-4 py-3">
                    <Search className="w-5 h-5 text-muted-foreground shrink-0" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Quick find a lead..."
                        className="flex-1 bg-transparent border-0 text-base placeholder:text-muted-foreground focus:outline-none"
                        autoFocus
                    />
                    <button 
                        onClick={() => {
                            setShowSearch(false);
                            setSearchQuery("");
                        }}
                        className="p-1 rounded hover:bg-secondary transition-colors"
                    >
                        <X className="w-5 h-5 text-muted-foreground" />
                    </button>
                </div>
            </div>
        </div>
    </div>
)}
*/

// ============================================
// Pattern 3: Inline Expanding Search (Toolbar)
// ============================================
// A search icon that expands into an input field inline
// Good for: toolbars, headers, compact interfaces
/*
<div className="flex items-center">
    <div className={cn(
        "flex items-center overflow-hidden transition-all duration-200 ease-out",
        showSearch ? "w-64" : "w-0"
    )}>
        <div className="flex items-center gap-2 w-64 px-3 py-1.5 rounded-lg bg-secondary border border-border">
            <Search className="w-4 h-4 text-muted-foreground shrink-0" />
            <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Quick find a lead..."
                className="flex-1 bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none min-w-0"
                onBlur={() => {
                    if (!searchQuery) setShowSearch(false);
                }}
                onKeyDown={(e) => {
                    if (e.key === "Escape") {
                        setSearchQuery("");
                        setShowSearch(false);
                    }
                }}
            />
            <button 
                onClick={() => {
                    setSearchQuery("");
                    setShowSearch(false);
                }}
                className="p-0.5 rounded hover:bg-muted transition-colors"
            >
                <X className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
        </div>
    </div>
    {!showSearch && (
        <button 
            onClick={() => setShowSearch(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-secondary transition-colors text-sm"
        >
            <Search className="w-4 h-4" />
        </button>
    )}
</div>
*/

export {};

