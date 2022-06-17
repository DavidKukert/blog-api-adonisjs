import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role'

export default class RolesController {
    public async index(ctx: HttpContextContract) {
        const roles = await Role.query()
        return ctx.response.json(roles)
    }

    public async show(ctx: HttpContextContract) {
        const id = ctx.params.id
        const role = await Role.findOrFail(id)
        return ctx.response.json(role)
    }

    public async store(ctx: HttpContextContract) {
        const { roleName, roleDescription } = ctx.request.only(['roleName', 'roleDescription'])
        const role = await Role.create({
            roleName,
            roleDescription,
        })
        return ctx.response.json(role.$isPersisted)
    }

    public async update(ctx: HttpContextContract) {
        const { roleName, roleDescription } = ctx.request.only(['roleName', 'roleDescription'])
        const id = ctx.params.id
        const role = await Role.findOrFail(id)
        await role
            .merge({
                roleName,
                roleDescription,
            })
            .save()
        return ctx.response.json(role.$isPersisted)
    }

    public async destroy(ctx: HttpContextContract) {
        const id = ctx.params.id
        const role = await Role.findOrFail(id)
        await role.delete()
        return ctx.response.json(role.$isDeleted)
    }
}
