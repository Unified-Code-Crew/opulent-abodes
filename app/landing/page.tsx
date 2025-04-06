import React from "react";
// import FeatureSection from "./feature-section";
import FeatureSection from "./FeatureSection";
// import HeroSection from "./feature-section2";
import ApartmentSelection from "./ApartmentSelection";
import DummySection from "./DummySection";
const page = () => {
  return (
    <div className="overflow-x-hidden">
      {/* Section 1 */}
      <FeatureSection />
      <ApartmentSelection />
      <DummySection />
    </div>
  );
};

export default page;
