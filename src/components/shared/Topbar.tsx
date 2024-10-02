import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";
import { imageNameWithUrl } from "@/types/utils";

const Topbar = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    console.log(isSuccess, "suss");
    if (isSuccess) {
      navigate(0);
    }
  }, [isSuccess]);

  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src={imageNameWithUrl("logo.png")}
            alt="logo"
            width={160}
            height={160}
          />
        </Link>

        <div className="flex gap-4" onClick={() => signOut()}>
          <Button variant="ghost" className="shad-button_ghost">

            <img src="https://firebasestorage.googleapis.com/v0/b/imagestorage-6c529.appspot.com/o/HFTkj4OSb3YxnwMBg9OVQxzTrMK2%2Fimages%2Flogout.png?alt=media&token=971fb0d6-1cdb-46eb-bfa8-006ac100d6e2" alt="logout" />
          </Button>
          <Link to={`/profile/${user.id}`} className="flex-center gap-3">
            <img
              src={user.imageUrl || "https://firebasestorage.googleapis.com/v0/b/imagestorage-6c529.appspot.com/o/HFTkj4OSb3YxnwMBg9OVQxzTrMK2%2Fimages%2Fprofile-placeholder.png?alt=media&token=48eab7a8-3048-4192-8f94-0d8c6d0af786"}
              alt="profile"
              className="'h-8 w-8 rounded-full"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
