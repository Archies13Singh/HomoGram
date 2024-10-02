import { sidebarLinks } from "@/constants";
import { useUserContext } from "@/context/AuthContext";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { INavLink } from "@/types";
import { useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { imageNameWithUrl } from "@/types/utils";

const LeftSideBar = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { pathname } = useLocation();

  useEffect(() => {
    if (isSuccess) {
      navigate(0);
    }
  }, [isSuccess]);
  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src={imageNameWithUrl("logo.png")}
            alt="logo"
            width={170}
            height={196}
          />
        </Link>
        <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
          <img
            src={user.imageUrl || "https://firebasestorage.googleapis.com/v0/b/imagestorage-6c529.appspot.com/o/HFTkj4OSb3YxnwMBg9OVQxzTrMK2%2Fimages%2Fprofile-placeholder.png?alt=media&token=48eab7a8-3048-4192-8f94-0d8c6d0af786"}
            alt="profile"
            className="w-14 h-14 rounded-full"
          />
          <div className="flex flex-col">
            <p className="body-bold">{user.name}</p>
            <p className="small-regular text-light-3">@{user.username}</p>
          </div>
        </Link>

        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;
            return (
              <li
                key={link.label}
                className={`leftsidebar-link group ${
                  isActive && "bg-primary-500"
                }`}
              >
                <NavLink
                  to={link.route}
                  className="flex gap-4 items-center p-4"
                >
                  <img
                    src={link?.imgName}
                    alt={link.label}
                    className={`group-hover:invert-white ${
                      isActive && "invert-white"
                    }`}
                    width={35} height={35}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex gap-4" onClick={() => signOut()}>
        <Button variant="ghost" className="shad-button_ghost">
          <img width={35} height={35} src="https://firebasestorage.googleapis.com/v0/b/imagestorage-6c529.appspot.com/o/HFTkj4OSb3YxnwMBg9OVQxzTrMK2%2Fimages%2Flogout.png?alt=media&token=971fb0d6-1cdb-46eb-bfa8-006ac100d6e2" alt="logout" />
          <p className="small-medium lg:base-medium">Logout</p>
        </Button>
      </div>
    </nav>
  );
};

export default LeftSideBar;
