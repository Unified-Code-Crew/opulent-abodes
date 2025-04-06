import React from "react";

const DummySection = () => {
  return (
    <div>
      <div className="dummysection relative py-24 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/40 z-10"></div>
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1540541338287-41700207dee6"
            alt="Luxury estate background"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl md:text-7xl font-bold mb-6">
                Find Your <span className="text-[#e95c33]">Dream Home</span>
              </h2>
              <p className="text-xl mb-8 max-w-lg">
                Our exclusive portfolio features only the most prestigious
                properties in the world's most coveted locations. Let our luxury
                specialists guide you to your perfect residence.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-4 bg-[#e95c33] text-white rounded-full hover:bg-[#d44a22] transition-colors">
                  Schedule Consultation
                </button>
                <button className="px-8 py-4 border-2 border-white rounded-full hover:bg-white hover:text-black transition-colors">
                  Browse All Properties
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 border-t-4 border-l-4 border-[#e95c33]"></div>
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg">
                <h3 className="text-2xl font-medium mb-4">Property Search</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm">Location</label>
                    <select className="w-full p-3 bg-black/50 border border-white/30 rounded-md">
                      <option>Any Location</option>
                      <option>Miami</option>
                      <option>Los Angeles</option>
                      <option>New York</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm">Property Type</label>
                    <select className="w-full p-3 bg-black/50 border border-white/30 rounded-md">
                      <option>Any Type</option>
                      <option>Waterfront</option>
                      <option>Penthouse</option>
                      <option>Villa</option>
                      <option>Estate</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm">Price Range</label>
                    <select className="w-full p-3 bg-black/50 border border-white/30 rounded-md">
                      <option>Any Price</option>
                      <option>$1M - $5M</option>
                      <option>$5M - $10M</option>
                      <option>$10M+</option>
                    </select>
                  </div>
                  <button className="w-full py-3 bg-[#e95c33] text-white rounded-md hover:bg-[#d44a22] transition-colors">
                    Search Properties
                  </button>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b-4 border-r-4 border-[#e95c33]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DummySection;
