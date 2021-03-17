import { Component, OnInit, Input } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';

/**
 * Creates a card with name and sprite.
 * If the pokemon.sprite is present, it will use it for rendering the image, otherwise the
 * pokemon.url is overwritten with the sprite url.
 * @param [Pokemon] pokemon - pokemon object.
 */
@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent implements OnInit {
  constructor() {}

  @Input() pokemon: Pokemon;

  async ngOnInit() {}
}
