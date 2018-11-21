import { Component, OnInit } from '@angular/core';

interface LangDesc {
  name: string;
  imgUrl: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  languageDescs: LangDesc[] = [
    {
      name : 'JS',
      imgUrl : '../../assets/languages/js.png'
    },
    {
      name : 'PHP',
      imgUrl : '../../assets/languages/php.png'
    },
    {
      name : 'LARAVEL',
      imgUrl : '../../assets/languages/laravel.png'
    },
    {
      name : 'NODE JS',
      imgUrl : '../../assets/languages/nodejs.png'
    },
    {
      name : 'Angular',
      imgUrl : '../../assets/languages/angular.png'
    },
    {
      name : 'CSS',
      imgUrl : '../../assets/languages/css.jpg'
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
