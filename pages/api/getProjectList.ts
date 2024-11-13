import type { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/common/lib/mongodb";
import Project from "@/common/models/Project";
import {IProjectGetDto} from "@/types/IProjectDto";

const getProjectList = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectToDatabase();


  try {
    if (req.method !== "GET"){
      return res.status(405).json({message: 'Method Not Allowed'});
    }

    const projects = await Project.find({}).populate("stack")

    return res.status(200).json({projects})
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: 'Internal Server Error'});
  }


};

export default getProjectList;