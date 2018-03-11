import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-url',
    templateUrl: './url.component.html',
    styleUrls: ['./url.component.css']
})
export class UrlComponent implements OnInit {
    urls = { uses: 0};
    short = 0;
    valid_original = 0;
    constructor(private http: HttpClient, private router: Router) {
    }

    ngOnInit() {
    }

    saveUrl() {
        this.http.post('/url', this.urls)
            .subscribe(res => { // Подписка на ответ, что сделает при ответе
                    this.short = res['short_url']; // res вернёт значение short, сформированного нодом при вставке в базу
                    // this.router.navigate(['/']);
                    this.valid_original = res['valid_original'];
                }, (err) => {
                    console.log(err);
                }
            );
    }
}
