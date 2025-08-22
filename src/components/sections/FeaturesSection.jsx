import FeatureCard from "../cards/FeatureCard";

const features = [
  { icon: "🎯", title: "Smart Matching", description: "Get paired with tutors who specialize in your course and learning style." },
  { icon: "📅", title: "Flexible Scheduling", description: "Book sessions that fit your schedule with our intuitive calendar system." },
  { icon: "🔒", title: "Secure Platform", description: "Department-verified tutors and students ensure a safe learning environment." },
  { icon: "⭐", title: "Real-time Reviews", description: "Read authentic reviews and ratings to choose the perfect tutor for you." },
  { icon: "📚", title: "Course Coverage", description: "Find tutors for all available courses with comprehensive subject expertise." },
  { icon: "👥", title: "Admin Support", description: "Dedicated admin team ensures quality and handles any platform issues." },
];


const FeaturesSection = () => {
  return (
    <section className="py-16 bg-neutral-light">
      <div className="max-w-7xl mx-auto px-4 text-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold">
          Why Choose <span className="text-gradient">Student Tutor Connect</span>?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We've built the most comprehensive and user-friendly platform for academic collaboration
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

