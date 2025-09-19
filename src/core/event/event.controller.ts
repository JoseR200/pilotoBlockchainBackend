import {Controller, Get, Param, Post} from '@nestjs/common';
import {EventService} from "./event.service";

@Controller('event')
export class EventController {

    constructor(private readonly eventService: EventService) {}

    @Get(':productId')
    async getVotes(@Param('productId') productId: string) {
        return this.eventService.getEvents(productId);
    }

    @Post(':productId/:description')
    async vote(@Param('productId') productId: string, @Param('description') description: string) {
        return this.eventService.addEvent(productId, description);
    }
}
