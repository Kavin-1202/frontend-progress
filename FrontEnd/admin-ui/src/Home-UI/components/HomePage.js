import React from "react";
import Header from "./Header";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      {/* Body Content */}
      <main className="p-8">
        <section className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Welcome to LearningHub</h2>
          <p>
          Problem Statement 11: 
Scenario: In large organizations, the Learning and Development (L&D) team plays a crucial role in 
upskilling employees, ensuring compliance with training requirements, and fostering a culture of 
continuous learning. However, managing multiple training programs, tracking employee progress, 
and ensuring the relevance of content across diverse roles can be challenging. L&D teams often 
struggle with coordinating training schedules, personalizing learning paths, and gathering feedback 
to improve future programs. Additionally, with remote and hybrid work models becoming more 
prevalent, traditional in-person training methods are less feasible, requiring a shift to digital 
solutions.
          </p>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
