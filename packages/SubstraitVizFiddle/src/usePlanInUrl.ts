import { DroppedFile } from './useFileDrop.ts';
import React from 'react';
import { loadRegistry, substraitFileToBin } from '@substrait-viz/react';

// Parse plan from URL parameters
async function parsePlanFromUrl(): Promise<DroppedFile | null> {
  const urlParams = new URLSearchParams(window.location.search);
  const planData = urlParams.get('plan');
  const planName = urlParams.get('name');

  if (!planData || !planName) {
    return null;
  }

  try {
    // Decode base64 plan data back to binary, then to string
    return {
      name: decodeURIComponent(planName),
      value: planData,
    };
  } catch (error) {
    console.error('Failed to parse plan from URL:', error);
    return null;
  }
}

async function setPlanInUrl(
  plan: undefined | DroppedFile,
  descriptors: undefined | DroppedFile[],
) {
  if (plan === undefined) {
    const url = new URL(window.location.toString());
    url.searchParams.delete('plan');
    url.searchParams.delete('name');
    window.history.pushState(null, '', url);
    return;
  }
  const registry = await loadRegistry(descriptors?.map(_ => _.value));
  const bin = await substraitFileToBin(plan.value, registry);
  const url = new URL(window.location.toString());
  url.searchParams.delete('plan');
  url.searchParams.delete('name');
  url.searchParams.set('plan', btoa(String.fromCharCode(...bin)));
  url.searchParams.set('name', encodeURIComponent(plan.name));
  window.history.pushState(null, '', url);
}

export function usePlanInUrl(
  plan: undefined | DroppedFile,
  setPlan: React.Dispatch<React.SetStateAction<DroppedFile | undefined>>,
  descriptors: undefined | DroppedFile[],
) {
  const hasLoadedFromUrlRef = React.useRef(false);
  const isNavigatingRef = React.useRef(false);

  // Load plan from URL on mount
  React.useEffect(() => {
    const loadPlanFromUrl = async () => {
      if (!plan && !hasLoadedFromUrlRef.current) {
        hasLoadedFromUrlRef.current = true;
        const urlPlan = await parsePlanFromUrl();
        if (urlPlan) {
          setPlan(urlPlan);
        }
      }
    };

    loadPlanFromUrl().catch(console.error);
  }, [plan, setPlan]); // Now we can safely include both

  // Update URL when plan changes (but not during navigation)
  React.useEffect(() => {
    if (!isNavigatingRef.current) {
      setPlanInUrl(plan, descriptors).catch(console.error);
    }
    // Reset the navigation flag after processing
    isNavigatingRef.current = false;
  }, [plan, descriptors]);

  // Handle browser back/forward navigation
  React.useEffect(() => {
    async function handlePopState() {
      isNavigatingRef.current = true; // Mark that we're navigating
      const urlPlan = await parsePlanFromUrl();
      if (urlPlan) {
        setPlan(urlPlan);
      } else {
        setPlan(undefined);
      }
    }

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [setPlan]);
}
