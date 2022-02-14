import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IdParam } from './contact.param.validate';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async create(@Body() createContactDto: CreateContactDto) {
    return await this.contactService.create(createContactDto);
  }

  @Get()
  findAll() {
    return this.contactService.findAll();
  }

  @Get(':id')
  findOne(@Param() param: IdParam) {
    return this.contactService.findOne(param.id);
  }

  @Patch(':id')
  async update(@Param() param: IdParam, @Body() updateContactDto: UpdateContactDto) {
    return await this.contactService.update(param.id, updateContactDto);
  }

  @Delete(':id')
  async remove(@Param() param: IdParam) {
    return await this.contactService.remove(param.id);
  }
}
