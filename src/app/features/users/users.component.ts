import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

/**
 * Rappresenta il componente principale per la gestione degli utenti. Le richieste arrivano a questo componente.
 */
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: ` <router-outlet></router-outlet> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {}
