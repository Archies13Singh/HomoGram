import PostForm from "@/components/forms/PostForm";
import Loader from "@/components/shared/Loader";
import { useGetPostById } from "@/lib/react-query/queriesAndMutations";
import { useParams } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id||"");


  if(isPending) return <Loader/>

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/imagestorage-6c529.appspot.com/o/HFTkj4OSb3YxnwMBg9OVQxzTrMK2%2Fimages%2Fadd_post.svg?alt=media&token=582e3631-537e-40c8-9bb2-2332c318afb1"
            width={36}
            height={36}
            alt="add"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit Post</h2>
        </div>
        {isPending ? <Loader /> : <PostForm action="Update" post={post} />}
      </div>
    </div>
  );
};

export default EditPost;
