import React from 'react';

const MainContent = () => {
  return (
    <>
      {/* ABOUT SECTION */}
      <section id="about" className="section-padding">
        <div className="container">
          <div className="row align-items-center">
            <div className="about-text">
              <h2>Welcome to [School Name]</h2>
              <p>With a legacy of excellence, we strive to nurture young minds through a holistic approach to education.</p>
              <ul>
                <li>✓ 20+ Years of Academic Excellence</li>
                <li>✓ Expert & Certified Faculty</li>
                <li>✓ Modern Learning Infrastructure</li>
              </ul>
            </div>
            <div className="about-image">
              <img src="https://images.unsplash.com/photo-1523050853064-dbad350C7b67?auto=format&fit=crop&w=600&q=80" alt="About Us" />
            </div>
          </div>
        </div>
      </section>

      {/* ACADEMICS SECTION */}
      <section id="academics" className="section-padding bg-light">
        <div className="container text-center">
          <h2 className="section-title">Academics</h2>
          <div className="grid-container">
            <div className="card">
              <h3>Pre-Primary</h3>
              <p>Focusing on play-based learning and sensory development.</p>
            </div>
            <div className="card">
              <h3>High School</h3>
              <p>Preparing students for global challenges through rigorous programs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="section-padding">
        <div className="container">
          <h2 className="section-title text-center">Contact Us</h2>
          <div className="row">
            <div className="contact-form">
              <form onSubmit={(e) => e.preventDefault()}>
                <input type="text" placeholder="Your Name" required />
                <input type="email" placeholder="Your Email" required />
                <textarea placeholder="Your Message" rows="5"></textarea>
                <button type="submit" className="btn-primary">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* APPLY NOW FOOTER */}
      <footer className="apply-footer">
        <div className="container">
          <div className="apply-content">
            <h3>Ready to join the [School Name] Family?</h3>
            <a href="#contact" className="apply-btn">Apply Now for 2024-25</a>
          </div>
          <p className="copyright">&copy; 2023 [School Name]. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default MainContent;
