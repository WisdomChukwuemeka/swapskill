

export const About = () => {
  return (
    <section className=" flex flex-col justify-center bg-gradient-to-br">
      <div className=" max-full text-md md:text-3xl overflow-y-scroll md:overflow-hidden scroll-auto  h-screen p-3 rounded-3xl   shadow-[0_4px_60px_rgba(0,0,0,0.1)] overflow-hidden">
        <h1 className="text-4xl font-bold mb-4 text-green-700">About SwapSkill</h1>
        <p className=" text-white mb-6">
          SwapSkill is an innovative platform where people connect to share skills, 
          learn from one another, and grow together. Whether you’re an expert looking 
          to mentor, hire or a beginner eager to learn something new, SwapSkill bridges the 
          gap by enabling skill exchange in a collaborative community.
        </p>
        <h2 className="text-2xl font-semibold mb-2 text-green-600">Our Mission</h2>
        <p className="text-white mb-6">
          Our mission is to empower individuals by making learning accessible, hiring easy affordable, 
          and community-driven. We believe everyone has something valuable to offer.
        </p>
        <h2 className="text-2xl font-semibold mb-2 text-green-600">What Makes Us Different?</h2>
        <ul className="list-disc pl-6 text-white space-y-2">
          <li>Skill swapping with no monetary cost.</li>
          <li>Making hiring easy for companies.</li>
          <li>Build lasting connections with like-minded learners.</li>
          <li>Flexible sessions that fit your schedule.</li>
          <li>A safe, supportive, and diverse community.</li>
        </ul>
        <p className="text-white mt-6">
          Join us today and start swapping skills, growing your network, 
          and unlocking new opportunities!
        </p>
      </div>
    </section>
  );
};


