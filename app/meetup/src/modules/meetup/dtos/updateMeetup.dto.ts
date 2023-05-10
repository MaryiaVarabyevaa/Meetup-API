import { CreateMeetupDto } from "./createMeetup.dto";

class UpdateMeetupDto extends CreateMeetupDto{
  id: number;

  constructor(meetup: UpdateMeetupDto) {
    const { id, ...rest } = meetup;
    super(rest);
    this.id = meetup.id;
  }
}

export { UpdateMeetupDto }