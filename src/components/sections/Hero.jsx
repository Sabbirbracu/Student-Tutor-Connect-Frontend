import heroImg from "../../assets/HeroImg.png"; // Replace with actual image
import Button from "../ui/Button";
import Heading from "../ui/Heading";

// Example avatars (you can replace with real images)
const avatars = [
  "https://i.pravatar.cc/40?img=1",
  "https://i.pravatar.cc/40?img=2",
  "https://i.pravatar.cc/40?img=3",
];

const Hero = () => {
  return (
    <section className="bg-neutral-light py-16">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-6 items-center">
        {/* Left Column */}
        <div className="space-y-6">
          <Heading mainText="Connect with" gradientText="Expert Tutors" />
          <p className="text-gray-600 text-lg max-w-lg">
            Our modern platform seamlessly connects students with qualified tutors,
            making academic support accessible, organized, and effective for everyone.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <Button variant="gradient" className="shadow-lg transform transition-transform hover:scale-105">
              Find a Tutor
            </Button>
            
            <Button
            variant="outline"
            className="border border-gray-300 hover:border-gray-800 hover:text-gray-900 transform transition-all duration-300 hover:scale-105"
            >
            Become a Tutor
            </Button>



          </div>

          {/* Premium Badge Strip */}
          <div className="flex flex-wrap gap-4 mt-6">
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-md px-4 py-2 rounded-full shadow-md transition-transform hover:scale-105 cursor-default">
                <span className="font-bold text-primary">10k+</span>
                <span className="text-gray-700 text-sm">Students Enrolled</span>
            </div>
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-md px-4 py-2 rounded-full shadow-md transition-transform hover:scale-105 cursor-default">
                <span className="font-bold text-primary">500+</span>
                <span className="text-gray-700 text-sm">Certified Tutors</span>
            </div>
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-md px-4 py-2 rounded-full shadow-md transition-transform hover:scale-105 cursor-default">
                <span className="font-bold text-primary">98%</span>
                <span className="text-gray-700 text-sm">Success Rate</span>
            </div>
            </div>

        </div>

        {/* Right Column */}
        <div className="relative flex justify-center md:justify-end">
          {/* Rotated Div behind image */}
          <div className="absolute top-4 right-4 w-[110%] h-[110%] bg-primary-light rounded-2xl transform rotate-6 -z-10"></div>

          {/* Hero Image */}
          <img
            src={heroImg}
            alt="Students collaborating"
            className="rounded-2xl shadow-lg w-full max-w-lg relative z-10 transform transition-transform hover:scale-105"
          />

          {/* Active Students Badge */}
          <div className="absolute bottom-4 left-4 bg-white/70 backdrop-blur-md border border-gray-200 shadow-lg rounded-xl px-4 py-3 flex items-center gap-3 z-20">
            {/* Avatar Group */}
            <div className="flex -space-x-2">
              {avatars.map((avatar, index) => (
                <img
                  key={index}
                  src={avatar}
                  alt="student avatar"
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
              ))}
            </div>
            <span className="text-gray-800 font-semibold text-sm">10k+ Active Students</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
