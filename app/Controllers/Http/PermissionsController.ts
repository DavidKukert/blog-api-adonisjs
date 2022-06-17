import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Permission from 'App/Models/Permission'

export default class PermissionsController {
    public async index(ctx: HttpContextContract) {
        const permissions = await Permission.query()
        return ctx.response.json(permissions)
    }

    public async show(ctx: HttpContextContract) {
        const id = ctx.params.id
        const permission = await Permission.findOrFail(id)
        return ctx.response.json(permission)
    }

    public async store(ctx: HttpContextContract) {
        const { permissionName, permissionDescription } = ctx.request.only([
            'permissionName',
            'permissionDescription',
        ])
        const permission = await Permission.create({
            permissionName,
            permissionDescription,
        })
        return ctx.response.json(permission.$isPersisted)
    }

    public async update(ctx: HttpContextContract) {
        const { permissionName, permissionDescription } = ctx.request.only([
            'permissionName',
            'permissionDescription',
        ])
        const id = ctx.params.id
        const permission = await Permission.findOrFail(id)
        await permission
            .merge({
                permissionName,
                permissionDescription,
            })
            .save()
        return ctx.response.json(permission.$isPersisted)
    }

    public async destroy(ctx: HttpContextContract) {
        const id = ctx.params.id
        const permission = await Permission.findOrFail(id)
        await permission.delete()
        return ctx.response.json(permission.$isDeleted)
    }
}
