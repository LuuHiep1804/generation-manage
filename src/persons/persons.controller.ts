import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
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
    @ApiBody({ type: CreatePersonDTO })
    async createPerson(@Body() body: CreatePersonDTO) {
        return await this.personService.createPerson(body);
    }

    @Patch(':id')
    @ApiBody({ type: UpdatePersonDTO })
    async updateInfoPerson(@Body() body: UpdatePersonDTO, @Param() params) {
        const { id } = params;
        return await this.personService.updateInfoPerson(id, body);
    }

    @Delete(':id')
    async deletePerson(@Param() params) {
        const { id } = params;
        return await this.personService.deletePerson(id);
    }
}
