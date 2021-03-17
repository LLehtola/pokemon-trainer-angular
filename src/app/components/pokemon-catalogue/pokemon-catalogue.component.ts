import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { environment } from 'src/environments/environment';

/**
 * Renders a pokemon catalogue using the pokapi.co
 * Renders initial catalogue of pokemons, but upon request "show more" renders more pokemons.
 */
@Component({
  selector: 'app-pokemon-catalogue',
  templateUrl: './pokemon-catalogue.component.html',
  styleUrls: ['./pokemon-catalogue.component.scss'],
})
export class PokemonCatalogueComponent implements OnInit {
  constructor(private pokemonService: PokemonService) {}

  public pokemonCatalogue: any = [];
  public errorMessage: string = '';
  public page: number = 0;
  public isLoading: boolean = false;

  async ngOnInit(): Promise<any> {
    this.refreshPokemonCatalogue();
  }

  nextPage(): void {
    this.page++;
    this.refreshPokemonCatalogue();
  }
  async refreshPokemonCatalogue(): Promise<any> {
    try {
      this.isLoading = true;
      this.pokemonCatalogue.push(
        ...(await this.pokemonService.getPokemons(this.page))
      );
    } catch (error) {
      this.errorMessage = error.message ? error.message : error;
    } finally {
      this.isLoading = false;
    }
  }
}
