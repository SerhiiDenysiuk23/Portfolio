import React, {useEffect} from 'react';
import SkillsManager from "@/common/components/admin/SkillsManager";
import {useRouter} from "next/router";
import {isAdmin} from "@/common/helpers/isAdmin";
import ProjectManager from "@/common/components/admin/ProjectManager";

const Panel = () => {
  const router = useRouter()
  useEffect(() => {
    if (!isAdmin()){
      router.push("/")
    }
  }, []);

  return (
    <div>
      <SkillsManager/>
      <ProjectManager/>
    </div>
  );
};

export default Panel;