import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
            <h2 className="text-3xl font-bold">404 - Not Found</h2>
            <p className="text-muted-foreground">The dashboard you are looking for does not exist.</p>
        </div>
    );
}
