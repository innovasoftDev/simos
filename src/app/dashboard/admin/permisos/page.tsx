"use client";
import { Main } from "@/components/layout/main";
import PageContainer from "@/components/layout/page-container";

export default function UsersPage() {
  return (
    <PageContainer scrollable>
      <Main>
        <div className="mb-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Gestión de Permiso
          </h2>
        </div>
      </Main>
    </PageContainer>
  );
}