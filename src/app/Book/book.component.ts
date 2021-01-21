import { Component, OnInit } from '@angular/core';
import { Book } from './book';
import { BookService } from './book.service'
import { ActivatedRoute, Router } from '@angular/router';


@Component({
    selector: 'app-book',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.css']
})

export class BookComponent implements OnInit {
    books: any;

    constructor(private _bookService: BookService, private route: ActivatedRoute, private router: Router) { }



    ngOnInit() {
        //this.getBooks();
        this.getAccessToken();
    }

    getAccessToken() {
        let logincredentials = new Object();
        logincredentials['username'] = 'ashish';
        logincredentials['password'] = '12345';
        this._bookService.generateToken(logincredentials).subscribe((tokendata => {
            this.getBooks(tokendata['Token'])
        }))
    }

    getBooks(token: string): void {
        var that = this;
        this._bookService.GetAllBooks(token)
            .subscribe((bookdata =>
                that.books = bookdata
            ))
    }

    DeleteBook(bookid: string) {
        this._bookService.DeleteBook(bookid)
            .subscribe(response => {
                this.books = response;
            });



    }

    Edit(bookid: string) {
        this.router.navigate(['/second-component'], { queryParams: { bookid: bookid } });
    }

}