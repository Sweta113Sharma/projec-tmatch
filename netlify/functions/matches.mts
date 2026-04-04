import type { Config, Context } from '@netlify/functions'

interface Match {
  id: string
  fromId: string
  toId: string
  type: 'like' | 'superlike'
  matchedAt: string
}

// In-memory store for demo — replace with Netlify Blobs for real persistence
const matches: Match[] = []

export default async (req: Request, _context: Context) => {
  const method = req.method.toUpperCase()
  const url = new URL(req.url)

  // GET /api/matches?userId=xxx — get matches for a user
  if (method === 'GET') {
    const userId = url.searchParams.get('userId')
    if (!userId) {
      return Response.json({ error: 'userId query param required' }, { status: 400 })
    }
    const userMatches = matches.filter(m => m.fromId === userId || m.toId === userId)
    return Response.json({ matches: userMatches, total: userMatches.length })
  }

  // POST /api/matches — record a like/superlike
  if (method === 'POST') {
    let body: Partial<Match>
    try {
      body = await req.json()
    } catch {
      return Response.json({ error: 'Invalid JSON body' }, { status: 400 })
    }

    if (!body.fromId || !body.toId) {
      return Response.json({ error: 'fromId and toId are required' }, { status: 400 })
    }

    // Check if the other person already liked back → mutual match
    const existing = matches.find(m => m.fromId === body.toId && m.toId === body.fromId)
    const isMutual = !!existing

    const match: Match = {
      id: crypto.randomUUID(),
      fromId: body.fromId,
      toId: body.toId,
      type: body.type === 'superlike' ? 'superlike' : 'like',
      matchedAt: new Date().toISOString(),
    }

    matches.push(match)

    return Response.json({ match, isMutual }, { status: 201 })
  }

  return Response.json({ error: 'Method not allowed' }, { status: 405 })
}

export const config: Config = {
  path: '/api/matches',
  method: ['GET', 'POST'],
}
