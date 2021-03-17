import { Component, OnInit, OnDestroy } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

/**
 * Renders trainer page - gets pokemons stored in localstorage through pokemonService,
 * - gets username of the trainer from authService
 * Clicking redirects user to the catalogue/:pokemon name
 */
@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.scss'],
})
export class TrainerComponent implements OnInit, OnDestroy {
  public pokemonCatalogue: Pokemon[] = [];
  public trainerName: string;
  public subscription: Subscription;

  constructor(
    private pokemonService: PokemonService,
    private authService: AuthService
  ) {
    this.subscription = this.authService.user.subscribe((value) => {
      this.trainerName = value.name;
    });
  }

  ngOnInit(): void {
    this.pokemonCatalogue = this.pokemonService.getPokemonsFromLocalStorage();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
