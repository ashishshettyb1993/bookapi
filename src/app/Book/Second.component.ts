import { Component, OnInit } from '@angular/core';
import { Book } from './book';
import { BookService } from './book.service'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'second-component',
    templateUrl: './second.component.html',
    styleUrls: ['./book.component.css']
})

export class SecondComponent {
    Book: Book = new Book();
    EditButtonText:string;
    id: any;
    title: string = "";
    author: string = "";
    constructor(private _bookService: BookService, private route: ActivatedRoute) { }

    ngOnInit() { 
        this.EditButtonText="Add Book";
        this.route
        .queryParams
        .subscribe(params => {
          this.id = params['bookid'] || undefined;
          if(this.id!=undefined){
            this._bookService.GetSingleBook(this.id)
            .subscribe((bookdata =>{
                this.EditButtonText="Edit Book";
                this.title = bookdata["title"];
                this.author=bookdata["author"];
            }))
          }
        });
    }

    AddBook() {
        this.Book["id"]=this.id;
        this.Book["title"] = this.title;
        this.Book["author"] = this.author;
        this._bookService.AddBook(this.Book).subscribe((response: Response) => { console.log(response) }, (error) => {
            console.log(error);
        })
    }
}