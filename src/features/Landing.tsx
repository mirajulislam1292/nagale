import { Hero } from './landing/Hero';
import {
  CategoriesSection,
  HowItWorksSection,
  TrustSection,
  ProviderCtaSection,
  SampleProfilesSection,
  LearningTeaser,
} from './landing/LandingSections';

export function Component() {
  return (
    <div className="w-full flex flex-col">
      <Hero />
      <CategoriesSection />
      <HowItWorksSection />
      <TrustSection />
      <ProviderCtaSection />
      <SampleProfilesSection />
      <LearningTeaser />
    </div>
  );
}
