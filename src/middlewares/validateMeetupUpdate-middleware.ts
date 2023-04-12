import UpdateMeetupDto from "../dtos/update-meetup.dto";

export default (req, res, next) => {
    const { error, value } = UpdateMeetupDto(req.body);
    if (error) {
        res.status(400).json({message: 'One or more fields in the request body are invalid.'});
    } else {
        req.validatedData = value;
        next();
    }
}