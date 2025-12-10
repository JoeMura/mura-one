import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Home, Upload, Check, Building2, Droplets, Zap, Car, PawPrint, Phone, Image, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  // Step 1
  title: string;
  type: string;
  rent: string;
  location: string;
  // Step 2
  water: string;
  electricity: string;
  parking: boolean;
  petsAllowed: boolean;
  // Step 3
  phone: string;
  photos: File[];
  utilityBill: File | null;
}

const steps = [
  { id: 1, title: 'The Basics', icon: Home },
  { id: 2, title: 'The Details', icon: Droplets },
  { id: 3, title: 'Verification', icon: Check },
];

const AddProperty = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    type: '',
    rent: '',
    location: '',
    water: '',
    electricity: '',
    parking: false,
    petsAllowed: false,
    phone: '',
    photos: [],
    utilityBill: null,
  });

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      updateFormData('photos', [...formData.photos, ...filesArray]);
    }
  };

  const handleUtilityBillUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      updateFormData('utilityBill', e.target.files[0]);
    }
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    console.log('Property Listing Data:', formData);
    toast({
      title: 'Listing submitted!',
      description: 'Your property has been submitted for review.',
    });
  };

  const isStepOneValid = formData.title && formData.type && formData.rent && formData.location;
  const isStepTwoValid = formData.water && formData.electricity;
  const isStepThreeValid = formData.phone;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-xl font-semibold">List Your Property</h1>
          <div className="w-24" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;

              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        'w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300',
                        isActive && 'bg-primary text-primary-foreground shadow-lg shadow-primary/30',
                        isCompleted && 'bg-primary/20 text-primary',
                        !isActive && !isCompleted && 'bg-muted text-muted-foreground'
                      )}
                    >
                      {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                    </div>
                    <span
                      className={cn(
                        'mt-2 text-sm font-medium',
                        isActive && 'text-primary',
                        !isActive && 'text-muted-foreground'
                      )}
                    >
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={cn(
                        'flex-1 h-1 mx-4 rounded-full transition-all duration-300',
                        isCompleted ? 'bg-primary' : 'bg-muted'
                      )}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-card rounded-2xl border border-border shadow-lg p-6 md:p-8">
          {/* Step 1: The Basics */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Property Basics</h2>
                  <p className="text-sm text-muted-foreground">Tell us about your property</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Property Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Spacious 1BR in Roysambu"
                    value={formData.title}
                    onChange={(e) => updateFormData('title', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Property Type</Label>
                  <Select value={formData.type} onValueChange={(value) => updateFormData('type', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="bedsitter">Bedsitter</SelectItem>
                      <SelectItem value="bungalow">Bungalow</SelectItem>
                      <SelectItem value="maisonette">Maisonette</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rent">Monthly Rent (KES)</Label>
                  <Input
                    id="rent"
                    type="number"
                    placeholder="e.g., 15000"
                    value={formData.rent}
                    onChange={(e) => updateFormData('rent', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location / Estate</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Roysambu, Nairobi"
                    value={formData.location}
                    onChange={(e) => updateFormData('location', e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: The Details */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Droplets className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Property Details</h2>
                  <p className="text-sm text-muted-foreground">Crucial info for tenants</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="water" className="flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-blue-500" />
                    Water Situation
                  </Label>
                  <Select value={formData.water} onValueChange={(value) => updateFormData('water', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select water source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="city-council">City Council</SelectItem>
                      <SelectItem value="borehole">Borehole</SelectItem>
                      <SelectItem value="rationed">Rationed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="electricity" className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    Electricity
                  </Label>
                  <Select value={formData.electricity} onValueChange={(value) => updateFormData('electricity', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select electricity type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tokens">Tokens (Prepaid)</SelectItem>
                      <SelectItem value="postpaid">Postpaid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-4 space-y-4">
                  <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                    <Checkbox
                      id="parking"
                      checked={formData.parking}
                      onCheckedChange={(checked) => updateFormData('parking', checked)}
                    />
                    <div className="flex items-center gap-2">
                      <Car className="w-4 h-4 text-muted-foreground" />
                      <Label htmlFor="parking" className="cursor-pointer">
                        Parking Available
                      </Label>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                    <Checkbox
                      id="pets"
                      checked={formData.petsAllowed}
                      onCheckedChange={(checked) => updateFormData('petsAllowed', checked)}
                    />
                    <div className="flex items-center gap-2">
                      <PawPrint className="w-4 h-4 text-muted-foreground" />
                      <Label htmlFor="pets" className="cursor-pointer">
                        Pets Allowed
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Verification & Photos */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Check className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Verification & Photos</h2>
                  <p className="text-sm text-muted-foreground">Almost done! Just a few more details</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    Landlord Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="e.g., 0712345678"
                    value={formData.phone}
                    onChange={(e) => updateFormData('phone', e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Required for verification purposes</p>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Image className="w-4 h-4 text-muted-foreground" />
                    Property Photos
                  </Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                      id="photos"
                    />
                    <label htmlFor="photos" className="cursor-pointer">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm font-medium">Click to upload photos</p>
                      <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 10MB each</p>
                    </label>
                  </div>
                  {formData.photos.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.photos.map((file, index) => (
                        <div key={index} className="px-3 py-1 bg-muted rounded-full text-sm">
                          {file.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    Utility Bill (Optional)
                  </Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors bg-muted/30">
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleUtilityBillUpload}
                      className="hidden"
                      id="utilityBill"
                    />
                    <label htmlFor="utilityBill" className="cursor-pointer">
                      <FileText className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm font-medium">Upload a recent water/power bill</p>
                      <p className="text-xs text-muted-foreground mt-1">Increases trust score ⭐</p>
                    </label>
                  </div>
                  {formData.utilityBill && (
                    <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm inline-block mt-2">
                      ✓ {formData.utilityBill.name}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className={cn(currentStep === 1 && 'invisible')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {currentStep < 3 ? (
              <Button
                onClick={nextStep}
                disabled={
                  (currentStep === 1 && !isStepOneValid) ||
                  (currentStep === 2 && !isStepTwoValid)
                }
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                variant="hero"
                onClick={handleSubmit}
                disabled={!isStepThreeValid}
              >
                <Check className="w-4 h-4 mr-2" />
                Submit Listing
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddProperty;
