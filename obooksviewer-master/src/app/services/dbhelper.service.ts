import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { RootObject } from '../model/book';

@Injectable({
  providedIn: 'root'
})
export class DbhelperService {

  constructor(private http : HttpClient) { }

  async getJson(){
    const respuesta = await fetch("http://sergi-diaz-7e2.alwaysdata.net/obooksback/index.php/api/bookshowall/");
    return await respuesta.json() || [];
  }
}
