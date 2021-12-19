import mongoose from 'mongoose'

const Schema = mongoose.Schema

const Session = new Schema(
  {
    sessionName: { type: String, required: true },
    date: { type: String },
    movements: [
      {
        movement: { type: String },
        weight: { type: String },
        reps: { type: String },
        rpe: { type: String },
        sets: { type: String },
        notes: { type: String },
      }
    ]
  },
  { timestamps: true}
)

export default mongoose.model('sessions', Session)
