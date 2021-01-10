import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { query } from 'express';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-moive.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService:MoviesService){}
    @Get()
    getAll(): Movie[]{
        return  this.moviesService.getAll();
    }
    @Get('search')
    search(@Query("query")query:string){
        return `search : ${query}`
    }
    @Get("/:id")
    getOne(@Param("id")movieId : number): Movie {
        return this.moviesService.getOne(movieId);
    }
    @Post()
    createMovie(@Body()movieData:CreateMovieDto){
        return this.moviesService.create(movieData);
    }
    @Delete('/:id')
    deleteMovie(@Param('id') movieId:number){
        return this.moviesService.deleteOne(movieId);
    }
    @Patch('/:id')
    patchMovie(@Param('id') movieId:number, @Body() updateData:UpdateMovieDto){
        return this.moviesService.update(movieId,updateData);
    }
}
