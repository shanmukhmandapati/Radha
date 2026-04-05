import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper: upload a file to a storage bucket, return public URL
export async function uploadImage(bucket, file) {
  const ext = file.name.split('.').pop();
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { data, error } = await supabase.storage.from(bucket).upload(filename, file);
  if (error) throw error;
  const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(data.path);
  return { publicUrl, path: data.path };
}

// Helper: delete a file from storage by full public URL
export async function deleteImage(bucket, url) {
  const path = url.split(`/${bucket}/`)[1];
  if (!path) return;
  await supabase.storage.from(bucket).remove([path]);
}
