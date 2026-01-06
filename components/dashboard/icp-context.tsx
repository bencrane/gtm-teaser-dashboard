"use client";

import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, Target, Sparkles } from "lucide-react";
import { useState } from "react";

export type IcpVariant = "A" | "B" | "C" | "D" | "none";

interface IcpContextProps {
    companyName: string;
    thesis: string;
    criteria: {
        label: string;
        type: "size" | "funding" | "signal" | "tech";
    }[];
    variant: IcpVariant;
}

// Variant A: Context Banner (Full Width Block)
function VariantA({ companyName, thesis, criteria }: Omit<IcpContextProps, "variant" | "onVariantChange" | "showSwitcher">) {
    return (
        <div className="border-b border-border px-8 lg:px-16 xl:px-24 py-6 bg-gradient-to-r from-emerald-500/5 via-transparent to-transparent">
            <div className="max-w-3xl">
                <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/10 shrink-0 mt-0.5">
                        <Target className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div>
                        <p className="text-sm text-foreground leading-relaxed">
                            <span className="font-semibold">{companyName}</span> {thesis}
                        </p>
                        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                            We&apos;re surfacing GTM leaders at companies matching: {" "}
                            {criteria.map((c, i) => (
                                <span key={c.label}>
                                    <span className="text-foreground">{c.label}</span>
                                    {i < criteria.length - 1 && <span className="text-muted-foreground"> · </span>}
                                </span>
                            ))}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Variant B: Split Layout (Thesis + Criteria)
function VariantB({ companyName, thesis, criteria }: Omit<IcpContextProps, "variant" | "onVariantChange" | "showSwitcher">) {
    return (
        <div className="border-b border-border px-8 lg:px-16 xl:px-24 py-5">
            <div className="flex flex-col gap-4">
                {/* Thesis */}
                <div className="flex items-start gap-3">
                    <Sparkles className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                    <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                            Why These Leads
                        </p>
                        <p className="text-sm text-foreground italic">
                            &ldquo;{companyName} {thesis} These are companies hitting that inflection point.&rdquo;
                        </p>
                    </div>
                </div>
                
                {/* Criteria */}
                <div className="border-t border-border pt-4">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                            Targeting:
                        </span>
                        {criteria.map((c) => (
                            <span 
                                key={c.label}
                                className={cn(
                                    "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium",
                                    c.type === "size" && "bg-blue-500/10 text-blue-400 ring-1 ring-inset ring-blue-500/20",
                                    c.type === "funding" && "bg-purple-500/10 text-purple-400 ring-1 ring-inset ring-purple-500/20",
                                    c.type === "signal" && "bg-emerald-500/10 text-emerald-400 ring-1 ring-inset ring-emerald-500/20",
                                    c.type === "tech" && "bg-amber-500/10 text-amber-400 ring-1 ring-inset ring-amber-500/20"
                                )}
                            >
                                {c.label}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Variant C: Minimal Inline
function VariantC({ thesis, criteria }: Omit<IcpContextProps, "variant" | "onVariantChange" | "showSwitcher">) {
    return (
        <div className="border-b border-border px-8 lg:px-16 xl:px-24 py-3 bg-card/30">
            <div className="flex items-center gap-3 text-sm">
                <Target className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                <span className="text-muted-foreground">Targeting:</span>
                <span className="text-foreground">
                    {criteria.map(c => c.label).join(" · ")}
                </span>
            </div>
        </div>
    );
}

// Variant D: Collapsible Intelligence Brief
function VariantD({ companyName, thesis, criteria }: Omit<IcpContextProps, "variant" | "onVariantChange" | "showSwitcher">) {
    const [isExpanded, setIsExpanded] = useState(true);
    
    return (
        <div className="border-b border-border px-8 lg:px-16 xl:px-24 py-4">
            <div className="border border-border rounded-lg overflow-hidden bg-card/50">
                {/* Header - Always visible */}
                <button 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-full px-4 py-3 flex items-center justify-between hover:bg-secondary/50 transition-colors"
                >
                    <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-emerald-500" />
                        <span className="text-sm font-medium">Intelligence Brief for {companyName}</span>
                    </div>
                    {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-muted-foreground" />
                    ) : (
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    )}
                </button>
                
                {/* Expandable content */}
                {isExpanded && (
                    <div className="px-4 pb-4 space-y-4 border-t border-border">
                        <p className="text-sm text-foreground leading-relaxed pt-3">
                            <span className="font-semibold">{companyName}</span> {thesis}
                        </p>
                        
                        <div>
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                                Lead Criteria
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {criteria.map((c) => (
                                    <span 
                                        key={c.label}
                                        className={cn(
                                            "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium",
                                            c.type === "size" && "bg-blue-500/10 text-blue-400 ring-1 ring-inset ring-blue-500/20",
                                            c.type === "funding" && "bg-purple-500/10 text-purple-400 ring-1 ring-inset ring-purple-500/20",
                                            c.type === "signal" && "bg-emerald-500/10 text-emerald-400 ring-1 ring-inset ring-emerald-500/20",
                                            c.type === "tech" && "bg-amber-500/10 text-amber-400 ring-1 ring-inset ring-amber-500/20"
                                        )}
                                    >
                                        {c.label}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// Variant Switcher (Development UI) - rendered inline at end of page
export function VariantSwitcher({ 
    variant, 
    onVariantChange 
}: { 
    variant: IcpVariant; 
    onVariantChange: (v: IcpVariant) => void;
}) {
    const variants: IcpVariant[] = ["A", "B", "C", "D", "none"];
    
    return (
        <div className="mt-8 mb-4 mx-8 lg:mx-16 xl:mx-24 bg-card border border-border rounded-lg p-3 flex items-center justify-center gap-1">
            <span className="text-xs text-muted-foreground px-2">ICP Variant:</span>
            {variants.map((v) => (
                <button
                    key={v}
                    onClick={() => onVariantChange(v)}
                    className={cn(
                        "px-3 py-1.5 rounded text-xs font-medium transition-colors",
                        variant === v 
                            ? "bg-foreground text-background" 
                            : "hover:bg-secondary text-muted-foreground"
                    )}
                >
                    {v === "none" ? "Off" : v}
                </button>
            ))}
        </div>
    );
}

export function IcpContext({ 
    companyName, 
    thesis, 
    criteria, 
    variant, 
}: IcpContextProps) {
    const baseProps = { companyName, thesis, criteria };
    
    if (variant === "none") return null;
    
    return (
        <>
            {variant === "A" && <VariantA {...baseProps} />}
            {variant === "B" && <VariantB {...baseProps} />}
            {variant === "C" && <VariantC {...baseProps} />}
            {variant === "D" && <VariantD {...baseProps} />}
        </>
    );
}

