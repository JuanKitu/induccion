import { Injectable } from '@nestjs/common';
import { People } from '../entities/people.entity';
import { CreatePeopleDto, UpdatePeopleDto } from '../dtos/peoples.dto';

@Injectable()
export class PeoplesService {
  private counterId = 1;
  private peoples: People[] = [
    {
      id: 1,
      name: 'Juan Manuel',
      fatherLastName: 'Santa Cruz',
      motherLastName: 'Borro',
      firstDate: '1995/11/28',
      age: 27,
      active: true,
      email: 'juan.manuel.santa@accenture.com.ar',
    },
  ];
  async findAll(): Promise<People[]> {
    return this.peoples;
  }
  async findOne(id: number): Promise<People> {
    const peopleFind = this.peoples.find((people: People) => people.id === id);
    return peopleFind;
  }
  async create(data: CreatePeopleDto) {
    this.counterId++;
    console.log('data', data);
    const newPeople: People = {
      id: this.counterId,
      ...data,
    };
    this.peoples.push(newPeople);
    return newPeople;
  }
  async update(id: number, changes: UpdatePeopleDto): Promise<People> {
    const findPeople = this.peoples.find((people: People) => people.id === id);
    if (!findPeople) {
      return;
    }
    const index = this.peoples.findIndex((people: People) => people.id === id);
    this.peoples[index] = {
      ...findPeople,
      ...changes,
    };
    return this.peoples[index];
  }
  async remove(id: number) {
    this.peoples = this.peoples.filter((people: People) => people.id !== id);
    return true;
  }
  async removeLogic(id: number): Promise<People> {
    const findPeople = this.peoples.find((people: People) => people.id === id);
    if (!findPeople) {
      return;
    }
    const index = this.peoples.findIndex((people: People) => people.id === id);
    this.peoples[index].active = false;
    return this.peoples[index];
  }
}
