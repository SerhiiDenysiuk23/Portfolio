import React, {useEffect, useState} from 'react';
import {getRequest, modifyRequest} from "@/common/api/core";
import {GET_SKILL_LIST, SKILLS} from "@/common/api/apiRoutes";
import {ISkillDto} from "@/types/ISkillDto";

const SkillsManager = () => {
  const [skill, setSkill] = useState<ISkillDto>({name: "", type: "FS"})
  const [skillList, setSkillList] = useState<ISkillDto[]>([])
  const [skillToUpdate, setSkillToUpdate] = useState<ISkillDto | null>(null)

  useEffect(() => {
    getRequest(GET_SKILL_LIST).then(res => {
      setSkillList(res.skills)
    })
  }, []);

  const handleInputName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (skillToUpdate)
      setSkillToUpdate({...skillToUpdate, name: e.target.value})
    else
      setSkill(prevState => ({...prevState, name: e.target.value}))
  }
  const handleSelectType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (skillToUpdate)
      setSkillToUpdate({...skillToUpdate, type: e.target.value as "FE" | "BE" | "FS"})
    else
      setSkill(prevState => ({...prevState, type: e.target.value as "FE" | "BE" | "FS"}))
  }

  const handleDelete = (id?: string) => {
    if (!id)
      return

    modifyRequest(SKILLS, id, "DELETE").then(res => {
      if (res.isDeleted) {
        setSkillList(prevState => prevState.filter(item => item._id !== id))
      }
    })
  }

  const handleSkillToUpdateChange = (item: ISkillDto | null) => {
    setSkillToUpdate(item)
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (skillToUpdate) {
      modifyRequest(SKILLS, skillToUpdate, "PATCH").then(res => {
        const updatedSkill = res.skill
        if (updatedSkill) {
          setSkillList(prevState => prevState.map(item => item._id === updatedSkill._id ? updatedSkill : item))
          setSkillToUpdate(null)
        }
      })
    } else {
      modifyRequest(SKILLS, skill)
        .then(res => {
          setSkillList(prevState => ([res.skill, ...prevState]))
          setSkill({name: "", type: "FS"})
        })
    }
  }

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          onChange={handleInputName}
          value={skillToUpdate ? skillToUpdate.name : skill.name}
          type="text"
          placeholder={"Name"}
        />
        <select value={skillToUpdate ? skillToUpdate.type : skill.type} onChange={handleSelectType}>
          <option value="FE">Front-End</option>
          <option value="BE">Back-End</option>
          <option value="FS">Full-Stack</option>
        </select>

        <button type="submit">{skillToUpdate ? "Update" : "Create"}</button>
      </form>

      <div>
        <ul>
          {skillList.map(item =>
            !(skillToUpdate && skillToUpdate._id === item._id)
              ? <li key={item._id}>{item.name} | {item.type} | <button
                onClick={() => handleDelete(item._id)}>DELETE</button> | <button
                onClick={() => handleSkillToUpdateChange(item)}>UPDATE</button></li>
              : <li key={item._id}>{item.name} | {item.type} | <button
                onClick={() => handleSkillToUpdateChange(null)}>CANCEL</button></li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SkillsManager;