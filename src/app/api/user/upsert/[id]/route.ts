import prisma from '@/lib/prisma';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
	const updatedUser = await prisma.user.upsert({
		where: {
			id: +params.id
		},
		update: {
			name: 'userFounded'
		},
		create: {
			name: 'newUser',
			email: 'newUser@prisma.io'
		}
	});

	return new Response(JSON.stringify(updatedUser));
}