import { createRouter } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import { routeTree } from "./routeTree.gen";

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Fewer redundant network round-trips on navigation/tab switches.
        staleTime: 60_000,
        gcTime: 5 * 60_000,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        retry: 1,
      },
    },
  });
}

export function getRouter() {
  const queryClient = createQueryClient();
  const router = createRouter({
    routeTree,
    context: {
      queryClient,
    },
    defaultPreload: "intent",
    // TanStack Query owns cache freshness; keep the router's own preload
    // cache from short-circuiting query refetches.
    defaultPreloadStaleTime: 0,
    // Small hover delay so quick pointer sweeps across a nav bar don't fire
    // a burst of chunk downloads.
    defaultPreloadDelay: 80,
  });
  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
