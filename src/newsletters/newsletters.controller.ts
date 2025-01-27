import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { NewslettersService } from './newsletters.service';
import { CreateNewsletterDto } from './dto/newsletter.dto';

@Controller('newsletters')
export class NewslettersController {
  constructor(private readonly newslettersService: NewslettersService) {}

  @Post('add-email')
  async addEmail(@Body() createNewsletterDto: CreateNewsletterDto) {
    return this.newslettersService.addEmail(createNewsletterDto);
  }



  

  @Get('get-all')
  async getAllUsers() {
    return this.newslettersService.getAllUsers();
  }

  @Delete('del-user/:id')
  async deleteUser(@Param('id') id: number) {
    return this.newslettersService.deleteUserById(Number(id));
  }

  @Post('send-promotional-email')
  async sendPromotionalEmail(@Body() body: { emails: string[] }) {
    const { emails } = body;
    return this.newslettersService.sendPromotionalEmail(emails);
  }
}
