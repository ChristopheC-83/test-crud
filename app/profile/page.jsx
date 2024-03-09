/* eslint-disable react/no-unescaped-entities */
"use client";

import ButtonsTypes from "@/components/utilities/ButtonsTypes";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Profil() {
  const { data: session } = useSession();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser"))
  );

  if (!currentUser || currentUser === null) {
    router.push("/connection");
    return;
  }

  if (!currentUser.name) {
    return <div>chargement...</div>;
  }

  return (
    <div>
      <div className="w-full">
        <h3 className="mb-2 text-center">
          {" "}
          Page de profil de {currentUser.name}
        </h3>
        <div className="flex flex-col gap-4 max-w-[600px] mx-auto w-full p-2 sm:p-4 ">
          <div className="w-full flexMid">
            <Image
              src={currentUser.profile}
              alt={currentUser.name}
              width={400}
              height={400}
              className="mx-auto sm:mx-0 rounded-xl shadow-amber"
              loading="lazy"
            />
          </div>
          <div className="w-[400px] mx-auto">
            <p>{currentUser.name}</p>
            <p>{currentUser.role}</p>
            <p>{currentUser.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
