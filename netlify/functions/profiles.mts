import type { Config, Context } from '@netlify/functions'

interface StudentProfile {
  id: string
  name: string
  university: string
  year: number
  major: string
  collabTypes: string[]
  skills: string[]
  bio: string
  avatarColor: string
  createdAt: string
}

// In-memory store (resets on cold start — use Netlify Blobs for persistence)
const profiles: StudentProfile[] = []

export default async (req: Request, _context: Context) => {
  const url = new URL(req.url)
  const method = req.method.toUpperCase()

  // GET /api/profiles — list all profiles
  if (method === 'GET') {
    const collabType = url.searchParams.get('collabType')
    const skill = url.searchParams.get('skill')

    let result = profiles
    if (collabType) result = result.filter(p => p.collabTypes.includes(collabType))
    if (skill) result = result.filter(p => p.skills.includes(skill))

    return Response.json({ profiles: result, total: result.length })
  }

  // POST /api/profiles — create a profile
  if (method === 'POST') {
    let body: Partial<StudentProfile>
    try {
      body = await req.json()
    } catch {
      return Response.json({ error: 'Invalid JSON body' }, { status: 400 })
    }

    if (!body.name || !body.university) {
      return Response.json({ error: 'name and university are required' }, { status: 400 })
    }

    if (!body.collabTypes || body.collabTypes.length === 0) {
      return Response.json({ error: 'At least one collabType is required' }, { status: 400 })
    }

    const profile: StudentProfile = {
      id: crypto.randomUUID(),
      name: body.name,
      university: body.university,
      year: body.year ?? 1,
      major: body.major ?? 'Student',
      collabTypes: body.collabTypes,
      skills: body.skills ?? [],
      bio: body.bio ?? '',
      avatarColor: body.avatarColor ?? '#6C63FF',
      createdAt: new Date().toISOString(),
    }

    profiles.push(profile)
    return Response.json({ profile }, { status: 201 })
  }

  return Response.json({ error: 'Method not allowed' }, { status: 405 })
}

export const config: Config = {
  path: '/api/profiles',
  method: ['GET', 'POST'],
}
