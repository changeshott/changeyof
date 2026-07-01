"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteRelease } from "@/app/actions/dashboard";

export default function DeleteReleaseButton({ id, title }: { id: string, title: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      setIsDeleting(true);
      const result = await deleteRelease(id);
      setIsDeleting(false);
      
      if (result.error) {
        alert(result.error);
      }
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-1.5 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-md transition-colors disabled:opacity-50"
      title="Delete Release"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
