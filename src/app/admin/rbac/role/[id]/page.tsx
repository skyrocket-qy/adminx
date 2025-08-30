'use client';
import { client } from "@/services/connect/client";
import { notFound } from "next/navigation";
// import {PermissionEditor} from "./PermissionEditor";
import { useState } from "react";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function RoleDetailPage({ params }: Props) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  // Fetch role details & permissions from your API
  const role = await getRoleWithPermissions(id); // server fetch

  if (!role) {
    notFound();
  }

  return (
    <div>
      <h1>Role: {role.name}</h1>
      <PermissionEditor
        roleId={role.id}
        permissions={role.permissions}
      />
    </div>
  );
}

// Example server fetch
async function getRoleWithPermissions(id: string) {
  const out  = client.get
  const res = await fetch(`${process.env.API_URL}/roles/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

interface PermissionEditorProps {
  roleId: string;
  permissions: Record<
    string, // resourceType
    Record<
      string, // resourceId
      string[] // permissions array, e.g., ["read", "write"]
    >
  >;
}

export function PermissionEditor({
  roleId,
  permissions: initialPermissions,
}: PermissionEditorProps) {
  const [permissions, setPermissions] = useState(initialPermissions);

  const togglePermission = (
    resourceType: string,
    resourceId: string,
    perm: string
  ) => {
    setPermissions((prev) => {
      const updated = { ...prev };
      const perms = new Set(updated[resourceType]?.[resourceId] || []);
      if (perms.has(perm)) {
        perms.delete(perm);
      } else {
        perms.add(perm);
      }
      updated[resourceType] = {
        ...updated[resourceType],
        [resourceId]: Array.from(perms),
      };
      return updated;
    });
  };

  const savePermissions = async () => {
    await fetch(`/api/roles/${roleId}/permissions`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(permissions),
    });
    alert("Permissions updated!");
  };

  return (
    <div>
      {Object.entries(permissions).map(([resourceType, resources]) => (
        <div key={resourceType} className="mb-4">
          <h2 className="font-bold">{resourceType}</h2>
          {Object.entries(resources).map(([resourceId, perms]) => (
            <div key={resourceId} className="pl-4">
              <strong>{resourceId}</strong>
              {["read", "write", "delete"].map((p) => (
                <label key={p} className="ml-2">
                  <input
                    type="checkbox"
                    checked={perms.includes(p)}
                    onChange={() =>
                      togglePermission(resourceType, resourceId, p)
                    }
                  />{" "}
                  {p}
                </label>
              ))}
            </div>
          ))}
        </div>
      ))}

      <button
        onClick={savePermissions}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save Changes
      </button>
    </div>
  );
}
