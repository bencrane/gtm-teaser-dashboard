import { notFound } from "next/navigation";
import { fetchAPI } from "@/lib/api";
import { LeadsResponse } from "@/types/api";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function DashboardPage({ params }: PageProps) {
    const { slug } = await params;

    let data: LeadsResponse;

    try {
        data = await fetchAPI<LeadsResponse>(`/api/leads/${slug}`);
    } catch (error) {
        console.error("Failed to fetch leads:", error);
        return notFound();
    }

    const companyName = data.company_name || slug.charAt(0).toUpperCase() + slug.slice(1);

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Page-Specific Header */}
            <header className="border-b border-white/10 bg-background/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h1 className="text-xl font-bold tracking-tight">{companyName}</h1>
                        <span className="bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full text-xs font-medium border border-emerald-500/20">
                            {data.total_leads} Leads Found
                        </span>
                    </div>
                    <div className="text-sm font-medium text-muted-foreground">
                        Bullseye
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-4 space-y-4">
                {/* Table Section */}
                {/* We will replace this container with the Smart Client Component in Phase 2 */}
                <div className="rounded-xl border border-white/10 bg-card/50 overflow-hidden">
                    {/* ... Phase 2 will inject client component here ... */}
                    {/* For now, keeping existing static table to verify Phase 1 layout */}

                    {/* Temporary render of existing table logic to keep page usable during refactor */}
                    <div className="w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm">
                            <thead className="[&_tr]:border-b [&_tr]:border-white/5">
                                <tr className="border-b border-white/5 transition-colors hover:bg-white/5 data-[state=selected]:bg-muted">
                                    <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground text-xs uppercase tracking-wider">Name</th>
                                    <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground text-xs uppercase tracking-wider">Title</th>
                                    <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground text-xs uppercase tracking-wider">Company</th>
                                    <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground text-xs uppercase tracking-wider">Industry</th>
                                    <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground text-xs uppercase tracking-wider">Size</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {data.leads.map((lead, index) => (
                                    <tr key={index} className="border-b border-white/5 transition-colors hover:bg-white/5 data-[state=selected]:bg-muted">
                                        <td className="p-4 align-middle font-medium text-white">{lead.full_name}</td>
                                        <td className="p-4 align-middle text-muted-foreground">{lead.title}</td>
                                        <td className="p-4 align-middle text-muted-foreground">{lead.company_name}</td>
                                        <td className="p-4 align-middle text-muted-foreground">{lead.company_industry}</td>
                                        <td className="p-4 align-middle text-muted-foreground">{lead.company_size}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
