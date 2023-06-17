import { db } from '@/lib/db';
import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'


export async function POST(req: Request) {

    const body = await req.json()
    const { name, email, password } = body

    if (!name || !email || !password) {
        return new NextResponse('Missing Fields', { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const exist = await db.user.findUnique({
        where: {
            email
        }
    })
    if (exist) {
        return new NextResponse('Email already exists', { status: 401 })
    }
    const user = await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })

    return NextResponse.json(user)
}