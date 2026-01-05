import { notFound } from "next/navigation";
// TODO: Import actual components
// import { StatsHeader } from "@/components/dashboard/stats-header";
// import { Filters } from "@/components/dashboard/filters";
// import { LeadsTable } from "@/components/dashboard/leads-table";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function DashboardPage({ params }: PageProps) {
    const { slug } = await params;

    // TODO: Fetch company data from API
    // const data = await getCompanyData(slug);

    if (!slug) {
        return notFound();
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight capitalize">{slug} Dashboard</h2>
            </div>

            {/* TODO: Implement StatsHeader */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="p-4 border rounded-lg bg-card text-card-foreground shadow-sm">
                    <h3 className="font-semibold">Stats Placeholder</h3>
                    <p className="text-sm text-muted-foreground">TODO: StatsHeader component</p>
                </div>
            </div>

            <div className="space-y-4">
                {/* TODO: Implement Filters */}
                <div className="p-4 border rounded-lg bg-card text-card-foreground shadow-sm">
                    <h3 className="font-semibold">Filters Placeholder</h3>
                    <p className="text-sm text-muted-foreground">TODO: Filters component</p>
                </div>

                {/* TODO: Implement LeadsTable */}
                <div className="p-4 border rounded-lg bg-card text-card-foreground shadow-sm">
                    <h3 className="font-semibold">Leads Table Placeholder</h3>
                    <p className="text-sm text-muted-foreground">TODO: LeadsTable component</p>
                </div>
            </div>
        </div>
    );
}
