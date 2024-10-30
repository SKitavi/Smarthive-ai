const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20 px-10 text-center">
        <h1 className="text-4xl font-bold">SmartHive AI</h1>
        <p className="mt-4 text-xl">
          Data-driven customer segmentation for small businesses in Kenya.
        </p>
      </section>

      {/* Problem Statement Section */}
      <section className="py-16 px-10">
        <h2 className="text-3xl font-bold text-center mb-8">
          Problem Statement
        </h2>
        <p className="text-lg max-w-3xl mx-auto text-center text-gray-700">
          In the competitive retail landscape of Kenya, small businesses face
          challenges in effectively targeting and engaging their diverse
          customer base. Inefficient marketing strategies due to a lack of
          customer insights lead to wasted budgets and missed revenue
          opportunities.
        </p>
        <p className="text-lg max-w-3xl mx-auto text-center text-gray-700 mt-4">
          SmartHive AI presents a data-driven customer segmentation model
          tailored for small businesses, helping them optimize their marketing
          strategies, increase engagement, and drive business growth.
        </p>
      </section>

      {/* Objectives Section */}
      <section className="bg-white py-16 px-10">
        <h2 className="text-3xl font-bold text-center mb-8">Our Objectives</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="bg-gray-200 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">
              Build a Customer Segmentation Model
            </h3>
            <p>
              Segment customers based on their purchasing behavior,
              demographics, preferences, and engagement patterns.
            </p>
          </div>
          <div className="bg-gray-200 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">
              Measure and Evaluate Impact
            </h3>
            <p>
              Analyze the effectiveness of segmentation strategies and
              continuously improve marketing efforts.
            </p>
          </div>
          <div className="bg-gray-200 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">
              Interactive Web Application
            </h3>
            <p>
              Deploy the model through an easy-to-use web application that allows
              stakeholders to visualize segments, run campaigns, and track
              performance in real time.
            </p>
          </div>
          <div className="bg-gray-200 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">
              Boost Business Growth
            </h3>
            <p>
              Help small businesses improve customer engagement and loyalty,
              driving growth in Kenya&apos;s competitive retail market.
            </p>
          </div>
        </div>
      </section>

      {/* Group Members Section */}
      <section className="py-16 px-10 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-8">Our Team</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 text-center">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Diana Olulo</h3>
            <p>Team Member</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Sharon Kitavi</h3>
            <p>Team Member</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Eli John</h3>
            <p>Team Member</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Esther Taifa</h3>
            <p>Team Member</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Rita Njoki</h3>
            <p>Team Member</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
