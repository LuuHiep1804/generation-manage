
export class UpdatePersonDTO {
    name?: string;

    gender?: string;

    date_of_birth?: Date;

    date_of_death?: Date;

    marital_status?: boolean;

    childrens?: Array<string>;
}