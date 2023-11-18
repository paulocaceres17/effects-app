import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { cargarUsuario, cargarUsuarioSuccess, cargarUsuarioError } from '../actions';
import { mergeMap, map, catchError, of, tap } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario.service';

@Injectable()
export class UsuarioEffects {

    constructor( private actions$: Actions,
        private usuarioService: UsuarioService ) {
    }

    cargarUsuario$ = createEffect(
        () => this.actions$.pipe(
            ofType( cargarUsuario ),
            mergeMap(
                ( action ) => this.usuarioService.getUserById$( action.id )
                .pipe(
                    map( user => cargarUsuarioSuccess( {usuario: user } ) ),
                    catchError( err => of( cargarUsuarioError( { payload: err } ) ) )
                )
            )
        )
    );
}
