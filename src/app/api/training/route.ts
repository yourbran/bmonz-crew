// src/app/api/training/route.ts

import { NextRequest, NextResponse } from 'next/server'
import pool from '@/services/db'

export async function POST(req: NextRequest) {
  const data = await req.json()

  const { routine, weight, angle } = data

  try {
    await pool.query(
      'INSERT INTO training_logs (routine, weight, angle) VALUES ($1, $2, $3)',
      [routine, weight, angle]
    )
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ success: false, message: 'DB error' }, { status: 500 })
  }
}
