import { Search, MessageCircle, Key, Home, Upload, Users, Wallet } from 'lucide-react';

export const HowItWorks = () => {
  const tenantSteps = [
    {
      icon: Search,
      title: 'Search Properties',
      description: 'Browse our extensive listings with filters for location, price, and amenities.',
    },
    {
      icon: MessageCircle,
      title: 'Contact Directly',
      description: 'Call or WhatsApp landlords and caretakers instantly for inquiries.',
    },
    {
      icon: Key,
      title: 'Move In',
      description: 'Finalize the deal, sign your lease, and get your keys. Welcome home!',
    },
  ];

  const landlordSteps = [
    {
      icon: Upload,
      title: 'List For Free',
      description: 'Create your property listing in minutes. Upload photos and details.',
    },
    {
      icon: Users,
      title: 'Get Inquiries',
      description: 'Receive direct calls and messages from verified interested tenants.',
    },
    {
      icon: Wallet,
      title: 'Earn Commission',
      description: 'Only pay a small commission when you successfully find a tenant.',
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-secondary/30">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Home className="w-4 h-4" />
            Simple Process
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            How HomeFinder Works
          </h2>
          <p className="text-muted-foreground">
            Whether you're looking for a home or listing your property, we've made it simple.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* For Tenants */}
          <div className="space-y-8">
            <h3 className="font-display text-2xl font-bold text-foreground flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                1
              </span>
              For House Hunters
            </h3>
            <div className="space-y-6">
              {tenantSteps.map((step, index) => (
                <div 
                  key={step.title}
                  className="flex gap-4 p-5 bg-card rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 opacity-0 animate-fade-in-up"
                  style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }}
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-foreground mb-1">
                      {step.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* For Landlords */}
          <div id="for-landlords" className="space-y-8">
            <h3 className="font-display text-2xl font-bold text-foreground flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-bold">
                2
              </span>
              For Landlords & Caretakers
            </h3>
            <div className="space-y-6">
              {landlordSteps.map((step, index) => (
                <div 
                  key={step.title}
                  className="flex gap-4 p-5 bg-card rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 opacity-0 animate-fade-in-up"
                  style={{ animationDelay: `${(index + 3) * 150}ms`, animationFillMode: 'forwards' }}
                >
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <step.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-foreground mb-1">
                      {step.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
