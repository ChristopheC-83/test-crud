/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";

export default function Test() {
  const [file, setFile] = useState();
  const [imageObjectUrl, setImageObjectUrl] = useState();

  const onChangeFile = async (e) => {
    e.preventDefault();
    console.log("test ok2");
    console.log(file);
    console.log(file[0]);
    // const files = e.target.files[0];
    // console.log(files);
    // if (!files || !files[0]) return;
    // console.log(files[0]);
    // setFile(files[0]);
    // setImageObjectUrl(URL.createObjectURL(files[0]));
  };

  return (
    <div className="flex flex-col w-full mt-6">
      <label>
        <p className="mb-2">Choisissez un nouvel avatar :</p>
      </label>
      <form onSubmit={onChangeFile} className="flex flex-col">
        <input
          className="p-4 text-amber-100 bg-neutral-800 placeholder:text-amber-100 rounded-xl "
          type="file"
          name="image"
          onChange={(e) => setFile(e.target.files)}
        />
        <button type="submit">Changer l'avatar</button>
      </form>
      <div className="relative w-40 h-40 mx-auto my-4 aspect-square"></div>
    </div>
  );
}
