import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  isLoading?: boolean;
  onDelete: () => void;
  onCancel?: () => void;
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  open,
  onOpenChange,
  title = "Confirm Delete",
  description = "Are you sure you want to delete this item? This action cannot be undone.",
  isLoading = false,
  onDelete,
  onCancel
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div>{description}</div>
        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onCancel || (() => onOpenChange(false))}>Cancel</Button>
          <Button variant="destructive" onClick={onDelete} loading={isLoading}>Delete</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;