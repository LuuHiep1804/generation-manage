import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }})
export class Role {
    @Prop()
    name: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);