"use client";
import { useDropzone } from "react-dropzone";
import React, { useEffect } from "react";
import Image from "next/image";
import path from "path";

const UploadForm = ({
  setFiles,
  files,
}: {
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  files: File[];
}) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const isImageFile = (file: File) => file.type.startsWith("image/");
  const isDocxFile = (file: File) => file.name.endsWith(".docx");

  const getFilePreview = (file: File) => {
    if (isImageFile(file)) {
      return (file as any).preview;
    } else if (isDocxFile(file)) {
      return "/icons/docx.png";
    }
    return "/icons/undefined.png";
  };

  const thumbs = files.map((file) => (
    <div
      key={file.name}
      className="flex w-24  border-2 border-primary/20 rounded-lg overflow-hidden mr-4"
    >
      <div className="w-24 h-24 border-2 border-primary/20 rounded-lg overflow-hidden">
        <Image
          src={getFilePreview(file)}
          alt={file.name}
          width={100}
          height={100}
          className="object-cover
            w-full
            h-full
          "
          onLoad={() => {
            if (isImageFile(file)) {
              URL.revokeObjectURL((file as any).preview);
            }
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    return () =>
      files.forEach((file) => URL.revokeObjectURL((file as any).preview));
  }, [files]);

  return (
    <section className="container">
      <div
        {...getRootProps({
          className:
            "bg-primary/10 border-dashed border-opacity-50 border-2 border-gray-300 p-4 rounded-lg",
        })}
      >
        <input {...getInputProps()} />
        <p className="text-white/60 text-center text-sm font-semibold transition duration-300 ease-in-out hover:text-primary/">
          Drag &apos;n&apos; drop some files here, or click to select files
        </p>
      </div>
      <aside className="flex flex-row flex-wrap mt-4">{thumbs}</aside>
    </section>
  );
};

export default UploadForm;
