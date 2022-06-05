import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
    public async index(ctx: HttpContextContract) {
        const users = await User.query()
        return ctx.response.json(users)
    }

    public async show(ctx: HttpContextContract) {
        const id = ctx.params.id
        const user = await User.findOrFail(id)
        return ctx.response.json(user)
    }

    public async store(ctx: HttpContextContract) {
        const { email, password } = ctx.request.only(['email', 'password'])
        const user = await User.create({
            email,
            password,
        })
        return ctx.response.json({ ok: user.$isPersisted })
    }

    public async update(ctx: HttpContextContract) {
        const id = ctx.params.id
        const { email, password } = ctx.request.only(['email', 'password'])
        const user = await User.findOrFail(id)
        await user
            .merge({
                email,
                password,
            })
            .save()
        return ctx.response.json({ ok: user.$isPersisted })
    }

    public async destroy(ctx: HttpContextContract) {
        const id = ctx.params.id
        const user = await User.findOrFail(id)
        await user.delete()
        return ctx.response.json({ ok: user.$isDeleted })
    }
}
