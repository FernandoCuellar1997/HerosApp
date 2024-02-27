import { Component, OnInit, Pipe } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroService } from '../../services/HeroService.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../auth/heroes/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: ``
})
export class NewPageComponent implements OnInit {

  constructor(
    private heroService:HeroService,
    private activadedRoute:ActivatedRoute,
    private router:Router,
    private snackbar:MatSnackBar,
    private dialog:MatDialog
  ){}

  ngOnInit(): void {
    if(!this.router.url.includes('edit'))return;
    this.activadedRoute.params
    .pipe(
      switchMap(({id})=>this.heroService.getHeroById(id)),
    ).subscribe(hero=>{
      if(!hero)return this.router.navigateByUrl('/');
      this.heroForm.reset(hero);
      return;
    })
  }

  public heroForm=new FormGroup(
    {
      id:               new FormControl<string>(''),
      superhero:        new FormControl<string>('',{nonNullable:true}),
      publisher:        new FormControl<Publisher>(Publisher.DCComics),
      alter_ego:        new FormControl(''),
      first_appearance: new FormControl(''),
      characters:       new FormControl(''),
      alt_img:          new FormControl(''),
    }
  );

  public publishers=[
    { id:'DC Comics', desc:'DC - Comics' },
    { id:'Marvel Comics', desc:'Marvel - Comics' }
  ]

  get CurrentHero():Hero{
    const hero=this.heroForm.value as Hero;
    return hero;
  }

  onSubmit():void{
    if(this.heroForm.invalid)return;

    if(this.CurrentHero.id){
      this.heroService.updateHero(this.CurrentHero)
      .subscribe(
        hero=>{
          /* TODO: Mostrar snackbar */
          this.showSnackbar(`${hero.superhero} actualizado`)
        }
      );
      return;
    }
    this.heroService.addHero(this.CurrentHero)
    .subscribe(hero=>{
      /* TODO: Mostrar snackbar y navegar a /heroes/edit/hero.id */
      this.router.navigate(['/heros/edit',hero.id])
      this.showSnackbar(`${hero.superhero} Creado`)
    })
  }

  onDeleteHero(){
    if(!this.CurrentHero.id)throw Error('Hero Id is required')
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value
    });

    dialogRef.afterClosed()
      .pipe(
        filter((result:boolean)=>result),
        switchMap(()=>this.heroService.deleteHeroById(this.CurrentHero.id)),
        filter((wasDeleted:boolean)=>wasDeleted),
      ).subscribe(()=>{
        this.router.navigate(['/heros/list'])
      })
    /* .subscribe(result => {
      if(!result) return;
      this.heroService.deleteHeroById(this.CurrentHero.id).subscribe(
        wasDeleted=>{
          if(wasDeleted){
            this.router.navigate(['/heros/list'])
          }
        }
      );

    }); */
  }

  showSnackbar(message:string):void{
    this.snackbar.open(message,'Cerrar',{
      duration:2500
    })
  }


}
