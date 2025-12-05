const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface Action {
    id: string;
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    category: string;
}

export interface FileMetadata {
    fileName: string;
    fileType: string;
    fileSize: number;
    uploadedAt: string;
    processedAt: string;
    wordCount?: number;
    pageCount?: number;
}

export interface AnalysisResult {
    status: 'success' | 'error';
    data?: {
        summary: string;
        actions: Action[];
        metadata: FileMetadata;
    };
    error?: string;
}

export interface HealthResponse {
    status: string;
    message: string;
    timestamp: string;
    environment?: string;
}

/**
 * Upload and analyze document in one call
 */
export async function uploadAndAnalyze(file: File): Promise<AnalysisResult> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_URL}/api/upload`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Upload failed' }));
        throw new Error(errorData.error || errorData.message || 'Upload failed');
    }

    return await response.json();
}

/**
 * Check backend health
 */
export async function checkHealth(): Promise<HealthResponse> {
    const response = await fetch(`${API_URL}/api/health`);

    if (!response.ok) {
        throw new Error('Health check failed');
    }

    return await response.json();
}
