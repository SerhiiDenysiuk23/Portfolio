import mongoose, {Schema, Document, Model} from "mongoose";

export interface ISkill extends Document{
  name: string,
  type: 'FE' | 'BE' | 'FS'
}

const SkillSchema = new Schema<ISkill>({
  name: {type: String, required: true},
  type: {type: String, required: true}
})

const Skill: Model<ISkill> = mongoose.models.Skill || mongoose.model<ISkill>('Skill', SkillSchema)

export default Skill