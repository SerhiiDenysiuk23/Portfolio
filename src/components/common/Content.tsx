import React from 'react';
import AboutMe from "../AboutMe";
import Projects from "../Projects";
import Skills from "../Skills";

const Content = () => {
  return (
    <main className={'container'}>
      <AboutMe/>
      <Skills/>
      <Projects/>
    </main>
  );
};

export default Content;