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

    // Use the slug as the company name if it's not available in the data (though data usually has it)
    // The API response doesn't seem to have a top-level company name field, so we title case the slug or use the first lead's company info if available.
    const companyName = data.leads[0]?.company_name || slug.charAt(0).toUpperCase() + slug.slice(1);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">{companyName}</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium">Total Leads</h3>
                    </div>
                    <div className="text-2xl font-bold">{data.total_leads}</div>
                    <p className="text-xs text-muted-foreground">Available contacts</p>
                </div>
            </div>

            <div className="space-y-4">
                <div className="rounded-md border">
                    <div className="w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm">
                            <thead className="[&_tr]:border-b">
                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Title</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Company</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Industry</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Size</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {data.leads.map((lead, index) => (
                                    <tr key={index} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                        <td className="p-4 align-middle font-medium">{lead.full_name}</td>
                                        <td className="p-4 align-middle">{lead.title}</td>
                                        <td className="p-4 align-middle">{lead.company_name}</td>
                                        <td className="p-4 align-middle">{lead.company_industry}</td>
                                        <td className="p-4 align-middle">{lead.company_size}</td>
                                    </tr>
                                ))}
                                {data.leads.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="p-4 text-center text-muted-foreground">No leads found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
