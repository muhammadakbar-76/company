import { PartialType } from '@nestjs/mapped-types';
import { IsUrl } from 'class-validator';
import { CreateMeetingDto } from './create-meeting.dto';

export class UpdateMeetingDto extends PartialType(CreateMeetingDto) {
    title?: string;

    @IsUrl()
    meetingUrl?: string;
}
