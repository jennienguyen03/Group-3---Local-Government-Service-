import { logout } from "~/app/actions/auth";

export function SignOutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="rounded border border-white/20 px-4 py-1.5 text-sm text-white/90 transition-colors hover:bg-white/10"
      >
        Sign out
      </button>
    </form>
  );
}