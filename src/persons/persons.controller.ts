import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreatePersonDTO } from './dto/create-person.dto';
import { UpdatePersonDTO } from './dto/update-person.dto';
import { PersonsService } from './persons.service';

@Controller('api/persons')
export class PersonsController {
    constructor(
        private personService: PersonsService,
    ) {}

    @Get()
    async getAllPerson() {
        return await this.personService.getAllPerson();
    }

    @Get('/event-by-day')
    async getBirthdayByDay() {
        return await this.personService.getEventByDay();
    }

    @Get('/event-by-month')
    async getBirthdayByMonth() {
        return await this.personService.getEventByMonth();
    }

    @Get(':id')
    async getPersonById(@Param() params) {
        const { id } = params;
        return await this.personService.getPersonById(id);
    }

    @Post()
    async createPerson(@Body() body: CreatePersonDTO) {
        return await this.personService.createPerson(body);
    }

    @Patch(':id')
    async updateInfoPerson(@Body() body: UpdatePersonDTO, @Param() params) {
        const { id } = params;
        return await this.personService.updateInfoPerson(id, body);
    }
}
