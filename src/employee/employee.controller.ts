import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Render, Query, UseFilters, Req } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeParams } from './employee.param.validate';
import { Request, Response } from 'express';
import { EmployeeDocument } from './entities/employee.entity';
import { validate } from 'class-validator';
import { HttpExceptionFilter } from '../filters/http-exception.filter';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @UseFilters(HttpExceptionFilter)
  async create(@Body() createEmployeeDto: CreateEmployeeDto, @Res() res:Response) {
    await this.employeeService.create(createEmployeeDto);
    res.redirect("/employee")
  }

  @Get("add")
  @Render("add_employee")
  async anjay(){
    const tasks = await this.employeeService.getTask();
    return {
      layout: "templates/main_layout",
      tasks
    }
  }

  @Get()
  @Render("employee")
  async root(@Req() req: Request){
    const employees: EmployeeDocument[] = await this.employeeService.findAll();
    const message = req.flash("anjay");
    return {
      layout: 'templates/main_layout',
      employees,
      message
    }
  }
  // async findAll(@Res() res: Response) {
  //   const employees = await this.employeeService.findAll();
  //   res.render('employee',{
  //     layout: 'templates/main_layout',
  //     employees
  //   })
  // }

  @Get(':id')
  findOne(@Param() param: EmployeeParams) {
    return this.employeeService.findOne(param.id);
  }

  @Patch(':id')
  update(@Param() param: EmployeeParams, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeeService.update(param.id, updateEmployeeDto);
  }

  @Delete(':id')
  async remove(@Param() param: EmployeeParams, @Res() res: Response) {
    try {
      await this.employeeService.remove(param.id);
      res.redirect("/employee");
    } catch (error) {
      throw new Error(error);
    }
  }
}
