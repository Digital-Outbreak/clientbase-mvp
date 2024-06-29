"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getOwnerBySlug } from "@/lib/db/owner-queries";
import OwnerSidebar from "@/components/owners/OwnerSidebar";
import OwnerHeader from "@/components/owners/OwnerHeader";
import Loading from "@/components/global/loading";
import AgencySettingsForm from "@/components/owners/AgencySettingsForm";

const OwnerSettingsPage = () => {
  const [owner, setOwner] = useState<Owner>();
  const params = useParams();

  useEffect(() => {
    const fetchOwner = async () => {
      const owner = await getOwnerBySlug(params.agency.toString());
      setOwner(owner as Owner);
    };

    if (params.agency) {
      fetchOwner();
    }
  }, [params.agency]);

  return owner ? (
    <div className="flex h-screen">
      {owner && (
        <div className="lg:w-[20%] w-24 fixed h-full">
          <OwnerSidebar owner={owner} active="settings" />
        </div>
      )}
      <div className="flex-1 ml-[5.5rem] lg:ml-[20%]">
        <OwnerHeader />
        <div className="p-4">
          <h1 className="text-3xl font-bold mb-4">Settings</h1>
          <AgencySettingsForm owner={owner} />
        </div>
      </div>
    </div>
  ) : (
    <div className="h-[90vh] w-screen flex justify-center items-center">
      <Loading />
    </div>
  );
};

export default OwnerSettingsPage;
