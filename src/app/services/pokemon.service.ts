import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, tap, catchError } from 'rxjs/operators';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
  }

  getPokemon(id: string): any {
    return this.http.get(this.apiUrl + `${id}`);
  }

  public async getPokemons(page: number): Promise<Pokemon[]> {
    try {
      const regEx = 'https://pokeapi.co/api/v2/pokemon/';
      let pokemonListTemp = await this.http
        .get<Pokemon[]>(
          `${environment.pokemonApiURL}pokemon/?limit=10&offset=${10 * page}`
        )
        .pipe(map((response: any) => response.results))
        .toPromise();

      return pokemonListTemp.map((element: Pokemon) => {
        let id = element.url.replace(regEx, '');
        return {
          id: id,
          name: element.name,
          url: `${environment.pokemonSpriteUrl}/${id}.png`,
        };
      });
    } catch (error) {
      if (error.status > 400) {
        throw new Error('server unavailable, try again');
      } else {
        throw new Error('something went wrong');
      }
    }
  }

  public getPokemonByName(name: string): Promise<Pokemon> {
    return this.http
      .get<Pokemon>(`${environment.pokemonApiURL}pokemon/${name}`)
      .toPromise();
  }

  public async getPokemonFlavourTextByName(name: string): Promise<any> {
    let flavourText: string = '';

    await this.http
      .get(`${environment.pokemonApiURL}pokemon-species/${name}`)
      .pipe(
        tap((response: any) => {
          for (let i = 0; i < response.flavor_text_entries.length; i++) {
            if (response.flavor_text_entries[i].language.name === 'en') {
              flavourText = response.flavor_text_entries[i].flavor_text.replace(
                '/',
                ' '
              );
              break;
            }
          }
        }),
        catchError((error) => {
          return error;
        })
      )
      .toPromise();

    return flavourText;
  }

  public storePokemonInLocalStorage(pokemon: Pokemon): void {
    let pokemons = this.getPokemonsFromLocalStorage();

    if (
      pokemons.findIndex((pokemonInArray) => {
        return pokemonInArray.name === pokemon.name;
      }) < 0
    ) {
      pokemons.push(pokemon);
      localStorage.setItem('pokemons', JSON.stringify(pokemons));
    } else {
      throw new Error('you are already training this pokemon');
    }
  }

  public getPokemonsFromLocalStorage(): Pokemon[] {
    const pokemons = localStorage.getItem('pokemons');
    return pokemons ? JSON.parse(pokemons) : [];
  }
}
