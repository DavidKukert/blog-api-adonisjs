import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'

export default class PostsController {
    public async index(ctx: HttpContextContract) {
        const posts = await Post.query()
        return ctx.response.json(posts)
    }

    public async show(ctx: HttpContextContract) {
        const id = ctx.params.id
        const post = await Post.findOrFail(id)
        return ctx.response.json(post)
    }

    public async store(ctx: HttpContextContract) {
        const { postTitle, postContent } = ctx.request.only(['postTitle', 'postContent'])
        const post = await Post.create({
            postTitle,
            postContent,
        })
        return ctx.response.json(post.$isPersisted)
    }

    public async update(ctx: HttpContextContract) {
        const { postTitle, postContent } = ctx.request.only(['postTitle', 'postContent'])
        const id = ctx.params.id
        const post = await Post.findOrFail(id)
        await post
            .merge({
                postTitle,
                postContent,
            })
            .save()
        return ctx.response.json(post.$isPersisted)
    }

    public async destroy(ctx: HttpContextContract) {
        const id = ctx.params.id
        const post = await Post.findOrFail(id)
        await post.delete()
        return ctx.response.json(post.$isDeleted)
    }
}
