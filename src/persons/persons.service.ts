import { BadRequestException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Person } from 'src/models/person.schema';
import { Model } from 'mongoose';
import { UpdatePersonDTO } from './dto/update-person.dto';
import * as moment from 'moment';

@Injectable()
export class PersonsService {
    constructor(
        @InjectModel('Person')
        private personModel: Model<Person>,
    ) { }

    async createPerson(data) {
        try {
            const person = await this.personModel.create({
                ...data,
            });
            await person.save();
            return {
                code: 200,
                data: {
                    success: true,
                    person,
                }
            };
        } catch (err) {
            console.log(err);
            throw new InternalServerErrorException('Server error');
        }
    }

    async getPersonById(id: string) {
        try {
            const person = await this.personModel.findById(id);
            if (!person) {
                throw new BadRequestException('person not found');
            }
            return {
                code: 200,
                data: {
                    success: true,
                    person,
                }
            };
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    handleGeneration(arrayGenerations, people, max_v) {
        for (let j = 0; j < arrayGenerations.length; j++) {
            let childrens = [];
            people.forEach((person) => {
                if (person.parentId == arrayGenerations[j]._id) {
                    childrens.push(person);
                }
            });
            if(childrens[0] && childrens[0].generation_v < max_v) {
                childrens = this.handleGeneration(childrens, people, max_v);
            }
            arrayGenerations[j] = {
                _id: arrayGenerations[j]._id,
                name: arrayGenerations[j].name,
                gender: arrayGenerations[j].gender,
                date_of_birth: arrayGenerations[j].date_of_birth,
                date_of_death: arrayGenerations[j].date_of_death,
                marital_status: arrayGenerations[j].marital_status,
                wife: arrayGenerations[j].wife,
                generation_v: arrayGenerations[j].generation_v,
                visible: arrayGenerations[j].visible,
                parentId: arrayGenerations[j].parentId,
                childrens,
            }
        }
        return arrayGenerations;
    }

    async getAllPerson() {
        try {
            let people = await this.personModel.find().sort({ generation_v: 'asc' });
            const max_v = people[people.length - 1].generation_v;
            let arrayGenerations = await this.personModel.find({
                generation_v: 1
            });
            arrayGenerations = this.handleGeneration(arrayGenerations, people, max_v);
            const result = arrayGenerations;
            return {
                code: 200,
                data: {
                    success: true,
                    result,
                }
            };
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async updateInfoPerson(id: string, data: UpdatePersonDTO) {
        try {
            const person = await this.personModel.findById(id);
            const gene_v = person.generation_v + 1;
            if (!person) {
                throw new BadRequestException('Person not found');
            }

            if (data.childrens) {
                for (const children of data.childrens) {
                    await this.personModel.findByIdAndUpdate(
                        children,
                        { parentId: id, generation_v: gene_v },
                        { new: true }
                    );
                }
            }

            delete data.childrens;
            const updatePerson = await this.personModel.findByIdAndUpdate(
                id,
                data,
                { new: true }
            );
            return {
                code: 200,
                data: {
                    success: true,
                    updatePerson,
                }
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async getEventByDay() {
        try {
            const people = await this.personModel.find().sort({ date_of_birth: 'asc' });
            const now = moment(new Date(Date.now())).format('DD/MM');
            const birth = [];
            const death = [];
            people.forEach((person) => {
                const checkBirth = moment(person.date_of_birth).format('DD/MM');
                const checkDeath = moment(person.date_of_death).format('DD/MM');
                if (checkBirth === now && checkDeath === 'Invalid date') {
                    birth.push({
                        name: person.name,
                        date_of_birth: moment(person.date_of_birth).format('DD/MM/YYYY'),
                        years: Number(moment(new Date(Date.now())).format('YYYY')) - Number(moment(person.date_of_birth).format('YYYY'))
                    });
                }
                if (checkDeath === now) {
                    death.push({
                        name: person.name,
                        date_of_death: moment(person.date_of_death).format('DD/MM/YYYY')
                    });
                }
            });
            return {
                code: 200,
                data: {
                    success: true,
                    birth,
                    death,
                }
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async getEventByMonth() {
        try {
            const people = await this.personModel.find().sort({ date_of_birth: 'asc' });
            const now = moment(new Date(Date.now())).format('MM');
            const birth = [];
            const death = [];
            people.forEach((person) => {
                const checkBirth = moment(person.date_of_birth).format('MM');
                const checkDeath = moment(person.date_of_death).format('MM');
                if (checkBirth === now && checkDeath === 'Invalid date') {
                    birth.push({
                        name: person.name,
                        date_of_birth: moment(person.date_of_birth).format('DD/MM/YYYY'),
                        years: Number(moment(new Date(Date.now())).format('YYYY')) - Number(moment(person.date_of_birth).format('YYYY'))
                    });
                }
                if (checkDeath === now) {
                    death.push({
                        name: person.name,
                        date_of_death: moment(person.date_of_death).format('DD/MM/YYYY')
                    });
                }
            });
            return {
                code: 200,
                data: {
                    success: true,
                    birth,
                    death,
                }
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}
