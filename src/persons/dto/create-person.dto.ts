import { ApiProperty } from "@nestjs/swagger";

export class CreatePersonDTO {

    @ApiProperty()
    name: string;

    @ApiProperty()
    gender: string;

    @ApiProperty()
    date_of_birth: Date;

    @ApiProperty()
    date_of_death: Date;

    @ApiProperty()
    current_residence?: string;

    @ApiProperty()
    native_land?: string;

    @ApiProperty()
    marital_status?: boolean;

    @ApiProperty()
    wife?: string;

    @ApiProperty()
    parentId?: string;
}