const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-blue-600 text-white py-20 px-10 text-center">
        <h1 className="text-4xl font-bold">About SmartHive AI</h1>
        <p className="mt-4 text-xl">
          Empowering Small Businesses through Data-Driven Customer Segmentation
        </p>
      </section>

      {/* Methodology Section */}
      <section className="py-16 px-10">
        <h2 className="text-3xl font-bold text-center mb-8">Our Methodology</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">
              Problem Definition and Stakeholder Analysis
            </h3>
            <p>
              We start by clearly defining the business problem and identifying
              key stakeholders such as the marketing, sales, and product
              development teams. This ensures we gather the right requirements
              for our segmentation model.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">
              Data Collection and Preparation
            </h3>
            <p>
              We collect data from various sources and preprocess it to ensure
              accuracy and consistency. This step includes handling missing
              values, normalizing data, and encoding categorical variables to
              prepare the data for analysis.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">
              Model Building and Deployment
            </h3>
            <p>
              We use advanced clustering algorithms like Hierarchical Clustering,to
              segment customers. Our user-friendly web application allows businesses
              to deploy these models, enabling real-time visualization and
              campaign execution.
            </p>
          </div>
        </div>
      </section>

      {/* Conclusion Section */}
      <section className="py-16 px-10 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-8">Conclusion</h2>
        <p className="text-lg max-w-4xl mx-auto text-center text-gray-700">
          SmartHive AI&apos;s customer segmentation model is designed to help
          small businesses in Kenya optimize their marketing efforts. With our
          data-driven approach, businesses can effectively target their
          customers, improve engagement, and boost growth in a highly
          competitive market.
        </p>
      </section>
    </div>
  );
};

export default About;
