
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { RecoilRoot } from 'recoil'

export const Route = createRootRoute({
  component: () => (
<RecoilRoot>
      <Outlet />
      <TanStackRouterDevtools />
    </RecoilRoot>
  ),
})
