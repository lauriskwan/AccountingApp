import Image from "next/image";
import SidebarItem from "./SidebarItem";
import { HomeIcon } from "@heroicons/react/solid";
import { HashtagIcon } from "@heroicons/react/outline";
import { BellIcon } from "@heroicons/react/outline";
import { InboxIcon } from "@heroicons/react/outline";
import { BookmarkIcon } from "@heroicons/react/outline";
import { ClipboardIcon } from "@heroicons/react/outline";
import { UserIcon } from "@heroicons/react/outline";
import { DotsCircleHorizontalIcon } from "@heroicons/react/outline";
import { DotsHorizontalIcon } from "@heroicons/react/outline";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Sidebar() {
  const { data: session } = useSession();
  return (
    <div className="hidden sm:flex flex-col p-2 xl:items-start fixed h-full xl:ml-24">
      {/* Logo */}
      <div className="hoverEffect hover:bg-blue-100 px-3 pt-3">
        <div className="h-[35px] w-[150px] flex items-center justify-center font-bold text-lg">
          Logo placeholder
        </div>
      </div>

      {/* Menu */}
      <div className="mt-4 mb-2.5 xl:items:start">
        <SidebarItem text="Home" Icon={HomeIcon} active />
        <SidebarItem text="Explore" Icon={HashtagIcon} />
        {session && (
          <>
            <SidebarItem text="Notifications" Icon={BellIcon} />
            <SidebarItem text="Messages" Icon={InboxIcon} />
            <SidebarItem text="Bookmarks" Icon={BookmarkIcon} />
            <SidebarItem text="Lists" Icon={ClipboardIcon} />
            <SidebarItem text="Profile" Icon={UserIcon} />
            <SidebarItem text="More" Icon={DotsCircleHorizontalIcon} />
          </>
        )}
      </div>

      {/* Button */}

      {session ? (
        <>
          {console.log(session)}
          <button className="bg-blue-400 text-white text-lg rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 hidden xl:inline">
            Post
          </button>

          {/* Avatar */}
          <div className="hoverEffect text-gray-700 flex items-center justify-center xl:justify-start mt-auto">
            <img
              onClick={signOut}
              src={session?.user?.image}
              alt="User Icon"
              className="h-10 w-10 rounded-full sm:ml-1.5 xl:mr-5 xl:ml-0"
            />
            <div className="leading-5 hidden xl:inline truncate max-w-[100px]">
              <h4 className="font-bold truncate">{session.user.name}</h4>
              <p className="text-gray-500 truncate">{session.user.email}</p>
            </div>
            <DotsHorizontalIcon className="h-5 xl:ml-8 hidden xl:inline" />
          </div>
        </>
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
