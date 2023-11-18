import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';
import { cargarUsuarios } from 'src/app/store/actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent {

  usuarios: Usuario[] = [];
  usuariosSubs!: Subscription;
  loading: boolean = false;
  error: any;

  constructor( private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.dispatch( cargarUsuarios() );
    this.usuariosSubs = this.store.select('usuarios').subscribe( ( { users, loading, error } ) => {
      this.usuarios = users;
      this.loading = loading;
      this.error = error;
    });
  }

  ngOnDestroy(): void {
    this.usuariosSubs.unsubscribe();
  }
}
