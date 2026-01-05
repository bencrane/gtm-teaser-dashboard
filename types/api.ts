export interface Lead {
    linkedin_url: string;
    linkedin_slug: string;
    full_name: string;
    title: string;
    company_name: string;
    company_domain: string;
    company_industry: string;
    company_size: string;
    is_worked_at_customer: boolean;
    worked_at_customer_company: string | null;
}

export interface LeadsResponse {
    leads: Lead[];
    total_leads: number;
}
