import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'
import Permission from './Permission'

export default class Role extends BaseModel {
    public static selfAssignPrimaryKey = true

    @column({ isPrimary: true })
    public id: string

    @column()
    public roleName: string

    @column()
    public roleDescription: string

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @manyToMany(() => Permission)
    public permissions: ManyToMany<typeof Permission>

    @beforeCreate()
    public static assignUuid(role: Role) {
        role.id = uuid()
    }
}
