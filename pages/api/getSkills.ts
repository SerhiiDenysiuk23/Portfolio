import type { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/common/lib/mongodb";
import Skill from "@/common/models/Skill";
import {ISkillDto} from "@/types/ISkillDto";

const getProjectList = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectToDatabase();


  try {
    if (req.method !== "GET"){
      return res.status(405).json({message: 'Method Not Allowed'});
    }

    const skills = await Skill.find({})
    const skillsDto = skills.map(item => ({_id: item._id, name: item.name, type: item.type} as ISkillDto))
    return res.status(200).json({skills: skillsDto})
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: 'Internal Server Error'});
  }


};

export default getProjectList;