/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SignUpRouteImport } from './routes/sign-up/route'
import { Route as SignInRouteImport } from './routes/sign-in/route'
import { Route as DashboardRouteImport } from './routes/dashboard/route'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const SignUpRouteRoute = SignUpRouteImport.update({
  path: '/sign-up',
  getParentRoute: () => rootRoute,
} as any)

const SignInRouteRoute = SignInRouteImport.update({
  path: '/sign-in',
  getParentRoute: () => rootRoute,
} as any)

const DashboardRouteRoute = DashboardRouteImport.update({
  path: '/dashboard',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/dashboard': {
      id: '/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof DashboardRouteImport
      parentRoute: typeof rootRoute
    }
    '/sign-in': {
      id: '/sign-in'
      path: '/sign-in'
      fullPath: '/sign-in'
      preLoaderRoute: typeof SignInRouteImport
      parentRoute: typeof rootRoute
    }
    '/sign-up': {
      id: '/sign-up'
      path: '/sign-up'
      fullPath: '/sign-up'
      preLoaderRoute: typeof SignUpRouteImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  DashboardRouteRoute,
  SignInRouteRoute,
  SignUpRouteRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/dashboard",
        "/sign-in",
        "/sign-up"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/dashboard": {
      "filePath": "dashboard/route.tsx"
    },
    "/sign-in": {
      "filePath": "sign-in/route.tsx"
    },
    "/sign-up": {
      "filePath": "sign-up/route.tsx"
    }
  }
}
ROUTE_MANIFEST_END */