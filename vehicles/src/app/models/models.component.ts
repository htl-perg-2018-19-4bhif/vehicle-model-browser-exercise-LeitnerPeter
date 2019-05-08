import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

interface ICar{
  "id": number,
  "year": number,
  "make": string
  "model": string
}


@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.css']
})
export class ModelsComponent implements OnInit {
  years: number[] = [];
  makes: string[] = [];
  models: ICar[] = [];
  selectedYear: number;
  selectedMake: string;
  filteredCars: ICar[] = [];
  curPage = 0;

  
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getYears();
    this.getMakes();
    this.getModels();
  }
  async getYears(){
    this.years = await this.http.get<number[]>("https://vehicle-data.azurewebsites.net/api/years").toPromise();
    
  }
  async getMakes(){
    this.makes = await this.http.get<string[]>("https://vehicle-data.azurewebsites.net/api/makes").toPromise();
    
  }
  async getModels(){
    this.models = await this.http.get<ICar[]>("https://vehicle-data.azurewebsites.net/api/models?offset"+this.curPage+"&fetch=10").toPromise();
  }
  async getFilter(){
    if(this.selectedMake != null && this.selectedYear!=null){
      this.models = await this.http.get<ICar[]>("https://vehicle-data.azurewebsites.net/api/models?make="+ this.selectedMake +"&year="+ this.selectedYear+"&offset="+this.curPage+"&fetch=10").toPromise();
    } else if(this.selectedMake == null && this.selectedYear !=null){
      this.models = await this.http.get<ICar[]>("https://vehicle-data.azurewebsites.net/api/models?year="+ this.selectedYear+"&offset="+this.curPage+"&fetch=10").toPromise();
    } else if(this.selectedMake !=null && this.selectedYear != null){
      this.models = await this.http.get<ICar[]>("https://vehicle-data.azurewebsites.net/api/models?make="+ this.selectedMake+"&offset="+this.curPage+"&fetch=10").toPromise();
    }
  }

  refresh(){
    if(this.selectedMake != null || this.selectedYear!=null){
      this.getFilter();
    } else {
      this.getModels();
    }
  }
  changeMake(event: any){
    this.selectedMake=event.target.value;
  }
  changeYear(event: any){
    this.selectedYear=event.target.value;
  }
  changeForward(){
    this.curPage+=10;
  }
  changeBackward(){
    if(this.curPage>0){
      this.curPage-=10;
    } 
  }
  
  
  
}
