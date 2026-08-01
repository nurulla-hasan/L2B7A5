import { PageWrapper } from "@/components/common/page-wrapper";
import { ProfileInfoCard } from "./_components/profile-info-card";
import { AvailabilityCard } from "./_components/availability-card";
import { getMe } from "@/services/auth.service";
import { SectionHeading } from "@/components/common/section-heading";

export default async function TechnicianProfilePage() {
  const result = await getMe();

  if (!result.success || !result.data) {
    return (
      <PageWrapper paddingSize="small">
        <div className="text-center text-muted-foreground py-12">
          Failed to load profile.
        </div>
      </PageWrapper>
    );
  }

  const user = result.data;

  return (
    <div className="space-y-6">
      <SectionHeading
        title="Personal Information"
        description="Update your professional profile and availability."
        alignment="left"
        as="h3"
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <ProfileInfoCard user={user} />
        <AvailabilityCard user={user} />
      </div>
    </div>
  );
}
