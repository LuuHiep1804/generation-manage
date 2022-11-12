
export class CreatePersonDTO {
    name: string;

    gender: string;

    date_of_birth: string;

    date_of_death: string;

    marital_status: boolean;

    parentId?: string;
}