import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role'

export default class RolesController {
    public async index(ctx: HttpContextContract) {
        const roles = await Role.query().preload('permissions')
        return ctx.response.json(roles)
    }

    public async show(ctx: HttpContextContract) {
        const id = ctx.params.id
        const role = await Role.findOrFail(id)

        await role.load('permissions')

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

    public async permissions(ctx: HttpContextContract) {
        if (ctx.request.method() === 'PUT') {
            const id = ctx.params.id
            const { permissionsId } = ctx.request.only(['permissionsId'])
            const role = await Role.find(id)
            await role?.related('permissions').sync(permissionsId)
            return ctx.response.json(role?.$isPersisted)
        }
        return ctx.response.status(500)
    }
}
