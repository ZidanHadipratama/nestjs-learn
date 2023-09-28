import { Controller, Get, Post, Put, Delete, Param, Query, Body, NotFoundException } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';
import { NotFoundError } from 'rxjs';

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
    getOneNinja(@Param('id') id: string){
        try{
            return this.ninjasService.getNinja(+id)
        }catch(err){
            throw new NotFoundException();
        }
    }

    // POST /ninjas 
    @Post()
    createNinja(@Body() createNinjaDto: CreateNinjaDto){
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
