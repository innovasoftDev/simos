import PageContainer from "@/components/layout/page-container";

export default async function UsersPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageContainer scrollable>
      {children}
    </PageContainer>
  );
}
