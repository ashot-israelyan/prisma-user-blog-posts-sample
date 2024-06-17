import prisma from '@/lib/prisma';

interface Body {
	name: string;
	email: string;
}

export async function POST(request: Request) {

	// const user = await prisma.user.create({
	// 	data: {
	// 		email: 'michael@prisma.io',
	// 		name: 'Michael Dev',
	// 		role: 'USER',
	// 		posts: {
	// 			create: [
	// 				{
	// 					title: 'Crash Course of next.js',
	// 					published: true,
	// 					categories: {
	// 						connectOrCreate: {
	// 							where: {
	// 								id: 12,
	// 							},
	// 							create: {
	// 								name: 'ORM'
	// 							},
	// 						}
	// 					}
	// 				},
	// 			]
	// 		}
	// 	},
	// });

	const body: Body = await request.json();

	const user = await prisma.user.create({
		data: {
			name: body.name,
			email: body.email,
		}
	});

	// const users = await prisma.user.createMany({
	// 	data: [
	// 		{
	// 			name: 'Yewande', email: 'yewande@prisma.io'
	// 		},
	// 		{
	// 			name: 'Angelique', email: 'angelique@prisma.io'
	// 		}
	// 	],
	// 	skipDuplicates: true,
	// });

	return new Response(JSON.stringify(user));
}