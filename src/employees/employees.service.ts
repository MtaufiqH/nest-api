import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EmployeesService {
  constructor(private readonly serviceDb: DatabaseService) {}

  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.serviceDb.employee.create({
      data: createEmployeeDto,
    });
  }

  async findAll(role?: 'admin' | 'user') {
    return this.serviceDb.employee.findMany({
      where: {
        role,
      },
    });

    return this.serviceDb.employee.findMany();
  }

  async findOne(id: number) {
    return this.serviceDb.employee.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return this.serviceDb.employee.update({
      where: {
        id,
      },

      data: updateEmployeeDto,
    });
  }

  async remove(id: number) {
    return this.serviceDb.employee.delete({
      where: {
        id,
      },
    });
  }
}
