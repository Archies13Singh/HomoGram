import { convertFileToUrl } from "@/types/utils";
import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";


type ProfileUploaderProps = {
  fieldChange: (files: File[]) => void;
  mediaUrl: string;
};

const ProfileUploader = ({ fieldChange, mediaUrl }: ProfileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState<string>(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(convertFileToUrl(acceptedFiles[0]));
    },
    [file]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg"],
    },
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} className="cursor-pointer" />

      <div className="cursor-pointer flex-center gap-4">
        <img
          src={fileUrl || "https://firebasestorage.googleapis.com/v0/b/imagestorage-6c529.appspot.com/o/HFTkj4OSb3YxnwMBg9OVQxzTrMK2%2Fimages%2Fprofile-placeholder.png?alt=media&token=48eab7a8-3048-4192-8f94-0d8c6d0af786"}
          alt="image"
          className="h-24 w-24 rounded-full object-cover object-top"
        />
        <p className="text-primary-500 small-regular md:bbase-semibold">
          Change profile photo
        </p>
      </div>
    </div>
  );
};

export default ProfileUploader;