class CreateMeetupDto {
  topic: string;

  description: string;

  time: string;

  date: string;

  place: string;

  tags: string[];

  constructor(meetup: CreateMeetupDto) {
    this.topic = meetup.topic;
    this.description = meetup.description;
    this.time = meetup.time;
    this.date = meetup.date;
    this.place = meetup.place;
    this.tags = meetup.tags;
  }
}

export { CreateMeetupDto };
