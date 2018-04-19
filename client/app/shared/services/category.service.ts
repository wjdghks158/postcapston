import { Injectable } from '@angular/core';

@Injectable()
export class CategoryService {
  Category =  [
    {id: 1, value:'기획/아이디어'},
    {id: 2, value:'디자인'},
    {id: 3, value:'광고/마케팅'},
    {id: 4, value:'문학/시나리오'},
    {id: 5, value:'영상/UCC/사진'},
    {id: 6, value:'슬로건/네이밍'},
    {id: 7, value:'논문/리포트'},
    {id: 8, value:'캐릭터/만화/게임'},
    {id: 9, value:'음악/미술/무용'},
    {id: 10, value:'건축/인테리어'},
    {id: 11, value:'과학/공학'},
    {id: 12, value:'취업/창업'},
    {id: 13, value:'전시/페스티벌'},
    {id: 14, value:'All'}
];
  constructor() { }

}




