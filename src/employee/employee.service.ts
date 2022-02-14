import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskService } from '../task/task.service';
import { ContactService } from '../contact/contact.service';
import { ContactDocument } from '../contact/entities/contact.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee, EmployeeDocument } from './entities/employee.entity';
import { TaskDocument } from '../task/entities/task.entity';

@Injectable()
export class EmployeeService {

  constructor(
    @InjectModel(Employee.name) private employeeRepo: Model<EmployeeDocument>,
    private contactRepo: ContactService,
    private taskRepo: TaskService
  ){}

  getTask(){
    return this.taskRepo.findAll();
  }

  async create(createEmployeeDto: CreateEmployeeDto): Promise<EmployeeDocument> {
    try {
      const {name, phone, email, task} = createEmployeeDto;
      const newEmpoyee: EmployeeDocument = new this.employeeRepo({name});
      const newEmployeeContact: ContactDocument = await this.contactRepo.create({
       phone,
       email
      });
      newEmpoyee.contact = newEmployeeContact;
      if (task) {
       newEmpoyee.tasksId = task;
      }
      await newEmpoyee.save();
      return newEmpoyee;
    } catch (error) {
      throw new Error(error);
    }
  }

  findAll() {
    return this.employeeRepo.find().populate("contact").populate("tasksId");
  }

  findOne(id: string) {
    return this.employeeRepo.findOne({_id: id}).populate("contact");
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    try {
      const {name, phone, email, manager, task} = updateEmployeeDto;
      const employee = await this.employeeRepo.findById(id).populate("contact");
      const contact = await this.contactRepo.updateDoc(employee.contact,{phone, email});
      return await this.employeeRepo.updateOne({_id: id},{
        name,
        contact: contact._id,
      }) // if you return this, return value will be object of things
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: string) {
    try {
      const employee = await this.employeeRepo.findById(id).populate("contact");
      await this.contactRepo.delete(employee.contact)
      await this.employeeRepo.deleteOne({_id: id});
      return "Data has been deleted successfully";
    } catch (error) {
      throw new Error(error);
    }
  }
}
