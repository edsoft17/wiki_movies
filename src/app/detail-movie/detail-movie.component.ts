import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Actor } from '../core/models/actor.model';
import { MovieModel } from '../core/models/movie.model';
import { MovieService } from '../core/services/movie.service';

@Component({
  selector: 'app-detail-movie',
  templateUrl: './detail-movie.component.html',
  styleUrls: ['./detail-movie.component.scss'],
})
export class DetailMovieComponent implements OnInit {
  movie?: MovieModel;

  actors: Actor[] = [];
  constructor(
    private _movieService: MovieService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe({
      next: (params: Params) => {
        const idMovie: string = params['idMovie'];
        this._movieService.getMovieById(idMovie).subscribe({
          next: (response) => {
            this.movie = response;
            console.log(this.movie);
          },
        });
        this.getActors(idMovie);
      },
    });
  }

  getActors(idMovie: string): void{
    this._movieService.getActorsMovie(idMovie).subscribe({
      next: (response) => {
        this.actors = response.cast;
        console.log("this.actors : ",this.actors);
      }
    });
  }
}
