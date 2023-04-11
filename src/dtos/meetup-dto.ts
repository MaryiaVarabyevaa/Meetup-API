export default class MeetupDto {
    topic: string;
    description: string;
    keywords: string;
    event_time: string;
    event_place: string;

    constructor(body) {
        this.topic = body.topic;
        this.description = body.description;
        this.keywords = body.keywords;
        this.event_time = body.event_time;
        this.event_place = body.event_place;
    }
}