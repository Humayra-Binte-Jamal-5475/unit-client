const HowItWorksSection = () => {
  return (
    <section className="py-12 px-6 bg-white">
      <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-6xl mx-auto">
        <div className="p-4 border bg-green-100 rounded-md shadow-sm">
          <h3 className="text-xl font-semibold mb-2">1. Donate or Request</h3>
          <p className="text-gray-600">
            Sign up and choose to donate surplus food or request available items from the list.
          </p>
        </div>
        <div className="p-4 border bg-green-100 rounded-md shadow-sm">
          <h3 className="text-xl font-semibold mb-2">2. Connect with the Community</h3>
          <p className="text-gray-600">
            Coordinate pickup or delivery with donors or recipients in your local area.
          </p>
        </div>
        <div className="p-4 border bg-green-100 rounded-md shadow-sm">
          <h3 className="text-xl font-semibold mb-2">3. Reduce Waste, Share Goodness</h3>
          <p className="text-gray-600">
            Help minimize food waste while ensuring someone in need enjoys a healthy meal.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
