import prisma from '@/lib/prisma';

export async function GET() {
	// const posts = await prisma.post.findMany({
	// 	where: {
	// 		OR: [
	// 			{
	// 				title: {
	// 					contains: 'github',
	// 					mode: 'insensitive'
	// 				}
	// 			},
	// 			{
	// 				title: {
	// 					contains: 'Twitter'
	// 				}
	// 			}
	// 		],
	// 		AND: {
	// 			published: true,
	// 		}
	// 	}
	// });

	const posts = await prisma.post.findMany({
		where: {
			author: {
				isNot: {
					name: 'Jack'
				},
				is: {
					email: {
						startsWith: 's'
					}
				}
			}
		},
		include: {
			author: true,
		}
	});

	return new Response(JSON.stringify(posts));
}