import { useSession, signIn, signOut } from "next-auth/react";

export default function Sidebar() {
  const { data: session } = useSession();
  return (
    <div>
      {session ? (
        <p>{session.user.uid}</p>
      ) : (
        <button
          onClick={signIn}
          className="bg-blue-400 text-white text-lg rounded-full w-36 h-12 font-bold shadow-md hover:brightness-95 hidden xl:inline"
        >
          Sign in
        </button>
      )}
    </div>
  );
}
