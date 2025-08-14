import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProject, useAddProjectPhotos, useDeleteProjectPhoto } from "@/api/projects";
import { Trash2, Plus } from "lucide-react";
import { API_URL } from "../../config";

const ProofOfDeliveryPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { data, isLoading } = useProject(Number(projectId));
  const project = data?.data

  const addProofMutation = useAddProjectPhotos();
  const deleteProofMutation = useDeleteProjectPhoto();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file || null);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleAddProof = () => {
    if (!selectedFile || !name || !deliveryDate) return;

    addProofMutation.mutate({
      projectId: Number(projectId),
      photos: [selectedFile],
      payload: { name, deliver_date: deliveryDate },
    });

    setIsModalOpen(false);
    setName("");
    setDeliveryDate("");
    setSelectedFile(null);
    setPreview(null);
  };

  const handleDelete = (photoId: number) => {
    deleteProofMutation.mutate(photoId);
  };

  if (isLoading) {
    return <div className="p-6">Loading project...</div>;
  }

  return (
    <div className="container mx-auto max-w-6xl py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl md:text-3xl font-bold">Proof of Delivery - {project?.title}</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" /> Add Proof
        </Button>
      </div>

      {project?.photos?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {project.photos.map((photo: any) => (
            <Card key={photo.id} className="relative">
              <CardContent>
                <img
                  src={`${API_URL}${photo.image}`}
                  alt={photo.name}
                  className="w-full h-48 object-cover rounded-md mb-3"
                />
                <p className="text-sm text-muted-foreground mb-4">
                  Name of Recipient Institution: {photo.name}

                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  Date of Delivery: {photo.deliver_date}
                </p>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(photo.id)}
                  className="absolute top-3 right-3"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No proofs uploaded yet.</p>
      )}

      {/* Inline Modal Replacement */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Add Proof of Delivery</h2>
            <div className="space-y-4">
              <div>
                <Label>Name of Recipient Institution</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <Label>Delivery Date</Label>
                <Input
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                />
              </div>
              <div>
                <Label>Image</Label>
                <Input type="file" accept="image/*" onChange={handleFileChange} />
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="mt-3 w-full h-48 object-cover rounded-md"
                  />
                )}
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddProof} disabled={addProofMutation.isPending}>
                {addProofMutation.isPending ? "Uploading..." : "Add Proof"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProofOfDeliveryPage;
