import { Prop,  SchemaFactory, Schema } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task{
    @Prop({
        required : true,
        unique : true,
        default : uuidv4,
    })
    id:string;

    @Prop({
        required:true,
    })
    title:string;

    @Prop({
        default : "pending",
    })
    status:string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);