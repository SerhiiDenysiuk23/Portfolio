import React from 'react';
import {default as fe_skills} from '../data/fe-skills.json'
import {default as be_skills} from '../data/be-skills.json'

const Skills = () => {
  const [filterValue, setFilterValue] = React.useState<"fe" | "be">("fe")
  const [columns, setColumns] = React.useState<string[][]>([])
  const [columnCount, setColumnCount] = React.useState(4)

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1023) {
        setColumnCount(4);
      } else if (window.innerWidth >= 564) {
        setColumnCount(3);
      } else {
        setColumnCount(2);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [window.innerWidth]);

  React.useEffect(() => {
    let pickedList: string[]
    switch (filterValue) {
      case "fe":
        pickedList = fe_skills;
        break
      case "be":
        pickedList = be_skills;
        break
      default:
        console.error("Picked value is invalid");
        return
    }

    const rowCount = Math.ceil(pickedList.length / columnCount);
    setColumns(Array.from({length: columnCount}, (_, i) =>
        pickedList.slice(i * rowCount, (i + 1) * rowCount)
      )
    )
  }, [filterValue, columnCount])

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

      <div className="skills-table">
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="column">
            {column.map((str, index) => (
              <div key={index}>{str}</div>
            ))}
          </div>
        ))}
      </div>

      {/*<div className="skills-table1">*/}
      {/*  {*/}
      {/*    fe_skills.map((item) => <div key={item}>{item}</div>)*/}
      {/*  }*/}
      {/*</div>*/}
    </section>
  );
};

export default Skills;