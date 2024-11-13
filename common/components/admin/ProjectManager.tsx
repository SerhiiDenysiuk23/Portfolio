import React, {useEffect, useState} from 'react';
import {IProjectDto} from "@/types/IProjectDto";
import {getRequest, modifyRequest} from "@/common/api/core";
import {GET_SKILL_LIST, PROJECTS, SKILLS} from "@/common/api/apiRoutes";
import {ISkillDto} from "@/types/ISkillDto";
import MultiSelect from "@/common/components/admin/MultiSelect";
import {IOption} from "@/types/IOption";

const defaultProject: IProjectDto = {
  name: "",
  description: "",
  screenshotUrl: "",
  stack: []
}

const ProjectManager = () => {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState("")
  const [project, setProject] = useState(defaultProject)
  const [skillList, setSkillList] = useState<ISkillDto[]>([])
  const [stack, setStack] = useState<string[]>([])

  useEffect(() => {
    getRequest(GET_SKILL_LIST).then(res => {
      setSkillList(res.skills)
    })
  }, []);

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview("");
    }
  }

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProject(prevState => ({...prevState, name: e.target.value}))
  }

  const handleChangeGithubLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProject(prevState => ({...prevState, githubLink: e.target.value}))
  }

  const handleChangeDeployLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProject(prevState => ({...prevState, deployLink: e.target.value}))
  }

  const handleChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProject(prevState => ({...prevState, description: e.target.value}))
  }

  const handleSelectSkills = (options: IOption[]) => {
    setStack(options.map(item => item.value))
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData();
    formData.append("name", project.name);
    formData.append("description", project.description);
    formData.append("githubLink", project.githubLink || "");
    formData.append("deployLink", project.deployLink || "");
    stack.forEach(item => formData.append("stack[]", item));
    if (file) {
      formData.append("screenshot", file); // Додаємо файл
    }

      modifyRequest(PROJECTS, formData, "POST", true)
        .then(res => {
          console.log(res)
        })

  }

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
          <img style={{width: 200, height: 200, objectFit: "contain", display: "block"}} src={preview} alt=""/>
          <input style={{display: "block"}} onChange={handleChangeFile} type="file"/>
          <input style={{display: "block"}} onChange={handleChangeName}  type="text" placeholder={"Name"}/>
          <input style={{display: "block"}} onChange={handleChangeGithubLink} type="text" placeholder={"Github link (optional)"}/>
          <input style={{display: "block"}} onChange={handleChangeDeployLink} type="text" placeholder={"Deploy link (optional)"}/>
          <textarea style={{display: "block"}} onChange={handleChangeDescription} placeholder={"Description"}/>
          <MultiSelect
            options={skillList.map(item => ({value: item._id ?? "", label: item.name}))}
            onChangeOptions={handleSelectSkills}
          />
        <button type="submit">Submit</button>
      </form>
      <img src="/api/img/1SQk0y8JAk4pT385DiTf8F4g0CmJdEjHC" alt=""/>
    </div>
  );
};

export default ProjectManager;