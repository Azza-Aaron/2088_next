import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
    console.log('started handle')
    const { title, content } = req.body;
    console.log('req title = ', title)
    try {
        const session = await getSession({ req });
        console.log('made it to session', session)
        const result = await prisma.post.create({
            data: {
                title: title,
                content: content,
                author: { connect: { email: session?.user?.email } },
            },
        });
        console.log('my result ', result)
        res.json(result);
        return
    } catch (e) {
        console.log('this is the error ', e)
    }
    console.log('something went wrong')

}