import { Navigate } from "react-router-dom";
import { authClient } from "../../lib/auth-client";
import type { ReactNode } from "react";

const ProtectedRoute = ({ children }: {children: ReactNode}) => {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="w-full min-h-screen bg-[#0E0E0E] flex items-center justify-center">
        <div className="size-6 rounded-full border-2 border-[#6BDC9F] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/authentication" replace />;
  }

  return children;
};

export default ProtectedRoute;