import Sidebar from "@/components/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { DebugObserver } from "@/state/debug";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRootRoute, Outlet } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { RecoilRoot } from "recoil";

const RootComponent = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  const pathName = window.location.pathname;
  const isVisible = pathName!== '/sign-in' && pathName!== '/sign-up' && pathName!== '/verification' && pathName!== '/verify-email' && pathName!== '/forgot-password' && pathName!== '/';


  return (
    <RecoilRoot>
      <DebugObserver />
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <div className=" flex w-full">
            <div>{isVisible && <Sidebar />}</div>
            <div className="w-full h-full overflow-scroll">
              <Outlet/>
            </div>
          </div>
          {/* <TanStackRouterDevtools /> */}
          <Toaster />
        </ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
});
