import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Tag from 'App/Models/Tag'

export default class TagsController {
    public async index(ctx: HttpContextContract) {
        const tags = await Tag.query()
        return ctx.response.json(tags)
    }

    public async show(ctx: HttpContextContract) {
        const id = ctx.params.id
        const tag = await Tag.findOrFail(id)
        return ctx.response.json(tag)
    }

    public async store(ctx: HttpContextContract) {
        const { tagTitle, tagDescription, tagType } = ctx.request.only([
            'tagTitle',
            'tagDescription',
            'tagType',
        ])
        const tag = await Tag.create({
            tagTitle,
            tagDescription,
            tagType,
        })
        return ctx.response.json(tag.$isPersisted)
    }

    public async update(ctx: HttpContextContract) {
        const { tagTitle, tagDescription, tagType } = ctx.request.only([
            'tagTitle',
            'tagDescription',
            'tagType',
        ])
        const id = ctx.params.id
        const tag = await Tag.findOrFail(id)
        await tag
            .merge({
                tagTitle,
                tagDescription,
                tagType,
            })
            .save()
        return ctx.response.json(tag.$isPersisted)
    }

    public async destroy(ctx: HttpContextContract) {
        const id = ctx.params.id
        const tag = await Tag.findOrFail(id)
        await tag.delete()
        return ctx.response.json(tag.$isDeleted)
    }
}
