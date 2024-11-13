import mongoose, {Schema, Document, ObjectId, Model} from 'mongoose'
export interface IProject extends Document{
  name: string,
  description: string,
  githubLink?: string,
  deployLink?: string,
  screenshotUrl: string,
  stack: ObjectId[]
}

const ProjectSchema = new Schema<IProject>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  screenshotUrl: { type: String, required: true },
  stack: [{ type: Schema.Types.ObjectId, ref: 'Skill', required: true }],
  githubLink: { type: String, required: false },
  deployLink: { type: String, required: false },
})

const Project: Model<IProject> = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema)

export default Project