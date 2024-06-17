import prisma from '@/lib/prisma';
import { NextApiRequest } from 'next';

export async function PUT(request: Request, { params }: { params: { id: string } }) {

	const updatedUser = await prisma.user.update({
		where: {
			id: +params.id
		},
		data: {
			name: 'Ashot'
		}
	})

	return new Response(JSON.stringify(updatedUser));
}