import { Component, OnInit } from '@angular/core';
import { ApiCharacter, Character } from '../core/models/character.model';
import { RickandmoryService } from '../core/services/rickandmory.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {

  characters: Character[] = [];
  currentPage: number = 1;

  constructor(private _rickMortyService: RickandmoryService) { }

  ngOnInit(): void {
    this.getAllCharacters();
  }

  getAllCharacters(direction: string = ''): void{
    if (this.currentPage > 1 && direction === 'back') {
      this.currentPage = this.currentPage - 1;
    }
    if (this.currentPage < 500 && direction === 'forward') {
      this.currentPage = this.currentPage + 1;
    }
    this._rickMortyService.getAllCharacters(this.currentPage.toString()).subscribe({
      next: (data: ApiCharacter) => {
        this.characters = data.results;
      }
    });
  }

}
