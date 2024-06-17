import prisma from '@/lib/prisma';

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
	const user = await prisma.user.delete({
		where: {
			id: +params.id
		}
	})

	return new Response(JSON.stringify(user));
}