import mongoose from 'mongoose'

const Schema = mongoose.Schema

const Movements = new Schema( 
  {
    movement: { type: String },
    weight: { type: String },
    reps: { type: String },
    rpe: { type: String },
    sets: { type: String },
    notes: { type: String },
  }
)

const Session = new Schema(
  {
    sessionName: { type: String },
    date: { type: String },
    movements: [ Movements ]
  },
  { timestamps: true}
)

export default mongoose.model('sessions', Session)