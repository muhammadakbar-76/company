import { IsUrl } from "class-validator";

export class CreateMeetingDto {

    title: string;

    @IsUrl()
    meetingUrl: string;
}
