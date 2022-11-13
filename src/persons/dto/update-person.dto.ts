import { ApiProperty } from "@nestjs/swagger";

export class UpdatePersonDTO {
    @ApiProperty()
    name?: string;

    @ApiProperty()
    gender?: string;

    @ApiProperty()
    date_of_birth?: Date;

    @ApiProperty()
    date_of_death?: Date;

    @ApiProperty()
    current_residence?: string;

    @ApiProperty()
    native_land?: string;

    @ApiProperty()
    marital_status?: boolean;

    @ApiProperty()
    wife?: string;

    @ApiProperty()
    visible?: boolean;

    @ApiProperty()
    parentId?: string;

    @ApiProperty()
    childrens?: Array<string>;
}