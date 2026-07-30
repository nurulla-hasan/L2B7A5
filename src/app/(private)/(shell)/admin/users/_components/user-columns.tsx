"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Shield, ShieldOff } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate, SuccessToast, ErrorToast } from "@/lib/utils";
import type { User } from "@/interface/user";
import { updateUserStatusAction } from "../../_actions/admin.actions";

const RoleBadge = ({ role }: { role: User["role"] }) => {
  const variantMap: Record<string, "default" | "secondary" | "outline"> = {
    ADMIN: "default",
    TECHNICIAN: "secondary",
    CUSTOMER: "outline",
  };
  return <Badge variant={variantMap[role] || "outline"}>{role}</Badge>;
};

const StatusCell = ({ user }: { user: User }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleToggle = async () => {
    setIsUpdating(true);
    const newStatus = user.activeStatus === "ACTIVE" ? "BLOCKED" : "ACTIVE";
    const result = await updateUserStatusAction(user.id, newStatus);
    setIsUpdating(false);

    if (result?.success) {
      SuccessToast(`User ${newStatus === "ACTIVE" ? "activated" : "blocked"} successfully`);
    } else {
      ErrorToast(result?.message || "Failed to update user status");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Badge variant={user.activeStatus === "ACTIVE" ? "success" : "rejected"}>
        {user.activeStatus}
      </Badge>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleToggle}
        disabled={isUpdating}
        className="h-7 text-xs gap-1"
      >
        {user.activeStatus === "ACTIVE" ? (
          <ShieldOff className="size-3" />
        ) : (
          <Shield className="size-3" />
        )}
        {user.activeStatus === "ACTIVE" ? "Block" : "Activate"}
      </Button>
    </div>
  );
};

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="font-medium">{row.original.name}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <RoleBadge role={row.original.role} />,
  },
  {
    accessorKey: "activeStatus",
    header: "Status",
    cell: ({ row }) => <StatusCell user={row.original} />,
  },
  {
    accessorKey: "createdAt",
    header: "Joined",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {formatDate(row.original.createdAt)}
      </span>
    ),
  },
];
