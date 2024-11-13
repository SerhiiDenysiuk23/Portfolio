import {ObjectId} from "mongoose";
import {ISkillDto} from "@/types/ISkillDto";

export interface IProjectDto {
  _id?: string,
  name: string,
  description: string,
  githubLink?: string,
  deployLink?: string,
  screenshotUrl: string,
  stack: ObjectId[]
}


export interface IProjectGetDto extends Omit<IProjectDto, "stack">{
  stack: ISkillDto[]
}