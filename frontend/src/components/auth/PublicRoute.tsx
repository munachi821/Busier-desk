import { Navigate } from "react-router-dom";
import { authClient } from "../../lib/auth-client";

// Prevents logged-in users from accessing /authentication again
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="w-full min-h-screen bg-[#0E0E0E] flex items-center justify-center">
        <div className="size-6 rounded-full border-2 border-[#6BDC9F] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (session) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;