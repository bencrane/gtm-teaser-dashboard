const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
    console.warn("NEXT_PUBLIC_API_URL is not defined");
}

export interface Lead {
    name: string;
    title: string;
    company: string;
    industry: string;
    size: string;
}

export interface LeadsResponse {
    company: string;
    leads: Lead[];
}

export async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_URL}${endpoint}`;

    const response = await fetch(url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
}

export async function getLeads(slug: string): Promise<LeadsResponse | null> {
    const url = `${API_URL}/api/leads/${slug}.com`;

    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
        },
        next: { revalidate: 60 },
    });

    if (response.status === 404) {
        return null;
    }

    if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
}
