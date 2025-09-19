import {Controller, Get, Param, Post} from '@nestjs/common';
import {VoteService} from "./vote.service";

@Controller('vote')
export class VoteController {

    constructor(private readonly voteService: VoteService) {}

    @Get(':candidate')
    async getVotes(@Param('candidate') candidate: string) {
        return this.voteService.getVotes(candidate);
    }

    @Post(':candidate')
    async vote(@Param('candidate') candidate: string) {
        return this.voteService.vote(candidate);
    }
}
