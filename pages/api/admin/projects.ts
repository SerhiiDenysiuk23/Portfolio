import {NextApiRequest, NextApiResponse} from "next";
import connectToDatabase from "@/common/lib/mongodb";
import {adminAuthMiddleware} from "@/common/middlewares/adminAuthMiddleware";
import {File as FormidableFile, IncomingForm} from 'formidable';
import {uploadFile} from "@/common/lib/googledrive";
import Project from "@/common/models/Project";
import {IProjectDto, IProjectGetDto} from "@/types/IProjectDto";
import Skill from "@/common/models/Skill";
import {ObjectId} from 'mongodb';
import {ISkillDto} from "@/types/ISkillDto";

export const config = {
  api: {
    bodyParser: false,
  },
};


const parseSingleField = (field: string | string[] | undefined): string | undefined => {
  return Array.isArray(field) ? field[0] : field;
};

const parseArrayField = (field: string | string[] | undefined): string[] => {
  if (Array.isArray(field)) {
    return field;
  }
  return field ? [field] : [];
};

// Функція для обробки запиту на створення проекту
const handleCreateProject = async (req: NextApiRequest, res: NextApiResponse) => {
  const form = new IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.log(err)
      return res.status(500).json({ error: 'Error parsing form' });
    }

    console.log(files)

    const project: IProjectDto = {
      name: parseSingleField(fields.name) ?? "",
      description: parseSingleField(fields.description) ?? "",
      githubLink: parseSingleField(fields.githubLink),
      deployLink: parseSingleField(fields.deployLink),
      stack: [],
      screenshotUrl: ""
    };

    const stack = parseArrayField(fields.stack);
    const file = Array.isArray(files.screenshot) ? files.screenshot[0] : files.screenshot as FormidableFile | undefined;

    if (!project.name || !project.description || !stack || !file) {
      return res.status(400).json({ message: 'Fields name, description, stack, and screenshot are required' });
    }

    try {
      const objectIds = (Array.isArray(stack) ? stack : [stack]).map(id => new ObjectId(id));
      const uploadedFile = await uploadFile(file.filepath, file.originalFilename || `${project.name}.jpg`);
      const projectStack = await Skill.find({ _id: { $in: objectIds } });

      const newProject = new Project({
        ...project,
        stack: objectIds,
        screenshotUrl: `https://drive.google.com/uc?export=view&id=${uploadedFile.id}`
      });

      await newProject.save();

      return res.status(201).json({
        project: {
          ...project,
          _id: newProject._id,
          screenshotUrl: newProject.screenshotUrl,
          stack: projectStack.map(item => ({_id: item._id, name: item.name, type: item.type} as ISkillDto))
        } as IProjectGetDto
      });
    } catch (error) {
      console.error('Error saving project:', error);
      return res.status(500).json({ message: 'Error saving project' });
    }
  });
};


const projects = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectToDatabase();

  try {
    switch (req.method) {
      case "POST": {
        await handleCreateProject(req, res)
      } break;
      case "PATCH": {
        return res.status(203).json({message: 'Ok'});
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

export default adminAuthMiddleware(projects);