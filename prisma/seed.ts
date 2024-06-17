import { Prisma, PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

function generatePostData(): Prisma.PostCreateInput {
	return {
		title: faker.lorem.sentence(),
		published: faker.datatype.boolean(),
		likeNum: faker.number.int({ min: 0, max: 100 }),
		categories: {
			connect: [
				{ id: faker.number.int({ min: 1, max: 10 }) }, // Assuming 2 categories
			],
		},
	};
}

const userData: Prisma.UserCreateInput[] = [
	{
		name: "John",
		email: "John@prisma.io",
		posts: {
			create: [
				{
					title: "Join the Prisma Slack",
					published: true,
					likeNum: 10,
					categories: {
						create: Array.from({ length: 10 }, () => {
							return {
								name: faker.commerce.productName()
							}
						})
					},
				},
				...(Array.from({ length: 20 }, generatePostData))
			],
		},
	},
	{
		name: "Jack",
		email: "jack@prisma.io",
		posts: {
			create: Array.from({ length: 50 }, generatePostData)
		},
	},
	{
		name: "sara",
		email: "sara@prisma.io",
		posts: {
			create: Array.from({ length: 40 }, generatePostData)
		},
	},
];

async function main() {
	console.log('Start seeding...');

	for (const u of userData) {
		const user = await prisma.user.create({
			data: u,
		});

		console.log(`Created user with id: ${user.id}`);
	}

	console.log(`Seeding finished.`);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});