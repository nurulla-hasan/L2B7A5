import { Navbar } from "@/components/layout/navbar/navbar";
import { Footer } from "@/components/layout/footer";
import { getMe } from "@/services/auth.service";
import type { User } from "@/interface/user";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let user: User | undefined;
  const result = await getMe();
  if (result.success) user = result.data;

  return (
    <>
      <Navbar user={user} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
