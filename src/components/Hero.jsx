import "./Hero.css";

export default function Hero() {
  const handleScrollToBook = () => {
    const section = document.getElementById("book");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <h1>Your Journey, Our Responsibility</h1>
        <p>
          Choose your ride, calculate your fare instantly, and travel
          stress-free with Aditya Transport.
        </p>
        <button className="book-btn" onClick={handleScrollToBook}>
          Book Now
        </button>
      </div>
    </section>
  );
}
