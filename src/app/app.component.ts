import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterOutlet, MatIconModule, MatToolbarModule, MatSidenavModule, MatListModule, MatMenuModule, MatButtonModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'BlogEmAngular';
  collapsed = signal(false);//estado reativo, atualiza qualquer parte que dependa desse valor
  dropDownEnt = signal(false);
  dropDownAdm = signal(false);
  dropDownIdiom = signal(false);
  sidenavWidth = computed(() => this.collapsed() ? '57px' : '250px') // Dependendo do valor do collapsed, alterará o valor do width para uma dessas opções
  dropDownEntWidth = computed(() => this.dropDownEnt() ? 'block' : 'none')
  dropDownAdmWidth = computed(() => this.dropDownAdm() ? 'block' : 'none')
  dropDownIdiomWidth = computed(() => this.dropDownIdiom() ? 'block' : 'none')

  toggleDropdown(escolhido: string) {
    
   
    switch (escolhido){
      case "Entidades":
        if (this.collapsed()) {//Se for clicado e o sidenav estiver oculto, ele faz o sidenav aparecer e faz o dropdown aparecer
          this.collapsed.set(false);
          this.dropDownEnt.set(true)
        }else{
          this.dropDownEnt.set(!this.dropDownEnt());//Nega o valor anterior do dropdown, se esvier aparecendo, vai esconder e se tiver escondido, vai aparecer
        }
        break;
      case "Adm":
        if (this.collapsed()) {//Se for clicado e o sidenav estiver oculto, ele faz o sidenav aparecer e faz o dropdown aparecer
          this.collapsed.set(false);
          this.dropDownAdm.set(true)
        }else{
          this.dropDownAdm.set(!this.dropDownAdm());//Nega o valor anterior do dropdown, se esvier aparecendo, vai esconder e se tiver escondido, vai aparecer
        }
        break;
      case "Idioma":
        if (this.collapsed()) {//Se for clicado e o sidenav estiver oculto, ele faz o sidenav aparecer e faz o dropdown aparecer
          this.collapsed.set(false);
          this.dropDownIdiom.set(true)
        }else{
          this.dropDownIdiom.set(!this.dropDownIdiom());//Nega o valor anterior do dropdown, se esvier aparecendo, vai esconder e se tiver escondido, vai aparecer
        }
        break;

    }
      
    
    
  }
}
