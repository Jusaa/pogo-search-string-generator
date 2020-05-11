import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import * as angular from "angular";

@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.css']
})
export class WebsiteComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    // Enable de-selecting radio buttons
    let id_base_list = ["original", "alola", "gender_male", "gender_female", "shiny", "not_shining", "lvl1_", "great", "ultra"];
    let pokemonCount = 3
    id_base_list.forEach(id_base => {
      for (let i = 1; i <= pokemonCount; i++) {
        let id = id_base + i;
        document.getElementById(id).addEventListener("mousedown", function(e) {
          let radio = document.getElementById(id) as HTMLInputElement;
          if (radio.checked) {
            radio.checked = false;
          } else {
           radio.checked = true;
          }
        });
        document.getElementById(id).addEventListener("click", function(e) {
          e.preventDefault();
        });
      }
    });
  }

  generateString() {
    let textarea = document.getElementById("search_string_area");
    let inputs = document.getElementsByTagName("input");
    let searchString = "";
    let checkedBoxes = [], allPokemon = [], specialPokemon = [], excludedPokemon = [], onlyAlola = [], filterAlola = [], onlyMale = [], onlyFemale = [], onlyShiny = [], filterShiny = [], onlyLvl1 = [], onlyGL = [], onlyUL = [];

    let shadow = false, purified = false, traded = false, special = false;

    for (let checkbox in inputs) {
      if (inputs[checkbox].checked) { checkedBoxes.push(inputs[checkbox].id); }
    };

    checkedBoxes.forEach(o => {
      let pokemonNumber = o.substring(o.length - 1, o.length);
      if (o.includes("shadow")) { shadow = true; }
      else if (o.includes("purified")) { purified = true; }
      else if (o.includes("traded")) { traded = true; }
      else if (o.includes("include_special")) { special = true; }
      else if (o.includes("include_all")) { allPokemon.push(pokemonNumber); }
      else if (o.includes("exclude")) { excludedPokemon.push(pokemonNumber); }
    });

    checkedBoxes.forEach(o => {
      let pokemonNumber = o.substring(o.length - 1, o.length);
      if (excludedPokemon.includes(pokemonNumber)) { return; }
      else if (o.includes("alola")) { onlyAlola.push(pokemonNumber); }
      else if (o.includes("original")) { filterAlola.push(pokemonNumber); }
      else if (o.includes("gender_male")) { onlyMale.push(pokemonNumber); }
      else if (o.includes("gender_female")) { onlyFemale.push(pokemonNumber); }
      else if (o.includes("shiny")) { onlyShiny.push(pokemonNumber); }
      else if (o.includes("not_shining")) { filterShiny.push(pokemonNumber); }
      else if (o.includes("lvl1")) { onlyLvl1.push(pokemonNumber); }
      else if (o.includes("great")) { onlyGL.push(pokemonNumber); }
      else if (o.includes("ultra")) { onlyUL.push(pokemonNumber); }
    });

    if (!traded) { searchString += "!traded&" }
    if (!shadow) { searchString += "!shadow&" }
    if (!purified) { searchString += "!purified&" }
    if (special) { searchString += "@special," }

    for (let pokemon in allPokemon) { searchString += allPokemon[pokemon] + "," }
    searchString = searchString.substring(0, searchString.length - 1);    
    if (special) {
      for (let pokemon in excludedPokemon) { searchString += "&!" + excludedPokemon[pokemon] }
    }
    for (let pokemon in onlyAlola) { searchString += "&!" + onlyAlola[pokemon] + ",alola" }
    for (let pokemon in filterAlola) { searchString += "&!" + filterAlola[pokemon] + ",!alola" }
    for (let pokemon in onlyMale) { searchString += "&!" + onlyMale[pokemon] + ",male" }
    for (let pokemon in onlyFemale) { searchString += "&!" + onlyFemale[pokemon] + ",female" }
    for (let pokemon in onlyShiny) { searchString += "&!" + onlyShiny[pokemon] + ",shiny" }
    for (let pokemon in filterShiny) { searchString += "&!" + filterShiny[pokemon] + ",!shiny" }
    for (let pokemon in onlyLvl1) { searchString += "&!" + onlyLvl1[pokemon] + ",cp-50" }
    for (let pokemon in onlyGL) { searchString += "&!" + onlyGL[pokemon] + ",cp-1500" }
    for (let pokemon in onlyUL) { searchString += "&!" + onlyUL[pokemon] + ",cp-1500" }
    searchString += "&!4-"
    textarea.innerHTML = searchString;
  }
}
