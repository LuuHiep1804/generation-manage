import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes } from "mongoose";
import { Role } from "./role.schema";

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }})
export class User {
    @Prop()
    username: string;

    @Prop()
    password: string;

    @Prop()
    linkAvatar: string;

    @Prop({
        type: SchemaTypes.ObjectId,
        ref: 'Role',
        required: true,
    })
    role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.pre(/^find/, async function (next: Function) {
    this.populate({
        path: 'role',
        select: 'name'
    })
    next();
})