import { createReducer, on } from '@ngrx/store';
import { cargarUsuario, cargarUsuarioSuccess, cargarUsuarioError } from '../actions';
import { Usuario } from 'src/app/models/usuario.model';

export interface UsuarioState {
    id: string,
    user: Usuario | null,
    loaded: boolean,
    loading: boolean,
    error: any
}

export const usuarioInitialState: UsuarioState = {
    id: '',
    user: null,
    loaded: false,
    loading: false,
    error: null
};

export const usuarioReducer = createReducer(
    usuarioInitialState,

    on( cargarUsuario, ( state, { id } ) => ( {
        ...state,
        loading: true,
        id: id
    } ) ),

    on( cargarUsuarioSuccess, ( state, { usuario } ) => ( { 
        ...state,
        loading: false,
        loaded: true,
        user: { ...usuario }
    } ) ),

    on( cargarUsuarioError, ( state, { payload } ) => ( { 
        ...state,
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            name: payload.name,
            message: payload.message
        }
    } ) )
);