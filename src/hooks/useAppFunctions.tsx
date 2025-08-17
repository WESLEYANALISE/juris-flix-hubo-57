
import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface AppFunction {
  id: number;
  funcao: string;
  descricao: string;
  link: string;
}

// Cache para evitar recarregamentos desnecessários
let cachedFunctions: AppFunction[] | null = null;
let cachePromise: Promise<AppFunction[]> | null = null;

const fetchFunctionsOnce = async (): Promise<AppFunction[]> => {
  if (cachedFunctions) {
    return cachedFunctions;
  }

  if (cachePromise) {
    return cachePromise;
  }

  cachePromise = (async () => {
    try {
      const { data, error } = await supabase
        .from('APP')
        .select('id, funcao, descricao, link')
        .order('id');

      if (error) throw error;
      
      cachedFunctions = data || [];
      return cachedFunctions;
    } catch (err) {
      cachePromise = null; // Reset promise on error
      throw err;
    }
  })();

  return cachePromise;
};

export const useAppFunctions = () => {
  const [functions, setFunctions] = useState<AppFunction[]>(cachedFunctions || []);
  const [loading, setLoading] = useState(!cachedFunctions);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cachedFunctions) {
      setFunctions(cachedFunctions);
      setLoading(false);
      return;
    }

    const loadFunctions = async () => {
      try {
        const data = await fetchFunctionsOnce();
        setFunctions(data);
        setError(null);
      } catch (err) {
        console.error('useAppFunctions - Erro ao carregar funções:', err);
        setError(err instanceof Error ? err.message : 'Erro ao carregar funções');
      } finally {
        setLoading(false);
      }
    };

    loadFunctions();
  }, []);

  return { functions, loading, error };
};
