import { Usuario } from './../../models/usuario.model';
import { createAction, props } from '@ngrx/store';


export const cargarUsuario = createAction(
    '[Usuarios] Cargar Usuario',
    props<{ id: string}>()
);

export const cargarUsuarioSuccess = createAction(
    '[Usuarios] Cargar Usuario Success',
    props<{ usuario: Usuario }>()
);

export const cargarUsuarioError = createAction(
    '[Usuarios] Cargar Usuario Error',
    props<{ payload: any }>()
);
