import { Controller, Get, Post, Put, Delete, Param, Query, Body, NotFoundException, ParseIntPipe, ValidationPipe, UseGuards } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';
import { NotFoundError } from 'rxjs';
import { BeltGuard } from 'src/belt/belt.guard';

@Controller('ninjas')
export class NinjasController {
    constructor(private readonly ninjasService: NinjasService){}


    // GET /ninjas?type=fast --> []
    @Get()
    getNinjas(@Query('weapon') weapon: 'stars' | 'nunchucks'){
        // const service = new NinjasService()
        return this.ninjasService.getNinjas(weapon)
    }

    // GET /ninjas/:id --> {...}
    @Get(':id')
    getOneNinja(@Param('id', ParseIntPipe) id: number){
        try{
            return this.ninjasService.getNinja(id)
        }catch(err){
            throw new NotFoundException();
        }
    }

    // POST /ninjas 
    @Post()
    @UseGuards(BeltGuard)
    createNinja(@Body(new ValidationPipe) createNinjaDto: CreateNinjaDto){
        return this.ninjasService.createNinja(createNinjaDto)
    }

    // PUT /ninjas/:id --> {...}
    @Put(':id')
    updateNinja(@Param('id') id: string, @Body() updateNinjaDto: UpdateNinjaDto){
        return this.ninjasService.updateNinja(+id, updateNinjaDto)
    }

    // DELETE /ninjas/:id
    @Delete(':id')
    removeNinja(@Param('id') id: string){
        this.ninjasService.removeNinja(+id)
    }

}
