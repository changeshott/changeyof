"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteProject } from "@/app/actions/dashboard";

export default function DeleteProjectButton({ id, projectName }: { id: string, projectName: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete "${projectName}"? This will also delete ALL release notes in this project!`)) {
      setIsDeleting(true);
      const result = await deleteProject(id);
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
      className="text-slate-400 hover:text-slate-400 transition-colors disabled:opacity-50"
      title="Delete Project"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
