import { auth } from "~/server/auth/config";
import Report from "./page";

export default async function Page() { // authenticate the user and check if they are either a staff or admin, then render the report page with the appropriate permissions
  const session = await auth();

  const canManageCategories =
    session?.user?.role === "STAFF" || session?.user?.role === "ADMIN";

  return <Report canManageCategories={canManageCategories} />;
}
