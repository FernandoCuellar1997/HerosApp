import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../services/HeroService.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: ``
})
export class HeroPageComponent implements OnInit{

  public hero?:Hero;
  constructor(
    private herosService:   HeroService,
    private activadedRoute: ActivatedRoute,
    private router:         Router
    ){}

  ngOnInit(): void {
    this.activadedRoute.params
    .pipe(
      switchMap(({id})=>this.herosService.getHeroById(id)),
    ).subscribe(hero=>{
      if(!hero) return this.router.navigate(['/heros/list']);
      this.hero=hero;
      return;
    })
  }

  goBack():void{
    this.router.navigateByUrl('heros/list');
  }


}
