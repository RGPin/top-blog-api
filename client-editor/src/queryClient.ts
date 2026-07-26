import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { SessionExpiredError } from "./errors";
import { handleGlobalLogout } from "./store/useAuthStore";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (error instanceof SessionExpiredError) {
        handleGlobalLogout();
      }
      if (query.meta?.errorMessage) {
        console.error(query.meta.errorMessage);
      } else {
        console.error(`Something went wrong: ${error.message}`);
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      if (error instanceof SessionExpiredError) {
        handleGlobalLogout();
      }
      console.error(
        `Mutation "${mutation.options.mutationKey}" failed:`,
        error,
      );
    },
  }),
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: (failureCount, error) => {
        if (error instanceof SessionExpiredError) return false;
        return failureCount <= 2;
      },
    },
    mutations: {
      retry: (failureCount, error) => {
        if (error instanceof SessionExpiredError) return false;
        return failureCount <= 2;
      },
    },
  },
});
