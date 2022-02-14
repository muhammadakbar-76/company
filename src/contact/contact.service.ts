import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact, ContactDocument } from './entities/contact.entity';

@Injectable()
export class ContactService {

  constructor(
    @InjectModel(Contact.name) private ContactRepo: Model<ContactDocument>
  ){}

  create(createContactDto: CreateContactDto): Promise<ContactDocument> {
    return this.ContactRepo.create(createContactDto);
  }

  findAll() {
    return this.ContactRepo.find();
  }

  findOne(id: string) {
    return this.ContactRepo.findById(id);
  }

  update(id: string, updateContactDto: UpdateContactDto) {
    return this.ContactRepo.findByIdAndUpdate(id,updateContactDto)
  }

  async remove(id: string) {
    await this.ContactRepo.remove({_id: id});
    return "Data has been successfully deleted";
  }

  async delete(doc: Contact){
    await this.ContactRepo.deleteOne(doc);
  }

  async updateDoc(doc: Contact, updateContactDto: UpdateContactDto) {
    const contact = await this.ContactRepo.findOne(doc);
    return await this.ContactRepo.findByIdAndUpdate(contact.id, updateContactDto);
  }
}
