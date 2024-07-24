import { auth } from "@clerk/nextjs/server";
import { getOwnerById } from "@/lib/db/owner-queries";
import { redirect } from "next/navigation";
import AgencyForm from "@/components/owners/AgencyForm";
import OwnerHeader from "@/components/owners/OwnerHeader";
import { Owner } from "@prisma/client";

const DashboardPage = async () => {
  const { userId } = auth();

  let owner: Owner | null = null;

  if (userId) {
    owner = await getOwnerById(userId);
  }

  if (owner?.role == "AGENCY") {
    return redirect(`/${owner.companySlug}`);
  }

  return (
    <div>
      <OwnerHeader />
      <AgencyForm user={owner} />
    </div>
  );
};

export default DashboardPage;
