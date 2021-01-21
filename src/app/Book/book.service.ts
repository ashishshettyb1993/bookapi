import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from './book';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class BookService {
    constructor(private _http: HttpClient) { }

    generateToken(request) {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        let options = { headers: headers };
        return this._http.post('http://localhost:8081/api/authenticate', request, options);
    }

    GetAllBooks(token: string): Observable<Response> {

        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        let options = { headers: headers };
        return this._http.get('http://localhost:8081/api/employee', options)
            .pipe(map((res: Response) => res))
    }

    AddBook(book: Book) {
        let body = JSON.stringify(book);
        let headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        let options = { headers: headers };
        if (book.id) {
            return this._http.put("http://localhost:8080/BookManagementSystem/api/book/" + book.id, body, options);
        } else {
            return this._http.post("http://localhost:8080/BookManagementSystem/api/book", body, options);
        }

    }

    GetSingleBook(bookid: string) {
        return this._http.get("http://localhost:8080/BookManagementSystem/api/book/" + bookid);
    }


    DeleteBook(bookid: string) {
        return this._http.delete("http://localhost:8080/BookManagementSystem/api/book/" + bookid);

    }

}