import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, CheckCircle, Clock, AlertCircle, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type VerificationStatus = 'pending' | 'uploaded' | 'verified' | 'rejected';

interface IdCardUploadProps {
  onStatusChange?: (status: VerificationStatus) => void;
  onFileSelect?: (file: File | null) => void;
}

export const IdCardUpload = ({ onStatusChange, onFileSelect }: IdCardUploadProps) => {
  const [status, setStatus] = useState<VerificationStatus>('pending');
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPG, PNG, etc.)",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    // Create preview using object URL (in-memory only, no localStorage)
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    
    // Notify parent component of file selection
    onFileSelect?.(file);
    
    // Simulate upload delay
    setTimeout(() => {
      setStatus('uploaded');
      onStatusChange?.('uploaded');
      setIsUploading(false);
      
      toast({
        title: "ID Card Selected",
        description: "Your ID card is ready. It will be uploaded securely when you submit.",
      });
    }, 1000);
  };

  const handleRemove = () => {
    // Revoke object URL to free memory
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
    setStatus('pending');
    onStatusChange?.('pending');
    onFileSelect?.(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'uploaded':
        return (
          <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full text-sm font-medium">
            <Clock className="h-4 w-4" />
            Ready to Submit
          </div>
        );
      case 'verified':
        return (
          <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full text-sm font-medium">
            <CheckCircle className="h-4 w-4" />
            Verified
          </div>
        );
      case 'rejected':
        return (
          <div className="flex items-center gap-2 text-destructive bg-destructive/10 px-3 py-1.5 rounded-full text-sm font-medium">
            <AlertCircle className="h-4 w-4" />
            Rejected
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">ID Verification</CardTitle>
            <CardDescription>
              Upload your ID card for landlord verification
            </CardDescription>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          id="id-card-input"
        />

        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="ID Card Preview"
              className="w-full h-48 object-cover rounded-lg border border-border"
            />
            {status === 'pending' || status === 'uploaded' ? (
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8"
                onClick={handleRemove}
              >
                <X className="h-4 w-4" />
              </Button>
            ) : null}
          </div>
        ) : (
          <label
            htmlFor="id-card-input"
            className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
          >
            {isUploading ? (
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <div className="h-10 w-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <span className="text-sm">Processing...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <Upload className="h-10 w-10" />
                <span className="text-sm font-medium">Click to upload ID card</span>
                <span className="text-xs">JPG, PNG up to 5MB</span>
              </div>
            )}
          </label>
        )}

        <p className="text-xs text-muted-foreground mt-4">
          Your ID card will be securely uploaded and reviewed by our team. This typically takes 1-2 business days.
        </p>
      </CardContent>
    </Card>
  );
};
