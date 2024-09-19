import { Component, OnInit } from "@angular/core";


@Component ({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

  public articles = [
    { 
      title: 'Titulo 1', 
      link: 'https://mussumipsum.com/_next/static/media/bg_home.fb320b8f.jpg',
      content: 'Mussum Ipsum, cacilds vidis litro abertis.  Si num tem leite então bota uma pinga aí cumpadi! Quem manda na minha terra sou euzis! Nulla id gravida magna, ut semper sapien. Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis.',  
    },
    { 
      title: 'Titulo 2', 
      link: 'https://mussumipsum.com/_next/static/media/bg_home.fb320b8f.jpg',
      content: `Mussum Ipsum, cacilds vidis litro abertis.  Praesent malesuada urna nisi, quis volutpat erat hendrerit non. Nam vulputate dapibus. Viva Forevis aptent taciti sociosqu ad litora torquent. Pellentesque nec nulla ligula. Donec gravida turpis a vulputate ultricies. Leite de capivaris, leite de mula manquis sem cabeça. <br><br> Delegadis gente finis, bibendum egestas augue arcu ut est. Copo furadis é disculpa de bebadis, arcu quam euismod magna. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. Vehicula non. Ut sed ex eros. Vivamus sit amet nibh non tellus tristique interdum.`, 
    },
    { title: 'Titulo 3', content: 'Conteúdo 3', link: 'https://mussumipsum.com/_next/static/media/bg_home.fb320b8f.jpg' },
    { title: 'Titulo 4', content: 'Conteúdo 4', link: 'https://mussumipsum.com/_next/static/media/bg_home.fb320b8f.jpg' },
    { title: 'Titulo 5', content: 'Conteúdo 5', link: 'https://mussumipsum.com/_next/static/media/bg_home.fb320b8f.jpg' },
    { title: 'Titulo 6', content: 'Conteúdo 6', link: 'https://mussumipsum.com/_next/static/media/bg_home.fb320b8f.jpg' },
  ];

  ngOnInit(){
  }
}