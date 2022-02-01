import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../../models/src/usuarios';

const usuario_Url = '/api/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService implements AfterViewInit {
  constructor(private httpCliente: HttpClient) {}
  ngAfterViewInit(): void {}

  add(usuario: Usuario): Observable<void> {
    return this.httpCliente.post<void>(usuario_Url, usuario);
  }

  findById(codigo: number): Observable<Usuario> {
    return this.httpCliente
      .get<Usuario>(`${usuario_Url}/${codigo}`)
      .pipe();
  }

  findAll(): Observable<Usuario[]> {
    return this.httpCliente.get<Usuario[]>(`${usuario_Url}`).pipe();
  }

  updateById(usuario: Usuario): Observable<void> {
    return this.httpCliente.put<void>(
      `${usuario_Url}/${usuario.id}`,
      usuario
    );
  }

  deleteById(id: number) {
    return this.httpCliente.delete(`${usuario_Url}/${id}`).pipe();
  }
}
