import { PageWrapper } from "@/components/common/page-wrapper";
import { ProfileForm } from "./_components/profile-form";
import { AvailabilityEditor } from "./_components/availability-editor";
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

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-xl border border-border/50 bg-card p-5 space-y-4">
          <div>
            <h2 className="text-base font-semibold">Personal Information</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Email: {user.email}
            </p>
          </div>
          <ProfileForm user={user} />
        </div>

        <div className="rounded-xl border border-border/50 bg-card p-5 space-y-4">
          <div>
            <h2 className="text-base font-semibold">Availability Schedule</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Set your weekly working hours.
            </p>
          </div>
          <AvailabilityEditor user={user} />
        </div>
      </div>
    </div>
  );
}
