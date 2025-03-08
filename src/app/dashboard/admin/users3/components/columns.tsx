"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export type User = {
    id_user: string;
    status: string;
    tbl_usr_roles_id_rol: string;
    email: string;
    image: string | null;
    password: string;
    firstName: string | null;
    lastName: string | null;
    username: string;
    emailVerified: Date | null;
    phoneNumber: string | null;
    created: Date | null;
    updated: Date | null;
  };

  export const columns: ColumnDef<User>[] = [
    {
      accessorKey: "amount",
      header: () => <div className="text-right">Amount</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("amount"))
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount)
  
        return <div className="text-right font-medium">{formatted}</div>
      },
    },
  ]