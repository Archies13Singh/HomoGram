import {
  useDeleteSavedPost,
  useGetCurrentUser,
  useLikePost,
  useSavePost,
} from "@/lib/react-query/queriesAndMutations";
import { checkIsLiked } from "@/types/utils";
import { Models } from "appwrite";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";

type PostStatsProps = {
  post?: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
  const likesList = post?.likes.map((user: Models.Document) => user.$id);
  const [likes, setLikes] = useState<string[]>(likesList);
  const [saved, setIsSaved] = useState(false);

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost, isPending: isSavingPost } = useSavePost();
  const { mutate: deleteSavedPost, isPending: isDeletingSaved } =
    useDeleteSavedPost();

  const { data: currentUser } = useGetCurrentUser();

  const savePostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post?.$id
  );

  useEffect(() => {
    setIsSaved(!!savePostRecord);
  }, [currentUser]);

  const handleLikePost = (e: React.MouseEvent) => {
    // stopProgration with stop to navigate to another page or we can say it stops to apply action anywhere else except like in our case
    e.stopPropagation();
    let newLikes = [...likes];

    const hasLiked = newLikes.includes(userId);

    if (hasLiked) {
      newLikes = newLikes.filter((id) => id !== userId);
    } else {
      newLikes.push(userId);
    }

    setLikes(newLikes);
    likePost({ postId: post?.$id || "", likesArray: newLikes });
  };

  const handleSavePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();

    if (savePostRecord) {
      setIsSaved(false);
      return deleteSavedPost(savePostRecord.$id);
    }
    console.log({ postId: post?.$id || "", userId: userId }, "check data");
    savePost({ postId: post?.$id || "", userId: userId });
    setIsSaved(true);
  };

  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-3">
        <img
          src={`${
            checkIsLiked(likes, userId)
              ? "https://firebasestorage.googleapis.com/v0/b/imagestorage-6c529.appspot.com/o/HFTkj4OSb3YxnwMBg9OVQxzTrMK2%2Fimages%2Fliked.png?alt=media&token=828f4df8-5c1a-4eed-993d-94e76d650e64"
              : "https://firebasestorage.googleapis.com/v0/b/imagestorage-6c529.appspot.com/o/HFTkj4OSb3YxnwMBg9OVQxzTrMK2%2Fimages%2Flike.png?alt=media&token=5e14aa87-276b-4dba-bca4-f2a32aa24e76"
          }`}
          alt="like"
          height={20}
          width={20}
          className="cursor-pointer"
          onClick={handleLikePost}
        />

        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>
      <div className="flex gap-2 mr-3">
        {isSavingPost || isDeletingSaved ? (
          <Loader />
        ) : (
          <img
            src={`${
              saved
                ? "https://firebasestorage.googleapis.com/v0/b/imagestorage-6c529.appspot.com/o/HFTkj4OSb3YxnwMBg9OVQxzTrMK2%2Fimages%2Fsaved.png?alt=media&token=48d27f23-3b55-4e2b-ad3d-ae5c3d7b43e1"
                : "https://firebasestorage.googleapis.com/v0/b/imagestorage-6c529.appspot.com/o/HFTkj4OSb3YxnwMBg9OVQxzTrMK2%2Fimages%2Fsave.png?alt=media&token=0f92ad37-3d95-4c61-b7a9-b6bbe32536ae"
            }`}
            alt="share"
            height={20}
            width={20}
            className="cursor-pointer"
            onClick={(e) => handleSavePost(e)}
          />
        )}
      </div>
    </div>
  );
};

export default PostStats;
