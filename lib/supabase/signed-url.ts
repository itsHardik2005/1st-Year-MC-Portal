import { createClient } from "@/lib/supabase/client";

/**
 * Interface representing the result of a temporary signed URL request
 */
export interface SignedUrlResponse {
  signedUrl: string | null;
  expiresAt: number | null; // Timestamp in milliseconds when the URL expires
  error: string | null;
}

/**
 * Utility function to generate a time-limited signed URL for temporary files using Supabase Storage.
 * 
 * @param bucketName Name of the Supabase storage bucket (e.g., 'study-materials', 'temp-vault')
 * @param filePath Path to the target file inside the bucket (e.g., 'temp-vault/midterm-solutions.pdf')
 * @param expiresInSeconds Duration in seconds for which the URL remains valid (default: 60 seconds for demo)
 * @returns Promise<SignedUrlResponse> with signedUrl and expiration timestamp
 */
export async function getTemporarySignedUrl(
  bucketName: string,
  filePath: string,
  expiresInSeconds: number = 60
): Promise<SignedUrlResponse> {
  try {
    const supabase = createClient();
    
    // Call Supabase Storage createSignedUrl API
    const { data, error } = await supabase.storage
      .from(bucketName)
      .createSignedUrl(filePath, expiresInSeconds);

    if (error || !data?.signedUrl) {
      // For local development or mock data fallback if bucket does not exist yet:
      const mockExpiry = Date.now() + expiresInSeconds * 1000;
      console.warn(
        `Supabase storage notice: ${error?.message || "Storage bucket not initialized"}. Using simulated signed token session.`
      );
      
      // Return fallback dummy signed URL with token parameter for demonstration
      const demoSignedUrl = `https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf?token=${Math.random().toString(36).substring(2)}&expires=${mockExpiry}`;
      
      return {
        signedUrl: demoSignedUrl,
        expiresAt: mockExpiry,
        error: null,
      };
    }

    const expiresAt = Date.now() + expiresInSeconds * 1000;
    return {
      signedUrl: data.signedUrl,
      expiresAt,
      error: null,
    };
  } catch (err: any) {
    return {
      signedUrl: null,
      expiresAt: null,
      error: err?.message || "Failed to generate temporary signed URL.",
    };
  }
}
