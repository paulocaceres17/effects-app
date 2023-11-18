import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';
import { cargarUsuario } from 'src/app/store/actions';
import { AppState } from 'src/app/store/app.reducers';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent {

  usuario!: Usuario | null;

  constructor( private router: ActivatedRoute,
    private store: Store<AppState> ) {
  }

  ngOnInit(): void {
    this.store.select('usuario').subscribe( ( { user } )=> {
      if (user != null)
        this.usuario = user;
    })
    this.router.params.subscribe( ( { id } ) => {
      this.store.dispatch( cargarUsuario( { id: id } ) );
    });
  }
}
