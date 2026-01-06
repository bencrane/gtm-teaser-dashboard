"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { LeadsResponse, Lead } from "@/types/api";
import { 
    Search, 
    Moon, 
    ArrowUpDown,
    ArrowUp,
    ArrowDown,
    X,
    ChevronDown,
    Eye,
    FileText,
    Columns3,
    ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";

interface LeadsDashboardProps {
    data: LeadsResponse;
    companyName: string;
}

type SortField = "full_name" | "title" | "company_name" | "company_industry" | "company_size";
type SortDirection = "asc" | "desc" | null;

interface SortState {
    field: SortField | null;
    direction: SortDirection;
}

interface FilterState {
    industries: string[];
    sizes: string[];
    workedAtCustomer: boolean | null;
}

export function LeadsDashboard({ data, companyName }: LeadsDashboardProps) {
    const [sort, setSort] = useState<SortState>({ field: null, direction: null });
    const [filters, setFilters] = useState<FilterState>({
        industries: [],
        sizes: [],
        workedAtCustomer: null,
    });
    const [showFilters, setShowFilters] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Focus input when search expands
    useEffect(() => {
        if (showSearch && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [showSearch]);

    // Extract unique values for filters
    const uniqueIndustries = useMemo(() => 
        [...new Set(data.leads.map(l => l.company_industry).filter(Boolean))].sort(),
        [data.leads]
    );
    const uniqueSizes = useMemo(() => 
        [...new Set(data.leads.map(l => l.company_size).filter(Boolean))].sort(),
        [data.leads]
    );

    // Filter and sort leads
    const filteredLeads = useMemo(() => {
        let result = [...data.leads];

        // Search filter
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            result = result.filter(lead => 
                lead.full_name.toLowerCase().includes(q) ||
                lead.title.toLowerCase().includes(q) ||
                lead.company_name.toLowerCase().includes(q) ||
                lead.company_industry.toLowerCase().includes(q)
            );
        }

        // Industry filter
        if (filters.industries.length > 0) {
            result = result.filter(lead => filters.industries.includes(lead.company_industry));
        }

        // Size filter
        if (filters.sizes.length > 0) {
            result = result.filter(lead => filters.sizes.includes(lead.company_size));
        }

        // Worked at customer filter
        if (filters.workedAtCustomer !== null) {
            result = result.filter(lead => lead.is_worked_at_customer === filters.workedAtCustomer);
        }

        // Sort
        if (sort.field && sort.direction) {
            result.sort((a, b) => {
                const aVal = a[sort.field!] ?? "";
                const bVal = b[sort.field!] ?? "";
                const comparison = aVal.localeCompare(bVal);
                return sort.direction === "asc" ? comparison : -comparison;
            });
        }

        return result;
    }, [data.leads, searchQuery, filters, sort]);

    const handleSort = (field: SortField) => {
        setSort(prev => {
            if (prev.field !== field) return { field, direction: "asc" };
            if (prev.direction === "asc") return { field, direction: "desc" };
            if (prev.direction === "desc") return { field: null, direction: null };
            return { field, direction: "asc" };
        });
    };

    const activeFilterCount = 
        filters.industries.length + 
        filters.sizes.length + 
        (filters.workedAtCustomer !== null ? 1 : 0);

    const clearFilters = () => {
        setFilters({ industries: [], sizes: [], workedAtCustomer: null });
    };

    const SortIcon = ({ field }: { field: SortField }) => {
        if (sort.field !== field) return <ArrowUpDown className="w-3.5 h-3.5 opacity-0 group-hover:opacity-50" />;
        if (sort.direction === "asc") return <ArrowUp className="w-3.5 h-3.5 text-foreground" />;
        return <ArrowDown className="w-3.5 h-3.5 text-foreground" />;
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b border-border px-8 lg:px-16 xl:px-24 py-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-semibold tracking-tight">{companyName}</h1>
                        <p className="text-sm text-muted-foreground mt-0.5">
                            GTM leads powered by Bullseye
                        </p>
                    </div>
                    <div className="flex items-center gap-1">
                        {/* Search toggle */}
                        <button 
                            onClick={() => setShowSearch(!showSearch)}
                            className={cn(
                                "p-2 rounded-lg transition-colors",
                                showSearch ? "bg-secondary" : "hover:bg-secondary"
                            )}
                        >
                            <Search className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-secondary transition-colors">
                            <Moon className="w-4 h-4 text-muted-foreground" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Search Bar - Expandable */}
            {showSearch && (
                <div className="border-b border-border px-8 lg:px-16 xl:px-24 py-3 bg-card/50">
                    <div className="flex items-center gap-2 max-w-md">
                        <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                        <input
                            ref={searchInputRef}
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search leads..."
                            className="flex-1 bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
                            onKeyDown={(e) => {
                                if (e.key === "Escape") {
                                    setSearchQuery("");
                                    setShowSearch(false);
                                }
                            }}
                            autoFocus
                        />
                        {searchQuery && (
                            <button 
                                onClick={() => setSearchQuery("")}
                                className="p-1 rounded hover:bg-secondary transition-colors"
                            >
                                <X className="w-3.5 h-3.5 text-muted-foreground" />
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Toolbar */}
            <div className="border-b border-border px-8 lg:px-16 xl:px-24 py-3">
                <div className="flex items-center justify-between gap-4">
                    {/* Left side */}
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary text-sm font-medium">
                            <FileText className="w-4 h-4" />
                            All Leads
                        </button>
                        <button 
                            onClick={() => setShowFilters(!showFilters)}
                            className={cn(
                                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                                showFilters ? "bg-secondary" : "hover:bg-secondary/50"
                            )}
                        >
                            Filters
                            <ChevronDown className={cn(
                                "w-4 h-4 transition-transform",
                                showFilters && "rotate-180"
                            )} />
                        </button>
                        <span className="text-sm text-muted-foreground">
                            {filteredLeads.length} lead{filteredLeads.length !== 1 ? "s" : ""}
                        </span>
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-2">
                        {activeFilterCount > 0 && (
                            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border text-sm">
                                <span>Filters</span>
                                <Eye className="w-3.5 h-3.5 text-muted-foreground" />
                                <button 
                                    onClick={clearFilters}
                                    className="p-0.5 hover:bg-secondary rounded transition-colors"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        )}
                        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border hover:bg-secondary/50 transition-colors text-sm">
                            Columns
                            <Columns3 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Filter Panel */}
            {showFilters && (
                <div className="border-b border-border px-8 lg:px-16 xl:px-24 py-4 bg-card/50">
                    <div>
                        <div className="flex flex-wrap gap-6">
                            {/* Industry Filter */}
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                    Industry
                                </label>
                                <div className="flex flex-wrap gap-1.5">
                                    {uniqueIndustries.slice(0, 8).map(industry => (
                                        <button
                                            key={industry}
                                            onClick={() => {
                                                setFilters(prev => ({
                                                    ...prev,
                                                    industries: prev.industries.includes(industry)
                                                        ? prev.industries.filter(i => i !== industry)
                                                        : [...prev.industries, industry]
                                                }));
                                            }}
                                            className={cn(
                                                "px-2.5 py-1 rounded-md text-xs font-medium transition-colors",
                                                filters.industries.includes(industry)
                                                    ? "bg-foreground text-background"
                                                    : "bg-secondary hover:bg-secondary/80"
                                            )}
                                        >
                                            {industry}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Size Filter */}
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                    Company Size
                                </label>
                                <div className="flex flex-wrap gap-1.5">
                                    {uniqueSizes.map(size => (
                                        <button
                                            key={size}
                                            onClick={() => {
                                                setFilters(prev => ({
                                                    ...prev,
                                                    sizes: prev.sizes.includes(size)
                                                        ? prev.sizes.filter(s => s !== size)
                                                        : [...prev.sizes, size]
                                                }));
                                            }}
                                            className={cn(
                                                "px-2.5 py-1 rounded-md text-xs font-medium transition-colors",
                                                filters.sizes.includes(size)
                                                    ? "bg-foreground text-background"
                                                    : "bg-secondary hover:bg-secondary/80"
                                            )}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Worked at Customer Filter */}
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                    Signals
                                </label>
                                <div className="flex gap-1.5">
                                    <button
                                        onClick={() => {
                                            setFilters(prev => ({
                                                ...prev,
                                                workedAtCustomer: prev.workedAtCustomer === true ? null : true
                                            }));
                                        }}
                                        className={cn(
                                            "px-2.5 py-1 rounded-md text-xs font-medium transition-colors",
                                            filters.workedAtCustomer === true
                                                ? "bg-violet-500/20 text-violet-400 ring-1 ring-violet-500/30"
                                                : "bg-secondary hover:bg-secondary/80"
                                        )}
                                    >
                                        Worked at Customer
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}

            {/* Table */}
            <div className="px-8 lg:px-16 xl:px-24 py-6">
                <div className="rounded-lg border border-border overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-card/50 border-b border-border">
                                <th className="h-11 px-4 text-left">
                                    <button 
                                        onClick={() => handleSort("full_name")}
                                        className="group flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wide hover:text-foreground transition-colors"
                                    >
                                        Name
                                        <SortIcon field="full_name" />
                                    </button>
                                </th>
                                <th className="h-11 px-4 text-left">
                                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                        Domain
                                    </span>
                                </th>
                                <th className="h-11 px-4 text-left">
                                    <button 
                                        onClick={() => handleSort("company_name")}
                                        className="group flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wide hover:text-foreground transition-colors"
                                    >
                                        Company
                                        <SortIcon field="company_name" />
                                    </button>
                                </th>
                                <th className="h-11 px-4 text-left">
                                    <button 
                                        onClick={() => handleSort("title")}
                                        className="group flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wide hover:text-foreground transition-colors"
                                    >
                                        Title
                                        <SortIcon field="title" />
                                    </button>
                                </th>
                                <th className="h-11 px-4 text-left">
                                    <button 
                                        onClick={() => handleSort("company_industry")}
                                        className="group flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wide hover:text-foreground transition-colors"
                                    >
                                        Industry
                                        <SortIcon field="company_industry" />
                                    </button>
                                </th>
                                <th className="h-11 px-4 text-left">
                                    <button 
                                        onClick={() => handleSort("company_size")}
                                        className="group flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wide hover:text-foreground transition-colors"
                                    >
                                        Size
                                        <SortIcon field="company_size" />
                                    </button>
                                </th>
                                <th className="h-11 px-4 text-left">
                                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                        Signals
                                    </span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredLeads.map((lead, index) => (
                                <LeadRow key={lead.linkedin_slug || index} lead={lead} />
                            ))}
                        </tbody>
                    </table>

                    {filteredLeads.length === 0 && (
                        <div className="py-12 text-center">
                            <p className="text-muted-foreground">No leads match your filters</p>
                            <button 
                                onClick={clearFilters}
                                className="mt-2 text-sm text-foreground hover:underline"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function LeadRow({ lead }: { lead: Lead }) {
    return (
        <tr className="border-b border-border/50 hover:bg-card/30 transition-colors group">
            <td className="h-14 px-4">
                <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{lead.full_name}</span>
                    {lead.linkedin_url && (
                        <a 
                            href={lead.linkedin_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <ExternalLink className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground" />
                        </a>
                    )}
                </div>
            </td>
            <td className="h-14 px-4">
                <span className="text-sm text-muted-foreground font-mono">
                    {lead.company_domain}
                </span>
            </td>
            <td className="h-14 px-4">
                <span className="text-sm text-muted-foreground">{lead.company_name}</span>
            </td>
            <td className="h-14 px-4">
                <span className="text-sm text-muted-foreground">{lead.title}</span>
            </td>
            <td className="h-14 px-4">
                <span className="text-sm text-muted-foreground">{lead.company_industry}</span>
            </td>
            <td className="h-14 px-4">
                <span className="text-sm text-muted-foreground whitespace-nowrap">{lead.company_size}</span>
            </td>
            <td className="h-14 px-4">
                <div className="flex items-center gap-1.5">
                    {lead.is_worked_at_customer && (
                        <span 
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-violet-500/15 text-violet-400 ring-1 ring-inset ring-violet-500/25"
                            title={lead.worked_at_customer_company ? `Worked at ${lead.worked_at_customer_company}` : undefined}
                        >
                            Worked at Customer
                        </span>
                    )}
                </div>
            </td>
        </tr>
    );
}

