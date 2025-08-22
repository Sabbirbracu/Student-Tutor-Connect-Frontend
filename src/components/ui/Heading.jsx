const Heading = ({ mainText, gradientText }) => {
  return (
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral leading-snug">
      {mainText}{" "}
      <span className="text-gradient">{gradientText}</span>
    </h1>
  );
};

export default Heading;
