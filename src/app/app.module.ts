import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WebsiteComponent } from './website/website.component';
import { PokemonlistComponent } from './pokemonlist/pokemonlist.component';

@NgModule({
  declarations: [
    AppComponent,
    WebsiteComponent,
    PokemonlistComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent,
              WebsiteComponent,
  ]
})
export class AppModule { }
