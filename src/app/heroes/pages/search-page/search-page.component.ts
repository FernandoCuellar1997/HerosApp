import { Component } from '@angular/core';
import { HeroService } from '../../services/HeroService.service';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: ``
})
export class SearchPageComponent {

  public searchInput=new FormControl('')
  public heros:Hero[]=[];
  public selectedHero?:Hero;
  constructor(private heroService:HeroService){}

  searchHero(){
    const value:string=this.searchInput.value || '';

    this.heroService.getSuggestion(value)
    .subscribe(heroes=>this.heros=heroes);
  }

  onSelectedOption(event:MatAutocompleteSelectedEvent):void{
    if(!event.option.value){
      this.selectedHero=undefined;
      return;
    }
    const hero:Hero=event.option.value;
    this.searchInput.setValue(hero.superhero);

    this.selectedHero=hero;
  }

}
