// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Demo mode configuration
const DEMO_MODE = !supabaseUrl || !supabaseAnonKey;

// Mock Supabase client for demo mode
const createMockClient = () => ({
  auth: {
    async signUp() {
      return { data: { user: { id: 'demo-user', email: 'demo@example.com' } }, error: null };
    },
    async signInWithPassword() {
      return { data: { user: { id: 'demo-user', email: 'demo@example.com' } }, error: null };
    },
    async signOut() {
      return { error: null };
    },
    async getUser() {
      return { data: { user: { id: 'demo-user', email: 'demo@example.com' } }, error: null };
    },
    async resetPasswordForEmail() {
      return { error: null };
    },
    onAuthStateChange(callback: (event: string, session: any) => void) {
      // Simulate auth state change
      setTimeout(() => {
        callback('SIGNED_IN', { user: { id: 'demo-user', email: 'demo@example.com' } });
      }, 100);
      return { data: { subscription: { unsubscribe: () => {} } } };
    },
  },
  from: () => ({
    select: () => ({
      eq: () => ({ order: () => Promise.resolve({ data: [], error: null }) }),
      order: () => Promise.resolve({ data: [], error: null }),
    }),
    insert: () => ({ select: () => ({ single: () => Promise.resolve({ data: null, error: null }) }) }),
    update: () => ({ eq: () => ({ select: () => ({ single: () => Promise.resolve({ data: null, error: null }) }) }) }),
    delete: () => ({ eq: () => Promise.resolve({ error: null }) }),
  }),
  rpc: () => Promise.resolve({ error: null }),
});

export const supabase = DEMO_MODE 
  ? createMockClient() as any
  : createClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
    });

export const isDemoMode = DEMO_MODE;

