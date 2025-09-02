/*
import React, { useState } from "react";

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
              :["read", "write", "delete"].map((p) => (
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
*/