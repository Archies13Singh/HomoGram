import { Models } from "appwrite";
import { Link } from "react-router-dom";

import { Button } from "../ui/button";

type UserCardProps = {
  user: Models.Document;
};

const UserCard = ({ user }: UserCardProps) => {
  return (
    <Link to={`/profile/${user.$id}`} className="user-card">
      <img
        src={user.imageUrl || "https://firebasestorage.googleapis.com/v0/b/imagestorage-6c529.appspot.com/o/HFTkj4OSb3YxnwMBg9OVQxzTrMK2%2Fimages%2Fprofile-placeholder.png?alt=media&token=48eab7a8-3048-4192-8f94-0d8c6d0af786"}
        alt="creator"
        className="rounded-full w-14 h-14"
      />

      <div className="flex-center flex-col gap-1">
        <p className="base-medium text-light-1 text-center line-clamp-1">
          {user.name}
        </p>
        <p className="small-regular text-light-3 text-center line-clamp-1">
          @{user.username}
        </p>
      </div>

      <Button type="button" size="sm" className="shad-button_primary px-5">
        Follow
      </Button>
    </Link>
  );
};

export default UserCard;