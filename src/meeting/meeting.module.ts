import { Module } from '@nestjs/common';
import { MeetingService } from './meeting.service';
import { MeetingController } from './meeting.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Meeting, MeetingSchema } from './entities/meeting.entity';

@Module({
  imports: [MongooseModule.forFeature([{name: Meeting.name, schema: MeetingSchema}])],
  controllers: [MeetingController],
  providers: [MeetingService]
})
export class MeetingModule {}
