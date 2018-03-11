import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { UrlComponent } from './url/url.component';
import { UrlRedirectComponent } from './url-redirect/url-redirect.component';


const appRoutes: Routes = [
  {
    path: '',
    component: UrlComponent
  },
  {
    path: '**',
    component: UrlRedirectComponent
  },

  // {
  //   path: 'book-create',
  //   component: BookCreateComponent,
  //   data: { title: 'Create Book' }
  // },
  // {
  //   path: 'book-edit/:id',
  //   component: BookEditComponent,
  //   data: { title: 'Edit Book' }
  // },
  // { path: '',
  //   redirectTo: '/books',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  declarations: [
    AppComponent,
    UrlComponent,
    UrlRedirectComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
        appRoutes,
        { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
