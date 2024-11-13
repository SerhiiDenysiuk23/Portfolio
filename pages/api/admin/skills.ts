import {NextApiRequest, NextApiResponse} from "next";
import connectToDatabase from "@/common/lib/mongodb";
import {adminAuthMiddleware} from "@/common/middlewares/adminAuthMiddleware";
import {ISkillDto} from "@/types/ISkillDto";
import Skill from "@/common/models/Skill";

const skills = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectToDatabase();


  try {
    switch (req.method) {
      case "POST": {
        const skill = req.body as ISkillDto
        console.log(skill)
        const newSkill = new Skill({...skill})
        await newSkill.save()
        const newSkillDto = {...skill, _id: newSkill._id as string}
        return res.status(201).json({skill: newSkillDto});
      }
      case "PATCH": {
        const {_id, ...skill} = req.body as ISkillDto
        const updatedSkill = await Skill.findByIdAndUpdate(_id, {...skill})
        if (!updatedSkill){
          return res.status(404).json({message: "Skill not found"})
        }
        return res.status(200).json({skill: {_id, ...skill}});
      }
      case "DELETE": {
        const id = req.body
        const updatedSkill = await Skill.findByIdAndDelete(id)
        if (!updatedSkill){
          return res.status(404).json({message: "Skill not found"})
        }
        return res.status(200).json({isDeleted: true});
      }
      default: {
        return res.status(405).json({message: 'Method Not Allowed'});
      }
    }

  } catch (error) {
    console.log(error)
    return res.status(500).json({message: 'Internal Server Error'});
  }


};

export default adminAuthMiddleware(skills);