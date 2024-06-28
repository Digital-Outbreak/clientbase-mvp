"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getOwnerBySlug } from "@/lib/db/owner-queries";
import OwnerHeader from "@/components/owners/OwnerHeader";
import OwnerSidebar from "@/components/owners/OwnerSidebar";

const AgencyPage = () => {
  const [owner, setOwner] = useState(null as Owner | null);
  const params = useParams();

  useEffect(() => {
    const fetchOwner = async () => {
      const owner = await getOwnerBySlug(params.agency.toString());
      setOwner(owner);
    };

    if (params.agency) {
      fetchOwner();
    }
  }, [params.agency]);

  return (
    <div className="flex h-[100vh]">
      <div className="w-1/4">
        <OwnerSidebar owner={owner} />
      </div>
      <div className="flex-1">
        <OwnerHeader />
        <div className="p-4">
          {/* Replace with your content */}
          <p>Content area</p>
        </div>
      </div>
    </div>
  );
};

export default AgencyPage;
