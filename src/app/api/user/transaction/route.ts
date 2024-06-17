import prisma from '@/lib/prisma';

export async function POST() {
	const createDuplicateUser = prisma.user.create({
		data: {
			name: 'Duplicated',
			email: 'ashotisraelyan@gmail.com'
		}
	});

	const depositUpdate = prisma.post.update({
		where: {
			id: 2,
		},
		data: {
			likeNum: {
				increment: 5
			},
		},
	});

	const result = await prisma.$transaction([depositUpdate, createDuplicateUser])

	return new Response(JSON.stringify(result));
}