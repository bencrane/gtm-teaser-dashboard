import { notFound } from "next/navigation";
import { fetchAPI } from "@/lib/api";
import { LeadsResponse } from "@/types/api";
import { LeadsDashboard } from "@/components/dashboard/leads-dashboard";

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

    return <LeadsDashboard data={data} companyName={companyName} />;
}
