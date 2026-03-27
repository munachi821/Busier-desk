import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_API_URL,
  basePath: "/api/auth",
  fetchOptions: {
    credentials: "include",
  },
  
  advanced: {
    crossSubdomainCookies: {
      enabled: false,
    },
    defaultCookieAttributes: {
      secure: true,
      httpOnly: true,
      sameSite: "none",  // ← critical for cross-origin cookies
      partitioned: true,
    },
  },
})