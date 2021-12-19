import Session from '../models/session.js'

export const getSessions = async (req, res) => {
  try {
    const sessions = await Session.find()
    res.json(sessions)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: error.message })
  }
}

export const getSession = async (req, res) => {
  try {
    const { id } = req.params
    const session = await Session.findById(id)
    if (session) {
      return res.json(session)
    }
    res.status(404).json({ message: 'Session not found!' })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: error.message })
  }
}

export const createSession = async (req, res) => {
  try {
    const session = new Session(req.body)
    await session.save()
    res.status(201).json(session)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message })
  }
}

export const updateSession = async (req, res) => {
  const { id } = req.params
  const session = await Session.findByIdAndUpdate(id, req.body, { new: true })
  res.status(200).json(session)
}

export const deleteSession = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await Session.findByIdAndDelete(id)
    if (deleted) {
      return res.status(200).send('Session deleted')
    }
    throw new Error('Session not found')
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: error.message })
  }
}
