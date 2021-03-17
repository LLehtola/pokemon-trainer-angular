import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from 'src/app/models/pokemon.model';

/**
 * Renders pokemon detail from the pokeapi.co
 */
@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
})
export class PokemonDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private router: Router
  ) {}

  public name: string;
  public pokemon: Pokemon;
  public errorMessage: string = '';
  public isLoading: boolean = false;
  public flavourText: string = '';

  public showTypes: boolean = false;
  public showBaseStats: boolean = false;
  public showAbilities: boolean = false;
  public showMoves: boolean = false;

  async ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => (this.name = params['name'])
    );
    try {
      this.errorMessage = '';
      this.isLoading = true;
      this.pokemon = await this.pokemonService.getPokemonByName(this.name);
      this.flavourText = await this.pokemonService.getPokemonFlavourTextByName(
        this.name
      );
    } catch (error) {
      this.errorMessage = error;
    } finally {
      this.isLoading = false;
    }
  }
  collectPokemon(): void {
    this.errorMessage = '';
    try {
      this.pokemonService.storePokemonInLocalStorage(this.pokemon);
      this.router.navigate(['trainer']);
    } catch (error) {
      this.errorMessage = error.message;
    }
  }
}
