import { auth } from "@clerk/nextjs/server";
import { getOwnerById } from "@/lib/db/owner-queries";
import { redirect } from "next/navigation";
import AgencyForm from "@/components/owners/AgencyForm";

const DashboardPage = async () => {
  const { userId } = auth();

  let owner: Owner | null = null;

  if (userId) {
    owner = await getOwnerById(userId);
  }

  if (owner?.role == "AGENCY") {
    return redirect(`/agency/${owner.companySlug}`);
  }

  return (
    <div>
      <AgencyForm user={owner} />
    </div>
  );
};

export default DashboardPage;
