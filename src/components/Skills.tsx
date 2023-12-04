import React from 'react';
import {default as fe_skills} from '../data/fe-skills.json'
import {default as be_skills} from '../data/be-skills.json'

const Skills = () => {
  const [filterValue, setFilterValue] = React.useState<"fe" | "be">("be")

  const [data, setData] = React.useState(fe_skills)

  React.useEffect(() => {
    switch (filterValue) {
      case "fe":
        setData(fe_skills)
        break
      case "be":
        setData(be_skills)
        break
      default:
        console.error("Picked value is invalid");
        return
    }
  }, [filterValue])

  const handleSwitchFilter = (value: "fe" | "be") => {
    setFilterValue(value)
  }

  return (
    <section id={"skills"}>
      <h2>Skills</h2>
      <div className='skill-filter'>
        <div onClick={() => {
          handleSwitchFilter("fe")
        }} className={filterValue === "fe" ? 'active' : ""}>FRONT-END
        </div>
        <div onClick={() => {
          handleSwitchFilter("be")
        }} className={filterValue === "be" ? 'active' : ""}>BACK-END
        </div>
      </div>

      <div className="skills-table1">
        {data.map((item) => (
          <div key={item}>{item}</div>
        ))}
      </div>
    </section>
  );
};

export default Skills;