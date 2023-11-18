import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { cargarUsuarios, cargarUsuariosError, cargarUsuariosSuccess } from '../actions';
import { mergeMap, map, catchError, of, tap } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario.service';

@Injectable()
export class UsuariosEffects {

    constructor( private actions$: Actions,
        private usuarioService: UsuarioService ) {
    }

    // createEffect es un observable
    cargarUsuarios$ = createEffect(
        () => this.actions$.pipe(
            ofType( cargarUsuarios ),
            // tap( data => console.log('effect tap::', data) ), // tap: Operador que permite disparar efectos secundarios
            mergeMap(           // mergeMap: Ayuda a disparar un nuevo observable y mezclarlo con el observable anterior
                () => this.usuarioService.getUsers$()
                .pipe(
                    // tap( data2 => console.log('getUsers::', data2) )
                    map( users => cargarUsuariosSuccess( {usuarios: users } ) ),
                    catchError( err => of( cargarUsuariosError( { payload: err } ) ) )
                )
            )
        )
    );
}
