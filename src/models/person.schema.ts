import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }})
export class Person {
    @Prop()
    name: string;

    @Prop()
    gender: string;

    @Prop()
    date_of_birth: Date;

    @Prop({
        default: null
    })
    date_of_death: Date;

    @Prop({
        default: null
    })
    current_residence: string;

    @Prop({
        default: null
    })
    native_land: string;

    @Prop({
        default: false,
    })
    marital_status: boolean;

    @Prop({
        default: null
    })
    wife: string;

    @Prop({
        default: 1
    })
    generation_v: number;

    @Prop({
        default: true,
    })
    visible: boolean;

    @Prop({
        default: null
    })
    parentId: string;
}

export const PersonSchema = SchemaFactory.createForClass(Person);