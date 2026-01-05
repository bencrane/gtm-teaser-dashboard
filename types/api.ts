export interface CompanyConfig {
    slug: string;
    name: string;
    // TODO: Add other fields as needed
}

export interface Lead {
    id: string;
    company_name: string;
    // TODO: Add other fields as needed
}

export interface DashboardData {
    company: CompanyConfig;
    leads: Lead[];
}
