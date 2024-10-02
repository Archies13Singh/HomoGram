import { useUserContext } from "@/context/AuthContext";
import { formatDateString } from "@/types/utils";
import { Models } from "appwrite";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";

type PostCardProps = {
  post: Models.Document;
};

const PostCard = ({ post }: PostCardProps) => {
  const { user } = useUserContext();

  if (!post.creator) return;

  return (
    <div className="post-card">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post.creator.$id}`}>
            <img
              src={
                post?.creator?.imageUrl ||
                "https://firebasestorage.googleapis.com/v0/b/imagestorage-6c529.appspot.com/o/HFTkj4OSb3YxnwMBg9OVQxzTrMK2%2Fimages%2Fprofile-placeholder.png?alt=media&token=48eab7a8-3048-4192-8f94-0d8c6d0af786"
              }
              alt="creator"
              className="rounded-full w-12 lg:h-12"
            />
          </Link>

          <div className="flex flex-col">
            <p className="base-medium lg:body-bold text-light-1">
              {post?.creator?.name}
            </p>
            <div className="flex-center gap-2 text-light-3">
              <p className="subtle-semibold lg:small-regular">
                {formatDateString(post.$createdAt)}
              </p>{" "}
              -{" "}
              <p className="subtle-semibold lg:small-regular">
                {post?.location}
              </p>
            </div>
          </div>
        </div>
        <Link
          to={`/update-post/${post?.$id}`}
          className={`${user.id !== post.creator.$id && "hidden"} `}
        >
          <img
            src="https://firebasestorage.googleapis.com/v0/b/imagestorage-6c529.appspot.com/o/HFTkj4OSb3YxnwMBg9OVQxzTrMK2%2Fimages%2Fedit.png?alt=media&token=01aad3fc-6a09-4dbb-8d43-15405ffe4394"
            alt=""
            width={20}
            height={20}
          />
        </Link>
      </div>
      <Link to={`/posts/${post.$id}`}>
        <div className="small-medium lg:base-medium py-5">
          <p>{post.caption}</p>
          <ul className="flex gap-1 mt-2">
            {post?.tags.map((tag: string) => (
              <li key={tag} className="text-light-3">
                #{tag}
              </li>
            ))}
          </ul>
        </div>
        <img
          src={
            post.imageUrl ||
            "https://firebasestorage.googleapis.com/v0/b/imagestorage-6c529.appspot.com/o/HFTkj4OSb3YxnwMBg9OVQxzTrMK2%2Fimages%2Fprofile-placeholder.png?alt=media&token=48eab7a8-3048-4192-8f94-0d8c6d0af786"
          }
          alt="post image"
          className="post-card_img"
        />
      </Link>
      <PostStats post = {post} userId={user.id} />
    </div>
  );
};

export default PostCard;
