import prisma from '@/lib/prisma';

export async function POST() {
	const withdrawUpdate = prisma.post.update({
		where: {
			id: 1,
		},
		data: {
			likeNum: {
				decrement: 5
			},
		},
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

	const result = await prisma.$transaction([withdrawUpdate, depositUpdate])

	return new Response(JSON.stringify(result));
}